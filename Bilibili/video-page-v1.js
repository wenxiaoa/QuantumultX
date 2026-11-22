/* Bundled dependency: fflate 0.8.2 (gzip).
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
var BiliGzip=(()=>{var lr=Object.defineProperty;var Or=Object.getOwnPropertyDescriptor;var qr=Object.getOwnPropertyNames;var Lr=Object.prototype.hasOwnProperty;var Pr=(r,n)=>{for(var t in n)lr(r,t,{get:n[t],enumerable:!0})},$r=(r,n,t,e)=>{if(n&&typeof n=="object"||typeof n=="function")for(let i of qr(n))!Lr.call(r,i)&&i!==t&&lr(r,i,{get:()=>n[i],enumerable:!(e=Or(n,i))||e.enumerable});return r};var Hr=r=>$r(lr({},"__esModule",{value:!0}),r);var an={};Pr(an,{gunzipSync:()=>Gr,gzipSync:()=>Er});var D=Uint8Array,H=Uint16Array,zr=Int32Array,fr=new D([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),hr=new D([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),gr=new D([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Fr=function(r,n){for(var t=new H(31),e=0;e<31;++e)t[e]=n+=1<<r[e-1];for(var i=new zr(t[30]),e=1;e<30;++e)for(var a=t[e];a<t[e+1];++a)i[a]=a-t[e]<<5|e;return{b:t,r:i}},Dr=Fr(fr,2),Tr=Dr.b,yr=Dr.r;Tr[28]=258,yr[258]=28;var Cr=Fr(hr,0),Nr=Cr.b,Mr=Cr.r,wr=new H(32768);for(l=0;l<32768;++l)K=(l&43690)>>1|(l&21845)<<1,K=(K&52428)>>2|(K&13107)<<2,K=(K&61680)>>4|(K&3855)<<4,wr[l]=((K&65280)>>8|(K&255)<<8)>>1;var K,l,j=(function(r,n,t){for(var e=r.length,i=0,a=new H(n);i<e;++i)r[i]&&++a[r[i]-1];var h=new H(n);for(i=1;i<n;++i)h[i]=h[i-1]+a[i-1]<<1;var c;if(t){c=new H(1<<n);var p=15-n;for(i=0;i<e;++i)if(r[i])for(var x=i<<4|r[i],o=n-r[i],s=h[r[i]-1]++<<o,u=s|(1<<o)-1;s<=u;++s)c[wr[s]>>p]=x}else for(c=new H(e),i=0;i<e;++i)r[i]&&(c[i]=wr[h[r[i]-1]++]>>15-r[i]);return c}),X=new D(288);for(l=0;l<144;++l)X[l]=8;var l;for(l=144;l<256;++l)X[l]=9;var l;for(l=256;l<280;++l)X[l]=7;var l;for(l=280;l<288;++l)X[l]=8;var l,ar=new D(32);for(l=0;l<32;++l)ar[l]=5;var l,Rr=j(X,9,0),kr=j(X,9,1),Wr=j(ar,5,0),Yr=j(ar,5,1),vr=function(r){for(var n=r[0],t=1;t<r.length;++t)r[t]>n&&(n=r[t]);return n},k=function(r,n,t){var e=n/8|0;return(r[e]|r[e+1]<<8)>>(n&7)&t},cr=function(r,n){var t=n/8|0;return(r[t]|r[t+1]<<8|r[t+2]<<16)>>(n&7)},Ar=function(r){return(r+7)/8|0},Ir=function(r,n,t){return(n==null||n<0)&&(n=0),(t==null||t>r.length)&&(t=r.length),new D(r.subarray(n,t))};var jr=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],W=function(r,n,t){var e=new Error(n||jr[r]);if(e.code=r,Error.captureStackTrace&&Error.captureStackTrace(e,W),!t)throw e;return e},Jr=function(r,n,t,e){var i=r.length,a=e?e.length:0;if(!i||n.f&&!n.l)return t||new D(0);var h=!t,c=h||n.i!=2,p=n.i;h&&(t=new D(i*3));var x=function(nr){var tr=t.length;if(nr>tr){var _=new D(Math.max(tr*2,nr));_.set(t),t=_}},o=n.f||0,s=n.p||0,u=n.b||0,g=n.l,T=n.d,y=n.m,E=n.n,R=i*8;do{if(!g){o=k(r,s,1);var q=k(r,s+1,3);if(s+=3,q)if(q==1)g=kr,T=Yr,y=9,E=5;else if(q==2){var B=k(r,s,31)+257,M=k(r,s+10,15)+4,v=B+k(r,s+5,31)+1;s+=14;for(var f=new D(v),S=new D(19),z=0;z<M;++z)S[gr[z]]=k(r,s+z*3,7);s+=M*3;for(var I=vr(S),V=(1<<I)-1,L=j(S,I,1),z=0;z<v;){var G=L[k(r,s,V)];s+=G&15;var A=G>>4;if(A<16)f[z++]=A;else{var U=0,w=0;for(A==16?(w=3+k(r,s,3),s+=2,U=f[z-1]):A==17?(w=3+k(r,s,7),s+=3):A==18&&(w=11+k(r,s,127),s+=7);w--;)f[z++]=U}}var O=f.subarray(0,B),F=f.subarray(B);y=vr(O),E=vr(F),g=j(O,y,1),T=j(F,E,1)}else W(1);else{var A=Ar(s)+4,Z=r[A-4]|r[A-3]<<8,C=A+Z;if(C>i){p&&W(0);break}c&&x(u+Z),t.set(r.subarray(A,C),u),n.b=u+=Z,n.p=s=C*8,n.f=o;continue}if(s>R){p&&W(0);break}}c&&x(u+131072);for(var rr=(1<<y)-1,N=(1<<E)-1,J=s;;J=s){var U=g[cr(r,s)&rr],P=U>>4;if(s+=U&15,s>R){p&&W(0);break}if(U||W(2),P<256)t[u++]=P;else if(P==256){J=s,g=null;break}else{var $=P-254;if(P>264){var z=P-257,m=fr[z];$=k(r,s,(1<<m)-1)+Tr[z],s+=m}var Y=T[cr(r,s)&N],d=Y>>4;Y||W(3),s+=Y&15;var F=Nr[d];if(d>3){var m=hr[d];F+=cr(r,s)&(1<<m)-1,s+=m}if(s>R){p&&W(0);break}c&&x(u+131072);var b=u+$;if(u<F){var or=a-F,sr=Math.min(F,b);for(or+u<0&&W(3);u<sr;++u)t[u]=e[or+u]}for(;u<b;++u)t[u]=t[u-F]}}n.l=g,n.p=J,n.b=u,n.f=o,g&&(o=1,n.m=y,n.d=T,n.n=E)}while(!o);return u!=t.length&&h?Ir(t,0,u):t.subarray(0,u)},Q=function(r,n,t){t<<=n&7;var e=n/8|0;r[e]|=t,r[e+1]|=t>>8},er=function(r,n,t){t<<=n&7;var e=n/8|0;r[e]|=t,r[e+1]|=t>>8,r[e+2]|=t>>16},pr=function(r,n){for(var t=[],e=0;e<r.length;++e)r[e]&&t.push({s:e,f:r[e]});var i=t.length,a=t.slice();if(!i)return{t:Br,l:0};if(i==1){var h=new D(t[0].s+1);return h[t[0].s]=1,{t:h,l:1}}t.sort(function(C,B){return C.f-B.f}),t.push({s:-1,f:25001});var c=t[0],p=t[1],x=0,o=1,s=2;for(t[0]={s:-1,f:c.f+p.f,l:c,r:p};o!=i-1;)c=t[t[x].f<t[s].f?x++:s++],p=t[x!=o&&t[x].f<t[s].f?x++:s++],t[o++]={s:-1,f:c.f+p.f,l:c,r:p};for(var u=a[0].s,e=1;e<i;++e)a[e].s>u&&(u=a[e].s);var g=new H(u+1),T=mr(t[o-1],g,0);if(T>n){var e=0,y=0,E=T-n,R=1<<E;for(a.sort(function(B,M){return g[M.s]-g[B.s]||B.f-M.f});e<i;++e){var q=a[e].s;if(g[q]>n)y+=R-(1<<T-g[q]),g[q]=n;else break}for(y>>=E;y>0;){var A=a[e].s;g[A]<n?y-=1<<n-g[A]++-1:++e}for(;e>=0&&y;--e){var Z=a[e].s;g[Z]==n&&(--g[Z],++y)}T=n}return{t:new D(g),l:T}},mr=function(r,n,t){return r.s==-1?Math.max(mr(r.l,n,t+1),mr(r.r,n,t+1)):n[r.s]=t},Sr=function(r){for(var n=r.length;n&&!r[--n];);for(var t=new H(++n),e=0,i=r[0],a=1,h=function(p){t[e++]=p},c=1;c<=n;++c)if(r[c]==i&&c!=n)++a;else{if(!i&&a>2){for(;a>138;a-=138)h(32754);a>2&&(h(a>10?a-11<<5|28690:a-3<<5|12305),a=0)}else if(a>3){for(h(i),--a;a>6;a-=6)h(8304);a>2&&(h(a-3<<5|8208),a=0)}for(;a--;)h(i);a=1,i=r[c]}return{c:t.subarray(0,e),n}},ir=function(r,n){for(var t=0,e=0;e<n.length;++e)t+=r[e]*n[e];return t},Zr=function(r,n,t){var e=t.length,i=Ar(n+2);r[i]=e&255,r[i+1]=e>>8,r[i+2]=r[i]^255,r[i+3]=r[i+1]^255;for(var a=0;a<e;++a)r[i+a+4]=t[a];return(i+4+e)*8},Ur=function(r,n,t,e,i,a,h,c,p,x,o){Q(n,o++,t),++i[256];for(var s=pr(i,15),u=s.t,g=s.l,T=pr(a,15),y=T.t,E=T.l,R=Sr(u),q=R.c,A=R.n,Z=Sr(y),C=Z.c,B=Z.n,M=new H(19),v=0;v<q.length;++v)++M[q[v]&31];for(var v=0;v<C.length;++v)++M[C[v]&31];for(var f=pr(M,7),S=f.t,z=f.l,I=19;I>4&&!S[gr[I-1]];--I);var V=x+5<<3,L=ir(i,X)+ir(a,ar)+h,G=ir(i,u)+ir(a,y)+h+14+3*I+ir(M,S)+2*M[16]+3*M[17]+7*M[18];if(p>=0&&V<=L&&V<=G)return Zr(n,o,r.subarray(p,p+x));var U,w,O,F;if(Q(n,o,1+(G<L)),o+=2,G<L){U=j(u,g,0),w=u,O=j(y,E,0),F=y;var rr=j(S,z,0);Q(n,o,A-257),Q(n,o+5,B-1),Q(n,o+10,I-4),o+=14;for(var v=0;v<I;++v)Q(n,o+3*v,S[gr[v]]);o+=3*I;for(var N=[q,C],J=0;J<2;++J)for(var P=N[J],v=0;v<P.length;++v){var $=P[v]&31;Q(n,o,rr[$]),o+=S[$],$>15&&(Q(n,o,P[v]>>5&127),o+=P[v]>>12)}}else U=Rr,w=X,O=Wr,F=ar;for(var v=0;v<c;++v){var m=e[v];if(m>255){var $=m>>18&31;er(n,o,U[$+257]),o+=w[$+257],$>7&&(Q(n,o,m>>23&31),o+=fr[$]);var Y=m&31;er(n,o,O[Y]),o+=F[Y],Y>3&&(er(n,o,m>>5&8191),o+=hr[Y])}else er(n,o,U[m]),o+=w[m]}return er(n,o,U[256]),o+w[256]},Kr=new zr([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Br=new D(0),Qr=function(r,n,t,e,i,a){var h=a.z||r.length,c=new D(e+h+5*(1+Math.ceil(h/7e3))+i),p=c.subarray(e,c.length-i),x=a.l,o=(a.r||0)&7;if(n){o&&(p[0]=a.r>>3);for(var s=Kr[n-1],u=s>>13,g=s&8191,T=(1<<t)-1,y=a.p||new H(32768),E=a.h||new H(T+1),R=Math.ceil(t/3),q=2*R,A=function(ur){return(r[ur]^r[ur+1]<<R^r[ur+2]<<q)&T},Z=new zr(25e3),C=new H(288),B=new H(32),M=0,v=0,f=a.i||0,S=0,z=a.w||0,I=0;f+2<h;++f){var V=A(f),L=f&32767,G=E[V];if(y[L]=G,E[V]=L,z<=f){var U=h-f;if((M>7e3||S>24576)&&(U>423||!x)){o=Ur(r,p,0,Z,C,B,v,S,I,f-I,o),S=M=v=0,I=f;for(var w=0;w<286;++w)C[w]=0;for(var w=0;w<30;++w)B[w]=0}var O=2,F=0,rr=g,N=L-G&32767;if(U>2&&V==A(f-N))for(var J=Math.min(u,U)-1,P=Math.min(32767,f),$=Math.min(258,U);N<=P&&--rr&&L!=G;){if(r[f+O]==r[f+O-N]){for(var m=0;m<$&&r[f+m]==r[f+m-N];++m);if(m>O){if(O=m,F=N,m>J)break;for(var Y=Math.min(N,m-2),d=0,w=0;w<Y;++w){var b=f-N+w&32767,or=y[b],sr=b-or&32767;sr>d&&(d=sr,G=b)}}}L=G,G=y[L],N+=L-G&32767}if(F){Z[S++]=268435456|yr[O]<<18|Mr[F];var nr=yr[O]&31,tr=Mr[F]&31;v+=fr[nr]+hr[tr],++C[257+nr],++B[tr],z=f+O,++M}else Z[S++]=r[f],++C[r[f]]}}for(f=Math.max(f,z);f<h;++f)Z[S++]=r[f],++C[r[f]];o=Ur(r,p,x,Z,C,B,v,S,I,f-I,o),x||(a.r=o&7|p[o/8|0]<<3,o-=7,a.h=E,a.p=y,a.i=f,a.w=z)}else{for(var f=a.w||0;f<h+x;f+=65535){var _=f+65535;_>=h&&(p[o/8|0]=x,_=h),o=Zr(p,o+1,r.subarray(f,_))}a.i=h}return Ir(c,0,e+Ar(o)+i)},Vr=(function(){for(var r=new Int32Array(256),n=0;n<256;++n){for(var t=n,e=9;--e;)t=(t&1&&-306674912)^t>>>1;r[n]=t}return r})(),Xr=function(){var r=-1;return{p:function(n){for(var t=r,e=0;e<n.length;++e)t=Vr[t&255^n[e]]^t>>>8;r=t},d:function(){return~r}}};var dr=function(r,n,t,e,i){if(!i&&(i={l:1},n.dictionary)){var a=n.dictionary.subarray(-32768),h=new D(a.length+r.length);h.set(a),h.set(r,a.length),r=h,i.w=a.length}return Qr(r,n.level==null?6:n.level,n.mem==null?i.l?Math.ceil(Math.max(8,Math.min(13,Math.log(r.length)))*1.5):20:12+n.mem,t,e,i)};var xr=function(r,n,t){for(;t;++n)r[n]=t,t>>>=8},br=function(r,n){var t=n.filename;if(r[0]=31,r[1]=139,r[2]=8,r[8]=n.level<2?4:n.level==9?2:0,r[9]=3,n.mtime!=0&&xr(r,4,Math.floor(new Date(n.mtime||Date.now())/1e3)),t){r[3]=8;for(var e=0;e<=t.length;++e)r[e+10]=t.charCodeAt(e)}},_r=function(r){(r[0]!=31||r[1]!=139||r[2]!=8)&&W(6,"invalid gzip data");var n=r[3],t=10;n&4&&(t+=(r[10]|r[11]<<8)+2);for(var e=(n>>3&1)+(n>>4&1);e>0;e-=!r[t++]);return t+(n&2)},rn=function(r){var n=r.length;return(r[n-4]|r[n-3]<<8|r[n-2]<<16|r[n-1]<<24)>>>0},nn=function(r){return 10+(r.filename?r.filename.length+1:0)};function Er(r,n){n||(n={});var t=Xr(),e=r.length;t.p(r);var i=dr(r,n,nn(n),8),a=i.length;return br(i,n),xr(i,a-8,t.d()),xr(i,a-4,e),i}function Gr(r,n){var t=_r(r);return t+8>r.length&&W(6,"invalid gzip data"),Jr(r.subarray(t,-8),{i:2},n&&n.out||new D(rn(r)),n&&n.dictionary)}var tn=typeof TextDecoder<"u"&&new TextDecoder,en=0;try{tn.decode(Br,{stream:!0}),en=1}catch{}return Hr(an);})();

(() => {
// Quantumult X response handler for Bilibili video pages.
// Wire field numbers: @biliverse/protobuf 1.1.0, bilibili/app/{view,viewunite,playerunite}.
// Only descend into the selected message paths. Preserve unrecognized fields and the reply tab.
const { gunzipSync, gzipSync } = BiliGzip;

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

// gRPC-Web can append a trailer frame to a unary reply. Validate the complete
// envelope before returning any replacement so a malformed tail leaves it intact.
function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function editFrames(bytes, encoding) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const parts = [];
  let offset = 0, decodedSize = 0, changed = false, trailer = false;
  while (offset < bytes.length) {
    if (parts.length >= 64 || offset + 5 > bytes.length) throw Error("Invalid frame header");
    const begin = offset, flag = bytes[offset], length = view.getUint32(offset + 1);
    offset += 5 + length;
    if (offset > bytes.length) throw Error("Invalid frame length");
    const raw = bytes.subarray(begin, offset);
    let payload = raw.subarray(5);
    if (flag === 128) {
      if (offset !== bytes.length || length > 8192) throw Error("Invalid trailers");
      const status = /(?:^|\r?\n)grpc-status:[ \t]*([^\r\n]*)/i.exec(String.fromCharCode(...payload));
      if (status && status[1].trim() !== "0") throw Error("App error");
      trailer = true;
      parts.push(raw);
      continue;
    }
    if (flag !== 0 && flag !== 1) throw Error("Invalid frame flag");
    if (flag === 1) {
      if ((encoding && encoding !== "gzip") || length < 18 || payload[0] !== 31 || payload[1] !== 139) throw Error("Unsupported encoding");
      const size = view.getUint32(offset - 4, true);
      if (size > limit - decodedSize) throw Error("Oversize compressed response");
      payload = gunzipSync(payload, {out:new Uint8Array(size)});
      if (payload.length !== size || crc32(payload) !== view.getUint32(offset - 8, true)) throw Error("Invalid gzip");
    }
    decodedSize += payload.length;
    if (decodedSize > limit) throw Error("Oversize response");
    const edited = protobuf(payload);
    if (edited === undefined) {
      parts.push(raw);
      continue;
    }
    const packed = flag === 1 ? gzipSync(edited, {level:1,mtime:0}) : edited;
    const out = new Uint8Array(5 + packed.length);
    out[0] = flag;
    new DataView(out.buffer).setUint32(1, packed.length);
    out.set(packed, 5);
    parts.push(out);
    changed = true;
  }
  return {bytes:changed ? join(parts) : undefined, trailer};
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
  const rawProto = /^application\/(?:x-protobuf|protobuf|vnd\.google\.protobuf)(?:;|$)/.test(mime);
  const firstLength = original.length >= 5 && new DataView(original.buffer, original.byteOffset).getUint32(1);
  const framed = original.length >= 5 && original[0] <= 1 && firstLength <= original.length - 5;
  if (!framed && !rawProto) throw Error("Unrecognized response format");
  if (!framed) {
    const next = protobuf(original);
    return next === undefined ? {} : {bodyBytes:next.buffer};
  }
  const envelope = editFrames(original, String(headers["grpc-encoding"] || "").toLowerCase());
  const requestHeaders = Object.fromEntries(Object.entries($request.headers || {}).map(([k,v])=>[k.toLowerCase(),v]));
  const ua = requestHeaders["user-agent"] || "";
  const needsStatus = !envelope.trailer && headers["grpc-status"] == null &&
    (/bili-blue\//.test(ua) || (/bili-(?:universal|hd2|overseas)\//.test(ua) && String(requestHeaders["x-bili-moss-engine-type"]) === "1"));
  const removeStatus = !envelope.trailer && /bili-inter\//.test(ua) && String(headers["grpc-status"]) === "0";
  const result = {};
  if (needsStatus) result.headers = {...$response.headers, "grpc-status":"0"};
  if (removeStatus) result.headers = Object.fromEntries(Object.entries($response.headers)
    .filter(([key]) => key.toLowerCase() !== "grpc-status"));
  if (envelope.bytes) result.bodyBytes = envelope.bytes.buffer;
  else if (result.headers) result.bodyBytes = $response.bodyBytes;
  return result;
}
let result = {};
let outcome;
try {
  result = processResponse();
  outcome = result.body || (result.bodyBytes && result.bodyBytes !== $response.bodyBytes) ? "已过滤" : "原样返回";
} catch (_) {
  outcome = "格式或状态不适用，已放行";
}
// Local QX script log, limited to video page methods. No URLs, IDs or request data.
if (["View","RelatesFeed","AIRelateAsync"].includes(method) && typeof console !== "undefined") {
  console.log("[B站播放页] " + method + " " + outcome);
}
$done(result);

})();
