'use strict';
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const api = require('../Weibo/weibo.js');
const base = 'https://raw.githubusercontent.com/wenxiaoa/QuantumultX/master';
const release = `Weibo/releases/v${api.VERSION}.js`;
fs.mkdirSync(path.join(root, 'Weibo/releases'), { recursive: true });
fs.writeFileSync(path.join(root, release), fs.readFileSync(path.join(root, 'Weibo/weibo.js')));
const header = [
  '# 微博净化 · wenxiaoa',
  `# Version: ${api.VERSION}`,
  '# 国内版 + 国际版；默认保留原版强力净化范围。',
  '# 文档: https://github.com/wenxiaoa/QuantumultX/tree/master/Weibo',
  '# 引用接口研究: ddgksf2013 / zmqcherish，详见 Weibo/README.md。',
  '# 启用重写和 MITM，安装并信任自己的证书；关闭 QX 兼容性增强。',
  '# 请停用其他微博重写，避免同一响应被多次处理。',
  '# 配套分流订阅: ' + base + '/Weibo/WeiboAds.list',
  '# 在重写资源中添加本文件，无需资源解析器。',
  '',
  'hostname = api.weibo.*, *.api.weibo.*, mapi.weibo.*, *.uve.weibo.com, new.vip.weibo.cn, boot.biz.weibo.com',
  '',
];
for (const item of api.BLOCKS) header.push('# ' + item.id, item.pattern + ' url ' + item.action);
for (const item of api.ROUTES) header.push('# ' + item.id, item.pattern + ' url script-response-body ' + base + '/' + release);
fs.writeFileSync(path.join(root, 'WeiboAds.conf'), header.join('\n') + '\n');
fs.writeFileSync(path.join(root, 'Weibo/WeiboAds.list'), [
  '# 微博净化配套分流；在 filter_remote 中引用，不要使用 force-policy 覆盖策略。',
  '# sdkapp 直连仅决定连接路线，具体广告路径仍由重写处理。',
  'host, sdkapp.uve.weibo.com, direct',
  'host, adstrategy.biz.weibo.com, reject',
  'host-suffix, api.touch-moblie.com, reject',
  '',
].join('\n'));
console.log(`Built ${api.BLOCKS.length} blocking rules, ${api.ROUTES.length} script routes, ${release}`);
