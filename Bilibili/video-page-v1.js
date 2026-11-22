/* Bundled dependency: fflate 0.8.2 (gunzipSync).
MIT License

Copyright (c) 2023 Arjun Barrett

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
var BiliGzip=(()=>{var k=Object.defineProperty;var yr=Object.getOwnPropertyDescriptor;var wr=Object.getOwnPropertyNames;var mr=Object.prototype.hasOwnProperty;var xr=(r,n)=>{for(var t in n)k(r,t,{get:n[t],enumerable:!0})},zr=(r,n,t,a)=>{if(n&&typeof n=="object"||typeof n=="function")for(let e of wr(n))!mr.call(r,e)&&e!==t&&k(r,e,{get:()=>n[e],enumerable:!(a=yr(n,e))||a.enumerable});return r};var Ar=r=>zr(k({},"__esModule",{value:!0}),r);var Pr={};xr(Pr,{gunzipSync:()=>ur});var f=Uint8Array,S=Uint16Array,Mr=Int32Array,er=new f([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),ir=new f([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Sr=new f([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),ar=function(r,n){for(var t=new S(31),a=0;a<31;++a)t[a]=n+=1<<r[a-1];for(var e=new Mr(t[30]),a=1;a<30;++a)for(var c=t[a];c<t[a+1];++c)e[c]=c-t[a]<<5|a;return{b:t,r:e}},or=ar(er,2),sr=or.b,Ur=or.r;sr[28]=258,Ur[258]=28;var fr=ar(ir,0),Fr=fr.b,Hr=fr.r,j=new S(32768);for(o=0;o<32768;++o)g=(o&43690)>>1|(o&21845)<<1,g=(g&52428)>>2|(g&13107)<<2,g=(g&61680)>>4|(g&3855)<<4,j[o]=((g&65280)>>8|(g&255)<<8)>>1;var g,o,I=(function(r,n,t){for(var a=r.length,e=0,c=new S(n);e<a;++e)r[e]&&++c[r[e]-1];var y=new S(n);for(e=1;e<n;++e)y[e]=y[e-1]+c[e-1]<<1;var p;if(t){p=new S(1<<n);var z=15-n;for(e=0;e<a;++e)if(r[e])for(var U=e<<4|r[e],w=n-r[e],i=y[r[e]-1]++<<w,s=i|(1<<w)-1;i<=s;++i)p[j[i]>>z]=U}else for(p=new S(a),e=0;e<a;++e)r[e]&&(p[e]=j[y[r[e]-1]++]>>15-r[e]);return p}),Z=new f(288);for(o=0;o<144;++o)Z[o]=8;var o;for(o=144;o<256;++o)Z[o]=9;var o;for(o=256;o<280;++o)Z[o]=7;var o;for(o=280;o<288;++o)Z[o]=8;var o,hr=new f(32);for(o=0;o<32;++o)hr[o]=5;var o;var Dr=I(Z,9,1);var Tr=I(hr,5,1),W=function(r){for(var n=r[0],t=1;t<r.length;++t)r[t]>n&&(n=r[t]);return n},u=function(r,n,t){var a=n/8|0;return(r[a]|r[a+1]<<8)>>(n&7)&t},Y=function(r,n){var t=n/8|0;return(r[t]|r[t+1]<<8|r[t+2]<<16)>>(n&7)},Cr=function(r){return(r+7)/8|0},Ir=function(r,n,t){return(n==null||n<0)&&(n=0),(t==null||t>r.length)&&(t=r.length),new f(r.subarray(n,t))};var Zr=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],l=function(r,n,t){var a=new Error(n||Zr[r]);if(a.code=r,Error.captureStackTrace&&Error.captureStackTrace(a,l),!t)throw a;return a},Br=function(r,n,t,a){var e=r.length,c=a?a.length:0;if(!e||n.f&&!n.l)return t||new f(0);var y=!t,p=y||n.i!=2,z=n.i;y&&(t=new f(e*3));var U=function(rr){var nr=t.length;if(rr>nr){var tr=new f(Math.max(nr*2,rr));tr.set(t),t=tr}},w=n.f||0,i=n.p||0,s=n.b||0,x=n.l,B=n.d,F=n.m,D=n.n,G=e*8;do{if(!x){w=u(r,i,1);var O=u(r,i+1,3);if(i+=3,O)if(O==1)x=Dr,B=Tr,F=9,D=5;else if(O==2){var P=u(r,i,31)+257,J=u(r,i+10,15)+4,K=P+u(r,i+5,31)+1;i+=14;for(var T=new f(K),$=new f(19),h=0;h<J;++h)$[Sr[h]]=u(r,i+h*3,7);i+=J*3;for(var Q=W($),lr=(1<<Q)-1,vr=I($,Q,1),h=0;h<K;){var V=vr[u(r,i,lr)];i+=V&15;var v=V>>4;if(v<16)T[h++]=v;else{var A=0,E=0;for(v==16?(E=3+u(r,i,3),i+=2,A=T[h-1]):v==17?(E=3+u(r,i,7),i+=3):v==18&&(E=11+u(r,i,127),i+=7);E--;)T[h++]=A}}var X=T.subarray(0,P),m=T.subarray(P);F=W(X),D=W(m),x=I(X,F,1),B=I(m,D,1)}else l(1);else{var v=Cr(i)+4,q=r[v-4]|r[v-3]<<8,L=v+q;if(L>e){z&&l(0);break}p&&U(s+q),t.set(r.subarray(v,L),s),n.b=s+=q,n.p=i=L*8,n.f=w;continue}if(i>G){z&&l(0);break}}p&&U(s+131072);for(var cr=(1<<F)-1,pr=(1<<D)-1,H=i;;H=i){var A=x[Y(r,i)&cr],M=A>>4;if(i+=A&15,i>G){z&&l(0);break}if(A||l(2),M<256)t[s++]=M;else if(M==256){H=i,x=null;break}else{var d=M-254;if(M>264){var h=M-257,C=er[h];d=u(r,i,(1<<C)-1)+sr[h],i+=C}var N=B[Y(r,i)&pr],R=N>>4;N||l(3),i+=N&15;var m=Fr[R];if(R>3){var C=ir[R];m+=Y(r,i)&(1<<C)-1,i+=C}if(i>G){z&&l(0);break}p&&U(s+131072);var b=s+d;if(s<m){var _=c-m,gr=Math.min(m,b);for(_+s<0&&l(3);s<gr;++s)t[s]=a[_+s]}for(;s<b;++s)t[s]=t[s-m]}}n.l=x,n.p=H,n.b=s,n.f=w,x&&(w=1,n.m=F,n.d=B,n.n=D)}while(!w);return s!=t.length&&y?Ir(t,0,s):t.subarray(0,s)};var Er=new f(0);var Gr=function(r){(r[0]!=31||r[1]!=139||r[2]!=8)&&l(6,"invalid gzip data");var n=r[3],t=10;n&4&&(t+=(r[10]|r[11]<<8)+2);for(var a=(n>>3&1)+(n>>4&1);a>0;a-=!r[t++]);return t+(n&2)},Or=function(r){var n=r.length;return(r[n-4]|r[n-3]<<8|r[n-2]<<16|r[n-1]<<24)>>>0};function ur(r,n){var t=Gr(r);return t+8>r.length&&l(6,"invalid gzip data"),Br(r.subarray(t,-8),{i:2},n&&n.out||new f(Or(r)),n&&n.dictionary)}var qr=typeof TextDecoder!="undefined"&&new TextDecoder,Lr=0;try{qr.decode(Er,{stream:!0}),Lr=1}catch(r){}return Ar(Pr);})();

(() => {
// Quantumult X response handler for Bilibili video pages.
// Wire field numbers: @biliverse/protobuf 1.1.0, bilibili/app/{view,viewunite,playerunite}.
// Only descend into the selected message paths. Preserve unrecognized fields and the reply tab.
const { gunzipSync } = BiliGzip;

const drop = null;
const limit = 4 * 1024 * 1024;
const method = $request.url.split("?")[0].split("/").pop();
const unified = $request.url.includes(".viewunite.");
const route = $request.url.split("?")[0];

function join(parts) {
  const out = new Uint8Array(parts.reduce((sum, p) => sum + p.length, 0));
  let pos = 0;
  for (const p of parts) { out.set(p, pos); pos += p.length; }
  return out;
}

function prefix(n) {
  const result = [];
  while (n >= 128) { result.push(128 + n % 128); n = Math.floor(n / 128); }
  return Uint8Array.from([...result, n]);
}

function* fields(bytes) {
  let pos = 0;
  function integer() {
    let n = 0;
    for (let i = 0; i < 10 && pos < bytes.length; i++) {
      const byte = bytes[pos++];
      if (i === 9 && byte > 1) break;
      n += (byte & 127) * 128 ** i;
      if (byte < 128) return n;
    }
    throw Error("Invalid varint");
  }
  while (pos < bytes.length) {
    const start = pos, tag = integer(), keyEnd = pos;
    if (!Number.isSafeInteger(tag) || tag < 8 || tag > 0xffffffff) throw Error("Invalid tag");
    const id = Math.floor(tag / 8), wire = tag % 8;
    let data, value;
    if (wire === 2) {
      const length = integer(), begin = pos;
      pos += length;
      data = bytes.subarray(begin, pos);
    } else if (wire === 0) value = integer();
    else if (wire === 1 || wire === 5) pos += wire === 1 ? 8 : 4;
    else throw Error("Unsupported wire type");
    if (pos > bytes.length) throw Error("Truncated message");
    yield {id, data, value, raw:bytes.subarray(start,pos), key:bytes.subarray(start,keyEnd)};
  }
}

// undefined means keep the original field; null means remove just this field.
function edit(bytes, rules) {
  let parts, boundary = 0;
  for (const f of fields(bytes)) {
    if (!f.data || !Object.prototype.hasOwnProperty.call(rules, f.id)) continue;
    const action = rules[f.id];
    const next = action === drop ? drop : action(f.data);
    if (next === undefined) continue;
    if (!parts) parts = [];
    const start = f.raw.byteOffset - bytes.byteOffset;
    parts.push(bytes.subarray(boundary, start));
    if (next !== drop) parts.push(f.key, prefix(next.length), next);
    boundary = start + f.raw.length;
  }
  if (parts) { parts.push(bytes.subarray(boundary)); return join(parts); }
}
const nested = rules => bytes => edit(bytes, rules);
const any = (bytes, predicate) => { for (const f of fields(bytes)) if (predicate(f)) return true; return false; };
const eqText = (bytes, text) => bytes && bytes.length === text.length &&
  bytes.every((c, i) => c === text.charCodeAt(i));

// Some commercial entries in a video-shaped card carry the ad protocol's Any type URL.
// Only inspect individual recommendation cards. Match a protobuf Any.type_url field.
const typePrefix = "type.googleapis.com/bilibili.ad.v1.";
function hasCommercialType(bytes) {
  for (let i = bytes.indexOf(116); i >= 0 && i + typePrefix.length <= bytes.length; i = bytes.indexOf(116, i+1)) {
    const length = bytes[i-1]; // Current Any type URLs use a one-byte length prefix.
    if (i >= 2 && bytes[i-2] === 10 && length > typePrefix.length && length < 128 &&
        i + length <= bytes.length && eqText(bytes.subarray(i, i + typePrefix.length), typePrefix)) return true;
  }
  return false;
}
function isPromotionInfo(field) {
  if (!field.data) return false;
  if (field.id === 6) return field.data.length > 0; // basic_info.unique_id, upstream promotion marker
  if (field.id !== 4 || field.data.length > 4096) return false;
  const uri = String.fromCharCode(...field.data);
  return /^(?:https?:\/\/cm\.bilibili\.com\/(?:ad|cm|fly-h5)\b|bilibili:\/\/ad(?:view)?\/)/i.test(uri);
}
function unifiedCard(bytes) {
  const marked = any(bytes, f => (f.id === 1 && [4,5,11].includes(f.value)) ||
    ((f.id === 6 || f.id === 11) && f.data !== undefined) ||
    (f.id === 12 && f.data && any(f.data, isPromotionInfo)));
  if (marked || hasCommercialType(bytes)) return drop;
}
function legacyCard(bytes) {
  const marked = any(bytes, f => (f.id === 28 && f.data !== undefined) ||
    (f.id === 32 && f.data && f.data.length > 0) ||
    (f.id === 7 && (eqText(f.data, "cm") || eqText(f.data, "game"))));
  if (marked || hasCommercialType(bytes)) return drop;
}
function moduleEntry(bytes) {
  if (any(bytes, f => f.id === 1 && [18,29,55].includes(f.value))) return drop;
  return edit(bytes, {22: nested({1: unifiedCard})});
}
const legacyView = {10: legacyCard, 30: drop, 31: drop, 41: drop, 48: drop,
  32: bytes => any(bytes, f => (f.id === 2 && f.value === 3) || (f.id === 11 && f.data?.length)) ? drop : undefined};
const unifiedView = {7: drop, 5: nested({1: nested({2: nested({2: moduleEntry})})})};
const asyncFeed = {1: drop, 2: nested({1: moduleEntry})};
const player = {9: nested({2: drop}), 10: nested({1: bytes =>
  any(bytes, f => f.id === 1 && f.data && any(f.data, x => x.id === 3 && x.value === 1)) ? drop : undefined})};

function protobuf(bytes) {
  switch (method) {
    case "View": return edit(bytes, unified ? unifiedView : legacyView);
    case "AIRelateAsync": return edit(bytes, asyncFeed);
    case "RelatesFeed": return edit(bytes, {1: unified ? unifiedCard : legacyCard});
    case "ContinuousPlay": case "PlayerRelates": return edit(bytes, {1: legacyCard});
    case "TFInfo": return any(bytes, f => f.id === 1 && f.value > 0) ? edit(bytes, {2: drop, 3: drop}) : undefined;
    case "PlayViewUnite": return edit(bytes, player);
    case "ViewProgress": return edit(bytes, unified ? {1:nested({1:drop})} : {1:drop});
    case "PlayPause": case "ViewEndPage": return bytes.length ? new Uint8Array() : undefined;
  }
}

function isAd(card) {
  if (!card || typeof card !== "object") return false;
  const markers = [card.card_goto, card.goto, card.card_type];
  return card.is_ad === true || card.is_ad === 1 || card.is_ad === "1" ||
    markers.some(s => typeof s === "string" && /^(?:cm(?:_|$)|ad(?:_|$)|vertical_ad(?:_|$))|_ad(?:_|$)/i.test(s)) ||
    !!(card.ad_info && typeof card.ad_info === "object" && Object.keys(card.ad_info).length);
}
// Older JavaScriptCore versions round 64-bit JSON IDs. Quote wide number tokens
// during filtering and restore their original spelling, including pagination cursors.
const numberTag = "\u0000qx-number:";
const tokens = /"(?:[^"\\]|\\.)*"|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g;
function filterJson() {
  const text = $response.body;
  if (typeof text !== "string" || text.length > limit) return {};
  const hasWideNumbers = /\d{16}|[eE][+-]?\d{3}/.test(text);
  if (hasWideNumbers && /\\u0000/i.test(text)) return {};
  const safeText = hasWideNumbers ? text.replace(tokens, token =>
    token[0] !== '"' && (token.length >= 16 || /e/i.test(token)) ? JSON.stringify(numberTag + token) : token) : text;
  const doc = JSON.parse(safeText), data = doc?.data;
  if (!data || doc.code !== undefined && doc.code !== 0) return {};
  let changed = false;
  function filter(obj, key) {
    if (!Array.isArray(obj?.[key])) return;
    const kept = obj[key].filter(card => !isAd(card));
    if (kept.length !== obj[key].length) { obj[key] = kept; changed = true; }
  }
  if (Array.isArray(data)) filter(doc,"data");
  else {
    for (const key of ["relates","related","Related","items","list"]) filter(data,key);
    for (const k of ["cm_under_player","cm_config","cm_ipad","cms"]) {
      if (data[k] != null) { delete data[k]; changed = true; }
    }
  }
  if (!changed) return {};
  let body = JSON.stringify(doc);
  if (hasWideNumbers) body = body.replace(tokens, token =>
    token.startsWith('"\\u0000qx-number:') ? token.slice('"\\u0000qx-number:'.length, -1) : token);
  return {body};
}

function processResponse() {
  const headers = Object.fromEntries(Object.entries($response.headers || {}).map(([k,v])=>[k.toLowerCase(),v]));
  if (($response.statusCode && Number($response.statusCode) !== 200) ||
      (headers["grpc-status"] != null && String(headers["grpc-status"]) !== "0")) return {};
  if (route.includes("/x/")) return filterJson();
  if (!$response.bodyBytes) return {};
  const original = new Uint8Array($response.bodyBytes);
  if (original.length === 0 || original.length > limit) return {};
  const mime = String(headers["content-type"] || "").toLowerCase();
  const framed = original.length >= 5 && original[0] <= 1 &&
    new DataView(original.buffer, original.byteOffset).getUint32(1) === original.length - 5;
  if (!framed && !/application\/(?:x-protobuf|protobuf|vnd\.google\.protobuf)/.test(mime)) return {};
  let body = framed ? original.subarray(5) : original;
  if (framed && original[0] === 1) {
    if (body.length < 18 || body[0] !== 31 || body[1] !== 139) return {};
    const expected = new DataView(body.buffer, body.byteOffset).getUint32(body.length-4, true);
    if (expected > limit) return {};
    body = gunzipSync(body, {out:new Uint8Array(expected)});
    if (body.length !== expected) return {};
  }
  const changed = protobuf(body);
  const requestHeaders = Object.fromEntries(Object.entries($request.headers || {}).map(([k,v])=>[k.toLowerCase(),v]));
  const ua = requestHeaders["user-agent"] || "";
  const needsStatus = framed && headers["grpc-status"] == null &&
    (/bili-blue\//.test(ua) || (/bili-(?:universal|hd2|overseas)\//.test(ua) && String(requestHeaders["x-bili-moss-engine-type"]) === "1"));
  const removeStatus = framed && /bili-inter\//.test(ua) && String(headers["grpc-status"]) === "0";
  const result = {};
  if (needsStatus) result.headers = {...$response.headers, "grpc-status":"0"};
  if (removeStatus) result.headers = Object.fromEntries(Object.entries($response.headers)
    .filter(([key]) => key.toLowerCase() !== "grpc-status"));
  if (changed === undefined) return result.headers ? {...result,bodyBytes:$response.bodyBytes} : {};
  if (!framed) return {bodyBytes:changed.buffer};
  const out = new Uint8Array(5 + changed.length);
  new DataView(out.buffer).setUint32(1, changed.length);
  out.set(changed, 5);
  return {...result,bodyBytes:out.buffer};
}
let result = {};
try { result = processResponse(); } catch (_) { /* Leave an unfamiliar or incomplete response intact. */ }
$done(result);

})();
