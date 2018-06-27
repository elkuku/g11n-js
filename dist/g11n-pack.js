(function(){g11n={strings:{},stringsPlural:{},debug:"",pluralFunction:"",loadLanguageStrings:function(a){for(let b in a)this.strings[b]=a[b]},loadPluralStrings:function(a){for(let b in a)this.stringsPlural[b]=a[b]},setPluralFunction:function(a){this.pluralFunction=a},translate:function(a,b){if(this.debug)return this.debugTranslate(a,b);let c=phpjs.md5(a);if("undefined"!=typeof this.strings[c]){let a=phpjs.base64_decode(this.strings[c]);return b?phpjs.strtr(a,b):a}return b?phpjs.strtr(a,b):a},debugTranslate:function(a,b){let c,d,e=phpjs.md5(a);if("undefined"!=typeof this.strings[e]){let f=phpjs.base64_decode(this.strings[e]);return c=phpjs.sprintf("Translated:\nO: %s\nT: %s",a,f),d=this.log(c),b&&console.log(b),phpjs.sprintf(d,b?phpjs.strtr(f,b):f)}return d=this.log(phpjs.sprintf("Untranslated:\nO: %s",a),"warn"),b&&console.warn(b),this.log("","trace"),phpjs.sprintf(d,b?phpjs.strtr(a,b):a)},translatePlural:function(a,b,c){if(this.debug)return this.debugTranslatePlural(a,b,c);let d=phpjs.md5(a),e=phpjs.call_user_func(this.pluralFunction,c);return"undefined"!=typeof this.stringsPlural[d]&&"undefined"!=typeof this.stringsPlural[d][e]?phpjs.base64_decode(this.stringsPlural[d][e]):1===c?a:b},debugTranslatePlural:function(a,b,c){let d,e,f=phpjs.md5(a),g=phpjs.call_user_func(this.pluralFunction,c);if("undefined"!=typeof this.stringsPlural[f]&&"undefined"!=typeof this.stringsPlural[f][g])return d=phpjs.sprintf("Translated plural:\nO: %s\nT: %s\nC: %d",a+" / "+b,phpjs.base64_decode(this.stringsPlural[f][g]),c),e=this.log(d),phpjs.sprintf(e,phpjs.base64_decode(this.stringsPlural[f][g]));let h=1===c?a:b;return e=this.log(phpjs.sprintf("Untranslated plural:\nO: %s",h),"warn"),this.log("","trace"),phpjs.sprintf(e,h)},log:function(a,b){let c="%s";switch(b){case"warn":c="\xBF-%s-\xBF",console.warn(a);break;case"trace":console.trace("Trace");break;case void 0:default:c="+-%s-+",console.log(a);}return c}}})();
function g11n3t(a,b){return g11n.translate(a,b)}function g11n4t(a,b,c,d){return g11n.translatePlural(a,b,c,d)}
var phpjs={sprintf:function(){var b=/%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuidfegEG])/g,c=arguments,a=0,d=c[a++],e=function(a,b,c,d){c||(c=" ");var e=a.length>=b?"":Array(1+b-a.length>>>0).join(c);return d?a+e:e+a},f=function(a,b,c,d,f,g){var h=d-a.length;return 0<h&&(c||!f?a=e(a,d,g,c):a=a.slice(0,b.length)+e("",h,"0",!0)+a.slice(b.length)),a},g=function(a,b,c,d,g,h,i){var j=a>>>0;return c=c&&j&&{2:"0b",8:"0",16:"0x"}[b]||"",a=c+e(j.toString(b),h||0,"0",!1),f(a,c,d,g,i)},h=function(a,b,c,d,e,g){return null!=d&&(a=a.slice(0,d)),f(a,"",b,c,e,g)},j=function(b,d,i,k,l,m,n){var o,p,q,r,s,t=Math.abs;if("%%"==b)return"%";for(var u=!1,v="",w=!1,x=!1,y=" ",z=i.length,A=0;i&&A<z;A++)switch(i.charAt(A)){case" ":v=" ";break;case"+":v="+";break;case"-":u=!0;break;case"'":y=i.charAt(A+1);break;case"0":w=!0;break;case"#":x=!0;}if(k=k?"*"==k?+c[a++]:"*"==k.charAt(0)?+c[k.slice(1,-1)]:+k:0,0>k&&(k=-k,u=!0),!isFinite(k))throw new Error("sprintf: (minimum-)width must be finite");return m=m?"*"==m?+c[a++]:"*"==m.charAt(0)?+c[m.slice(1,-1)]:+m:-1<"fFeE".indexOf(n)?6:"d"==n?0:void 0,s=d?c[d.slice(0,-1)]:c[a++],"s"===n?h(s+"",u,k,m,w,y):"c"===n?h(String.fromCharCode(+s),u,k,m,w):"b"===n?g(s,2,x,u,k,m,w):"o"===n?g(s,8,x,u,k,m,w):"x"===n?g(s,16,x,u,k,m,w):"X"===n?g(s,16,x,u,k,m,w).toUpperCase():"u"===n?g(s,10,x,u,k,m,w):"i"===n||"d"===n?(o=parseInt(+s,10),p=0>o?"-":v,s=p+e(t(o)+"",m,"0",!1),f(s,p,u,k,w)):"e"===n||"E"===n||"f"===n||"F"===n||"g"===n||"G"===n?(o=+s,p=0>o?"-":v,q=["toExponential","toFixed","toPrecision"]["efg".indexOf(n.toLowerCase())],r=["toString","toUpperCase"]["eEfFgG".indexOf(n)%2],s=p+t(o)[q](m),f(s,p,u,k,w)[r]()):b};return d.replace(b,j)},call_user_func:function(cb){var func;if("string"==typeof cb?func="function"==typeof this[cb]?this[cb]:func=new Function(null,"return "+cb)():cb instanceof Array?func="string"==typeof cb[0]?eval(cb[0]+"['"+cb[1]+"']"):func=cb[0][cb[1]]:"function"==typeof cb&&(func=cb),"function"!=typeof func)throw new Error(func+" is not a valid function");var parameters=Array.prototype.slice.call(arguments,1);return"string"==typeof cb[0]?func.apply(eval(cb[0]),parameters):"object"==typeof cb[0]?func.apply(cb[0],parameters):func.apply(null,parameters)},call_user_func_array:function(cb,parameters){var func;if("string"==typeof cb?func="function"==typeof this[cb]?this[cb]:func=new Function(null,"return "+cb)():cb instanceof Array?func="string"==typeof cb[0]?eval(cb[0]+"['"+cb[1]+"']"):func=cb[0][cb[1]]:"function"==typeof cb&&(func=cb),"function"!=typeof func)throw new Error(func+" is not a valid function");return"string"==typeof cb[0]?func.apply(eval(cb[0]),parameters):"object"==typeof cb[0]?func.apply(cb[0],parameters):func.apply(null,parameters)},create_function:function(a,b){try{return Function.apply(null,a.split(",").concat(b))}catch(a){return!1}},addslashes:function(a){return(a+"").replace(/[\\"']/g,"\\$&").replace(/\u0000/g,"\\0")},stripslashes:function(a){return(a+"").replace(/\\(.?)/g,function(a,b){return"\\"===b?"\\":"0"===b?"\0":""===b?"":b})},strpos:function(a,b,c){var d=(a+"").indexOf(b,c||0);return-1!==d&&d},md5:function(e){var f,g,h,i,j,l,m,n,o,p,q=function(a,b){return a<<b|a>>>32-b},r=function(a,b){var c,d,e,f,g;return e=2147483648&a,f=2147483648&b,c=1073741824&a,d=1073741824&b,g=(1073741823&a)+(1073741823&b),c&d?2147483648^g^e^f:c|d?1073741824&g?3221225472^g^e^f:1073741824^g^e^f:g^e^f},t=function(a,b,c){return a&b|~a&c},u=function(a,b,c){return a&c|b&~c},v=function(a,b,c){return a^b^c},w=function(a,b,c){return b^(a|~c)},s=function(e,f,b,c,d,g,h){return e=r(e,r(r(t(f,b,c),d),h)),r(q(e,g),f)},y=function(e,f,b,c,d,g,h){return e=r(e,r(r(u(f,b,c),d),h)),r(q(e,g),f)},z=function(e,f,b,c,d,g,h){return e=r(e,r(r(v(f,b,c),d),h)),r(q(e,g),f)},A=function(e,f,b,c,d,g,h){return e=r(e,r(r(w(f,b,c),d),h)),r(q(e,g),f)},B=function(a){for(var b,c=a.length,d=c+8,e=16*((d-d%64)/64+1),f=Array(e-1),g=0,h=0;h<c;)b=(h-h%4)/4,g=8*(h%4),f[b]|=a.charCodeAt(h)<<g,h++;return b=(h-h%4)/4,g=8*(h%4),f[b]|=128<<g,f[e-2]=c<<3,f[e-1]=c>>>29,f},C=function(a){var b,c,d="",e="";for(c=0;3>=c;c++)b=255&a>>>8*c,e="0"+b.toString(16),d+=e.substr(e.length-2,2);return d},D=[],E=7,F=12,G=17,H=22,I=5,J=9,K=14,L=20,M=4,N=11,O=16,P=23,Q=6,R=10,S=15,T=21;for(e=this.utf8_encode(e),D=B(e),m=1732584193,n=4023233417,o=2562383102,p=271733878,f=D.length,g=0;g<f;g+=16)h=m,i=n,j=o,l=p,m=s(m,n,o,p,D[g+0],E,3614090360),p=s(p,m,n,o,D[g+1],F,3905402710),o=s(o,p,m,n,D[g+2],G,606105819),n=s(n,o,p,m,D[g+3],H,3250441966),m=s(m,n,o,p,D[g+4],E,4118548399),p=s(p,m,n,o,D[g+5],F,1200080426),o=s(o,p,m,n,D[g+6],G,2821735955),n=s(n,o,p,m,D[g+7],H,4249261313),m=s(m,n,o,p,D[g+8],E,1770035416),p=s(p,m,n,o,D[g+9],F,2336552879),o=s(o,p,m,n,D[g+10],G,4294925233),n=s(n,o,p,m,D[g+11],H,2304563134),m=s(m,n,o,p,D[g+12],E,1804603682),p=s(p,m,n,o,D[g+13],F,4254626195),o=s(o,p,m,n,D[g+14],G,2792965006),n=s(n,o,p,m,D[g+15],H,1236535329),m=y(m,n,o,p,D[g+1],I,4129170786),p=y(p,m,n,o,D[g+6],J,3225465664),o=y(o,p,m,n,D[g+11],K,643717713),n=y(n,o,p,m,D[g+0],L,3921069994),m=y(m,n,o,p,D[g+5],I,3593408605),p=y(p,m,n,o,D[g+10],J,38016083),o=y(o,p,m,n,D[g+15],K,3634488961),n=y(n,o,p,m,D[g+4],L,3889429448),m=y(m,n,o,p,D[g+9],I,568446438),p=y(p,m,n,o,D[g+14],J,3275163606),o=y(o,p,m,n,D[g+3],K,4107603335),n=y(n,o,p,m,D[g+8],L,1163531501),m=y(m,n,o,p,D[g+13],I,2850285829),p=y(p,m,n,o,D[g+2],J,4243563512),o=y(o,p,m,n,D[g+7],K,1735328473),n=y(n,o,p,m,D[g+12],L,2368359562),m=z(m,n,o,p,D[g+5],M,4294588738),p=z(p,m,n,o,D[g+8],N,2272392833),o=z(o,p,m,n,D[g+11],O,1839030562),n=z(n,o,p,m,D[g+14],P,4259657740),m=z(m,n,o,p,D[g+1],M,2763975236),p=z(p,m,n,o,D[g+4],N,1272893353),o=z(o,p,m,n,D[g+7],O,4139469664),n=z(n,o,p,m,D[g+10],P,3200236656),m=z(m,n,o,p,D[g+13],M,681279174),p=z(p,m,n,o,D[g+0],N,3936430074),o=z(o,p,m,n,D[g+3],O,3572445317),n=z(n,o,p,m,D[g+6],P,76029189),m=z(m,n,o,p,D[g+9],M,3654602809),p=z(p,m,n,o,D[g+12],N,3873151461),o=z(o,p,m,n,D[g+15],O,530742520),n=z(n,o,p,m,D[g+2],P,3299628645),m=A(m,n,o,p,D[g+0],Q,4096336452),p=A(p,m,n,o,D[g+7],R,1126891415),o=A(o,p,m,n,D[g+14],S,2878612391),n=A(n,o,p,m,D[g+5],T,4237533241),m=A(m,n,o,p,D[g+12],Q,1700485571),p=A(p,m,n,o,D[g+3],R,2399980690),o=A(o,p,m,n,D[g+10],S,4293915773),n=A(n,o,p,m,D[g+1],T,2240044497),m=A(m,n,o,p,D[g+8],Q,1873313359),p=A(p,m,n,o,D[g+15],R,4264355552),o=A(o,p,m,n,D[g+6],S,2734768916),n=A(n,o,p,m,D[g+13],T,1309151649),m=A(m,n,o,p,D[g+4],Q,4149444226),p=A(p,m,n,o,D[g+11],R,3174756917),o=A(o,p,m,n,D[g+2],S,718787259),n=A(n,o,p,m,D[g+9],T,3951481745),m=r(m,h),n=r(n,i),o=r(o,j),p=r(p,l);var U=C(m)+C(n)+C(o)+C(p);return U.toLowerCase()},utf8_encode:function(a){var b,c,d=String.fromCharCode,e=a+"",f="",g=0;b=c=0,g=e.length;for(var h=0;h<g;h++){var i=e.charCodeAt(h),j=null;128>i?c++:127<i&&2048>i?j=d(192|i>>6)+d(128|63&i):j=d(224|i>>12)+d(128|63&i>>6)+d(128|63&i),null!==j&&(c>b&&(f+=e.substring(b,c)),f+=j,b=c=h+1)}return c>b&&(f+=e.substring(b,e.length)),f},utf8_decode:function(a){var b=String.fromCharCode,c=[],d=0,e=0,f=0,g=0,h=0;for(a+="";d<a.length;)f=a.charCodeAt(d),128>f?(c[e++]=b(f),d++):191<f&&224>f?(g=a.charCodeAt(d+1),c[e++]=b((31&f)<<6|63&g),d+=2):(g=a.charCodeAt(d+1),h=a.charCodeAt(d+2),c[e++]=b((15&f)<<12|(63&g)<<6|63&h),d+=3);return c.join("")},base64_encode:function(a){var b,c,d,e,f,g,h,j,k=0,l=0,m="",n=[];if(!a)return a;a=this.utf8_encode(a+"");do b=a.charCodeAt(k++),c=a.charCodeAt(k++),d=a.charCodeAt(k++),j=b<<16|c<<8|d,e=63&j>>18,f=63&j>>12,g=63&j>>6,h=63&j,n[l++]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(e)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(f)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(g)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(h);while(k<a.length);switch(m=n.join(""),a.length%3){case 1:m=m.slice(0,-2)+"==";break;case 2:m=m.slice(0,-1)+"=";}return m},base64_decode:function(a){var b,c,d,e,f,g,h,j,k=String.fromCharCode,l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",m=0,n=0,o="",p=[];if(!a)return a;a+="";do e=l.indexOf(a.charAt(m++)),f=l.indexOf(a.charAt(m++)),g=l.indexOf(a.charAt(m++)),h=l.indexOf(a.charAt(m++)),j=e<<18|f<<12|g<<6|h,b=255&j>>16,c=255&j>>8,d=255&j,p[n++]=64==g?k(b):64==h?k(b,c):k(b,c,d);while(m<a.length);return o=p.join(""),o=this.utf8_decode(o),o},nl2br:function(a,b){var c=b||"undefined"==typeof b?"<br />":"<br>";return(a+"").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,"$1"+c+"$2")},strtr:function(a,b,c){var d="",e=0,f=0,g=0,h=0,k="",l="",m="",n=[],o=[],p="",q=!1;if("object"==typeof b){for(d in b)b.hasOwnProperty(d)&&(n.push(d),o.push(b[d]));b=n,c=o}for(g=a.length,h=b.length,k="string"==typeof b,l="string"==typeof c,e=0;e<g;e++){if(q=!1,k){for(m=a.charAt(e),f=0;f<h;f++)if(m===b.charAt(f)){q=!0;break}}else for(f=0;f<h;f++)if(a.substr(e,b[f].length)===b[f]){q=!0,e=e+b[f].length-1;break}p+=q?l?c.charAt(f):c[f]:a.charAt(e)}return p}};