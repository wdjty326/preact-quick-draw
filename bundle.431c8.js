!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(t){return e[t]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/preact-quick-draw/",t(t.s="mdyV")}({K2hm:function(e,t,n){"use strict";function r(){var e=!1;try{var t=Object.defineProperty({},"passive",{get:function(){return e},set:function(){e=!0}});window.addEventListener("testPassive",(function(){return null}),t),window.removeEventListener("testPassive",(function(){return null}),t)}catch(e){}return e}n.d(t,"a",(function(){return r}));n("QRet")},QRet:function(e,t,n){"use strict";function r(e,t){p.options.__h&&p.options.__h(d,e,h||t),h=0;var n=d.__H||(d.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function o(e){return h=1,function(e,t,n){var o=r(_++,2);return o.t=e,o.__c||(o.__=[n?n(t):s(void 0,t),function(e){var t=o.t(o.__[0],e);o.__[0]!==t&&(o.__=[t,o.__[1]],o.__c.setState({}))}],o.__c=d),o.__}(s,e)}function i(e,t){var n=r(_++,3);!p.options.__s&&l(n.__H,t)&&(n.__=e,n.__H=t,d.__H.__h.push(n))}function u(){var e;for(v.sort((function(e,t){return e.__v.__b-t.__v.__b}));e=v.pop();)if(e.__P)try{e.__H.__h.forEach(a),e.__H.__h.forEach(c),e.__H.__h=[]}catch(t){e.__H.__h=[],p.options.__e(t,e.__v)}}function a(e){var t=d,n=e.__c;"function"==typeof n&&(e.__c=void 0,n()),d=t}function c(e){var t=d;e.__c=e.__(),d=t}function l(e,t){return!e||e.length!==t.length||t.some((function(t,n){return t!==e[n]}))}function s(e,t){return"function"==typeof t?t(e):t}n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return i}));var _,d,f,p=n("hosL"),h=0,v=[],y=p.options.__b,m=p.options.__r,g=p.options.diffed,b=p.options.__c,k=p.options.unmount;p.options.__b=function(e){d=null,y&&y(e)},p.options.__r=function(e){m&&m(e),_=0;var t=(d=e.__c).__H;t&&(t.__h.forEach(a),t.__h.forEach(c),t.__h=[])},p.options.diffed=function(e){g&&g(e);var t=e.__c;t&&t.__H&&t.__H.__h.length&&(1!==v.push(t)&&f===p.options.requestAnimationFrame||((f=p.options.requestAnimationFrame)||function(e){var t,n=function(){clearTimeout(r),L&&cancelAnimationFrame(t),setTimeout(e)},r=setTimeout(n,100);L&&(t=requestAnimationFrame(n))})(u)),d=null},p.options.__c=function(e,t){t.some((function(e){try{e.__h.forEach(a),e.__h=e.__h.filter((function(e){return!e.__||c(e)}))}catch(n){t.some((function(e){e.__h&&(e.__h=[])})),t=[],p.options.__e(n,e.__v)}})),b&&b(e,t)},p.options.unmount=function(e){k&&k(e);var t,n=e.__c;n&&n.__H&&(n.__H.__.forEach((function(e){try{a(e)}catch(e){t=e}})),t&&p.options.__e(t,n.__v))};var L="function"==typeof requestAnimationFrame},hosL:function(e,t,n){"use strict";function r(e,t){for(var n in t)e[n]=t[n];return e}function o(e){var t=e.parentNode;t&&t.removeChild(e)}function i(e,t,n){var r,o,i,a={};for(i in t)"key"==i?r=t[i]:"ref"==i?o=t[i]:a[i]=t[i];if(arguments.length>2&&(a.children=arguments.length>3?R.call(arguments,2):n),"function"==typeof e&&null!=e.defaultProps)for(i in e.defaultProps)void 0===a[i]&&(a[i]=e.defaultProps[i]);return u(e,a,r,o,null)}function u(e,t,n,r,o){var i={type:e,props:t,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==o?++H:o};return null==o&&null!=D.vnode&&D.vnode(i),i}function a(){return{current:null}}function c(e){return e.children}function l(e,t){this.props=e,this.context=t}function s(e,t){if(null==t)return e.__?s(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?s(e):null}function _(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return _(e)}}function d(e){(!e.__d&&(e.__d=!0)&&M.push(e)&&!f.__r++||I!==D.debounceRendering)&&((I=D.debounceRendering)||A)(f)}function f(){for(var e;f.__r=M.length;)e=M.sort((function(e,t){return e.__v.__b-t.__v.__b})),M=[],e.some((function(e){var t,n,o,i,u,a;e.__d&&(u=(i=(t=e).__v).__e,(a=t.__P)&&(n=[],(o=r({},i)).__v=i.__v+1,L(a,i,o,t.__n,void 0!==a.ownerSVGElement,null!=i.__h?[u]:null,n,null==u?s(i):u,i.__h),C(n,i),i.__e!=u&&_(i)))}))}function p(e,t,n,r,o,i,a,l,_,d){var f,p,v,m,g,b,k,C=r&&r.__k||q,S=C.length;for(n.__k=[],f=0;f<t.length;f++)if(null!=(m=n.__k[f]=null==(m=t[f])||"boolean"==typeof m?null:"string"==typeof m||"number"==typeof m||"bigint"==typeof m?u(null,m,null,null,m):Array.isArray(m)?u(c,{children:m},null,null,null):m.__b>0?u(m.type,m.props,m.key,null,m.__v):m)){if(m.__=n,m.__b=n.__b+1,null===(v=C[f])||v&&m.key==v.key&&m.type===v.type)C[f]=void 0;else for(p=0;p<S;p++){if((v=C[p])&&m.key==v.key&&m.type===v.type){C[p]=void 0;break}v=null}L(e,m,v=v||z,o,i,a,l,_,d),g=m.__e,(p=m.ref)&&v.ref!=p&&(k||(k=[]),v.ref&&k.push(v.ref,null,m),k.push(p,m.__c||g,m)),null!=g?(null==b&&(b=g),"function"==typeof m.type&&m.__k===v.__k?m.__d=_=h(m,_,e):_=y(e,m,v,C,g,_),"function"==typeof n.type&&(n.__d=_)):_&&v.__e==_&&_.parentNode!=e&&(_=s(v))}for(n.__e=b,f=S;f--;)null!=C[f]&&("function"==typeof n.type&&null!=C[f].__e&&C[f].__e==n.__d&&(n.__d=s(r,f+1)),T(C[f],C[f]));if(k)for(f=0;f<k.length;f++)O(k[f],k[++f],k[++f])}function h(e,t,n){for(var r,o=e.__k,i=0;o&&i<o.length;i++)(r=o[i])&&(r.__=e,t="function"==typeof r.type?h(r,t,n):y(n,r,r,o,r.__e,t));return t}function v(e,t){return t=t||[],null==e||"boolean"==typeof e||(Array.isArray(e)?e.some((function(e){v(e,t)})):t.push(e)),t}function y(e,t,n,r,o,i){var u,a,c;if(void 0!==t.__d)u=t.__d,t.__d=void 0;else if(null==n||o!=i||null==o.parentNode)e:if(null==i||i.parentNode!==e)e.appendChild(o),u=null;else{for(a=i,c=0;(a=a.nextSibling)&&c<r.length;c+=2)if(a==o)break e;e.insertBefore(o,i),u=i}return void 0!==u?u:o.nextSibling}function m(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]=null==n?"":"number"!=typeof n||F.test(t)?n:n+"px"}function g(e,t,n,r,o){var i;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof r&&(e.style.cssText=r=""),r)for(t in r)n&&t in n||m(e.style,t,"");if(n)for(t in n)r&&n[t]===r[t]||m(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])i=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+i]=n,n?r||e.addEventListener(t,i?k:b,i):e.removeEventListener(t,i?k:b,i);else if("dangerouslySetInnerHTML"!==t){if(o)t=t.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if("href"!==t&&"list"!==t&&"form"!==t&&"tabIndex"!==t&&"download"!==t&&t in e)try{e[t]=null==n?"":n;break e}catch(e){}"function"==typeof n||(null!=n&&(!1!==n||"a"===t[0]&&"r"===t[1])?e.setAttribute(t,n):e.removeAttribute(t))}}function b(e){this.l[e.type+!1](D.event?D.event(e):e)}function k(e){this.l[e.type+!0](D.event?D.event(e):e)}function L(e,t,n,o,i,u,a,s,_){var d,f,h,v,y,m,g,b,k,L,C,O=t.type;if(void 0!==t.constructor)return null;null!=n.__h&&(_=n.__h,s=t.__e=n.__e,t.__h=null,u=[s]),(d=D.__b)&&d(t);try{e:if("function"==typeof O){if(b=t.props,k=(d=O.contextType)&&o[d.__c],L=d?k?k.props.value:d.__:o,n.__c?g=(f=t.__c=n.__c).__=f.__E:("prototype"in O&&O.prototype.render?t.__c=f=new O(b,L):(t.__c=f=new l(b,L),f.constructor=O,f.render=j),k&&k.sub(f),f.props=b,f.state||(f.state={}),f.context=L,f.__n=o,h=f.__d=!0,f.__h=[]),null==f.__s&&(f.__s=f.state),null!=O.getDerivedStateFromProps&&(f.__s==f.state&&(f.__s=r({},f.__s)),r(f.__s,O.getDerivedStateFromProps(b,f.__s))),v=f.props,y=f.state,h)null==O.getDerivedStateFromProps&&null!=f.componentWillMount&&f.componentWillMount(),null!=f.componentDidMount&&f.__h.push(f.componentDidMount);else{if(null==O.getDerivedStateFromProps&&b!==v&&null!=f.componentWillReceiveProps&&f.componentWillReceiveProps(b,L),!f.__e&&null!=f.shouldComponentUpdate&&!1===f.shouldComponentUpdate(b,f.__s,L)||t.__v===n.__v){f.props=b,f.state=f.__s,t.__v!==n.__v&&(f.__d=!1),f.__v=t,t.__e=n.__e,t.__k=n.__k,t.__k.forEach((function(e){e&&(e.__=t)})),f.__h.length&&a.push(f);break e}null!=f.componentWillUpdate&&f.componentWillUpdate(b,f.__s,L),null!=f.componentDidUpdate&&f.__h.push((function(){f.componentDidUpdate(v,y,m)}))}f.context=L,f.props=b,f.state=f.__s,(d=D.__r)&&d(t),f.__d=!1,f.__v=t,f.__P=e,d=f.render(f.props,f.state,f.context),f.state=f.__s,null!=f.getChildContext&&(o=r(r({},o),f.getChildContext())),h||null==f.getSnapshotBeforeUpdate||(m=f.getSnapshotBeforeUpdate(v,y)),C=null!=d&&d.type===c&&null==d.key?d.props.children:d,p(e,Array.isArray(C)?C:[C],t,n,o,i,u,a,s,_),f.base=t.__e,t.__h=null,f.__h.length&&a.push(f),g&&(f.__E=f.__=null),f.__e=!1}else null==u&&t.__v===n.__v?(t.__k=n.__k,t.__e=n.__e):t.__e=S(n.__e,t,n,o,i,u,a,_);(d=D.diffed)&&d(t)}catch(e){t.__v=null,(_||null!=u)&&(t.__e=s,t.__h=!!_,u[u.indexOf(s)]=null),D.__e(e,t,n)}}function C(e,t){D.__c&&D.__c(t,e),e.some((function(t){try{e=t.__h,t.__h=[],e.some((function(e){e.call(t)}))}catch(e){D.__e(e,t.__v)}}))}function S(e,t,n,r,i,u,a,c){var l,_,d,f=n.props,h=t.props,v=t.type,y=0;if("svg"===v&&(i=!0),null!=u)for(;y<u.length;y++)if((l=u[y])&&"setAttribute"in l==!!v&&(v?l.localName===v:3===l.nodeType)){e=l,u[y]=null;break}if(null==e){if(null===v)return document.createTextNode(h);e=i?document.createElementNS("http://www.w3.org/2000/svg",v):document.createElement(v,h.is&&h),u=null,c=!1}if(null===v)f===h||c&&e.data===h||(e.data=h);else{if(u=u&&R.call(e.childNodes),_=(f=n.props||z).dangerouslySetInnerHTML,d=h.dangerouslySetInnerHTML,!c){if(null!=u)for(f={},y=0;y<e.attributes.length;y++)f[e.attributes[y].name]=e.attributes[y].value;(d||_)&&(d&&(_&&d.__html==_.__html||d.__html===e.innerHTML)||(e.innerHTML=d&&d.__html||""))}if(function(e,t,n,r,o){var i;for(i in n)"children"===i||"key"===i||i in t||g(e,i,null,n[i],r);for(i in t)o&&"function"!=typeof t[i]||"children"===i||"key"===i||"value"===i||"checked"===i||n[i]===t[i]||g(e,i,t[i],n[i],r)}(e,h,f,i,c),d)t.__k=[];else if(y=t.props.children,p(e,Array.isArray(y)?y:[y],t,n,r,i&&"foreignObject"!==v,u,a,u?u[0]:n.__k&&s(n,0),c),null!=u)for(y=u.length;y--;)null!=u[y]&&o(u[y]);c||("value"in h&&void 0!==(y=h.value)&&(y!==f.value||y!==e.value||"progress"===v&&!y)&&g(e,"value",y,f.value,!1),"checked"in h&&void 0!==(y=h.checked)&&y!==e.checked&&g(e,"checked",y,f.checked,!1))}return e}function O(e,t,n){try{"function"==typeof e?e(t):e.current=t}catch(e){D.__e(e,n)}}function T(e,t,n){var r,i;if(D.unmount&&D.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||O(r,null,t)),null!=(r=e.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){D.__e(e,t)}r.base=r.__P=null}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&T(r[i],t,"function"!=typeof e.type);n||null==e.__e||o(e.__e),e.__e=e.__d=void 0}function j(e,t,n){return this.constructor(e,n)}function P(e,t,n){var r,o,u;D.__&&D.__(e,t),o=(r="function"==typeof n)?null:n&&n.__k||t.__k,u=[],L(t,e=(!r&&n||t).__k=i(c,null,[e]),o||z,z,void 0!==t.ownerSVGElement,!r&&n?[n]:o?null:t.firstChild?R.call(t.childNodes):null,u,!r&&n?n:o?o.__e:t.firstChild,r),C(u,e)}function x(e,t){P(e,t,x)}function w(e,t,n){var o,i,a,c=r({},e.props);for(a in t)"key"==a?o=t[a]:"ref"==a?i=t[a]:c[a]=t[a];return arguments.length>2&&(c.children=arguments.length>3?R.call(arguments,2):n),u(e.type,c,o||e.key,i||e.ref,null)}function E(e,t){var n={__c:t="__cC"+U++,__:e,Consumer:function(e,t){return e.children(t)},Provider:function(e){var n,r;return this.getChildContext||(n=[],(r={})[t]=this,this.getChildContext=function(){return r},this.shouldComponentUpdate=function(e){this.props.value!==e.value&&n.some(d)},this.sub=function(e){n.push(e);var t=e.componentWillUnmount;e.componentWillUnmount=function(){n.splice(n.indexOf(e),1),t&&t.call(e)}}),e.children}};return n.Provider.__=n.Consumer.contextType=n}n.r(t),n.d(t,"render",(function(){return P})),n.d(t,"hydrate",(function(){return x})),n.d(t,"createElement",(function(){return i})),n.d(t,"h",(function(){return i})),n.d(t,"Fragment",(function(){return c})),n.d(t,"createRef",(function(){return a})),n.d(t,"isValidElement",(function(){return W})),n.d(t,"Component",(function(){return l})),n.d(t,"cloneElement",(function(){return w})),n.d(t,"createContext",(function(){return E})),n.d(t,"toChildArray",(function(){return v})),n.d(t,"options",(function(){return D}));var R,D,H,W,M,A,I,U,z={},q=[],F=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;R=q.slice,D={__e:function(e,t){for(var n,r,o;t=t.__;)if((n=t.__c)&&!n.__)try{if((r=n.constructor)&&null!=r.getDerivedStateFromError&&(n.setState(r.getDerivedStateFromError(e)),o=n.__d),null!=n.componentDidCatch&&(n.componentDidCatch(e),o=n.__d),o)return n.__E=n}catch(t){e=t}throw e}},H=0,W=function(e){return null!=e&&void 0===e.constructor},l.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=r({},this.state),"function"==typeof e&&(e=e(r({},n),this.props)),e&&r(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),d(this))},l.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),d(this))},l.prototype.render=c,M=[],A="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,f.__r=0,U=0},jshJ:function(e,t,n){"use strict";var r,o;n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return o})),function(e){e.Ready="ready",e.Play="play"}(r||(r={})),function(e){e.Pen="pen",e.Spoid="spoid",e.Eraser="eraser"}(o||(o={}))},mdyV:function(e,t,n){"use strict";n.r(t);var r=n("hosL"),o=r.h,i=r.render,u=r.hydrate,a=function(e){return e&&e.default?e.default:e},c=function(e){return"/"===e[e.length-1]?e:e+"/"};if("serviceWorker"in navigator&&navigator.serviceWorker.register(n.p+"sw.js"),"function"==typeof a(n("qVkA"))){var l=document.getElementById("preact_root")||document.body.firstElementChild;0,function(){var e=a(n("qVkA")),t={},r=document.querySelector('[type="__PREACT_CLI_DATA__"]');r&&(t=JSON.parse(decodeURI(r.innerHTML)).preRenderData||t);var s={preRenderData:t},_=t.url?c(t.url):"",d=u&&_===c(location.pathname);l=(d?u:i)(o(e,{CLI_DATA:s}),document.body,l)}()}},n8tQ:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r="__layer_"},q1hW:function(e,t,n){"use strict";(function(e){function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(e,t){return i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},i(e,t)}function u(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=l(e);if(t){var o=l(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return a(this,n)}}function a(e,t){if(t&&("object"===r(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return c(e)}function c(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function l(e){return l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},l(e)}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return h}));var _=n("hosL"),d=n("K2hm"),f=n("jshJ"),p=n("n8tQ"),h=(n("z3l7"),function(t){function n(){var e;s(c(e=h.call(this)),"mainLayer",void 0),s(c(e),"paintingLayer",void 0),s(c(e),"activeLayer",{}),s(c(e),"readyState",f.b.Ready),s(c(e),"renderData",{}),s(c(e),"renderCursor",{}),s(c(e),"setStrokeStyle",(function(t){t.strokeStyle=e.state.color,t.lineCap=e.state.radius,t.lineJoin="round",t.lineWidth=e.state.size})),s(c(e),"mousedown",(function(t){t.cancelable&&t.preventDefault();var n=e.state,r=function(e){e.strokeStyle=n.color,e.lineCap=n.radius,e.lineJoin="round",e.lineWidth=n.size};if((!("button"in t)||!t.button)&&t.currentTarget){if(e.readyState!==f.b.Ready)return;var o,i,u=n.currentLayer,a=t.currentTarget,c=a.getContext("2d"),l=e.activeLayer[u.id].current.getContext("2d");r(c),r(l);var s=a.getBoundingClientRect();"touches"in t?(o=t.touches[0].clientX-s.left,i=t.touches[0].clientY-s.top):(o=t.clientX-s.left,i=t.clientY-s.top),o=Math.round(o*a.width/a.offsetWidth),i=Math.round(i*a.height/a.offsetHeight);var _=n.cursor===f.a.Eraser,d=e.renderData[u.id];void 0===d&&(e.renderData[u.id]=[],d=[]);var p=e.renderCursor[u.id];void 0===p&&(e.renderCursor[u.id]=0,p=0),d.splice(p,d.length-p,{x:o,y:i,color:n.color,size:n.size,radius:n.radius,isRoot:!0,isTransparent:_,layerId:n.currentLayer.id}),e.renderCursor[u.id]=d.length,e.readyState=f.b.Play,_&&(l.save(),l.globalCompositeOperation="destination-out"),l.beginPath(),l.moveTo(o,i),c.beginPath(),c.moveTo(o,i)}})),s(c(e),"mousemove",(function(t){t.preventDefault();var n=e.state;if(t.currentTarget){if(e.readyState!==f.b.Play)return;var r,o,i=n.currentLayer,u=t.currentTarget,a=u.getContext("2d"),c=e.activeLayer[i.id].current.getContext("2d"),l=u.getBoundingClientRect();"changedTouches"in t?(r=t.changedTouches[0].clientX-l.left,o=t.changedTouches[0].clientY-l.top):(r=t.clientX-l.left,o=t.clientY-l.top),r=Math.round(r*u.width/u.offsetWidth),o=Math.round(o*u.height/u.offsetHeight);var s=e.renderData[i.id];s.push({x:r,y:o,color:n.color,size:n.size,radius:n.radius,isRoot:!1,isTransparent:n.cursor===f.a.Eraser,layerId:n.currentLayer.id}),e.renderCursor[i.id]=s.length,c.lineTo(r,o),c.stroke(),a.lineTo(r,o),a.stroke()}})),s(c(e),"mouseup",(function(t){t.cancelable&&t.preventDefault();var n=e.state;if(t.currentTarget){if(e.readyState!==f.b.Play)return;var r,o,i=n.currentLayer,u=t.currentTarget,a=u.getContext("2d"),c=e.activeLayer[i.id].current.getContext("2d"),l=e.mainLayer.current.getContext("2d"),s=u.getBoundingClientRect();"targetTouches"in t?(r=t.targetTouches[0].clientX-s.left,o=t.targetTouches[0].clientY-s.top):(r=t.clientX-s.left,o=t.clientY-s.top),r=Math.round(r*u.width/u.offsetWidth),o=Math.round(o*u.height/u.offsetHeight);var _=n.cursor===f.a.Eraser,d=e.renderData[i.id];d.push({x:r,y:o,color:n.color,size:n.size,radius:n.radius,isRoot:!1,isTransparent:_,layerId:n.currentLayer.id}),e.renderCursor[i.id]=d.length,e.readyState=f.b.Ready,c.lineTo(r,o),c.stroke(),_&&c.restore(),a.lineTo(r,o),a.stroke(),l.beginPath(),l.drawImage(u,0,0,e.props.cWidth,e.props.cHeight),a.clearRect(0,0,e.props.cWidth,e.props.cHeight)}})),s(c(e),"mouseleave",(function(t){e.readyState===f.b.Play&&e.paintingLayer.current!==t.currentTarget&&e.mouseup(t)})),s(c(e),"forceReload",(function(){e.forceUpdate((function(){return e.reload()}))})),s(c(e),"reload",(function(){var t=e.mainLayer.current,n=e.state;if(t){var r,o=t.getContext("2d"),i=null;o.clearRect(0,0,t.width,t.height),o.lineJoin="round",o.beginPath(),n.allLayer.forEach((function(t){var r,u=e.activeLayer[t.id].current.getContext("2d");u.clearRect(0,0,e.props.cWidth,e.props.cHeight),u.lineJoin="round",u.beginPath();for(var a=0;a<e.renderCursor[t.id];a++)(i=e.renderData[t.id][a]).isRoot?(0!==a&&(o.stroke(),i.isTransparent&&o.restore(),o.beginPath(),u.stroke(),i.isTransparent&&u.restore(),u.beginPath()),i.isTransparent&&(o.save(),o.globalCompositeOperation="destination-out",u.save(),u.globalCompositeOperation="destination-out"),o.strokeStyle=i.color,o.lineWidth=i.size,o.lineCap=n.radius,u.strokeStyle=i.color,u.lineWidth=i.size,u.lineCap=n.radius,o.moveTo(i.x,i.y),u.moveTo(i.x,i.y)):(o.lineTo(i.x,i.y),u.lineTo(i.x,i.y));u.stroke(),(null===(r=i)||void 0===r?void 0:r.isTransparent)&&u.restore()})),o.stroke(),(null===(r=i)||void 0===r?void 0:r.isTransparent)&&o.restore()}})),s(c(e),"undo",(function(){for(var t=e.state.currentLayer,n=e.renderCursor[t.id]-1;n>=0&&!e.renderData[t.id][n].isRoot;n--);e.renderCursor[t.id]=Math.max(n,0),e.forceReload()})),s(c(e),"redo",(function(){for(var t=e.state.currentLayer,n=e.renderData[t.id].length,r=e.renderCursor[t.id]+1;r<n&&!e.renderData[t.id][r].isRoot;r++);e.renderCursor[t.id]=Math.min(r,n),e.forceReload()})),s(c(e),"clear",(function(){var t={id:"".concat(p.a).concat(Date.now()),name:"Layer 1"};e.renderData=s({},t.id,[]),e.renderCursor=s({},t.id,0),e.forceReload()})),s(c(e),"SpoidColor",(function(t){if(t.preventDefault(),e.state.cursor===f.a.Spoid&&t.currentTarget){if(e.readyState!==f.b.Ready)return;var n,r,o=t.currentTarget,i=o.getContext("2d"),u=o.getBoundingClientRect();"touches"in t?(n=t.touches[0].clientX-u.left,r=t.touches[0].clientY-u.top):(n=t.clientX-u.left,r=t.clientY-u.top),n=Math.round(n*o.width/o.offsetWidth),r=Math.round(r*o.height/o.offsetHeight);var a=i.getImageData(n,r,1,1).data;if(0===a[4])return;var c="00".concat(a[0].toString(16)).slice(-2),l="00".concat(a[1].toString(16)).slice(-2),s="00".concat(a[2].toString(16)).slice(-2);e.setState({color:"#".concat(c).concat(l).concat(s)})}})),s(c(e),"createLayer",(function(){var t="".concat(p.a).concat(Date.now());e.setState((function(e){var n=e.allLayer;return n.push({id:t,name:"Layer ".concat(n.length+1)}),{allLayer:n}}),(function(){e.renderData[t]=[],e.renderCursor[t]=0,e.activeLayer[t]=Object(_.createRef)()}))})),s(c(e),"deleteLayer",(function(t){e.setState((function(e){var n=e.allLayer,r=n.findIndex((function(e){return e.id===t}));return r>-1&&n.splice(r,1),{allLayer:n}}),(function(){e.renderData[t]&&delete e.renderData[t],e.renderCursor[t]&&delete e.renderCursor[t],e.activeLayer[t]&&delete e.activeLayer[t],e.forceReload()}))})),e.mainLayer=Object(_.createRef)(),e.paintingLayer=Object(_.createRef)();var t={id:"".concat(p.a).concat(Date.now()),name:"Layer 1"};return e.renderData[t.id]=[],e.renderCursor[t.id]=0,e.activeLayer[t.id]=Object(_.createRef)(),e.state={color:"#0d6efd",size:10,cursor:f.a.Pen,radius:"round",currentLayer:t,allLayer:[t]},e}!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");Object.defineProperty(e,"prototype",{value:Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),writable:!1}),t&&i(e,t)}(n,t);var r,a,l,h=u(n);return r=n,(a=[{key:"componentDidMount",value:function(){var e=this.paintingLayer.current;if(e){var t=!!Object(d.a)()&&{passive:!1,capture:!1};e.addEventListener("mousedown",this.mousedown),e.addEventListener("mousemove",this.mousemove,t),e.addEventListener("mouseup",this.mouseup),document.addEventListener("mouseup",this.mouseleave),e.addEventListener("touchstart",this.mousedown),e.addEventListener("touchmove",this.mousemove,t),e.addEventListener("touchend",this.mouseup)}}},{key:"componentWillUnmount",value:function(){var e=this.paintingLayer.current;e&&(e.removeEventListener("mousedown",this.mousedown),e.removeEventListener("mousemove",this.mousemove),e.removeEventListener("mouseup",this.mouseup),document.removeEventListener("mouseup",this.mouseleave),e.removeEventListener("touchstart",this.mousedown),e.removeEventListener("touchmove",this.mousemove),e.removeEventListener("touchend",this.mouseup))}},{key:"render",value:function(t,n){var r=this;return Object(_.h)(e,null,Object(_.h)("div",null,Object(_.h)("div",{id:"painting_canvas",onTouchMove:function(e){e.preventDefault()}},Object(_.h)("canvas",{id:"main_layer",width:t.cWidth,height:t.cHeight,ref:this.mainLayer,style:{opacity:0}}),n.allLayer.map((function(e){return Object(_.h)("canvas",{class:"active_layer",ref:r.activeLayer[e.id],key:e.id,width:t.cWidth,height:t.cHeight,onClick:r.SpoidColor,onTouchStart:r.SpoidColor})})),Object(_.h)("canvas",{id:"painting_layer",width:t.cWidth,height:t.cHeight,ref:this.paintingLayer,style:{display:n.cursor===f.a.Spoid?"none":"block",opacity:0}}))),Object(_.h)("div",{id:"tool_menu"},Object(_.h)("button",{"data-theme":"purple",onClick:function(){return r.setState({cursor:f.a.Pen})}},"Pen"),Object(_.h)("button",{"data-theme":"purple",onClick:function(){return r.setState({cursor:f.a.Spoid})}},"Spoid"),Object(_.h)("button",{"data-theme":"purple",onClick:function(){return r.setState({cursor:f.a.Eraser})}},"Eraser"),Object(_.h)("div",{class:"colorful"},Object(_.h)("input",{type:"input",maxLength:7,value:n.color,onInput:function(e){r.setState({color:e.target.value})}}),Object(_.h)("span",{class:"preview_colorful",style:"background: ".concat(n.color)})),Object(_.h)("input",{type:"number",min:0,max:100,maxLength:3,value:n.size,onInput:function(e){r.setState({size:parseInt(e.target.value,10)})}}),Object(_.h)("button",{"data-theme":"green",onClick:function(){return r.setState({radius:"round"})}},"Round"),Object(_.h)("button",{"data-theme":"green",onClick:function(){return r.setState({radius:"square"})}},"Square"),Object(_.h)("button",{onClick:function(){return r.undo()}},"Undo"),Object(_.h)("button",{onClick:function(){return r.redo()}},"Redo"),Object(_.h)("button",{onClick:function(){return r.clear()}},"Clear")),Object(_.h)("div",{id:"layer_menu"},Object(_.h)("button",{onClick:function(){return r.createLayer()}},"Create"),Object(_.h)("button",{"data-theme":"green",onClick:function(){return r.setState((function(e){var t=e.allLayer,n=t.findIndex((function(t){return e.currentLayer.id===t.id}));if(n>0){var r=t.splice(n,1)[0];t.splice(n-1,0,r)}return{allLayer:t}}),(function(){return r.reload()}))}},"UP"),Object(_.h)("button",{"data-theme":"green",onClick:function(){return r.setState((function(e){var t=e.allLayer,n=t.findIndex((function(t){return e.currentLayer.id===t.id}));if(n>-1&&n+1<t.length){var r=t.splice(n,1)[0];t.splice(n+1,0,r)}return{allLayer:t}}),(function(){return r.reload()}))}},"DOWN"),Object(_.h)("ul",null,n.allLayer.map((function(e){return Object(_.h)("li",{key:e.id,class:"layer_item ".concat(e.id===n.currentLayer.id?"selected":""),onClick:function(){return r.setState({currentLayer:e})}},e.name,Object(_.h)("span",{onClick:function(){return r.deleteLayer(e.id)}},"삭제"))})))))}}])&&o(r.prototype,a),l&&o(r,l),Object.defineProperty(r,"prototype",{writable:!1}),n}(_.Component));h.defaultProps={cWidth:1920,cHeight:1080}}).call(this,n("hosL").Fragment)},qVkA:function(e,t,n){"use strict";n.r(t);var r=n("hosL"),o=n("QRet"),i=n("q1hW");t.default=function(){return Object(o.a)((function(){document.title="Quick Drawing"}),[]),Object(r.h)("div",{id:"app"},Object(r.h)(i.a,{cWidth:1920,cHeight:1080}))}},z3l7:function(){}});