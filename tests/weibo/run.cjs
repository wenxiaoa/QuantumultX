'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const api = require('../../Weibo/weibo.js');
const fixtures = require('./fixtures.cjs');
for (const [name, url, input, expected, options] of fixtures) {
 const result = api.transform(url, JSON.stringify(input), options);
 assert.equal(result.changed, true, name + ' should transform');
 const output = JSON.parse(result.body.replace(/OK$/, ''));
 assert.deepEqual(output, expected, name);
}
for (const [url, body] of [
 ['https://api.weibo.cn/2/statuses/container_detail','not json'],
 ['https://api.weibo.cn/2/statuses/container_detail','{\n "items": []\n}'],
 ['https://api.weibo.cn/2/statuses/container_detail','{"error_code":1001,"data":"keep"}'],
 ['https://api.weibo.cn/2/statuses/container_detail','{"items":[]}OK'],
]) assert.equal(api.transform(url, body).body, body, 'fail-open: ' + body.slice(0,20));
assert.equal(api.select('https://api.weibo.cn/2/statuses/container_timeline_topic'), 'topicMain');
assert.equal(api.select('https://weibointl.api.weibo.cn/portal.php?x=1&a=get_coopen_ads'), 'intlOpen');
assert.equal(api.select('https://example.com/ad'), null);
assert.equal(api.transform('https://api.weibo.cn/2/statuses/container_detail','{"items":[]}',{enabled:false}).changed,false);
const conf=fs.readFileSync(path.join(__dirname,'../../WeiboAds.conf'),'utf8');
for (const {pattern,handler} of api.ROUTES) if(handler!=='international') assert(conf.includes(pattern+' url script-response-body '),'missing route '+pattern);
for (const {pattern,action} of api.BLOCKS) assert(conf.includes(pattern+' url '+action),'missing block '+pattern);
console.log(`Passed ${fixtures.length} response fixtures, 4 fail-open cases, dispatch and subscription generation checks.`);
