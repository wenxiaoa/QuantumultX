/*
 * Weibo Cleaner 1.0.2 — Quantumult X, wenxiaoa/QuantumultX
 * Interface coverage and filtering criteria informed by ddgksf2013 and zmqcherish.
 * Reference: https://github.com/ddgksf2013/Rewrite/blob/master/AdBlock/WeiboAds.conf
 * Reimplemented with explicit dispatch, validated settings and original-body fallback.
 * No network requests, cookies, credentials or response data are stored or logged.
 */
(function () {
  'use strict';
  const VERSION = '1.0.2';
  // Compatibility defaults preserve the reference's EFFECTIVE behaviour, not its stale comments.
  const DEFAULTS = Object.freeze({
    enabled: true, debug: false,
    removeHomeVip: true, removeHomeCreatorTask: true,
    removeRelate: true, removeGood: true, removeFollow: true,
    modifyMenus: true, removeRelateItem: true, removeRecommendItem: true,
    removeRewardItem: true, removeLiveMedia: true, removeNextVideo: false,
    removePinedTrending: true, removeInterestFriendInTopic: false,
    removeInterestTopic: false, removeInterestUser: true, removeLvZhou: true,
    removeSearchWindow: true, simplifySearch: true, simplifyProfile: true,
    removeNoticeTips: true, removeVideoLimit: true, removeCommonStruct: true,
    removeHomeExtend: true, removeSidebarCards: true, removeUnfollowTopic: false,
    removeUnusedPart: false, skinPreview: true,
    profileSkin1: null, profileSkin2: null, tabIconVersion: 0, tabIconPath: '',
    blockIds: [],
  });
  const MENU_DEFAULTS = Object.freeze({
    creator_task: false, mblog_menus_custom: false, mblog_menus_video_later: true,
    mblog_menus_comment_manager: true, mblog_menus_avatar_widget: false,
    mblog_menus_card_bg: false, mblog_menus_long_picture: true,
    mblog_menus_delete: true, mblog_menus_edit: true, mblog_menus_edit_history: true,
    mblog_menus_edit_video: true, mblog_menus_sticking: true,
    mblog_menus_open_reward: true, mblog_menus_novelty: false,
    mblog_menus_favorite: true, mblog_menus_promote: true,
    mblog_menus_modify_visible: true, mblog_menus_copy_url: true,
    mblog_menus_follow: true, mblog_menus_video_feedback: true,
    mblog_menus_shield: true, mblog_menus_report: true,
    mblog_menus_apeal: true, mblog_menus_home: true,
  });
  const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
  const array = value => Array.isArray(value) ? value : [];
  const has = (text, part) => typeof text === 'string' && text.includes(part);
  const erase = (value, keys) => { if (object(value)) keys.forEach(key => { delete value[key]; }); };
  const contains = (value, text) => has(JSON.stringify(value), text);
  const https = value => typeof value === 'string' && /^https:\/\/[^\s]+$/.test(value);

  function settings(input) {
    const cfg = Object.assign({}, DEFAULTS, { blockIds: [], menus: Object.assign({}, MENU_DEFAULTS) });
    if (!object(input)) return cfg;
    for (const key of Object.keys(DEFAULTS)) {
      if (typeof DEFAULTS[key] === 'boolean' && typeof input[key] === 'boolean') cfg[key] = input[key];
    }
    if (Array.isArray(input.blockIds)) cfg.blockIds = input.blockIds.filter(x => typeof x === 'string' || Number.isSafeInteger(x)).map(String);
    for (const key of ['profileSkin1', 'profileSkin2']) {
      if (Array.isArray(input[key]) && input[key].every(https)) cfg[key] = input[key].slice();
    }
    if (Number.isInteger(input.tabIconVersion) && input.tabIconVersion >= 100) cfg.tabIconVersion = input.tabIconVersion;
    if (https(input.tabIconPath)) cfg.tabIconPath = input.tabIconPath;
    if (object(input.menus)) for (const key of Object.keys(MENU_DEFAULTS)) {
      if (typeof input.menus[key] === 'boolean') cfg.menus[key] = input.menus[key];
    }
    return cfg;
  }

  function ad(post) {
    return object(post) && (['广告', '热推'].includes(post.mblogtypename) ||
      post.promotion?.type === 'ad' || post.page_info?.actionlog?.source === 'ad' ||
      post.content_auth_info?.content_auth_title === '广告');
  }
  function blocked(post, cfg) {
    const id = post?.user?.idstr ?? post?.user?.id;
    return id !== undefined && cfg.blockIds.includes(String(id));
  }
  function hidden(post, cfg) { return ad(post) || blocked(post, cfg); }
  function cleanPost(post, cfg, videoLimit) {
    if (!object(post)) return;
    if (videoLimit && cfg.removeVideoLimit) erase(post.page_info, ['video_limit']);
    if (cfg.removeCommonStruct) delete post.common_struct;
    else if (cfg.removeLvZhou && Array.isArray(post.common_struct)) post.common_struct = post.common_struct.filter(x => x?.name !== '绿洲');
  }
  function cleanHeader(data) {
    if (!Array.isArray(data?.items)) return;
    data.items = data.items.filter(item => {
      if (!object(item)) return true;
      if (item.category !== 'group') return !item.category;
      if (!Array.isArray(item.items)) return true;
      item.items = item.items.filter(child => child?.data?.card_type === undefined || [101, 17].includes(child.data.card_type));
      item.items.forEach(child => { if (child?.data?.card_type === 17) child.data.col = 1; });
      return item.items.length > 0;
    });
  }
  function searchWindow(item, cfg) {
    if (!cfg.removeSearchWindow || item?.category !== 'card') return false;
    const data = item.data;
    return ['finder_window', 'discover_gallery', 'more_frame'].includes(data?.itemid) ||
      [208, 236, 247, 217, 101, 19].includes(data?.card_type) ||
      has(data?.mblog?.page_info?.actionlog?.source, 'ad') || has(data?.pic, 'ads');
  }
  function search(data, cfg) {
    if (Array.isArray(data.items)) data.items = data.items.filter(item => {
      if (!object(item)) return true;
      if (item.category === 'feed') {
        if (hidden(item.data, cfg)) return false;
        if (cfg.removeVideoLimit) erase(item.data?.page_info, ['video_limit']);
        return true;
      }
      if (item.category === 'group' && Array.isArray(item.items)) {
        if (cfg.simplifySearch && item.header?.type === 'guess' && item.itemExt?.filterType !== 'search') return false;
        item.items = item.items.filter(child => {
          if (hidden(child?.data?.mblog, cfg) || child?.data?.content_auth_info?.content_auth_title === '广告') return false;
          return !cfg.simplifySearch || child?.data?.card_type === undefined || [17, 10].includes(child.data.card_type);
        });
        if (cfg.simplifySearch) item.items.forEach(child => { if (child?.data?.card_type === 17) child.data.col = 1; });
        return item.items.length > 0;
      }
      return !searchWindow(item, cfg);
    });
    if (object(data.loadedInfo)) {
      data.loadedInfo.searchBarContent = [];
      if (object(data.loadedInfo.headerBack) && cfg.removeSearchWindow) data.loadedInfo.headerBack.channelStyleMap = {};
    }
  }
  function cards(data, cfg) {
    if (data.hotwords) data.hotwords = [];
    if (Array.isArray(data.cards)) data.cards = data.cards.filter(card => {
      if (!object(card)) return true;
      if (cfg.simplifySearch && data.cardlistInfo?.containerid === '232082type=1' && [17, 58, 11].includes(card.card_type)) {
        const type = card.card_type + 1;
        Object.keys(card).forEach(key => { delete card[key]; });
        card.card_type = type;
      }
      if (Array.isArray(card.card_group) && card.card_group.length) {
        card.card_group = card.card_group.filter(x => x?.card_type !== 118 && !hidden(x?.mblog, cfg) && !contains(x, 'res_from:ads'));
        return true;
      }
      if ([9, 165].includes(card.card_type)) return !hidden(card.mblog, cfg);
      return ![1007, 180].includes(card.card_type);
    });
    if (Array.isArray(data.items)) search(data, cfg);
  }
  function timeline(data, cfg) {
    erase(data, ['ad', 'advertises', 'trends', 'headers']);
    if (Array.isArray(data.statuses)) data.statuses = data.statuses.filter(post => {
      if (hidden(post, cfg) || post?.category === 'group') return false;
      cleanPost(post, cfg, false);
      return true;
    });
  }
  function mainTab(data, cfg) {
    erase(data.loadedInfo, ['headers']);
    if (Array.isArray(data.items)) data.items = data.items.filter(item => {
      if (hidden(item?.data, cfg)) return false;
      cleanPost(item?.data, cfg, true);
      return !(item?.category === 'group' && Array.isArray(item.items) && !contains(item.items, 'profile_top'));
    });
  }
  function topicMain(data, cfg) {
    erase(data.loadedInfo, ['headers']);
    if (!Array.isArray(data.items)) return;
    data.items = data.items.filter(item => {
      if (item?.category === 'feed') return !hidden(item.data, cfg);
      if (item?.category === 'group' && Array.isArray(item.items)) {
        const first = item.items[0]?.data?.itemid;
        if (has(first, 'search_input')) {
          item.items = item.items.filter(x => has(x?.data?.itemid, 'mine_topics') || has(x?.data?.itemid, 'search_input') || x?.data?.card_type === 202);
          // Set the search card, not whichever item happened to become index zero.
          item.items.forEach(x => { if (has(x?.data?.itemid, 'search_input')) x.data.hotwords = [{ word: '搜索超话', tip: '' }]; });
        } else if (has(first, 'top_title')) return false;
        else item.items = item.items.filter(x => ['feed', 'card'].includes(x?.category));
        return true;
      }
      return ![202, 200].includes(item?.data?.card_type);
    });
  }
  function topic(data, cfg) {
    if (!Array.isArray(data.cards) || (!cfg.removeUnfollowTopic && !cfg.removeUnusedPart)) return;
    data.cards = data.cards.filter(card => {
      if (!object(card)) return true;
      if (card.mblog) return !(cfg.removeUnfollowTopic && card.mblog.buttons?.[0]?.type === 'follow');
      if (!cfg.removeUnusedPart) return true;
      if (card.itemid === 'bottom_mix_activity' || card.top?.title === '正在活跃' || (card.card_type === 200 && card.group)) return false;
      if (Array.isArray(card.card_group)) {
        if (['guess_like_title', 'cats_top_title', 'chaohua_home_readpost_samecity_title'].includes(card.card_group[0]?.itemid)) return false;
        card.card_group = card.card_group.filter(x => !['chaohua_discovery_banner_1', 'bottom_mix_activity'].includes(x?.itemid));
      }
      return true;
    });
  }
  function searchMain(data, cfg) {
    if (!cfg.simplifySearch) {
      array(data.channelInfo?.channels).forEach(channel => { if (object(channel?.payload)) search(channel.payload, cfg); });
      return;
    }
    if (Array.isArray(data.channelInfo?.channels)) {
      data.channelInfo.channels = data.channelInfo.channels.filter(channel => {
        if (!object(channel?.payload)) return true;
        if (Array.isArray(channel.payload.items)) channel.payload.items = [];
        if (object(channel.payload.loadedInfo)) {
          if (channel.payload.loadedInfo.searchBarContent) channel.payload.loadedInfo.searchBarContent = [{}];
          if (object(channel.payload.loadedInfo.headerBack)) channel.payload.loadedInfo.headerBack.channelStyleMap = {};
        }
        erase(channel, ['titleInfoAbsorb', 'titleInfo', 'title']);
        return true;
      });
      if (data.channelInfo.moreChannels) erase(data.channelInfo, ['moreChannels', 'channelConfig']);
    }
    if (object(data.header?.data)) cleanHeader(data.header.data);
  }
  function messages(data) {
    if (Array.isArray(data.items)) data.items = data.items.filter(item => {
      if (item?.itemId === 'hotword') {
        if (Array.isArray(item.items)) item.items = item.items.filter(x => has(x?.data?.pic, 'com/wb_search'));
        return true;
      }
      return !object(item) || item.type === undefined || (item.type === 'text' && has(item.text?.content, '实时热点'));
    });
    delete data.channelInfo;
  }
  function page(data, cfg) {
    cards(data, cfg);
    if (cfg.removePinedTrending && Array.isArray(data.cards?.[0]?.card_group)) data.cards[0].card_group = data.cards[0].card_group.filter(card =>
      !has(card?.actionlog?.ext, 'ads_word') && !has(card?.itemid, 't:51') && !has(card?.itemid, 'ads_word'));
  }
  function detail(data, cfg) {
    const title = data.trend?.titles?.title;
    if ((cfg.removeRelate && title === '相关推荐') || (cfg.removeGood && title === '博主好物种草') ||
        has(data.trend?.extra_struct?.extBtnInfo?.btn_picurl, 'timeline_icon_ad_delete')) delete data.trend;
    if (cfg.removeFollow && data.follow_data) data.follow_data = null;
    if (cfg.removeRewardItem && data.reward_info) data.reward_info = null;
    if (cfg.removeNoticeTips) { delete data.head_cards; if (data.page_alerts) data.page_alerts = null; }
    if (cfg.modifyMenus && Array.isArray(data.custom_action_list)) {
      const allowed = data.custom_action_list.filter(x => cfg.menus[x?.type] !== false);
      data.custom_action_list = allowed.filter(x => x?.type === 'mblog_menus_copy_url').concat(allowed.filter(x => x?.type !== 'mblog_menus_copy_url'));
    }
  }
  function commentAd(item, cfg) {
    if (!object(item)) return false;
    const value = object(item.data) ? item.data : item;
    const labels = [value.adType, value.ad_type, value.card_type_name, value.title, value.desc, value.content_auth_info?.content_auth_title];
    if (labels.some(label => ['广告', '廣告', '热推', '推广'].includes(label)) || [6, 236].includes(value.card_type) ||
        has(value.actionlog?.ext, 'ads_word') || has(value.itemid, 'ads_word') || ad(value) || hidden(value.mblog, cfg)) return true;
    if (cfg.removeRelateItem && labels.includes('相关内容')) return true;
    return cfg.removeRecommendItem && labels.some(label => ['推荐', '推薦', '荐读'].includes(label));
  }
  function cleanCommentTree(value, cfg, depth) {
    if (!object(value) || depth > 8) return;
    for (const key of ['items', 'card_group', 'cards']) {
      if (Array.isArray(value[key])) {
        value[key] = value[key].filter(item => !commentAd(item, cfg));
        value[key].forEach(item => cleanCommentTree(item, cfg, depth + 1));
      }
    }
    if (object(value.data)) cleanCommentTree(value.data, cfg, depth + 1);
  }
  function comments(data, cfg) {
    if (data.pageHeader && object(data.pageHeader.data) && Array.isArray(data.pageHeader.data.items)) {
      data.pageHeader.data.items = data.pageHeader.data.items.filter(item => item?.category === 'detail');
    }
    const labels = ['广告', '廣告', '相关内容', '推荐', '热推', '推薦', '荐读'];
    const remove = item => {
      const value = item?.data || {};
      return labels.includes(value.adType || '') || value.card_type === 6 || value.card_type === 236;
    };
    if (Array.isArray(data.items)) data.items = data.items.filter(item => !remove(item));
    // Some newer responses nest the same promotional cards under an item or card group.
    cleanCommentTree(data, cfg, 0);
    if (cfg.removeNoticeTips) delete data.tip_msg;
  }
  function profileSkin(item, icons) {
    if (!icons) return;
    let index = 0;
    for (const child of array(item.items)) {
      if (!object(child?.image)) continue;
      const icon = icons[index++];
      if (!icon) continue;
      if (object(child.image.style)) child.image.style.darkMode = 'alpha';
      child.image.iconUrl = icon;
      if (child.dot) child.dot = [];
    }
  }
  function profile(data, cfg) {
    if (!Array.isArray(data.items)) return;
    data.items = data.items.filter(item => {
      if (!object(item)) return true;
      switch (item.itemId) {
        case 'profileme_mine':
          if (cfg.removeHomeVip) { if (item.header?.vipView) item.header.vipView = null; erase(item.header, ['vipIcon']); }
          for (const child of array(item.items)) {
            const module = child?.click?.modules?.[0];
            if (child?.itemId === 'mainnums_friends' && typeof module?.scheme === 'string') module.scheme = module.scheme.replace('231093_-_selfrecomm', '231093_-_selffollowed');
          }
          return true;
        case '100505_-_top8': profileSkin(item, cfg.profileSkin1); return true;
        case '100505_-_newcreator':
          if (item.type === 'grid') { profileSkin(item, cfg.profileSkin2); return true; }
          return !cfg.removeHomeCreatorTask;
        case '100505_-_chaohua': case '100505_-_manage': case '100505_-_recentlyuser':
          if (cfg.simplifyProfile && Array.isArray(item.images)) item.images = item.images.filter(x => ['100505_-_chaohua', '100505_-_recentlyuser'].includes(x?.itemId));
          return true;
        default: return !cfg.simplifyProfile || item.itemId === undefined;
      }
    });
  }
  function container(data, cfg) {
    if ((cfg.removeInterestFriendInTopic && data.card_type_name === '超话里的好友') ||
        (cfg.removeInterestTopic && (has(data.itemid, 'infeed_may_interest_in') || has(data.itemid, 'infeed_friends_recommend')))) data.card_group = [];
  }
  function user(data, cfg) {
    mainTab(data, cfg);
    if (cfg.removeInterestUser && Array.isArray(data.items)) data.items = data.items.filter(x => !(x?.category === 'group' && x.items?.[0]?.data?.desc === '可能感兴趣的人'));
  }
  function video(data, cfg) {
    if (Array.isArray(data.statuses)) data.statuses = data.statuses.filter(post => {
      if (hidden(post, cfg)) return false;
      erase(post?.video_info, ['forward_redpacket_info', 'shopping', 'float_info', 'tags']);
      return true;
    });
    // Conservative opt-in: only remove the explicit next_video field, not the video list itself.
    if (cfg.removeNextVideo) {
      delete data.next_video;
      for (const post of array(data.statuses)) erase(post?.video_info, ['next_video']);
    }
  }
  function splash(data, kind) {
    if (kind === 'preload' && Array.isArray(data.ads)) {
      data.last_ad_show_interval = 86400;
      data.ads.forEach(item => { if (object(item)) Object.assign(item, { start_time: 2681574400, end_time: 2681660799, display_duration: 0, daily_display_cnt: 0, total_display_cnt: 0 }); });
    }
    if (kind === 'lua') array(data.cached_ad?.ads).forEach(item => { if (object(item)) Object.assign(item, { start_date: 1893254400, end_date: 1893340799, show_count: 0, duration: 0 }); });
    if (kind === 'php' && Array.isArray(data.ads)) {
      Object.assign(data, { show_push_splash_ad: false, background_delay_display_time: 0, lastAdShow_delay_display_time: 0, realtime_ad_video_stall_time: 0, realtime_ad_timeout_duration: 0 });
      data.ads.forEach(item => { if (object(item)) Object.assign(item, { displaytime: 1, displayintervel: 86400, allowdaydisplaynum: 0, displaynum: 0, begintime: '2029-12-30 00:00:00', endtime: '2029-12-30 23:59:59' }); });
    }
  }
  function skin(data, cfg, preview) {
    if (!object(data.data)) return;
    if (cfg.skinPreview) {
      if (preview) { if (object(data.data.skin_info)) data.data.skin_info.status = 1; }
      else data.data.canUse = 1;
    }
    if (!preview && cfg.tabIconVersion && cfg.tabIconPath) array(data.data.list).forEach(item => {
      if (object(item)) { item.version = cfg.tabIconVersion; item.downloadlink = cfg.tabIconPath; }
    });
  }
  const HANDLERS = {
    cards, timeline, mainTab, topicMain, topic, searchMain, search, messages, page,
    detail, comments, profile, container, user, video,
    sidebar(data, cfg) { if (cfg.removeSidebarCards && Array.isArray(data.items)) data.items = data.items.filter(x => x?.category !== 'card'); },
    groups(data, cfg) { if (cfg.removeHomeExtend) erase(data, ['homeExtend', 'home_extend']); },
    remind(data) { Object.assign(data, { bubble_dismiss_time: 0, exist_remind: false, image_dismiss_time: 0, image: '', tag_image_english: '', tag_image_english_dark: '', tag_image_normal: '', tag_image_normal_dark: '' }); },
    checkin(data) { data.show = 0; },
    live(data, cfg) { if (cfg.removeLiveMedia) data.data = {}; },
    preload(data) { splash(data, 'preload'); },
    lua(data) { splash(data, 'lua'); },
    php(data) { splash(data, 'php'); },
    skin(data, cfg) { skin(data, cfg, false); },
    skinPreview(data, cfg) { skin(data, cfg, true); },
    intlOpen(data) { if (data.data) data.data = { display_ad: 1 }; },
    intlBanner(data) { if (object(data.data)) { delete data.data.close_ad_setting; if (data.data.detail_banner_ad) data.data.detail_banner_ad = []; } },
    intlTopics(data) { if (object(data.data)) data.data.order = ['search_topic']; },
    intlUser(data) { if (object(data.data) && Array.isArray(data.data.cards)) data.data.cards = data.data.cards.filter(x => x?.items?.[0]?.type !== 'personal_vip'); },
    intlSearch(data, cfg) {
      const list = data.data?.search_topic?.cards;
      if (cfg.removePinedTrending && (Array.isArray(list) || object(list))) data.data.search_topic.cards = Object.values(list).filter(x => x?.type !== 'searchtop');
      if (object(data.data)) delete data.data.trending_topic;
    },
    intlSearchInfo() { return { data: { expiration_time: '86400', cards: [{ tip: '搜索微博', word: '' }] }, info: '', retcode: 0 }; },
    intlFeedTopic() { return { data: [], info: '', retcode: 0, ext: { search_hot_simple: { title: '热门搜索', desc: '', more: '更多热搜' }, search_hot: { title: '微博热搜榜', desc: '实时热点，每分钟更新一次', more: '' }, search_city: { title: '同城热点', desc: '', more: '' } } }; },
  };

  // A single manifest drives both runtime selection and generated QX subscriptions.
  // Delimit endpoints: container_timeline_topic must not accidentally hit container_timeline.
  const API = '^https?://(?:m?api|[a-z0-9-]+\\.api)\\.weibo\\.(?:cn|com)/\\d+/';
  const end = '(?:\\?|$)';
  function route(id, path, handler) { return { id, pattern: API + '(?:' + path + ')' + end, handler }; }
  const ROUTES = [
    { id: 'comments', pattern: '^https?:\\/\\/api\\.weibo\\.cn\\/\\d\\/statuses\\/container_detail', handler: 'comments' },
    route('sidebar', 'ug/checkin/stream', 'sidebar'),
    route('groups', 'groups/allgroups/v\\d+', 'groups'),
    route('anonymous', '\\w{5}/(?:statuses_unread_hot_timeline|timeline)', 'timeline'),
    route('cards', '(?:\\w{5}/)?cardlist|video/community_tab|searchall', 'cards'),
    route('timeline', 'statuses/(?:unread_)?friends(?:/|_)timeline|statuses/unread_hot_timeline|groups/timeline', 'timeline'),
    route('topic-main', 'statuses/container_timeline_topic', 'topicMain'),
    route('topic-main-alt', 'container_timeline_topic', 'topicMain'),
    route('main', 'statuses/container_timeline', 'mainTab'),
    route('detail', 'statuses/extend', 'detail'),
    route('video', 'statuses/video_mixtimeline|video/tiny_stream_video_list|video/tiny_stream_mid_detail', 'video'),
    route('topic', 'statuses/unread_topic_timeline', 'topic'),
    route('topic-alt', 'unread_topic_timeline', 'topic'),
    route('profile', 'profile/me', 'profile'),
    route('user', 'profile/container_timeline', 'user'),
    route('remind', 'video/remind_info', 'remind'),
    route('finder', 'search/finder', 'searchMain'),
    route('search', 'search/container_timeline|search/container_discover', 'search'),
    route('checkin', 'checkin/show', 'checkin'),
    route('live', '!/live/media_homelist', 'live'),
    route('container', 'container/get_item', 'container'),
    route('container-interest', 'container', 'container'),
    route('page', 'page', 'page'),
    route('messages', '0?flowpage', 'messages'),
    route('skin', '!/client/light_skin', 'skin'),
    { id: 'skin-preview', pattern: '^https?://new\\.vip\\.weibo\\.cn/littleskin/preview' + end, handler: 'skinPreview' },
    { id: 'boot-preload', pattern: '^https?://boot[^/]*\\.weibo\\.com/v\\d+/ad/preload' + end, handler: 'preload' },
    { id: 'splash-php', pattern: '^https?://(?:sdk|wb)app\\.uve\\.weibo\\.com/interface/sdk/sdkad\\.php' + end, handler: 'php' },
    { id: 'splash-lua', pattern: '^https?://(?:sdk|wb)app\\.uve\\.weibo\\.com/wbapplua/wbpullad\\.lua' + end, handler: 'lua' },
    // Dispatch a= using decoded query parameters; independent of order and encoding.
    { id: 'international', pattern: '^https?://weibointl\\.api\\.weibo\\.(?:cn|com)/portal\\.php(?:\\?|$)', handler: 'international' },
  ];
  const BLOCKS = [
    ['suggestions', API + 'statuses/container_positive' + end, 'reject-200'],
    ['push-popup', API + 'push/info' + end, 'reject-200'],
    ['interest-tags', API + '(?:[^?]*/)?account/recommend_interesttags' + end, 'reject-dict'],
    ['live-tab', API + '(?:[^?]*/)?media_homelist' + end, 'reject-200'],
    ['search-placeholder', API + '(?:[^?]*/)?finder/searchbarchange' + end, 'reject-200'],
    ['ad-preload', API + 'ad/preload' + end, 'reject-dict'],
    ['suggest-user', API + 'profile/recommend_popuser' + end, 'reject-dict'],
    ['boot-realtime', '^https?://boot[^/]*\\.weibo\\.com/v\\d+/ad/realtime' + end, 'reject-200'],
    ['topic-dot', API + '(?:[^?]*/)?discovery_home_bottom_getdotinfo' + end, 'reject-dict'],
    ['daily-tip', API + 'push/daily' + end, 'reject-dict'],
    ['ad-popup', '^https?://(?:preload-click|preload-impression)\\.uve\\.weibo\\.com/(?:interface/wbpullad/wbpullad_click\\.php|wbapplua/get_wbpullad_log\\.lua)' + end, 'reject'],
    ['sdk-config', '^https?://sdkapp\\.uve\\.weibo\\.com/interface/sdk/sdkconfig\\.php' + end, 'reject'],
    ['spotlight', API + 'hot/hours_spotlight' + end, 'reject-dict'],
    ['intl-video', API + 'cardlist\\?(?=[^#]*\\bv_f=[^&]*Weibo_intl)', 'reject-dict'],
    ['intl-hot-users', '^https?://weibointl\\.api\\.weibo\\.(?:cn|com)/portal\\.php\\?(?:[^#]*&)?a=hot_search_users(?:&|$)', 'reject-dict'],
    ['intl-promotion', API + 'ad/weibointl' + end, 'reject-dict'],
  ].map(([id, pattern, action]) => ({ id, pattern, action }));
  const COMPILED = ROUTES.map(item => Object.assign({}, item, { regex: new RegExp(item.pattern, 'i') }));
  function query(url) {
    const result = {};
    const tail = url.split('?')[1]?.split('#')[0] || '';
    for (const pair of tail.split('&')) {
      const split = pair.indexOf('=');
      const key = split < 0 ? pair : pair.slice(0, split);
      const value = split < 0 ? '' : pair.slice(split + 1);
      result[decodeURIComponent(key)] = decodeURIComponent(value.replace(/\+/g, ' '));
    }
    return result;
  }
  function select(url) {
    const found = COMPILED.find(item => item.regex.test(url));
    if (!found) return null;
    if (found.handler !== 'international') return found.handler;
    if (found.id === 'topic') return 'topic';
    const params = query(url);
    const names = { open_app: 'intlBanner', get_coopen_ads: 'intlOpen', trends: 'intlTopics', user_center: 'intlUser', get_searching_info: 'intlSearchInfo', search_topic: 'intlSearch' };
    if (params.a === 'search_topic' && /(?:\?|&)(?:c=)?feed(?:&|$)/.test(url)) return 'intlFeedTopic';
    return names[params.a] || null;
  }
  function transform(url, body, options) {
    const cfg = settings(options);
    if (!cfg.enabled || typeof url !== 'string' || typeof body !== 'string' || !body.trim()) return { body, changed: false };
    try {
      const name = select(url);
      if (!name) return { body, changed: false };
      // Only the known sdkad PHP endpoint accepts the literal OK suffix.
      const suffix = name === 'php' ? 'OK' : '';
      const text = suffix && /OK\s*$/.test(body) ? body.replace(/OK\s*$/, '') : body;
      const match = text.match(/\{.*\}/s);
      if (!match) return { body, changed: false };
      const data = JSON.parse(match[0].replace(/^\uFEFF/, ''));
      if (!object(data)) return { body, changed: false };
      // Do not turn authentication/errors into apparently successful API responses.
      if ((data.ok === 0) || data.error || data.error_code || (typeof data.retcode === 'number' && ![0, 20000000].includes(data.retcode))) return { body, changed: false };
      const before = JSON.stringify(data);
      const returned = HANDLERS[name](data, cfg);
      const value = returned === undefined ? data : returned;
      const after = JSON.stringify(value);
      const result = after + (name === 'php' ? 'OK' : suffix);
      if (before === after && !(name === 'php' && !suffix)) return { body, changed: false };
      return { body: result, changed: result !== body };
    } catch (_) {
      // Never return partially changed data, error details, URL query tokens or raw bodies.
      return { body, changed: false, error: true };
    }
  }
  function run(request, response, prefs, done) {
    let output = {};
    try {
      let options = {};
      try { const saved = prefs && prefs.valueForKey('weibo.cleaner.settings'); if (saved) options = JSON.parse(saved); } catch (_) { /* invalid preferences use defaults */ }
      const status = response?.statusCode ?? response?.status;
      const numeric = typeof status === 'string' ? Number(status.match(/\b[1-5]\d\d\b/)?.[0]) : status;
      if (numeric !== undefined && numeric !== 200) { done(output); return; }
      const result = transform(request?.url, response?.body, options);
      if (result.changed) output = { body: result.body };
      if (result.error && settings(options).debug) console.log('[Weibo Cleaner] Unrecognized response; original preserved.');
    } catch (_) { /* final fail-open guard */ }
    done(output);
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { VERSION, DEFAULTS, MENU_DEFAULTS, ROUTES, BLOCKS, settings, select, transform, run };
  else run(typeof $request === 'undefined' ? null : $request, typeof $response === 'undefined' ? null : $response, typeof $prefs === 'undefined' ? null : $prefs, $done);
})();
