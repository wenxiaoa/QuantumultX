# 微博净化（Quantumult X）

独立订阅配置，处理微博国内版与国际版广告、推荐卡片、搜索、个人页、详情、评论区、视频、开屏等接口。功能参考 ddgksf2013/zmqcherish 的公开配置，代码重新组织。

## 订阅

在 QX 添加重写资源：

`https://raw.githubusercontent.com/wenxiaoa/QuantumultX/master/WeiboAds.conf`

配套分流（可选但建议添加到 `[filter_remote]`）：

`https://raw.githubusercontent.com/wenxiaoa/QuantumultX/master/Weibo/WeiboAds.list`

脚本固定版本：`https://raw.githubusercontent.com/wenxiaoa/QuantumultX/master/Weibo/releases/v1.0.0.js`
源码：`https://raw.githubusercontent.com/wenxiaoa/QuantumultX/master/Weibo/weibo.js`

启用 QX 重写与 MITM，安装并信任证书，关闭“兼容性增强”。在 QX 的分流模式使用时，订阅分流文件；`sdkapp.uve.weibo.com` 直连仅指定连接策略，匹配的广告 API 路径仍由重写处理。避免与其他微博改写重复启用。

## 功能和设置

默认兼容原配置实际脚本的强力净化范围。详情、评论区、搜索推荐、个人页、国际版热搜等都有独立开关。通过 QX 脚本设置写入 `$prefs` 键 `weibo.cleaner.settings`，JSON 布尔字段沿用原脚本字段名；例如 `{"removeRelateItem":false,"simplifySearch":false}`。未设置时使用默认值。

支持字段包括：`enabled`、`debug`、`removeHomeVip`、`removeHomeCreatorTask`、`removeRelate`、`removeGood`、`removeFollow`、`modifyMenus`、`removeRelateItem`、`removeRecommendItem`、`removeRewardItem`、`removeLiveMedia`、`removeNextVideo`、`removePinedTrending`、`removeInterestFriendInTopic`、`removeInterestTopic`、`removeInterestUser`、`removeLvZhou`、`removeSearchWindow`、`simplifySearch`、`simplifyProfile`、`removeNoticeTips`、`removeVideoLimit`、`removeCommonStruct`、`removeHomeExtend`、`removeSidebarCards`、`removeUnfollowTopic`、`removeUnusedPart`、`skinPreview`。`menus` 可按菜单类型单独设布尔值；`blockIds` 可填用户数字 ID 字符串数组。

只有明确广告标记会被当作信息流广告。搜索精简、推荐移除、皮肤预览等会改变非广告界面内容，均可单独关闭。原实现中实际生效的评论相关推荐删除默认保留为开启，并提供可靠开关。视频续播删除默认关闭。

## 故障安全与隐私

响应无法解析、结构未知、非成功 API 响应时原样返回；不记录响应正文、账号信息或 URL 参数，不发起额外网络请求。脚本仅在明确白名单端点处理响应。固定版本文件用于稳定订阅；更新时检查新版本和变更记录。

## 验证边界

测试覆盖脚本分派、代表性响应结构、开关、异常原文回退和规则生成。尚未在真实 QX 与当前微博客户端实机验证；微博接口变更可能影响效果。

## 来源与致谢

规则研究参考 https://github.com/ddgksf2013/Rewrite/blob/master/AdBlock/WeiboAds.conf 及其引用脚本。原作者为 ddgksf2013、zmqcherish 等；本仓库的重写实现是独立实现，保留来源说明。
