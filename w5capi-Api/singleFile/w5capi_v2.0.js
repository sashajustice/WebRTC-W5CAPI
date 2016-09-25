// Copyright 2014 W5RTC inc.
/*encrypted w5capi API file*/
!function(e){"use strict";function o(){}function t(e,o){if(a)return o.indexOf(e);for(var t=o.length;t--;)if(o[t]===e)return t;return-1}var n=o.prototype,a=Array.prototype.indexOf?!0:!1;n._getEvents=function(){return this._events||(this._events={})},n.getListeners=function(e){var o,t,n=this._getEvents();if("object"==typeof e){o={};for(t in n)n.hasOwnProperty(t)&&e.test(t)&&(o[t]=n[t])}else o=n[e]||(n[e]=[]);return o},n.getListenersAsObject=function(e){var o,t=this.getListeners(e);return t instanceof Array&&(o={},o[e]=t),o||t},n.addListener=function(e,o){var n,a=this.getListenersAsObject(e);for(n in a)a.hasOwnProperty(n)&&-1===t(o,a[n])&&a[n].push(o);return this},n.on=n.addListener,n.defineEvent=function(e){return this.getListeners(e),this},n.defineEvents=function(e){for(var o=0;o<e.length;o+=1)this.defineEvent(e[o]);return this},n.removeListener=function(e,o){var n,a,r=this.getListenersAsObject(e);for(a in r)r.hasOwnProperty(a)&&(n=t(o,r[a]),-1!==n&&r[a].splice(n,1));return this},n.off=n.removeListener,n.addListeners=function(e,o){return this.manipulateListeners(!1,e,o)},n.removeListeners=function(e,o){return this.manipulateListeners(!0,e,o)},n.manipulateListeners=function(e,o,t){var n,a,r=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof o||o instanceof RegExp)for(n=t.length;n--;)r.call(this,o,t[n]);else for(n in o)o.hasOwnProperty(n)&&(a=o[n])&&("function"==typeof a?r.call(this,n,a):s.call(this,n,a));return this},n.removeEvent=function(e){var o,t=typeof e,n=this._getEvents();if("string"===t)delete n[e];else if("object"===t)for(o in n)n.hasOwnProperty(o)&&e.test(o)&&delete n[o];else delete this._events;return this},n.emitEvent=function(e,o){var t,n,a,r=this.getListenersAsObject(e);for(n in r)if(r.hasOwnProperty(n))for(t=r[n].length;t--;)a=o?r[n][t].apply(null,o):r[n][t](),a===!0&&this.removeListener(e,r[n][t]);return this},n.trigger=n.emitEvent,n.emit=function(e){var o=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,o)},"function"==typeof define&&define.amd?define(function(){return o}):e.EventEmitter=o}(this),window.w5capi_SIP=new EventEmitter,function($){"use strict";var escape=/["\\\x00-\x1f\x7f-\x9f]/g,meta={"\b":"\\b","   ":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},hasOwn=Object.prototype.hasOwnProperty;$.toJSON="object"==typeof JSON&&JSON.stringify?JSON.stringify:function(e){if(null===e)return"null";var o,t,n,a,r=$.type(e);if("undefined"!==r){if("number"===r||"boolean"===r)return String(e);if("string"===r)return $.quoteString(e);if("function"==typeof e.toJSON)return $.toJSON(e.toJSON());if("date"===r){var s=e.getUTCMonth()+1,i=e.getUTCDate(),c=e.getUTCFullYear(),l=e.getUTCHours(),d=e.getUTCMinutes(),u=e.getUTCSeconds(),p=e.getUTCMilliseconds();return 10>s&&(s="0"+s),10>i&&(i="0"+i),10>l&&(l="0"+l),10>d&&(d="0"+d),10>u&&(u="0"+u),100>p&&(p="0"+p),10>p&&(p="0"+p),'"'+c+"-"+s+"-"+i+"T"+l+":"+d+":"+u+"."+p+'Z"'}if(o=[],$.isArray(e)){for(t=0;t<e.length;t++)o.push($.toJSON(e[t])||"null");return"["+o.join(",")+"]"}if("object"==typeof e){for(t in e)if(hasOwn.call(e,t)){if(r=typeof t,"number"===r)n='"'+t+'"';else{if("string"!==r)continue;n=$.quoteString(t)}r=typeof e[t],"function"!==r&&"undefined"!==r&&(a=$.toJSON(e[t]),o.push(n+":"+a))}return"{"+o.join(",")+"}"}}},$.evalJSON="object"==typeof JSON&&JSON.parse?JSON.parse:function(str){return eval("("+str+")")},$.secureEvalJSON="object"==typeof JSON&&JSON.parse?JSON.parse:function(str){var filtered=str.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"");if(/^[\],:{}\s]*$/.test(filtered))return eval("("+str+")");throw new SyntaxError("Error parsing JSON, source is not valid.")},$.quoteString=function(e){return e.match(escape)?'"'+e.replace(escape,function(e){var o=meta[e];return"string"==typeof o?o:(o=e.charCodeAt(),"\\u00"+Math.floor(o/16).toString(16)+(o%16).toString(16))})+'"':'"'+e+'"'}}(jQuery),function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports?require("jquery"):jQuery)}(function(e){function o(e){return i.raw?e:encodeURIComponent(e)}function t(e){return i.raw?e:decodeURIComponent(e)}function n(e){return o(i.json?JSON.stringify(e):String(e))}function a(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e=decodeURIComponent(e.replace(s," ")),i.json?JSON.parse(e):e}catch(o){}}function r(o,t){var n=i.raw?o:a(o);return e.isFunction(t)?t(n):n}var s=/\+/g,i=e.cookie=function(a,s,c){if(void 0!==s&&!e.isFunction(s)){if(c=e.extend({},i.defaults,c),"number"==typeof c.expires){var l=c.expires,d=c.expires=new Date;d.setTime(+d+864e5*l)}return document.cookie=[o(a),"=",n(s),c.expires?"; expires="+c.expires.toUTCString():"",c.path?"; path="+c.path:"",c.domain?"; domain="+c.domain:"",c.secure?"; secure":""].join("")}for(var u=a?void 0:{},p=document.cookie?document.cookie.split("; "):[],v=0,m=p.length;m>v;v++){var f=p[v].split("="),h=t(f.shift()),g=f.join("=");if(a&&a===h){u=r(g,s);break}a||void 0===(g=r(g))||(u[h]=g)}return u};i.defaults={},e.removeCookie=function(o,t){return void 0===e.cookie(o)?!1:(e.cookie(o,"",e.extend({},t,{expires:-1})),!e.cookie(o))}}),function(e){function o(e,o,n){return t(e,0,-1,o,n)}function t(e,o,t,n,a){for(var r=-1!=t?t:e.length,s=o;r>s;++s)if(0===e[s].indexOf(n)&&(!a||-1!==e[s].toLowerCase().indexOf(a.toLowerCase())))return s;return null}function n(e){var o=new RegExp("a=rtpmap:(\\d+) \\w+\\/\\d+"),t=e.match(o);return t&&2==t.length?t[1]:null}function a(){e.FSRTC.moz=!!navigator.mozGetUserMedia,navigator.getUserMedia||(navigator.getUserMedia=navigator.mozGetUserMedia||navigator.webkitGetUserMedia||navigator.msGetUserMedia)}function r(){return navigator.getUserMedia?!0:(alert("This application cannot function in this browser."),!1)}function s(e,o){console.log("There has been a problem retrieving the streams - did you allow access? Check Device Resolution",o),l(e,"onError",o)}function i(e,o){console.log("Stream Success"),l(e,"onStream",e.localStream)}function c(e,o){e.mediaData.candidate=o,e.mediaData.candidateList.push(e.mediaData.candidate),l(e,"onICE")}function l(e,o,t){o in e.options.callbacks&&e.options.callbacks[o](e,t)}function d(e,o){console.log("ICE Complete"),l(e,"onICEComplete")}function u(e,o){console.error("Channel Error",o),l(e,"onError",o)}function p(e,o){e.mediaData.SDP=e.stereoHack(o.sdp),console.log("ICE SDP"),l(e,"onICESDP")}function v(e,o){e.options.useVideo&&(e.options.useVideo.style.display="block");var t=e.options.useAudio;console.log("REMOTE STREAM",o,t),"undefined"!=typeof t.srcObject?t.srcObject=o:"undefined"!=typeof t.mozSrcObject?t.mozSrcObject=o:"undefined"!=typeof t.src?t.src=URL.createObjectURL(o):console.error("Error attaching stream to element."),e.options.useAudio.play(),e.remoteStream=o,l(e,"onRemoteStream",o)}function m(e,o){e.mediaData.SDP=e.stereoHack(o.sdp),console.log("Offer SDP"),l(e,"onOfferSDP")}function f(e){var o;e.options.useMic&&"none"===e.options.useMic?(console.log("Microphone Disabled"),o=!1):e.options.videoParams&&e.options.screenShare?(console.error("SCREEN SHARE"),o=!1):(o={mandatory:e.options.audioParams,optional:[]},"any"!==e.options.useMic&&(o.optional=[{sourceId:e.options.useMic}])),e.options.useVideo&&e.options.localVideo&&b({constraints:{audio:!1,video:{mandatory:e.options.videoParams,optional:[]}},localVideo:e.options.localVideo,onsuccess:function(e){self.options.localVideoStream=e,console.log("local video ready")},onerror:function(e){console.error("local video error!")}});var t={},n=e.options.videoParams.vertoBestFrameRate;delete e.options.videoParams.vertoBestFrameRate,window.moz?(t=e.options.videoParams,t.width||(t.width=t.minWidth),t.height||(t.height=t.minHeight),t.frameRate||(t.frameRate=t.minFrameRate)):t={mandatory:e.options.videoParams,optional:[]};var a=e.options.useVideo;return a&&e.options.useCamera&&"none"!==e.options.useCamera?(t.optional||(t.optional=[]),"any"!==e.options.useCamera&&t.optional.push({sourceId:e.options.useCamera}),n&&!window.moz&&t.optional.push({minFrameRate:n})):(console.log("Camera Disabled"),t=!1,a=!1),{audio:o,video:t,useVideo:a}}function g(e){function o(){v=!0,p=null,e.onICEComplete&&e.onICEComplete(),"offer"==e.type?(!moz||!e.sentICESDP&&_.localDescription.sdp.match(/a=candidate/)&&!w&&e.onICESDP)&&e.onICESDP(_.localDescription):!w&&e.onICESDP&&e.onICESDP(_.localDescription)}function t(){e.onOfferSDP&&_.createOffer(function(o){o.sdp=a(o.sdp),_.setLocalDescription(o),e.onOfferSDP(o),moz&&e.onICESDP&&o.sdp.match(/a=candidate/)&&(e.onICESDP(o),e.sentICESDP=1)},u,R)}function n(){"answer"==e.type&&(_.setRemoteDescription(new h(e.offerSDP),d,u),_.createAnswer(function(o){o.sdp=a(o.sdp),_.setLocalDescription(o),e.onAnswerSDP&&e.onAnswerSDP(o)},u,R))}function a(e){return e}function r(){!e.onChannelMessage||moz&&!e.onOfferSDP||(s(),moz&&navigator.mozGetUserMedia({audio:!0,fake:!0},function(e){_.addStream(e),t()},l))}function s(){E=_.createDataChannel(e.channel||"RTCDataChannel",moz?{}:{reliable:!1}),moz&&(E.binaryType="blob"),i()}function i(){E.onmessage=function(o){e.onChannelMessage&&e.onChannelMessage(o)},E.onopen=function(){e.onChannelOpened&&e.onChannelOpened(E)},E.onclose=function(o){e.onChannelClosed&&e.onChannelClosed(o),console.warn("WebRTC DataChannel closed",o)},E.onerror=function(o){e.onChannelError&&e.onChannelError(o),console.error("WebRTC DataChannel error",o)}}function c(){_.ondatachannel=function(e){E=e.channel,E.binaryType="blob",i()},moz&&navigator.mozGetUserMedia({audio:!0,fake:!0},function(e){_.addStream(e),n()},l)}function l(){log("Error in fake:true")}function d(){}function u(o){e.onChannelError&&e.onChannelError(o),console.error("sdp error:",o)}var p=!1,v=!1,m=window,f=m.mozRTCPeerConnection||m.webkitRTCPeerConnection,h=m.mozRTCSessionDescription||m.RTCSessionDescription,g=m.mozRTCIceCandidate||m.RTCIceCandidate,b={url:moz?"stun:23.21.150.121":"stun:stun.l.google.com:19302"},S=null;if(e.iceServers){var y=e.iceServers;"boolean"==typeof y&&(y=null),!y||"object"==typeof y&&y.constructor===Array||(console.warn("iceServers must be an array, reverting to default ice servers"),y=null),S={iceServers:y||[b]},moz||y||(S.iceServers=[b])}var C={optional:[]};moz||(C.optional=[{DtlsSrtpKeyAgreement:!0},{RtpDataChannels:e.onChannelMessage?!0:!1}]);var _=new f(S,C);r();var w=0;if(_.onicecandidate=function(t){v||(p||(p=setTimeout(o,1e3)),t?t.candidate&&e.onICE(t.candidate):(v=!0,p&&(clearTimeout(p),p=null),o()))},e.attachStream&&_.addStream(e.attachStream),e.attachStreams&&e.attachStream.length)for(var k=e.attachStreams,D=0;D<k.length;D++)_.addStream(k[D]);_.onaddstream=function(o){var t=o.stream;t.onended=function(){e.onRemoteStreamEnded&&e.onRemoteStreamEnded(t)},e.onRemoteStream&&e.onRemoteStream(t)};var R=e.constraints||{offerToReceiveAudio:!0,offerToReceiveVideo:!0};(e.onChannelMessage&&!moz||!e.onChannelMessage)&&(t(),n());var E;return e.onAnswerSDP&&moz&&e.onChannelMessage&&c(),{addAnswerSDP:function(e,o,t){_.setRemoteDescription(new h(e),o?o:d,t?t:u)},addICE:function(e){_.addIceCandidate(new g({sdpMLineIndex:e.sdpMLineIndex,candidate:e.candidate}))},peer:_,channel:E,sendData:function(e){E&&E.send(e)},stop:function(){_.close(),e.attachStream&&("function"==typeof e.attachStream.stop?e.attachStream.stop():e.attachStream.active=!1)}}}function b(e){function o(o){e.localVideo&&(e.localVideo[moz?"mozSrcObject":"src"]=moz?o:window.webkitURL.createObjectURL(o),e.localVideo.style.display="block"),e.onsuccess&&e.onsuccess(o),t=o}var t,n=navigator;return n.getMedia=n.webkitGetUserMedia||n.mozGetUserMedia,n.getMedia(e.constraints||{audio:!0,video:S},o,e.onerror||function(e){console.error(e)}),t}e.FSRTC=function(o){this.options=e.extend({useVideo:null,useStereo:!1,userData:null,localVideo:null,screenShare:!1,useCamera:"any",iceServers:!1,videoParams:{},audioParams:{},callbacks:{onICEComplete:function(){},onICE:function(){},onOfferSDP:function(){}}},o),this.audioEnabled=!0,this.videoEnabled=!0,this.mediaData={SDP:null,profile:{},candidateList:[]},moz?this.constraints={offerToReceiveAudio:!0,offerToReceiveVideo:this.options.useVideo?!0:!1}:this.constraints={optional:[{DtlsSrtpKeyAgreement:"true"}],mandatory:{OfferToReceiveAudio:!0,OfferToReceiveVideo:this.options.useVideo?!0:!1}},self.options.useVideo,a(),r()},e.FSRTC.validRes=[],e.FSRTC.prototype.useVideo=function(e,o){var t=this;e?(t.options.useVideo=e,t.options.localVideo=o,moz?t.constraints.offerToReceiveVideo=!0:t.constraints.mandatory.OfferToReceiveVideo=!0):(t.options.useVideo=null,t.options.localVideo=null,moz?t.constraints.offerToReceiveVideo=!1:t.constraints.mandatory.OfferToReceiveVideo=!1),t.options.useVideo},e.FSRTC.prototype.useStereo=function(e){var o=this;o.options.useStereo=e},e.FSRTC.prototype.stereoHack=function(e){var t=this;if(!t.options.useStereo)return e;var a,r=e.split("\r\n"),s=o(r,"a=rtpmap","opus/48000");if(!s)return e;a=n(r[s]);var i=o(r,"a=fmtp:"+a.toString());return null===i?r[s]=r[s]+"\r\na=fmtp:"+a.toString()+" stereo=1; sprop-stereo=1":r[i]=r[i].concat("; stereo=1; sprop-stereo=1"),e=r.join("\r\n")},e.FSRTC.prototype.answer=function(e,o,t){this.peer.addAnswerSDP({type:"answer",sdp:e},o,t)},e.FSRTC.prototype.stopPeer=function(){self.peer&&(console.log("stopping peer"),self.peer.stop())},e.FSRTC.prototype.stop=function(){var e=this;if(e.localStream){if("function"==typeof e.localStream.stop)e.localStream.stop();else if(e.localStream.active){var o=e.localStream.getTracks();console.error(o),o.forEach(function(e,o){console.log(e),e.stop()})}e.localStream=null}if(e.options.localVideoStream)if("function"==typeof e.options.localVideoStream.stop)e.options.localVideoStream.stop();else if(e.localVideoStream.active){var o=e.localVideoStream.getTracks();console.error(o),o.forEach(function(e,o){console.log(e),e.stop()})}e.peer&&(console.log("stopping peer"),e.peer.stop())},e.FSRTC.prototype.getMute=function(){var e=this;return e.audioEnabled},e.FSRTC.prototype.setMute=function(e){for(var o=this,t=o.localStream.getAudioTracks(),n=0,a=t.length;a>n;n++){switch(e){case"on":t[n].enabled=!0;break;case"off":t[n].enabled=!1;break;case"toggle":t[n].enabled=!t[n].enabled}o.audioEnabled=t[n].enabled}return!o.audioEnabled},e.FSRTC.prototype.getVideoMute=function(){var e=this;return e.videoEnabled},e.FSRTC.prototype.setVideoMute=function(e){for(var o=this,t=o.localStream.getVideoTracks(),n=0,a=t.length;a>n;n++){switch(e){case"on":t[n].enabled=!0;break;case"off":t[n].enabled=!1;break;case"toggle":t[n].enabled=!t[n].enabled}o.videoEnabled=t[n].enabled}return!o.videoEnabled},e.FSRTC.prototype.createAnswer=function(e){function o(e){n.localStream=e,n.peer=g({type:n.type,attachStream:n.localStream,onICE:function(e){return c(n,e)},onICEComplete:function(){return d(n)},onRemoteStream:function(e){return v(n,e)},onICESDP:function(e){return p(n,e)},onChannelError:function(e){return u(n,e)},constraints:n.constraints,iceServers:n.options.iceServers,offerSDP:{type:"offer",sdp:n.remoteSDP}}),i(n)}function t(e){s(n,e)}var n=this;n.type="answer",n.remoteSDP=e.sdp,console.debug("inbound sdp: ",e.sdp);var a=f(n);console.log("Audio constraints",a.audio),console.log("Video constraints",a.video),n.options.useVideo&&n.options.localVideo&&b({constraints:{audio:!1,video:{mandatory:n.options.videoParams,optional:[]}},localVideo:n.options.localVideo,onsuccess:function(e){n.options.localVideoStream=e,console.log("local video ready")},onerror:function(e){console.error("local video error!")}}),b({constraints:{audio:a.audio,video:a.video},video:a.useVideo,onsuccess:o,onerror:t})},e.FSRTC.prototype.call=function(e){function o(e){n.localStream=e,a&&(moz?n.constraints.OfferToReceiveVideo=!1:n.constraints.mandatory.OfferToReceiveVideo=!1),n.peer=g({type:n.type,attachStream:n.localStream,onICE:function(e){return c(n,e)},onICEComplete:function(){return d(n)},onRemoteStream:a?function(e){}:function(e){return v(n,e)},onOfferSDP:function(e){return m(n,e)},onICESDP:function(e){return p(n,e)},onChannelError:function(e){return u(n,e)},constraints:n.constraints,iceServers:n.options.iceServers}),i(n,e)}function t(e){s(n,e)}r();var n=this,a=!1;n.type="offer",n.options.videoParams&&n.options.screenShare&&(a=!0);var l=f(n);console.log("Audio constraints",l.audio),console.log("Video constraints",l.video),l.audio||l.video?b({constraints:{audio:l.audio,video:l.video},video:l.useVideo,onsuccess:o,onerror:t}):o(null)},window.moz=!!navigator.mozGetUserMedia;var S={mandatory:{},optional:[]};e.FSRTC.resSupported=function(o,t){for(var n in e.FSRTC.validRes)if(e.FSRTC.validRes[n][0]==o&&e.FSRTC.validRes[n][1]==t)return!0;return!1},e.FSRTC.bestResSupported=function(){var o=0,t=0;for(var n in e.FSRTC.validRes)e.FSRTC.validRes[n][0]>o&&e.FSRTC.validRes[n][1]>t&&(o=e.FSRTC.validRes[n][0],t=e.FSRTC.validRes[n][1]);return[o,t]};var y=[[320,180],[320,240],[640,360],[640,480],[1280,720],[1920,1080]],C=0,_=0,k=function(o,t){if(C>=y.length){var n={validRes:e.FSRTC.validRes,bestResSupported:e.FSRTC.bestResSupported()};if(localStorage.setItem("res_"+o,e.toJSON(n)),t)return t(n)}else{var a={mandatory:{},optional:[]};o&&(a.optional=[{sourceId:o}]),w=y[C][0],h=y[C][1],C++,a.mandatory={minWidth:w,minHeight:h,maxWidth:w,maxHeight:h},window.moz&&(a=a.mandatory,a.width||(a.width=a.minWidth),a.height||(a.height=a.minHeight),a.frameRate||(a.frameRate=a.minFrameRate)),b({constraints:{audio:0==_++,video:a},onsuccess:function(n){n.getTracks().forEach(function(e){e.stop()}),console.info(w+"x"+h+" supported."),e.FSRTC.validRes.push([w,h]),k(o,t)},onerror:function(e){console.error(w+"x"+h+" not supported."),k(o,t)}})}};e.FSRTC.getValidRes=function(o,t){var n=localStorage.getItem("res_"+o);if(n){var a=e.parseJSON(n);return a?(e.FSRTC.validRes=a.validRes,console.log("CACHED RES FOR CAM "+o,a)):console.error("INVALID CACHE"),t?t(a):null}e.FSRTC.validRes=[],C=0,k(o,t)},e.FSRTC.checkPerms=function(o,t,n){b({constraints:{audio:t,video:n},onsuccess:function(e){e.getTracks().forEach(function(e){e.stop()}),console.info("media perm init complete"),o&&setTimeout(o,100,!0)},onerror:function(a){return n&&t?(console.error("error, retesting with audio params only"),e.FSRTC.checkPerms(o,t,!1)):(console.error("media perm init error"),void(o&&o(!1)))}})}}(jQuery),function(e){e.JsonRpcClient=function(o){var t=this;this.options=e.extend({ajaxUrl:null,socketUrl:null,onmessage:null,login:null,passwd:null,sessid:null,loginParams:null,userVariables:null,getSocket:function(e){return t._getSocket(e)}},o),t.ws_cnt=0,this.wsOnMessage=function(e){t._wsOnMessage(e)}},e.JsonRpcClient.prototype._ws_socket=null,e.JsonRpcClient.prototype._ws_callbacks={},e.JsonRpcClient.prototype._current_id=1,e.JsonRpcClient.prototype.speedTest=function(e,o){var t=this.options.getSocket(this.wsOnMessage);if(null!==t){this.speedCB=o,this.speedBytes=e,t.send("#SPU "+e);var n,a=e/1024,r=e%1024,s=new Array(1024).join(".");for(n=0;a>n;n++)t.send("#SPB "+s);r&&t.send("#SPB "+s),t.send("#SPE")}},e.JsonRpcClient.prototype.call=function(o,t,n,a){t||(t={}),this.options.sessid&&(t.sessid=this.options.sessid);var r={jsonrpc:"2.0",method:o,params:t,id:this._current_id++};n||(n=function(e){console.log("Success: ",e)}),a||(a=function(e){console.log("Error: ",e)});var s=this.options.getSocket(this.wsOnMessage);if(null!==s)return void this._wsCall(s,r,n,a);if(null===this.options.ajaxUrl)throw"$.JsonRpcClient.call used with no websocket and no http endpoint.";e.ajax({type:"POST",url:this.options.ajaxUrl,data:e.toJSON(r),dataType:"json",cache:!1,success:function(e){"error"in e&&a(e.error,this),n(e.result,this)},error:function(o,t,n){try{var r=e.parseJSON(o.responseText);"console"in window&&console.log(r),a(r.error,this)}catch(s){a({error:o.responseText},this)}}})},e.JsonRpcClient.prototype.notify=function(o,t){this.options.sessid&&(t.sessid=this.options.sessid);var n={jsonrpc:"2.0",method:o,params:t},a=this.options.getSocket(this.wsOnMessage);if(null!==a)return void this._wsCall(a,n);if(null===this.options.ajaxUrl)throw"$.JsonRpcClient.notify used with no websocket and no http endpoint.";e.ajax({type:"POST",url:this.options.ajaxUrl,data:e.toJSON(n),dataType:"json",cache:!1})},e.JsonRpcClient.prototype.batch=function(o,t,n){var a=new e.JsonRpcClient._batchObject(this,t,n);o(a),a._execute()},e.JsonRpcClient.prototype.socketReady=function(){return null===this._ws_socket||this._ws_socket.readyState>1?!1:!0},e.JsonRpcClient.prototype.closeSocket=function(){var e=this;e.socketReady()&&(e._ws_socket.onclose=function(e){console.log("Closing Socket")},e._ws_socket.close())},e.JsonRpcClient.prototype.loginData=function(e){var o=this;o.options.login=e.login,o.options.passwd=e.passwd,o.options.loginParams=e.loginParams,o.options.userVariables=e.userVariables},e.JsonRpcClient.prototype.connectSocket=function(o){var t=this;return t.to&&clearTimeout(t.to),t.socketReady()||(t.authing=!1,t._ws_socket&&delete t._ws_socket,t._ws_socket=new WebSocket(t.options.socketUrl),t._ws_socket&&(t._ws_socket.onmessage=o,t._ws_socket.onclose=function(e){t.ws_sleep||(t.ws_sleep=1e3),t.options.onWSClose&&t.options.onWSClose(t),console.error("Websocket Lost "+t.ws_cnt+" sleep: "+t.ws_sleep+"msec"),t.to=setTimeout(function(){console.log("Attempting Reconnection...."),t.connectSocket(o)},t.ws_sleep),t.ws_cnt++,t.ws_sleep<3e3&&t.ws_cnt%10===0&&(t.ws_sleep+=1e3)},t._ws_socket.onopen=function(){t.to&&clearTimeout(t.to),t.ws_sleep=1e3,t.ws_cnt=0,t.options.onWSConnect&&t.options.onWSConnect(t);for(var o;o=e.JsonRpcClient.q.pop();)t._ws_socket.send(o)})),t._ws_socket?!0:!1},e.JsonRpcClient.prototype._getSocket=function(e){return null!==this.options.socketUrl&&"WebSocket"in window?(this.connectSocket(e),this._ws_socket):null},e.JsonRpcClient.q=[],e.JsonRpcClient.prototype._wsCall=function(o,t,n,a){var r=e.toJSON(t);o.readyState<1?(self=this,e.JsonRpcClient.q.push(r)):o.send(r),"id"in t&&"undefined"!=typeof n&&(this._ws_callbacks[t.id]={request:r,request_obj:t,success_cb:n,error_cb:a})},e.JsonRpcClient.prototype._wsOnMessage=function(o){var t;if("#"!=o.data[0]||"S"!=o.data[1]||"P"!=o.data[2]){try{if(t=e.parseJSON(o.data),"object"==typeof t&&"jsonrpc"in t&&"2.0"===t.jsonrpc){if("result"in t&&this._ws_callbacks[t.id]){var n=this._ws_callbacks[t.id].success_cb;return delete this._ws_callbacks[t.id],void n(t.result,this)}if("error"in t&&this._ws_callbacks[t.id]){var a=this._ws_callbacks[t.id].error_cb,r=this._ws_callbacks[t.id].request;return!self.authing&&-32e3==t.error.code&&self.options.login&&self.options.passwd?(self.authing=!0,void this.call("login",{login:self.options.login,passwd:self.options.passwd,loginParams:self.options.loginParams,userVariables:self.options.userVariables},"login"==this._ws_callbacks[t.id].request_obj.method?function(e){self.authing=!1,console.log("logged in"),delete self._ws_callbacks[t.id],self.options.onWSLogin&&self.options.onWSLogin(!0,self)}:function(e){self.authing=!1,console.log("logged in, resending request id: "+t.id);var o=self.options.getSocket(self.wsOnMessage);null!==o&&o.send(r),self.options.onWSLogin&&self.options.onWSLogin(!0,self)},function(e){console.log("error logging in, request id:",t.id),delete self._ws_callbacks[t.id],a(t.error,this),self.options.onWSLogin&&self.options.onWSLogin(!1,self)})):(delete this._ws_callbacks[t.id],void a(t.error,this))}}}catch(s){return void console.log("ERROR: "+s)}if("function"==typeof this.options.onmessage){o.eventData=t,o.eventData||(o.eventData={});var i=this.options.onmessage(o);if(i&&"object"==typeof i&&o.eventData.id){var c={jsonrpc:"2.0",id:o.eventData.id,result:i},l=self.options.getSocket(self.wsOnMessage);null!==l&&l.send(e.toJSON(c))}}}else if("U"==o.data[3])this.up_dur=parseInt(o.data.substring(4));else if(this.speedCB&&"D"==o.data[3]){this.down_dur=parseInt(o.data.substring(4));var d=(8*this.speedBytes/(this.up_dur/1e3)/1024).toFixed(0),u=(8*this.speedBytes/(this.down_dur/1e3)/1024).toFixed(0);console.info("Speed Test: Up: "+d+" Down: "+u),this.speedCB(o,{upDur:this.up_dur,downDur:this.down_dur,upKPS:d,downKPS:u}),this.speedCB=null}},e.JsonRpcClient._batchObject=function(e,o,t){this._requests=[],this.jsonrpcclient=e,this.all_done_cb=o,this.error_cb="function"==typeof t?t:function(){}},e.JsonRpcClient._batchObject.prototype.call=function(e,o,t,n){o||(o={}),this.options.sessid&&(o.sessid=this.options.sessid),t||(t=function(e){console.log("Success: ",e)}),n||(n=function(e){console.log("Error: ",e)}),this._requests.push({request:{jsonrpc:"2.0",method:e,params:o,id:this.jsonrpcclient._current_id++},success_cb:t,error_cb:n})},e.JsonRpcClient._batchObject.prototype.notify=function(e,o){this.options.sessid&&(o.sessid=this.options.sessid),this._requests.push({request:{jsonrpc:"2.0",method:e,params:o}})},e.JsonRpcClient._batchObject.prototype._execute=function(){var o=this;if(0!==this._requests.length){var t,n,a,r=[],s={},i=0,c=o.jsonrpcclient.options.getSocket(o.jsonrpcclient.wsOnMessage);if(null!==c){for(i=0;i<this._requests.length;i++)t=this._requests[i],n="success_cb"in t?t.success_cb:void 0,a="error_cb"in t?t.error_cb:void 0,o.jsonrpcclient._wsCall(c,t.request,n,a);return void("function"==typeof all_done_cb&&all_done_cb(result))}for(i=0;i<this._requests.length;i++)t=this._requests[i],r.push(t.request),"id"in t.request&&(s[t.request.id]={success_cb:t.success_cb,error_cb:t.error_cb});if(n=function(e){o._batchCb(e,s,o.all_done_cb)},null===o.jsonrpcclient.options.ajaxUrl)throw"$.JsonRpcClient.batch used with no websocket and no http endpoint.";e.ajax({url:o.jsonrpcclient.options.ajaxUrl,data:e.toJSON(r),dataType:"json",cache:!1,type:"POST",error:function(e,t,n){o.error_cb(e,t,n)},success:n})}},e.JsonRpcClient._batchObject.prototype._batchCb=function(e,o,t){for(var n=0;n<e.length;n++){var a=e[n];"error"in a?null!==a.id&&a.id in o?o[a.id].error_cb(a.error,this):"console"in window&&console.log(a):!(a.id in o)&&"console"in window?console.log(a):o[a.id].success_cb(a.result,this)}"function"==typeof t&&t(e)}}(jQuery),function(e){function o(e,o){console.error("drop unauthorized channel: "+o),delete e.eventSUBS[o]}function t(e,o){for(var t in e.eventSUBS[o])e.eventSUBS[o][t].ready=!0,console.log("subscribed to channel: "+o),e.eventSUBS[o][t].readyHandler&&e.eventSUBS[o][t].readyHandler(e,o)}function n(e,o,t,n){var a=n||{},r=a.local,s={eventChannel:o,userData:a.userData,handler:a.handler,ready:!1,readyHandler:a.readyHandler,serno:c++},i=!1;return e.eventSUBS[o]||(e.eventSUBS[o]=[],t.push(o),i=!0),e.eventSUBS[o].push(s),r&&(s.ready=!0,s.local=!0),!i&&e.eventSUBS[o][0].ready&&(s.ready=!0,s.readyHandler&&s.readyHandler(e,o)),{serno:s.serno,eventChannel:o}}function a(){e.verto.conf.prototype.listVideoLayouts=function(){this.modCommand("list-videoLayouts",null,null)},e.verto.conf.prototype.play=function(e){this.modCommand("play",null,e)},e.verto.conf.prototype.stop=function(){this.modCommand("stop",null,"all")},e.verto.conf.prototype.record=function(e){this.modCommand("recording",null,["start",e])},e.verto.conf.prototype.stopRecord=function(){this.modCommand("recording",null,["stop","all"])},e.verto.conf.prototype.snapshot=function(e){if(!this.params.hasVid)throw"Conference has no video";this.modCommand("vid-write-png",null,e)},e.verto.conf.prototype.setVideoLayout=function(e){if(!this.params.hasVid)throw"Conference has no video";this.modCommand("vid-layout",null,e)},e.verto.conf.prototype.kick=function(e){this.modCommand("kick",parseInt(e))},e.verto.conf.prototype.muteMic=function(e){this.modCommand("tmute",parseInt(e))},e.verto.conf.prototype.muteVideo=function(e){if(!this.params.hasVid)throw"Conference has no video";this.modCommand("tvmute",parseInt(e))},e.verto.conf.prototype.presenter=function(e){if(!this.params.hasVid)throw"Conference has no video";this.modCommand("vid-res-id",parseInt(e),"presenter")},e.verto.conf.prototype.videoFloor=function(e){if(!this.params.hasVid)throw"Conference has no video";this.modCommand("vid-floor",parseInt(e),"force")},e.verto.conf.prototype.banner=function(e,o){if(!this.params.hasVid)throw"Conference has no video";this.modCommand("vid-banner",parseInt(e),escape(o))},e.verto.conf.prototype.volumeDown=function(e){if(!this.params.hasVid)throw"Conference has no video";this.modCommand("volume_in",parseInt(e),"down")},e.verto.conf.prototype.volumeUp=function(e){if(!this.params.hasVid)throw"Conference has no video";this.modCommand("volume_in",parseInt(e),"up")},e.verto.conf.prototype.transfer=function(e,o){if(!this.params.hasVid)throw"Conference has no video";this.modCommand("transfer",parseInt(e),o)},e.verto.conf.prototype.sendChat=function(e,o){var t=this;t.verto.rpcClient.call("verto.broadcast",{eventChannel:t.params.laData.chatChannel,data:{action:"send",message:e,type:o}})}}function r(o,t){return t==e.verto["enum"].state.purge||e.verto["enum"].states[o.name][t.name]?!0:!1}function s(o){for(var t in e.verto.audioOutDevices){var n=e.verto.audioOutDevices[t];if(n.id===o)return n.label}return o}var i="undefined"!=typeof window.crypto&&"undefined"!=typeof window.crypto.getRandomValues?function(){var e=new Uint16Array(8);window.crypto.getRandomValues(e);var o=function(e){for(var o=e.toString(16);o.length<4;)o="0"+o;return o};return o(e[0])+o(e[1])+"-"+o(e[2])+"-"+o(e[3])+"-"+o(e[4])+"-"+o(e[5])+o(e[6])+o(e[7])}:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var o=16*Math.random()|0,t="x"==e?o:3&o|8;return t.toString(16)})};e.verto=function(o,t){var n=this;e.verto.saved.push(n),n.options=e.extend({login:null,passwd:null,socketUrl:null,tag:null,localTag:null,videoParams:{},audioParams:{},loginParams:{},deviceParams:{onResCheck:null},userVariables:{},iceServers:!1,ringSleep:6e3,sessid:null},o),n.options.deviceParams.useCamera&&e.FSRTC.getValidRes(n.options.deviceParams.useCamera,n.options.deviceParams.onResCheck),n.options.deviceParams.useMic||(n.options.deviceParams.useMic="any"),n.options.deviceParams.useSpeak||(n.options.deviceParams.useSpeak="any"),n.options.sessid?n.sessid=n.options.sessid:(n.sessid=localStorage.getItem("verto_session_uuid")||i(),localStorage.setItem("verto_session_uuid",n.sessid)),n.dialogs={},n.callbacks=t||{},n.eventSUBS={},n.rpcClient=new e.JsonRpcClient({login:n.options.login,passwd:n.options.passwd,socketUrl:n.options.socketUrl,loginParams:n.options.loginParams,userVariables:n.options.userVariables,sessid:n.sessid,onmessage:function(e){return n.handleMessage(e.eventData)},onWSConnect:function(e){e.call("login",{})},onWSLogin:function(e){n.callbacks.onWSLogin&&n.callbacks.onWSLogin(n,e)},onWSClose:function(e){n.callbacks.onWSClose&&n.callbacks.onWSClose(n,e),n.purge()}}),n.options.ringFile&&n.options.tag&&(n.ringer=e("#"+n.options.tag)),n.rpcClient.call("login",{})},e.verto.prototype.deviceParams=function(o){var t=this;for(var n in o)t.options.deviceParams[n]=o[n];o.useCamera&&e.FSRTC.getValidRes(t.options.deviceParams.useCamera,o?o.onResCheck:void 0)},e.verto.prototype.videoParams=function(e){var o=this;for(var t in e)o.options.videoParams[t]=e[t]},e.verto.prototype.iceServers=function(e){var o=this;o.options.iceServers=e},e.verto.prototype.loginData=function(e){var o=this;o.options.login=e.login,o.options.passwd=e.passwd,o.rpcClient.loginData(e)},e.verto.prototype.logout=function(e){var o=this;o.rpcClient.closeSocket(),o.callbacks.onWSClose&&o.callbacks.onWSClose(o,!1),o.purge()},e.verto.prototype.login=function(e){var o=this;o.logout(),o.rpcClient.call("login",{})},e.verto.prototype.message=function(e){var o=this,t=0;return e.to||(console.error("Missing To"),t++),e.body||(console.error("Missing Body"),t++),t?!1:(o.sendMethod("verto.info",{msg:e}),!0)},e.verto.prototype.processReply=function(e,n,a){var r,s=this;switch(e){case"verto.subscribe":for(r in a.unauthorizedChannels)o(s,a.unauthorizedChannels[r]);for(r in a.subscribedChannels)t(s,a.subscribedChannels[r]);break;case"verto.unsubscribe":}},e.verto.prototype.sendMethod=function(e,o){var t=this;t.rpcClient.call(e,o,function(o){t.processReply(e,!0,o)},function(o){t.processReply(e,!1,o)})};var c=1;e.verto.prototype.subscribe=function(e,o){
var t=this,a=[],r=[],s=o||{};if("string"==typeof e)a.push(n(t,e,r,s));else for(var i in e)a.push(n(t,e,r,s));return r.length&&t.sendMethod("verto.subscribe",{eventChannel:1==r.length?r[0]:r,subParams:s.subParams}),a},e.verto.prototype.unsubscribe=function(e){var o,t=this;if(e){var n,a={},r=[];if("string"==typeof e)delete t.eventSUBS[e],a[e]++;else for(o in e)if("string"==typeof e[o])n=e[o],delete t.eventSUBS[n],a[n]++;else{var s=[];n=e[o].eventChannel;for(var i in t.eventSUBS[n])t.eventSUBS[n][i].serno==e[o].serno||s.push(t.eventSUBS[n][i]);t.eventSUBS[n]=s,0===t.eventSUBS[n].length&&(delete t.eventSUBS[n],a[n]++)}for(var c in a)console.log("Sending Unsubscribe for: ",c),r.push(c);r.length&&t.sendMethod("verto.unsubscribe",{eventChannel:1==r.length?r[0]:r})}else for(o in t.eventSUBS)t.eventSUBS[o]&&t.unsubscribe(t.eventSUBS[o])},e.verto.prototype.broadcast=function(e,o){var t=this,n={eventChannel:e,data:{}};for(var a in o)n.data[a]=o[a];t.sendMethod("verto.broadcast",n)},e.verto.prototype.purge=function(o){var t,n=this,a=0;for(t in n.dialogs)a||console.log("purging dialogs"),a++,n.dialogs[t].setState(e.verto["enum"].state.purge);for(t in n.eventSUBS)n.eventSUBS[t]&&(console.log("purging subscription: "+t),delete n.eventSUBS[t])},e.verto.prototype.hangup=function(e){var o=this;if(e){var t=o.dialogs[e];t&&t.hangup()}else for(var n in o.dialogs)o.dialogs[n].hangup()},e.verto.prototype.newCall=function(o,t){var n=this;if(!n.rpcClient.socketReady())return void console.error("Not Connected...");var a=new e.verto.dialog(e.verto["enum"].direction.outbound,this,o);return a.invite(),t&&(a.callbacks=t),a},e.verto.prototype.handleMessage=function(o){var t=this;if(!o||!o.method)return void console.error("Invalid Data",o);if(o.params.callID){var n=t.dialogs[o.params.callID];if("verto.attach"===o.method&&n&&(delete n.verto.dialogs[n.callID],n.rtc.stop(),n=null),n)switch(o.method){case"verto.bye":n.hangup(o.params);break;case"verto.answer":n.handleAnswer(o.params);break;case"verto.media":n.handleMedia(o.params);break;case"verto.display":n.handleDisplay(o.params);break;case"verto.info":n.handleInfo(o.params);break;default:console.debug("INVALID METHOD OR NON-EXISTANT CALL REFERENCE IGNORED",n,o.method)}else switch(o.method){case"verto.attach":o.params.attach=!0,o.params.sdp&&o.params.sdp.indexOf("m=video")>0&&(o.params.useVideo=!0),o.params.sdp&&o.params.sdp.indexOf("stereo=1")>0&&(o.params.useStereo=!0),n=new e.verto.dialog(e.verto["enum"].direction.inbound,t,o.params),n.setState(e.verto["enum"].state.recovering);break;case"verto.invite":o.params.sdp&&o.params.sdp.indexOf("m=video")>0&&(o.params.wantVideo=!0),o.params.sdp&&o.params.sdp.indexOf("stereo=1")>0&&(o.params.useStereo=!0),n=new e.verto.dialog(e.verto["enum"].direction.inbound,t,o.params);break;default:console.debug("INVALID METHOD OR NON-EXISTANT CALL REFERENCE IGNORED")}return{method:o.method}}switch(o.method){case"verto.punt":t.purge(),t.logout();break;case"verto.event":var a=null,r=null;if(o.params&&(r=o.params.eventChannel),r&&(a=t.eventSUBS[r],a||(a=t.eventSUBS[r.split(".")[0]])),!a&&r&&r===t.sessid)t.callbacks.onMessage&&t.callbacks.onMessage(t,null,e.verto["enum"].message.pvtEvent,o.params);else if(!a&&r&&t.dialogs[r])t.dialogs[r].sendMessage(e.verto["enum"].message.pvtEvent,o.params);else if(a)for(var s in a){var i=a[s];i&&i.ready?i.handler?i.handler(t,o.params,i.userData):t.callbacks.onEvent?t.callbacks.onEvent(t,o.params,i.userData):console.log("EVENT:",o.params):console.error("invalid EVENT for "+r+" IGNORED")}else r||(r="UNDEFINED"),console.error("UNSUBBED or invalid EVENT "+r+" IGNORED");break;case"verto.info":t.callbacks.onMessage&&t.callbacks.onMessage(t,null,e.verto["enum"].message.info,o.params.msg),console.debug("MESSAGE from: "+o.params.msg.from,o.params.msg.body);break;default:console.error("INVALID METHOD OR NON-EXISTANT CALL REFERENCE IGNORED",o.method)}};var l=function(e,o){for(var t=[],n=e.length,a=0;n>a;a++)e[a]!=o&&t.push(e[a]);return t},d=function(){var e=this,o={},t=[];e.reorder=function(e){t=e;var n=o;o={};for(var a=t.length,r=0;a>r;r++){var s=t[r];n[s]&&(o[s]=n[s],delete n[s])}n=void 0},e.clear=function(){o=void 0,t=void 0,o={},t=[]},e.add=function(e,n,a){var r=!1;if(!o[e])if(void 0===a||0>a||a>=t.length)t.push(e);else{for(var s=0,i=[],c=t.length,l=0;c>l;l++)s++==a&&i.push(e),i.push(t[l]);t=void 0,t=i,i=void 0,r=!0}return o[e]=n,r},e.del=function(e){var n=!1;return o[e]?(t=l(t,e),delete o[e],n=!0):console.error("can't del nonexistant key "+e),n},e.get=function(e){return o[e]},e.order=function(){return t},e.hash=function(){return o},e.indexOf=function(e){for(var o=t.length,n=0;o>n;n++)if(t[n]==e)return n},e.arrayLen=function(){return t.length},e.asArray=function(){for(var e=[],n=t.length,a=0;n>a;a++){var r=t[a];e.push(o[r])}return e},e.each=function(e){for(var n=t.length,a=0;n>a;a++)e(t[a],o[t[a]])},e.dump=function(o){var t="";return e.each(function(e,n){t+="name: "+e+" val: "+JSON.stringify(n)+(o?"<br>":"\n")}),t}};e.verto.liveArray=function(e,o,t,n){var a=this,r=0,s=null,i=n.userObj;d.call(a),a._add=a.add,a._del=a.del,a._reorder=a.reorder,a._clear=a.clear,a.context=o,a.name=t,a.user_obj=i,a.verto=e,a.broadcast=function(o,t){e.broadcast(o,t)},a.errs=0,a.clear=function(){a._clear(),r=0,a.onChange&&a.onChange(a,{action:"clear"})},a.checkSerno=function(e){return 0>e?!0:r>0&&e!=r+1?(a.onErr&&a.onErr(a,{lastSerno:r,serno:e}),a.errs++,console.debug(a.errs),a.errs<3&&a.bootstrap(a.user_obj),!1):(r=e,!0)},a.reorder=function(e,o){a.checkSerno(e)&&(a._reorder(o),a.onChange&&a.onChange(a,{serno:e,action:"reorder"}))},a.init=function(e,o,t,n){(null===t||void 0===t)&&(t=e),a.checkSerno(e)&&a.onChange&&a.onChange(a,{serno:e,action:"init",index:n,key:t,data:o})},a.bootObj=function(e,o){if(a.checkSerno(e)){for(var t in o)a._add(o[t][0],o[t][1]);a.onChange&&a.onChange(a,{serno:e,action:"bootObj",data:o,redraw:!0})}},a.add=function(e,o,t,n){if((null===t||void 0===t)&&(t=e),a.checkSerno(e)){var r=a._add(t,o,n);a.onChange&&a.onChange(a,{serno:e,action:"add",index:n,key:t,data:o,redraw:r})}},a.modify=function(e,o,t,n){(null===t||void 0===t)&&(t=e),a.checkSerno(e)&&(a._add(t,o,n),a.onChange&&a.onChange(a,{serno:e,action:"modify",key:t,data:o,index:n}))},a.del=function(e,o,t){if((null===o||void 0===o)&&(o=e),a.checkSerno(e)){(null===t||0>t||void 0===t)&&(t=a.indexOf(o));var n=a._del(o);n&&a.onChange&&a.onChange(a,{serno:e,action:"del",key:o,index:t})}};var c=function(e,o,t){var n=o.data;if(n.name==t.name)switch(n.action){case"init":t.init(n.wireSerno,n.data,n.hashKey,n.arrIndex);break;case"bootObj":t.bootObj(n.wireSerno,n.data);break;case"add":t.add(n.wireSerno,n.data,n.hashKey,n.arrIndex);break;case"modify":n.arrIndex||n.hashKey?t.modify(n.wireSerno,n.data,n.hashKey,n.arrIndex):console.error("Invalid Packet",n);break;case"del":n.arrIndex||n.hashKey?t.del(n.wireSerno,n.hashKey,n.arrIndex):console.error("Invalid Packet",n);break;case"clear":t.clear();break;case"reorder":t.reorder(n.wireSerno,n.order);break;default:t.checkSerno(n.wireSerno)&&t.onChange&&t.onChange(t,{serno:n.wireSerno,action:n.action,data:n.data})}};a.context&&(s=a.verto.subscribe(a.context,{handler:c,userData:a,subParams:n.subParams})),a.destroy=function(){a._clear(),a.verto.unsubscribe(s)},a.sendCommand=function(e,o){var t=a;t.broadcast(t.context,{liveArray:{command:e,context:t.context,name:t.name,obj:o}})},a.bootstrap=function(e){a.sendCommand("bootstrap",e)},a.changepage=function(e){var o=a;o.clear(),o.broadcast(o.context,{liveArray:{command:"changepage",context:a.context,name:a.name,obj:e}})},a.heartbeat=function(e){var o=a,t=function(){o.heartbeat.call(o,e)};o.broadcast(o.context,{liveArray:{command:"heartbeat",context:o.context,name:o.name,obj:e}}),o.hb_pid=setTimeout(t,3e4)},a.bootstrap(a.user_obj)},e.verto.liveTable=function(o,t,n,a,r){function s(o){if("string"==typeof o[4]&&o[4].indexOf("{")>-1){var t=e.parseJSON(o[4]);o[4]=t.oldStatus,o[5]=null}return o}function i(e){var o=e.asArray();for(var t in o)o[t]=s(o[t]);return o}var c,l=new e.verto.liveArray(o,t,n,{subParams:r.subParams}),d=this;d.liveArray=l,d.dataTable=c,d.verto=o,d.destroy=function(){c&&c.fnDestroy(),l&&l.destroy(),c=null,l=null},l.onErr=function(e,o){console.error("Error: ",e,o)},l.onChange=function(e,o){var t=0,n=0;if(!c){if(!r.aoColumns){if("init"!=o.action)return;r.aoColumns=[];for(var d in o.data)r.aoColumns.push({sTitle:o.data[d]})}c=a.dataTable(r)}if(c&&("del"==o.action||"modify"==o.action)&&(t=o.index,void 0===t&&o.key&&(t=l.indexOf(o.key)),void 0===t))return void console.error("INVALID PACKET Missing INDEX\n",o);r.onChange&&r.onChange(e,o);try{switch(o.action){case"bootObj":if(!o.data)return void console.error("missing data");c.fnClearTable(),c.fnAddData(i(e)),c.fnAdjustColumnSizing();break;case"add":if(!o.data)return void console.error("missing data");o.redraw>-1?(c.fnClearTable(),c.fnAddData(i(e))):c.fnAddData(s(o.data)),c.fnAdjustColumnSizing();break;case"modify":if(!o.data)return;c.fnUpdate(s(o.data),t),c.fnAdjustColumnSizing();break;case"del":c.fnDeleteRow(t),c.fnAdjustColumnSizing();break;case"clear":c.fnClearTable();break;case"reorder":c.fnClearTable(),c.fnAddData(i(e));break;case"hide":a.hide();break;case"show":a.show()}}catch(u){console.error("ERROR: "+u),n++}n?(e.errs++,e.errs<3&&e.bootstrap(e.user_obj)):e.errs=0},l.onChange(l,{action:"init"})};var u=1;e.verto.conf=function(o,t){var n=this;n.params=e.extend({dialog:null,hasVid:!1,laData:null,onBroadcast:null,onLaChange:null,onLaRow:null},t),n.verto=o,n.serno=u++,a(),o.subscribe(n.params.laData.modChannel,{handler:function(e,t){n.params.onBroadcast&&n.params.onBroadcast(o,n,t.data)}}),o.subscribe(n.params.laData.chatChannel,{handler:function(e,o){"function"==typeof n.params.chatCallback&&n.params.chatCallback(e,o)}})},e.verto.conf.prototype.modCommand=function(e,o,t){var n=this;n.verto.rpcClient.call("verto.broadcast",{eventChannel:n.params.laData.modChannel,data:{application:"conf-control",command:e,id:o,value:t}})},e.verto.conf.prototype.destroy=function(){var e=this;e.destroyed=!0,e.params.onBroadcast(e.verto,e,"destroy"),e.params.laData.modChannel&&e.verto.unsubscribe(e.params.laData.modChannel),e.params.laData.chatChannel&&e.verto.unsubscribe(e.params.laData.chatChannel)},e.verto.modfuncs={},e.verto.confMan=function(o,t){function n(o){var t="play_"+r.serno,n="stop_"+r.serno,a="recording_"+r.serno,s="snapshot_"+r.serno,i="recording_stop"+r.serno,c="confman_"+r.serno,l="<div id='"+c+"'><br><button class='ctlbtn' id='"+t+"'>Play</button><button class='ctlbtn' id='"+n+"'>Stop</button><button class='ctlbtn' id='"+a+"'>Record</button><button class='ctlbtn' id='"+i+"'>Record Stop</button>"+(r.params.hasVid?"<button class='ctlbtn' id='"+s+"'>PNG Snapshot</button>":"")+"<br><br></div>";if(o.html(l),e.verto.modfuncs.change_video_layout=function(o,t){var n=e("#"+o+" option:selected").text();"none"!==n&&r.modCommand("vid-layout",null,[n,t])},r.params.hasVid){for(var d=0;d<r.canvasCount;d++){var u="confman_vid_layout_"+d+"_"+r.serno,p="confman_vl_select_"+d+"_"+r.serno,v="<div id='"+u+"'><br><b>Video Layout Canvas "+(d+1)+"</b> <select onChange='$.verto.modfuncs.change_video_layout(\""+u+'", "'+d+"\")' id='"+p+"'></select> <br><br></div>";o.append(v)}e("#"+s).click(function(){var e=prompt("Please enter file name","");e&&r.modCommand("vid-write-png",null,e)})}e("#"+t).click(function(){var e=prompt("Please enter file name","");e&&r.modCommand("play",null,e)}),e("#"+n).click(function(){r.modCommand("stop",null,"all")}),e("#"+a).click(function(){var e=prompt("Please enter file name","");e&&r.modCommand("recording",null,["start",e])}),e("#"+i).click(function(){r.modCommand("recording",null,["stop","all"])})}function a(o,t){var n=parseInt(t),a="kick_"+n,s="canvas_in_next_"+n,i="canvas_in_prev_"+n,c="canvas_out_next_"+n,l="canvas_out_prev_"+n,d="canvas_in_set_"+n,u="canvas_out_set_"+n,p="layer_set_"+n,v="layer_next_"+n,m="layer_prev_"+n,f="tmute_"+n,h="tvmute_"+n,g="vbanner_"+n,b="tvpresenter_"+n,S="tvfloor_"+n,y="box_"+n,C="volume_in_up"+n,_="volume_in_dn"+n,w="transfer"+n,k="<div id='"+y+"'>";return k+="<b>General Controls</b><hr noshade>",k+="<button class='ctlbtn' id='"+a+"'>Kick</button><button class='ctlbtn' id='"+f+"'>Mute</button><button class='ctlbtn' id='"+_+"'>Vol -</button><button class='ctlbtn' id='"+C+"'>Vol +</button><button class='ctlbtn' id='"+w+"'>Transfer</button>",r.params.hasVid&&(k+="<br><br><b>Video Controls</b><hr noshade>",k+="<button class='ctlbtn' id='"+h+"'>VMute</button><button class='ctlbtn' id='"+b+"'>Presenter</button><button class='ctlbtn' id='"+S+"'>Vid Floor</button><button class='ctlbtn' id='"+g+"'>Banner</button>",r.canvasCount>1&&(k+="<br><br><b>Canvas Controls</b><hr noshade><button class='ctlbtn' id='"+d+"'>Set Input Canvas</button><button class='ctlbtn' id='"+i+"'>Prev Input Canvas</button><button class='ctlbtn' id='"+s+"'>Next Input Canvas</button><br><button class='ctlbtn' id='"+u+"'>Set Watching Canvas</button><button class='ctlbtn' id='"+l+"'>Prev Watching Canvas</button><button class='ctlbtn' id='"+c+"'>Next Watching Canvas</button>"),k+="<br><button class='ctlbtn' id='"+p+"'>Set Layer</button><button class='ctlbtn' id='"+m+"'>Prev Layer</button><button class='ctlbtn' id='"+v+"'>Next Layer</button></div>"),o.html(k),o.data("mouse")||e("#"+y).hide(),o.mouseover(function(t){o.data({mouse:!0}),e("#"+y).show()}),o.mouseout(function(t){o.data({mouse:!1}),e("#"+y).hide()}),e("#"+w).click(function(){var e=prompt("Enter Extension");e&&r.modCommand("transfer",n,e)}),e("#"+a).click(function(){r.modCommand("kick",n)}),e("#"+p).click(function(){var e=prompt("Please enter layer ID","");e&&r.modCommand("vid-layer",n,e)}),e("#"+v).click(function(){r.modCommand("vid-layer",n,"next")}),e("#"+m).click(function(){r.modCommand("vid-layer",n,"prev")}),e("#"+d).click(function(){var e=prompt("Please enter canvas ID","");e&&r.modCommand("vid-canvas",n,e)}),e("#"+u).click(function(){var e=prompt("Please enter canvas ID","");e&&r.modCommand("vid-watching-canvas",n,e)}),e("#"+s).click(function(){r.modCommand("vid-canvas",n,"next")}),e("#"+i).click(function(){r.modCommand("vid-canvas",n,"prev")}),e("#"+c).click(function(){r.modCommand("vid-watching-canvas",n,"next")}),e("#"+l).click(function(){r.modCommand("vid-watching-canvas",n,"prev")}),e("#"+f).click(function(){r.modCommand("tmute",n)}),r.params.hasVid&&(e("#"+h).click(function(){r.modCommand("tvmute",n)}),e("#"+b).click(function(){r.modCommand("vid-res-id",n,"presenter")}),e("#"+S).click(function(){r.modCommand("vid-floor",n,"force")}),e("#"+g).click(function(){var e=prompt("Please enter text","");e&&r.modCommand("vid-banner",n,escape(e))})),e("#"+C).click(function(){r.modCommand("volume_in",n,"up")}),e("#"+_).click(function(){r.modCommand("volume_in",n,"down")}),k}var r=this;r.params=e.extend({tableID:null,statusID:null,mainModID:null,dialog:null,hasVid:!1,laData:null,onBroadcast:null,onLaChange:null,onLaRow:null},t),r.verto=o,r.serno=u++,r.canvasCount=r.params.laData.canvasCount;var s="",i=0;o.subscribe(r.params.laData.chatChannel,{handler:function(e,o){"function"==typeof r.params.chatCallback&&r.params.chatCallback(e,o)}}),"moderator"===r.params.laData.role&&(s="Action",i=600,r.params.mainModID?(n(e(r.params.mainModID)),e(r.params.displayID).html("Moderator Controls Ready<br><br>")):e(r.params.mainModID).html(""),o.subscribe(r.params.laData.modChannel,{handler:function(t,n){if(r.params.onBroadcast&&r.params.onBroadcast(o,r,n.data),"list-videoLayouts"===n.data["conf-command"])for(var a=0;a<r.canvasCount;a++){var s,i="#confman_vl_select_"+a+"_"+r.serno,c="#confman_vid_layout_"+a+"_"+r.serno,l=0;if(e(i).selectmenu({}),e(i).selectmenu("enable"),e(i).empty(),e(i).append(new Option("Choose a Layout","none")),n.data.responseData){s=n.data.responseData.sort();for(var d in s)e(i).append(new Option(s[d],s[d])),l++}l?e(i).selectmenu("refresh",!0):e(c).hide()}else!r.destroyed&&r.params.displayID&&(e(r.params.displayID).html(n.data.response+"<br><br>"),r.lastTimeout&&(clearTimeout(r.lastTimeout),r.lastTimeout=0),r.lastTimeout=setTimeout(function(){e(r.params.displayID).html(r.destroyed?"":"Moderator Controls Ready<br><br>")},4e3))}}),r.params.hasVid&&r.modCommand("list-videoLayouts",null,null));var c=null;"moderator"===r.params.laData.role&&(c=function(t,n,s,i){if(!n[5]){var c=e("td:eq(5)",t);a(c,n),r.params.onLaRow&&r.params.onLaRow(o,r,c,n)}}),r.lt=new e.verto.liveTable(o,r.params.laData.laChannel,r.params.laData.laName,e(r.params.tableID),{subParams:{callID:r.params.dialog?r.params.dialog.callID:null},onChange:function(t,n){e(r.params.statusID).text("Conference Members:  ("+t.arrayLen()+" Total)"),r.params.onLaChange&&r.params.onLaChange(o,r,e.verto["enum"].confEvent.laChange,t,n)},aaData:[],aoColumns:[{sTitle:"ID",sWidth:"50"},{sTitle:"Number",sWidth:"250"},{sTitle:"Name",sWidth:"250"},{sTitle:"Codec",sWidth:"100"},{sTitle:"Status",sWidth:r.params.hasVid?"200px":"150px"},{sTitle:s,sWidth:i}],bAutoWidth:!0,bDestroy:!0,bSort:!1,bInfo:!1,bFilter:!1,bLengthChange:!1,bPaginate:!1,iDisplayLength:1400,oLanguage:{sEmptyTable:"The Conference is Empty....."},fnRowCallback:c})},e.verto.confMan.prototype.modCommand=function(e,o,t){var n=this;n.verto.rpcClient.call("verto.broadcast",{eventChannel:n.params.laData.modChannel,data:{application:"conf-control",command:e,id:o,value:t}})},e.verto.confMan.prototype.sendChat=function(e,o){var t=this;t.verto.rpcClient.call("verto.broadcast",{eventChannel:t.params.laData.chatChannel,data:{action:"send",message:e,type:o}})},e.verto.confMan.prototype.destroy=function(){var o=this;o.destroyed=!0,o.lt&&o.lt.destroy(),o.params.laData.chatChannel&&o.verto.unsubscribe(o.params.laData.chatChannel),o.params.laData.modChannel&&o.verto.unsubscribe(o.params.laData.modChannel),o.params.mainModID&&e(o.params.mainModID).html("")},e.verto.dialog=function(o,t,n){var a=this;a.params=e.extend({useVideo:t.options.useVideo,useStereo:t.options.useStereo,screenShare:!1,useCamera:t.options.deviceParams.useCamera,useMic:t.options.deviceParams.useMic,useSpeak:t.options.deviceParams.useSpeak,tag:t.options.tag,localTag:t.options.localTag,login:t.options.login,videoParams:t.options.videoParams},n),a.verto=t,a.direction=o,a.lastState=null,a.state=a.lastState=e.verto["enum"].state["new"],a.callbacks=t.callbacks,a.answered=!1,a.attach=n.attach||!1,a.screenShare=n.screenShare||!1,a.useCamera=a.params.useCamera,a.useMic=a.params.useMic,a.useSpeak=a.params.useSpeak,a.params.callID?a.callID=a.params.callID:a.callID=a.params.callID=i(),a.params.tag&&(a.audioStream=document.getElementById(a.params.tag),a.params.useVideo&&(a.videoStream=a.audioStream)),a.params.localTag&&(a.localVideo=document.getElementById(a.params.localTag)),a.verto.dialogs[a.callID]=a;var r={};a.direction==e.verto["enum"].direction.inbound?("outbound"===a.params.display_direction?(a.params.remote_caller_id_name=a.params.caller_id_name,a.params.remote_caller_id_number=a.params.caller_id_number):(a.params.remote_caller_id_name=a.params.callee_id_name,a.params.remote_caller_id_number=a.params.callee_id_number),a.params.remote_caller_id_name||(a.params.remote_caller_id_name="Nobody"),a.params.remote_caller_id_number||(a.params.remote_caller_id_number="UNKNOWN"),r.onMessage=function(e,o){console.debug(o)},r.onAnswerSDP=function(e,o){console.error("answer sdp",o)}):(a.params.remote_caller_id_name="Outbound Call",a.params.remote_caller_id_number=a.params.destination_number),r.onICESDP=function(o){return console.log("RECV "+o.type+" SDP",o.mediaData.SDP),a.state==e.verto["enum"].state.requesting||a.state==e.verto["enum"].state.answering||a.state==e.verto["enum"].state.active?void location.reload():void("offer"==o.type?a.state==e.verto["enum"].state.active?(a.setState(e.verto["enum"].state.requesting),a.sendMethod("verto.attach",{sdp:o.mediaData.SDP})):(a.setState(e.verto["enum"].state.requesting),a.sendMethod("verto.invite",{sdp:o.mediaData.SDP})):(a.setState(e.verto["enum"].state.answering),a.sendMethod(a.attach?"verto.attach":"verto.answer",{sdp:a.rtc.mediaData.SDP})))},r.onICE=function(e){return"offer"==e.type?void console.log("offer",e.mediaData.candidate):void 0},r.onStream=function(e,o){console.log("stream started"),window.w5capi_SIP.emit("SIP-localstream",{stream:o})},r.onRemoteStream=function(e,o){console.log("stream started"),window.w5capi_SIP.emit("SIP-remotestream",{stream:o})},r.onError=function(e){console.error("ERROR:",e),a.hangup({cause:"Device or Permission Error"})},a.rtc=new e.FSRTC({callbacks:r,localVideo:a.screenShare?null:a.localVideo,useVideo:a.params.useVideo?a.videoStream:null,useAudio:a.audioStream,useStereo:a.params.useStereo,videoParams:a.params.videoParams,audioParams:t.options.audioParams,iceServers:t.options.iceServers,screenShare:a.screenShare,useCamera:a.useCamera,useMic:a.useMic,useSpeak:a.useSpeak}),a.rtc.verto=a.verto,a.direction==e.verto["enum"].direction.inbound&&(a.attach?a.answer():a.ring())},e.verto.dialog.prototype.invite=function(){var e=this;e.rtc.call()},e.verto.dialog.prototype.sendMethod=function(e,o){var t=this;o.dialogParams={};for(var n in t.params)("sdp"!=n||"verto.invite"==e||"verto.attach"==e)&&(o.dialogParams[n]=t.params[n]);t.verto.rpcClient.call(e,o,function(o){t.processReply(e,!0,o)},function(o){t.processReply(e,!1,o)})},e.verto.dialog.prototype.setAudioPlaybackDevice=function(e,o,t){var n=this,a=n.audioStream;if("undefined"!=typeof a.sinkId){var r=s(e);console.info("Dialog: "+n.callID+" Setting speaker:",a,r),a.setSinkId(e).then(function(){console.log("Dialog: "+n.callID+" Success, audio output device attached: "+e),o&&o(!0,r,t)})["catch"](function(e){var a=e;"SecurityError"===e.name&&(a="Dialog: "+n.callID+" You need to use HTTPS for selecting audio output device: "+e),o&&o(!1,null,t),console.error(a)})}else console.warn("Dialog: "+n.callID+" Browser does not support output device selection."),o&&o(!1,null,t)},e.verto.dialog.prototype.setState=function(o){var t=this;if(t.state==e.verto["enum"].state.ringing&&t.stopRinging(),t.state==o||!r(t.state,o))return console.error("Dialog "+t.callID+": INVALID state change from "+t.state.name+" to "+o.name),t.hangup(),!1;switch(console.log("Dialog "+t.callID+": state change from "+t.state.name+" to "+o.name),t.lastState=t.state,t.state=o,t.causeCode||(t.causeCode=16),t.cause||(t.cause="NORMAL CLEARING"),t.callbacks.onDialogState&&t.callbacks.onDialogState(this),t.state){case e.verto["enum"].state.early:case e.verto["enum"].state.active:var n=t.useSpeak;console.info("Using Speaker: ",n),n&&"any"!==n&&setTimeout(function(){t.setAudioPlaybackDevice(n)},500);break;case e.verto["enum"].state.trying:setTimeout(function(){t.state==e.verto["enum"].state.trying&&t.setState(e.verto["enum"].state.hangup)},3e4);break;case e.verto["enum"].state.purge:t.setState(e.verto["enum"].state.destroy);break;case e.verto["enum"].state.hangup:t.lastState.val>e.verto["enum"].state.requesting.val&&t.lastState.val<e.verto["enum"].state.hangup.val&&t.sendMethod("verto.bye",{}),t.setState(e.verto["enum"].state.destroy);break;case e.verto["enum"].state.destroy:delete t.verto.dialogs[t.callID],t.params.screenShare?t.rtc.stopPeer():t.rtc.stop()}return!0},e.verto.dialog.prototype.processReply=function(o,t,n){var a=this;switch(o){case"verto.answer":case"verto.attach":t?a.setState(e.verto["enum"].state.active):a.hangup();break;case"verto.invite":t?a.setState(e.verto["enum"].state.trying):a.setState(e.verto["enum"].state.destroy);break;case"verto.bye":a.hangup();break;case"verto.modify":n.holdState&&("held"==n.holdState?a.state!=e.verto["enum"].state.held&&a.setState(e.verto["enum"].state.held):"active"==n.holdState&&a.state!=e.verto["enum"].state.active&&a.setState(e.verto["enum"].state.active))}},e.verto.dialog.prototype.hangup=function(o){var t=this;o&&(o.causeCode&&(t.causeCode=o.causeCode),o.cause&&(t.cause=o.cause)),t.state.val>=e.verto["enum"].state["new"].val&&t.state.val<e.verto["enum"].state.hangup.val?t.setState(e.verto["enum"].state.hangup):t.state.val<e.verto["enum"].state.destroy&&t.setState(e.verto["enum"].state.destroy)},e.verto.dialog.prototype.stopRinging=function(){var e=this;e.verto.ringer&&e.verto.ringer.stop()},e.verto.dialog.prototype.indicateRing=function(){var o=this;o.verto.ringer&&(o.verto.ringer.attr("src",o.verto.options.ringFile)[0].play(),setTimeout(function(){o.stopRinging(),o.state==e.verto["enum"].state.ringing&&o.indicateRing()},o.verto.options.ringSleep))},e.verto.dialog.prototype.ring=function(){var o=this;o.setState(e.verto["enum"].state.ringing),o.indicateRing()},e.verto.dialog.prototype.useVideo=function(e){var o=this;o.params.useVideo=e,e?o.videoStream=o.audioStream:o.videoStream=null,o.rtc.useVideo(o.videoStream,o.localVideo)},e.verto.dialog.prototype.setMute=function(e){var o=this;return o.rtc.setMute(e)},e.verto.dialog.prototype.getMute=function(){var e=this;return e.rtc.getMute()},e.verto.dialog.prototype.setVideoMute=function(e){var o=this;return o.rtc.setVideoMute(e)},e.verto.dialog.prototype.getVideoMute=function(){var e=this;return e.rtc.getVideoMute()},e.verto.dialog.prototype.useStereo=function(e){var o=this;o.params.useStereo=e,o.rtc.useStereo(e)},e.verto.dialog.prototype.dtmf=function(e){var o=this;e&&o.sendMethod("verto.info",{dtmf:e})},e.verto.dialog.prototype.transfer=function(e,o){var t=this;e&&t.sendMethod("verto.modify",{action:"transfer",destination:e,params:o})},e.verto.dialog.prototype.hold=function(e){var o=this;o.sendMethod("verto.modify",{action:"hold",params:e})},e.verto.dialog.prototype.unhold=function(e){var o=this;o.sendMethod("verto.modify",{action:"unhold",params:e})},e.verto.dialog.prototype.toggleHold=function(e){var o=this;o.sendMethod("verto.modify",{action:"toggleHold",params:e})},e.verto.dialog.prototype.message=function(e){var o=this,t=0;return e.from=o.params.login,e.to||(console.error("Missing To"),t++),e.body||(console.error("Missing Body"),t++),t?!1:(o.sendMethod("verto.info",{msg:e}),!0)},e.verto.dialog.prototype.answer=function(e){var o=this;o.answered||(e||(e={}),e.sdp=o.params.sdp,e&&(e.useVideo&&o.useVideo(!0),o.params.callee_id_name=e.callee_id_name,o.params.callee_id_number=e.callee_id_number,e.useCamera&&(o.useCamera=e.useCamera),e.useMic&&(o.useMic=e.useMic),e.useSpeak&&(o.useSpeak=e.useSpeak)),o.rtc.createAnswer(e),o.answered=!0)},e.verto.dialog.prototype.handleAnswer=function(o){var t=this;t.gotAnswer=!0,t.state.val>=e.verto["enum"].state.active.val||(t.state.val>=e.verto["enum"].state.early.val?t.setState(e.verto["enum"].state.active):t.gotEarly?console.log("Dialog "+t.callID+" Got answer while still establishing early media, delaying..."):(console.log("Dialog "+t.callID+" Answering Channel"),t.rtc.answer(o.sdp,function(){t.setState(e.verto["enum"].state.active)},function(e){console.error(e),t.hangup()}),console.log("Dialog "+t.callID+"ANSWER SDP",o.sdp)))},e.verto.dialog.prototype.cidString=function(e){var o=this,t=o.params.remote_caller_id_name+(e?" &lt;":" <")+o.params.remote_caller_id_number+(e?"&gt;":">");return t},e.verto.dialog.prototype.sendMessage=function(e,o){var t=this;t.callbacks.onMessage&&t.callbacks.onMessage(t.verto,t,e,o)},e.verto.dialog.prototype.handleInfo=function(o){var t=this;t.sendMessage(e.verto["enum"].message.info,o.msg)},e.verto.dialog.prototype.handleDisplay=function(o){var t=this;o.display_name&&(t.params.remote_caller_id_name=o.display_name),o.display_number&&(t.params.remote_caller_id_number=o.display_number),t.sendMessage(e.verto["enum"].message.display,{})},e.verto.dialog.prototype.handleMedia=function(o){var t=this;t.state.val>=e.verto["enum"].state.early.val||(t.gotEarly=!0,t.rtc.answer(o.sdp,function(){console.log("Dialog "+t.callID+"Establishing early media"),t.setState(e.verto["enum"].state.early),t.gotAnswer&&(console.log("Dialog "+t.callID+"Answering Channel"),t.setState(e.verto["enum"].state.active))},function(e){console.error(e),t.hangup()}),console.log("Dialog "+t.callID+"EARLY SDP",o.sdp))},e.verto.ENUM=function(e){var o=0,t={};return e.split(" ").map(function(e){t[e]={name:e,val:o++}}),Object.freeze(t)},e.verto["enum"]={},e.verto["enum"].states=Object.freeze({"new":{requesting:1,recovering:1,ringing:1,destroy:1,answering:1,hangup:1},requesting:{trying:1,hangup:1,active:1},recovering:{answering:1,hangup:1},trying:{active:1,early:1,hangup:1},ringing:{answering:1,hangup:1},answering:{active:1,hangup:1},active:{answering:1,requesting:1,hangup:1,held:1},held:{hangup:1,active:1},early:{hangup:1,active:1},hangup:{destroy:1},destroy:{},purge:{destroy:1}}),e.verto["enum"].state=e.verto.ENUM("new requesting trying recovering ringing answering early active held hangup destroy purge"),e.verto["enum"].direction=e.verto.ENUM("inbound outbound"),e.verto["enum"].message=e.verto.ENUM("display info pvtEvent"),e.verto["enum"]=Object.freeze(e.verto["enum"]),e.verto.saved=[],e.verto.unloadJobs=[],e(window).bind("beforeunload",function(){for(var o in e.verto.unloadJobs)e.verto.unloadJobs[o]();for(var t in e.verto.saved){var n=e.verto.saved[t];n&&(n.purge(),n.logout())}return e.verto.warnOnUnload}),e.verto.videoDevices=[],e.verto.audioInDevices=[],e.verto.audioOutDevices=[];var p=function(o){console.info("enumerating devices");var t=[],n=[],a=[];if(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices||!MediaStreamTrack.getSources){if(!navigator.mediaDevices||!navigator.mediaDevices.enumerateDevices)return void console.log("enumerateDevices() not supported.");navigator.mediaDevices.enumerateDevices().then(function(r){r.forEach(function(e){console.log(e),console.log(e.kind+": "+e.label+" id = "+e.deviceId),"videoinput"===e.kind?a.push({id:e.deviceId,kind:"video",label:e.label}):"audioinput"===e.kind?t.push({id:e.deviceId,kind:"audio_in",label:e.label}):"audiooutput"===e.kind&&n.push({id:e.deviceId,kind:"audio_out",label:e.label})}),e.verto.videoDevices=a,e.verto.audioInDevices=t,e.verto.audioOutDevices=n,console.info("Audio IN Devices",e.verto.audioInDevices),console.info("Audio Out Devices",e.verto.audioOutDevices),console.info("Video Devices",e.verto.videoDevices),o(!0)})["catch"](function(e){console.log(" Device Enumeration ERROR: "+e.name+": "+e.message),o(!1)})}else MediaStreamTrack.getSources(function(n){for(var r=0;r<n.length;r++)"video"==n[r].kind?a.push(n[r]):t.push(n[r]);e.verto.videoDevices=a,e.verto.audioInDevices=t,console.info("Audio Devices",e.verto.audioInDevices),console.info("Video Devices",e.verto.videoDevices),o(!0)})};e.verto.refreshDevices=function(e){p(e)},e.verto.init=function(o,t){o||(o={}),o.skipPermCheck||o.skipDeviceCheck?o.skipPermCheck&&!o.skipDeviceCheck?p(t):!o.skipPermCheck&&o.skipDeviceCheck?e.FSRTC.checkPerms(function(e){t(e)},!0,!0):t(null):e.FSRTC.checkPerms(function(e){p(t)},!0,!0)},e.verto.genUUID=function(){return i()}}(jQuery);


function w5capiReady(callback) {
    // Adapter's interface.
    var AdapterJS = AdapterJS || {};

    AdapterJS.options = {};

    // uncomment to get virtual webcams
    // AdapterJS.options.getAllCams = true;

    // uncomment to prevent the install prompt when the plugin in not yet installed
    // AdapterJS.options.hidePluginInstallPrompt = true;

    // AdapterJS version
    AdapterJS.VERSION = '0.10.5';

    // This function will be called when the WebRTC API is ready to be used
    // Whether it is the native implementation (Chrome, Firefox, Opera) or
    // the plugin
    // You may Override this function to synchronise the start of your application
    // with the WebRTC API being ready.
    // If you decide not to override use this synchronisation, it may result in
    // an extensive CPU usage on the plugin start (once per tab loaded)
    // Params:
    //    - isUsingPlugin: true is the WebRTC plugin is being used, false otherwise
    //
    window.w5rtcPlugin = false;
    AdapterJS.onwebrtcready = AdapterJS.onwebrtcready || function(isUsingPlugin) {
        // The WebRTC API is ready.
        // Override me and do whatever you want here
        window.w5rtcPlugin = true;
        callback('w5capi');
    };

    // Plugin namespace
    AdapterJS.WebRTCPlugin = AdapterJS.WebRTCPlugin || {};

    // The object to store plugin information
    AdapterJS.WebRTCPlugin.pluginInfo = {
        prefix: 'Tem',
        plugName: 'TemWebRTCPlugin',
        pluginId: 'plugin0',
        type: 'application/x-temwebrtcplugin',
        onload: '__TemWebRTCReady0',
        portalLink: 'http://temasys.atlassian.net/wiki/display/TWPP/WebRTC+Plugins',
        downloadLink: null, //set below
        companyName: 'Temasys'
    };
    if ( !! navigator.platform.match(/^Mac/i)) {
        AdapterJS.WebRTCPlugin.pluginInfo.downloadLink = 'http://bit.ly/1n77hco';
    } else if ( !! navigator.platform.match(/^Win/i)) {
        AdapterJS.WebRTCPlugin.pluginInfo.downloadLink = 'http://bit.ly/1kkS4FN';
    }

    // Unique identifier of each opened page
    AdapterJS.WebRTCPlugin.pageId = Math.random().toString(36).slice(2);

    // Use this whenever you want to call the plugin.
    AdapterJS.WebRTCPlugin.plugin = null;

    // Set log level for the plugin once it is ready.
    // The different values are
    // This is an asynchronous function that will run when the plugin is ready
    AdapterJS.WebRTCPlugin.setLogLevel = null;

    // Defines webrtc's JS interface according to the plugin's implementation.
    // Define plugin Browsers as WebRTC Interface.
    AdapterJS.WebRTCPlugin.defineWebRTCInterface = null;

    // This function detects whether or not a plugin is installed.
    // Checks if Not IE (firefox, for example), else if it's IE,
    // we're running IE and do something. If not it is not supported.
    AdapterJS.WebRTCPlugin.isPluginInstalled = null;

    // Lets adapter.js wait until the the document is ready before injecting the plugin
    AdapterJS.WebRTCPlugin.pluginInjectionInterval = null;

    // Inject the HTML DOM object element into the page.
    AdapterJS.WebRTCPlugin.injectPlugin = null;

    // States of readiness that the plugin goes through when
    // being injected and stated
    AdapterJS.WebRTCPlugin.PLUGIN_STATES = {
        NONE: 0, // no plugin use
        INITIALIZING: 1, // Detected need for plugin
        INJECTING: 2, // Injecting plugin
        INJECTED: 3, // Plugin element injected but not usable yet
        READY: 4 // Plugin ready to be used
    };

    // Current state of the plugin. You cannot use the plugin before this is
    // equal to AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY
    AdapterJS.WebRTCPlugin.pluginState = AdapterJS.WebRTCPlugin.PLUGIN_STATES.NONE;

    // True is AdapterJS.onwebrtcready was already called, false otherwise
    // Used to make sure AdapterJS.onwebrtcready is only called once
    AdapterJS.onwebrtcreadyDone = false;

    // Log levels for the plugin.
    // To be set by calling AdapterJS.WebRTCPlugin.setLogLevel
    /*
Log outputs are prefixed in some cases.
  INFO: Information reported by the plugin.
  ERROR: Errors originating from within the plugin.
  WEBRTC: Error originating from within the libWebRTC library
*/
    // From the least verbose to the most verbose
    AdapterJS.WebRTCPlugin.PLUGIN_LOG_LEVELS = {
        NONE: 'NONE',
        ERROR: 'ERROR',
        WARNING: 'WARNING',
        INFO: 'INFO',
        VERBOSE: 'VERBOSE',
        SENSITIVE: 'SENSITIVE'
    };

    // Does a waiting check before proceeding to load the plugin.
    AdapterJS.WebRTCPlugin.WaitForPluginReady = null;

    // This methid will use an interval to wait for the plugin to be ready.
    AdapterJS.WebRTCPlugin.callWhenPluginReady = null;

    // This function will be called if the plugin is needed (browser different
    // from Chrome or Firefox), but the plugin is not installed.
    // Override it according to your application logic.
    AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCb = null;

    // !!!! WARNING: DO NOT OVERRIDE THIS FUNCTION. !!!
    // This function will be called when plugin is ready. It sends necessary
    // details to the plugin.
    // The function will wait for the document to be ready and the set the
    // plugin state to AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY,
    // indicating that it can start being requested.
    // This function is not in the IE/Safari condition brackets so that
    // TemPluginLoaded function might be called on Chrome/Firefox.
    // This function is the only private function that is not encapsulated to
    // allow the plugin method to be called.
    __TemWebRTCReady0 = function() {
        if (document.readyState === 'complete') {
            AdapterJS.WebRTCPlugin.pluginState = AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY;

            AdapterJS.maybeThroughWebRTCReady();
        } else {
            AdapterJS.WebRTCPlugin.documentReadyInterval = setInterval(function() {
                if (document.readyState === 'complete') {
                    // TODO: update comments, we wait for the document to be ready
                    clearInterval(AdapterJS.WebRTCPlugin.documentReadyInterval);
                    AdapterJS.WebRTCPlugin.pluginState = AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY;

                    AdapterJS.maybeThroughWebRTCReady();
                }
            }, 100);
        }
    };

    AdapterJS.maybeThroughWebRTCReady = function() {
        if (!AdapterJS.onwebrtcreadyDone) {
            AdapterJS.onwebrtcreadyDone = true;

            if (typeof(AdapterJS.onwebrtcready) === 'function') {
                AdapterJS.onwebrtcready(AdapterJS.WebRTCPlugin.plugin !== null);
            }
        }
    };

    // The result of ice connection states.
    // - starting: Ice connection is starting.
    // - checking: Ice connection is checking.
    // - connected Ice connection is connected.
    // - completed Ice connection is connected.
    // - done Ice connection has been completed.
    // - disconnected Ice connection has been disconnected.
    // - failed Ice connection has failed.
    // - closed Ice connection is closed.
    AdapterJS._iceConnectionStates = {
        starting: 'starting',
        checking: 'checking',
        connected: 'connected',
        completed: 'connected',
        done: 'completed',
        disconnected: 'disconnected',
        failed: 'failed',
        closed: 'closed'
    };

    //The IceConnection states that has been fired for each peer.
    AdapterJS._iceConnectionFiredStates = [];


    // Check if WebRTC Interface is defined.
    AdapterJS.isDefined = null;

    // This function helps to retrieve the webrtc detected browser information.
    // This sets:
    // - webrtcDetectedBrowser: The browser agent name.
    // - webrtcDetectedVersion: The browser version.
    // - webrtcDetectedType: The types of webRTC support.
    //   - 'moz': Mozilla implementation of webRTC.
    //   - 'webkit': WebKit implementation of webRTC.
    //   - 'plugin': Using the plugin implementation.
    AdapterJS.parseWebrtcDetectedBrowser = function() {
        var hasMatch, checkMatch = navigator.userAgent.match(
                /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(checkMatch[1])) {
            hasMatch = /\brv[ :]+(\d+)/g.exec(navigator.userAgent) || [];
            webrtcDetectedBrowser = 'IE';
            webrtcDetectedVersion = parseInt(hasMatch[1] || '0', 10);
        } else if (checkMatch[1] === 'Chrome') {
            hasMatch = navigator.userAgent.match(/\bOPR\/(\d+)/);
            if (hasMatch !== null) {
                webrtcDetectedBrowser = 'opera';
                webrtcDetectedVersion = parseInt(hasMatch[1], 10);
            }
        }
        if (navigator.userAgent.indexOf('Safari')) {
            if (typeof InstallTrigger !== 'undefined') {
                webrtcDetectedBrowser = 'firefox';
            } else if ( /*@cc_on!@*/ false || !! document.documentMode) {
                webrtcDetectedBrowser = 'IE';
            } else if (
                Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0) {
                webrtcDetectedBrowser = 'safari';
            } else if ( !! window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) {
                webrtcDetectedBrowser = 'opera';
            } else if ( !! window.chrome) {
                webrtcDetectedBrowser = 'chrome';
            }
        }
        if (!webrtcDetectedBrowser) {
            webrtcDetectedVersion = checkMatch[1];
        }
        if (!webrtcDetectedVersion) {
            try {
                checkMatch = (checkMatch[2]) ? [checkMatch[1], checkMatch[2]] : [navigator.appName, navigator.appVersion, '-?'];
                if ((hasMatch = navigator.userAgent.match(/version\/(\d+)/i)) !== null) {
                    checkMatch.splice(1, 1, hasMatch[1]);
                }
                webrtcDetectedVersion = parseInt(checkMatch[1], 10);
            } catch (error) {}
        }
    };

    // To fix configuration as some browsers does not support
    // the 'urls' attribute.
    AdapterJS.maybeFixConfiguration = function(pcConfig) {
        if (pcConfig === null) {
            return;
        }
        for (var i = 0; i < pcConfig.iceServers.length; i++) {
            if (pcConfig.iceServers[i].hasOwnProperty('urls')) {
                pcConfig.iceServers[i].url = pcConfig.iceServers[i].urls;
                delete pcConfig.iceServers[i].urls;
            }
        }
    };

    AdapterJS.addEvent = function(elem, evnt, func) {
        if (elem.addEventListener) { // W3C DOM
            elem.addEventListener(evnt, func, false);
        } else if (elem.attachEvent) { // OLD IE DOM
            elem.attachEvent('on' + evnt, func);
        } else { // No much to do
            elem[evnt] = func;
        }
    };

    // -----------------------------------------------------------
    // Detected webrtc implementation. Types are:
    // - 'moz': Mozilla implementation of webRTC.
    // - 'webkit': WebKit implementation of webRTC.
    // - 'plugin': Using the plugin implementation.
    webrtcDetectedType = null;

    // Detected webrtc datachannel support. Types are:
    // - 'SCTP': SCTP datachannel support.
    // - 'RTP': RTP datachannel support.
    webrtcDetectedDCSupport = null;

    // Set the settings for creating DataChannels, MediaStream for
    // Cross-browser compability.
    // - This is only for SCTP based support browsers.
    // the 'urls' attribute.
    checkMediaDataChannelSettings =
        function(peerBrowserAgent, peerBrowserVersion, callback, constraints) {
            if (typeof callback !== 'function') {
                return;
            }
            var beOfferer = true;
            var isLocalFirefox = webrtcDetectedBrowser === 'firefox';
            // Nightly version does not require MozDontOfferDataChannel for interop
            var isLocalFirefoxInterop = webrtcDetectedType === 'moz' && webrtcDetectedVersion > 30;
            var isPeerFirefox = peerBrowserAgent === 'firefox';
            var isPeerFirefoxInterop = peerBrowserAgent === 'firefox' &&
                ((peerBrowserVersion) ? (peerBrowserVersion > 30) : false);

            // Resends an updated version of constraints for MozDataChannel to work
            // If other userAgent is firefox and user is firefox, remove MozDataChannel
            if ((isLocalFirefox && isPeerFirefox) || (isLocalFirefoxInterop)) {
                try {
                    delete constraints.mandatory.MozDontOfferDataChannel;
                } catch (error) {
                    console.error('Failed deleting MozDontOfferDataChannel');
                    console.error(error);
                }
            } else if ((isLocalFirefox && !isPeerFirefox)) {
                constraints.mandatory.MozDontOfferDataChannel = true;
            }
            if (!isLocalFirefox) {
                // temporary measure to remove Moz* constraints in non Firefox browsers
                for (var prop in constraints.mandatory) {
                    if (constraints.mandatory.hasOwnProperty(prop)) {
                        if (prop.indexOf('Moz') !== -1) {
                            delete constraints.mandatory[prop];
                        }
                    }
                }
            }
            // Firefox (not interopable) cannot offer DataChannel as it will cause problems to the
            // interopability of the media stream
            if (isLocalFirefox && !isPeerFirefox && !isLocalFirefoxInterop) {
                beOfferer = false;
            }
            callback(beOfferer, constraints);
    };

    // Handles the differences for all browsers ice connection state output.
    // - Tested outcomes are:
    //   - Chrome (offerer)  : 'checking' > 'completed' > 'completed'
    //   - Chrome (answerer) : 'checking' > 'connected'
    //   - Firefox (offerer) : 'checking' > 'connected'
    //   - Firefox (answerer): 'checking' > 'connected'
    checkIceConnectionState = function(peerId, iceConnectionState, callback) {
        if (typeof callback !== 'function') {
            console.warn('No callback specified in checkIceConnectionState. Aborted.');
            return;
        }
        peerId = (peerId) ? peerId : 'peer';

        if (!AdapterJS._iceConnectionFiredStates[peerId] ||
            iceConnectionState === AdapterJS._iceConnectionStates.disconnected ||
            iceConnectionState === AdapterJS._iceConnectionStates.failed ||
            iceConnectionState === AdapterJS._iceConnectionStates.closed) {
            AdapterJS._iceConnectionFiredStates[peerId] = [];
        }
        iceConnectionState = AdapterJS._iceConnectionStates[iceConnectionState];
        if (AdapterJS._iceConnectionFiredStates[peerId].indexOf(iceConnectionState) < 0) {
            AdapterJS._iceConnectionFiredStates[peerId].push(iceConnectionState);
            if (iceConnectionState === AdapterJS._iceConnectionStates.connected) {
                setTimeout(function() {
                    AdapterJS._iceConnectionFiredStates[peerId]
                        .push(AdapterJS._iceConnectionStates.done);
                    callback(AdapterJS._iceConnectionStates.done);
                }, 1000);
            }
            callback(iceConnectionState);
        }
        return;
    };

    // Firefox:
    // - Creates iceServer from the url for Firefox.
    // - Create iceServer with stun url.
    // - Create iceServer with turn url.
    //   - Ignore the transport parameter from TURN url for FF version <=27.
    //   - Return null for createIceServer if transport=tcp.
    // - FF 27 and above supports transport parameters in TURN url,
    // - So passing in the full url to create iceServer.
    // Chrome:
    // - Creates iceServer from the url for Chrome M33 and earlier.
    //   - Create iceServer with stun url.
    //   - Chrome M28 & above uses below TURN format.
    // Plugin:
    // - Creates Ice Server for Plugin Browsers
    //   - If Stun - Create iceServer with stun url.
    //   - Else - Create iceServer with turn url
    //   - This is a WebRTC Function
    createIceServer = null;

    // Firefox:
    // - Creates IceServers for Firefox
    //   - Use .url for FireFox.
    //   - Multiple Urls support
    // Chrome:
    // - Creates iceServers from the urls for Chrome M34 and above.
    //   - .urls is supported since Chrome M34.
    //   - Multiple Urls support
    // Plugin:
    // - Creates Ice Servers for Plugin Browsers
    //   - Multiple Urls support
    //   - This is a WebRTC Function
    createIceServers = null;
    //------------------------------------------------------------

    //The RTCPeerConnection object.
    RTCPeerConnection = null;

    // Creates RTCSessionDescription object for Plugin Browsers
    RTCSessionDescription = (typeof RTCSessionDescription === 'function') ?
        RTCSessionDescription : null;

    // Creates RTCIceCandidate object for Plugin Browsers
    RTCIceCandidate = (typeof RTCIceCandidate === 'function') ?
        RTCIceCandidate : null;

    // Get UserMedia (only difference is the prefix).
    // Code from Adam Barth.
    getUserMedia = null;

    // Attach a media stream to an element.
    attachMediaStream = null;

    // Re-attach a media stream to an element.
    reattachMediaStream = null;


    // Detected browser agent name. Types are:
    // - 'firefox': Firefox browser.
    // - 'chrome': Chrome browser.
    // - 'opera': Opera browser.
    // - 'safari': Safari browser.
    // - 'IE' - Internet Explorer browser.
    webrtcDetectedBrowser = null;

    // Detected browser version.
    webrtcDetectedVersion = null;

    // Check for browser types and react accordingly
    if (navigator.mozGetUserMedia) {
        webrtcDetectedBrowser = 'firefox';
        webrtcDetectedVersion = parseInt(navigator
            .userAgent.match(/Firefox\/([0-9]+)\./)[1], 10);
        webrtcDetectedType = 'moz';
        webrtcDetectedDCSupport = 'SCTP';

        RTCPeerConnection = function(pcConfig, pcConstraints) {
            AdapterJS.maybeFixConfiguration(pcConfig);
            return new mozRTCPeerConnection(pcConfig, pcConstraints);
        };

        // The RTCSessionDescription object.
        RTCSessionDescription = mozRTCSessionDescription;
        window.RTCSessionDescription = RTCSessionDescription;

        // The RTCIceCandidate object.
        RTCIceCandidate = mozRTCIceCandidate;
        window.RTCIceCandidate = RTCIceCandidate;

        getUserMedia = navigator.mozGetUserMedia.bind(navigator);
        navigator.getUserMedia = getUserMedia;

        // Shim for MediaStreamTrack.getSources.
        MediaStreamTrack.getSources = function(successCb) {
            setTimeout(function() {
                var infos = [{
                    kind: 'audio',
                    id: 'default',
                    label: '',
                    facing: ''
                }, {
                    kind: 'video',
                    id: 'default',
                    label: '',
                    facing: ''
                }];
                successCb(infos);
            }, 0);
        };

        createIceServer = function(url, username, password) {
            var iceServer = null;
            var url_parts = url.split(':');
            if (url_parts[0].indexOf('stun') === 0) {
                iceServer = {
                    url: url
                };
            } else if (url_parts[0].indexOf('turn') === 0) {
                if (webrtcDetectedVersion < 27) {
                    var turn_url_parts = url.split('?');
                    if (turn_url_parts.length === 1 ||
                        turn_url_parts[1].indexOf('transport=udp') === 0) {
                        iceServer = {
                            url: turn_url_parts[0],
                            credential: password,
                            username: username
                        };
                    }
                } else {
                    iceServer = {
                        url: url,
                        credential: password,
                        username: username
                    };
                }
            }
            return iceServer;
        };

        createIceServers = function(urls, username, password) {
            var iceServers = [];
            for (i = 0; i < urls.length; i++) {
                var iceServer = createIceServer(urls[i], username, password);
                if (iceServer !== null) {
                    iceServers.push(iceServer);
                }
            }
            return iceServers;
        };

        attachMediaStream = function(element, stream) {
            element.mozSrcObject = stream;
            element.play();
            return element;
        };

        reattachMediaStream = function(to, from) {
            to.mozSrcObject = from.mozSrcObject;
            to.play();
            return to;
        };

        MediaStreamTrack.getSources = MediaStreamTrack.getSources || function(callback) {
            if (!callback) {
                throw new TypeError('Failed to execute \'getSources\' on \'MediaStreamTrack\'' +
                    ': 1 argument required, but only 0 present.');
            }
            return callback([]);
        };

        // Fake get{Video,Audio}Tracks
        if (!MediaStream.prototype.getVideoTracks) {
            MediaStream.prototype.getVideoTracks = function() {
                return [];
            };
        }
        if (!MediaStream.prototype.getAudioTracks) {
            MediaStream.prototype.getAudioTracks = function() {
                return [];
            };
        }

        AdapterJS.maybeThroughWebRTCReady();
    } else if (navigator.webkitGetUserMedia) {
        webrtcDetectedBrowser = 'chrome';
        webrtcDetectedType = 'webkit';
        webrtcDetectedVersion = parseInt(navigator
            .userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2], 10);
        // check if browser is opera 20+
        var checkIfOpera = navigator.userAgent.match(/\bOPR\/(\d+)/);
        if (checkIfOpera !== null) {
            webrtcDetectedBrowser = 'opera';
            webrtcDetectedVersion = parseInt(checkIfOpera[1], 10);
        }
        // check browser datachannel support
        if ((webrtcDetectedBrowser === 'chrome' && webrtcDetectedVersion >= 31) ||
            (webrtcDetectedBrowser === 'opera' && webrtcDetectedVersion >= 20)) {
            webrtcDetectedDCSupport = 'SCTP';
        } else if (webrtcDetectedBrowser === 'chrome' && webrtcDetectedVersion < 30 &&
            webrtcDetectedVersion > 24) {
            webrtcDetectedDCSupport = 'RTP';
        } else {
            webrtcDetectedDCSupport = '';
        }

        createIceServer = function(url, username, password) {
            var iceServer = null;
            var url_parts = url.split(':');
            if (url_parts[0].indexOf('stun') === 0) {
                iceServer = {
                    'url': url
                };
            } else if (url_parts[0].indexOf('turn') === 0) {
                iceServer = {
                    'url': url,
                    'credential': password,
                    'username': username
                };
            }
            return iceServer;
        };

        createIceServers = function(urls, username, password) {
            var iceServers = [];
            if (webrtcDetectedVersion >= 34) {
                iceServers = {
                    'urls': urls,
                    'credential': password,
                    'username': username
                };
            } else {
                for (i = 0; i < urls.length; i++) {
                    var iceServer = createIceServer(urls[i], username, password);
                    if (iceServer !== null) {
                        iceServers.push(iceServer);
                    }
                }
            }
            return iceServers;
        };

        RTCPeerConnection = function(pcConfig, pcConstraints) {
            if (webrtcDetectedVersion < 34) {
                AdapterJS.maybeFixConfiguration(pcConfig);
            }
            return new webkitRTCPeerConnection(pcConfig, pcConstraints);
        };

        getUserMedia = navigator.webkitGetUserMedia.bind(navigator);
        navigator.getUserMedia = getUserMedia;

        attachMediaStream = function(element, stream) {
            if (typeof element.srcObject !== 'undefined') {
                element.srcObject = stream;
            } else if (typeof element.mozSrcObject !== 'undefined') {
                element.mozSrcObject = stream;
            } else if (typeof element.src !== 'undefined') {
                element.src = URL.createObjectURL(stream);
            } else {
                console.log('Error attaching stream to element.');
            }
            return element;
        };

        reattachMediaStream = function(to, from) {
            to.src = from.src;
            return to;
        };

        AdapterJS.maybeThroughWebRTCReady();
    } else { // TRY TO USE PLUGIN
        // IE 9 is not offering an implementation of console.log until you open a console
        if (typeof console !== 'object' || typeof console.log !== 'function') {
            /* jshint -W020 */
            console = {} || console;
            // Implemented based on console specs from MDN
            // You may override these functions
            console.log = function(arg) {};
            console.info = function(arg) {};
            console.error = function(arg) {};
            console.dir = function(arg) {};
            console.exception = function(arg) {};
            console.trace = function(arg) {};
            console.warn = function(arg) {};
            console.count = function(arg) {};
            console.debug = function(arg) {};
            console.count = function(arg) {};
            console.time = function(arg) {};
            console.timeEnd = function(arg) {};
            console.group = function(arg) {};
            console.groupCollapsed = function(arg) {};
            console.groupEnd = function(arg) {};
            /* jshint +W020 */
        }
        webrtcDetectedType = 'plugin';
        webrtcDetectedDCSupport = 'plugin';
        AdapterJS.parseWebrtcDetectedBrowser();
        isIE = webrtcDetectedBrowser === 'IE';

        /* jshint -W035 */
        AdapterJS.WebRTCPlugin.WaitForPluginReady = function() {
            while (AdapterJS.WebRTCPlugin.pluginState !== AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY) {
                /* empty because it needs to prevent the function from running. */
            }
        };
        /* jshint +W035 */

        AdapterJS.WebRTCPlugin.callWhenPluginReady = function(callback) {
            if (AdapterJS.WebRTCPlugin.pluginState === AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY) {
                // Call immediately if possible
                // Once the plugin is set, the code will always take this path
                callback();
            } else {
                // otherwise start a 100ms interval
                var checkPluginReadyState = setInterval(function() {
                    if (AdapterJS.WebRTCPlugin.pluginState === AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY) {
                        clearInterval(checkPluginReadyState);
                        callback();
                    }
                }, 100);
            }
        };

        AdapterJS.WebRTCPlugin.setLogLevel = function(logLevel) {
            AdapterJS.WebRTCPlugin.callWhenPluginReady(function() {
                AdapterJS.WebRTCPlugin.plugin.setLogLevel(logLevel);
            });
        };

        AdapterJS.WebRTCPlugin.injectPlugin = function() {
            // only inject once the page is ready
            if (document.readyState !== 'complete') {
                return;
            }

            // Prevent multiple injections
            if (AdapterJS.WebRTCPlugin.pluginState !== AdapterJS.WebRTCPlugin.PLUGIN_STATES.INITIALIZING) {
                return;
            }

            AdapterJS.WebRTCPlugin.pluginState = AdapterJS.WebRTCPlugin.PLUGIN_STATES.INJECTING;

            if (webrtcDetectedBrowser === 'IE' && webrtcDetectedVersion <= 10) {
                var frag = document.createDocumentFragment();
                AdapterJS.WebRTCPlugin.plugin = document.createElement('div');
                AdapterJS.WebRTCPlugin.plugin.innerHTML = '<object id="' +
                    AdapterJS.WebRTCPlugin.pluginInfo.pluginId + '" type="' +
                    AdapterJS.WebRTCPlugin.pluginInfo.type + '" ' + 'width="1" height="1">' +
                    '<param name="pluginId" value="' +
                    AdapterJS.WebRTCPlugin.pluginInfo.pluginId + '" /> ' +
                    '<param name="windowless" value="false" /> ' +
                    '<param name="pageId" value="' + AdapterJS.WebRTCPlugin.pageId + '" /> ' +
                    '<param name="onload" value="' + AdapterJS.WebRTCPlugin.pluginInfo.onload +
                    '" />' +
                // uncomment to be able to use virtual cams
                (AdapterJS.options.getAllCams ? '<param name="forceGetAllCams" value="True" />' : '') +

                '</object>';
                while (AdapterJS.WebRTCPlugin.plugin.firstChild) {
                    frag.appendChild(AdapterJS.WebRTCPlugin.plugin.firstChild);
                }
                document.body.appendChild(frag);

                // Need to re-fetch the plugin
                AdapterJS.WebRTCPlugin.plugin =
                    document.getElementById(AdapterJS.WebRTCPlugin.pluginInfo.pluginId);
            } else {
                // Load Plugin
                AdapterJS.WebRTCPlugin.plugin = document.createElement('object');
                AdapterJS.WebRTCPlugin.plugin.id =
                    AdapterJS.WebRTCPlugin.pluginInfo.pluginId;
                // IE will only start the plugin if it's ACTUALLY visible
                if (isIE) {
                    AdapterJS.WebRTCPlugin.plugin.width = '1px';
                    AdapterJS.WebRTCPlugin.plugin.height = '1px';
                }
                AdapterJS.WebRTCPlugin.plugin.type = AdapterJS.WebRTCPlugin.pluginInfo.type;
                AdapterJS.WebRTCPlugin.plugin.innerHTML = '<param name="onload" value="' +
                    AdapterJS.WebRTCPlugin.pluginInfo.onload + '">' +
                    '<param name="pluginId" value="' +
                    AdapterJS.WebRTCPlugin.pluginInfo.pluginId + '">' +
                    '<param name="windowless" value="false" /> ' +
                    (AdapterJS.options.getAllCams ? '<param name="forceGetAllCams" value="True" />' : '') +
                    '<param name="pageId" value="' + AdapterJS.WebRTCPlugin.pageId + '">';
                document.body.appendChild(AdapterJS.WebRTCPlugin.plugin);
            }


            AdapterJS.WebRTCPlugin.pluginState = AdapterJS.WebRTCPlugin.PLUGIN_STATES.INJECTED;
        };

        AdapterJS.WebRTCPlugin.isPluginInstalled =
            function(comName, plugName, installedCb, notInstalledCb) {
                if (!isIE) {
                    var pluginArray = navigator.plugins;
                    for (var i = 0; i < pluginArray.length; i++) {
                        if (pluginArray[i].name.indexOf(plugName) >= 0) {
                            installedCb();
                            return;
                        }
                    }
                    notInstalledCb();
                } else {
                    try {
                        var axo = new ActiveXObject(comName + '.' + plugName);
                    } catch (e) {
                        notInstalledCb();
                        return;
                    }
                    installedCb();
                }
        };

        AdapterJS.WebRTCPlugin.defineWebRTCInterface = function() {
            AdapterJS.WebRTCPlugin.pluginState = AdapterJS.WebRTCPlugin.PLUGIN_STATES.INITIALIZING;

            AdapterJS.isDefined = function(variable) {
                return variable !== null && variable !== undefined;
            };

            createIceServer = function(url, username, password) {
                var iceServer = null;
                var url_parts = url.split(':');
                if (url_parts[0].indexOf('stun') === 0) {
                    iceServer = {
                        'url': url,
                        'hasCredentials': false
                    };
                } else if (url_parts[0].indexOf('turn') === 0) {
                    iceServer = {
                        'url': url,
                        'hasCredentials': true,
                        'credential': password,
                        'username': username
                    };
                }
                return iceServer;
            };

            createIceServers = function(urls, username, password) {
                var iceServers = [];
                for (var i = 0; i < urls.length; ++i) {
                    iceServers.push(createIceServer(urls[i], username, password));
                }
                return iceServers;
            };

            RTCSessionDescription = function(info) {
                AdapterJS.WebRTCPlugin.WaitForPluginReady();
                return AdapterJS.WebRTCPlugin.plugin.
                ConstructSessionDescription(info.type, info.sdp);
            };

            RTCPeerConnection = function(servers, constraints) {
                var iceServers = null;
                if (servers) {
                    iceServers = servers.iceServers;
                    for (var i = 0; i < iceServers.length; i++) {
                        if (iceServers[i].urls && !iceServers[i].url) {
                            iceServers[i].url = iceServers[i].urls;
                        }
                        iceServers[i].hasCredentials = AdapterJS.
                        isDefined(iceServers[i].username) &&
                            AdapterJS.isDefined(iceServers[i].credential);
                    }
                }
                var mandatory = (constraints && constraints.mandatory) ?
                    constraints.mandatory : null;
                var optional = (constraints && constraints.optional) ?
                    constraints.optional : null;

                AdapterJS.WebRTCPlugin.WaitForPluginReady();
                return AdapterJS.WebRTCPlugin.plugin.
                PeerConnection(AdapterJS.WebRTCPlugin.pageId,
                    iceServers, mandatory, optional);
            };

            MediaStreamTrack = {};
            MediaStreamTrack.getSources = function(callback) {
                AdapterJS.WebRTCPlugin.callWhenPluginReady(function() {
                    AdapterJS.WebRTCPlugin.plugin.GetSources(callback);
                });
            };

            getUserMedia = function(constraints, successCallback, failureCallback) {
                if (!constraints.audio) {
                    constraints.audio = false;
                }

                AdapterJS.WebRTCPlugin.callWhenPluginReady(function() {
                    AdapterJS.WebRTCPlugin.plugin.
                    getUserMedia(constraints, successCallback, failureCallback);
                });
            };
            navigator.getUserMedia = getUserMedia;

            attachMediaStream = function(element, stream) {
                stream.enableSoundTracks(true);
                if (element.nodeName.toLowerCase() !== 'audio') {
                    var elementId = element.id.length === 0 ? Math.random().toString(36).slice(2) : element.id;
                    if (!element.isWebRTCPlugin || !element.isWebRTCPlugin()) {
                        var frag = document.createDocumentFragment();
                        var temp = document.createElement('div');
                        var classHTML = (element.className) ? 'class="' + element.className + '" ' : '';
                        temp.innerHTML = '<object id="' + elementId + '" ' + classHTML +
                            'type="' + AdapterJS.WebRTCPlugin.pluginInfo.type + '">' +
                            '<param name="pluginId" value="' + elementId + '" /> ' +
                            '<param name="pageId" value="' + AdapterJS.WebRTCPlugin.pageId + '" /> ' +
                            '<param name="windowless" value="true" /> ' +
                            '<param name="streamId" value="' + stream.id + '" /> ' +
                            '</object>';
                        while (temp.firstChild) {
                            frag.appendChild(temp.firstChild);
                        }
                        var rectObject = element.getBoundingClientRect();
                        element.parentNode.insertBefore(frag, element);
                        frag = document.getElementById(elementId);
                        frag.width = rectObject.width + 'px';
                        frag.height = rectObject.height + 'px';
                        element.parentNode.removeChild(element);
                    } else {
                        var children = element.children;
                        for (var i = 0; i !== children.length; ++i) {
                            if (children[i].name === 'streamId') {
                                children[i].value = stream.id;
                                break;
                            }
                        }
                        element.setStreamId(stream.id);
                    }
                    var newElement = document.getElementById(elementId);
                    newElement.onplaying = (element.onplaying) ? element.onplaying : function(arg) {};
                    if (isIE) { // on IE the event needs to be plugged manually
                        newElement.attachEvent('onplaying', newElement.onplaying);
                        newElement.onclick = (element.onclick) ? element.onclick : function(arg) {};
                        newElement._TemOnClick = function(id) {
                            var arg = {
                                srcElement: document.getElementById(id)
                            };
                            newElement.onclick(arg);
                        };
                    }
                    return newElement;
                } else {
                    return element;
                }
            };

            reattachMediaStream = function(to, from) {
                var stream = null;
                var children = from.children;
                for (var i = 0; i !== children.length; ++i) {
                    if (children[i].name === 'streamId') {
                        AdapterJS.WebRTCPlugin.WaitForPluginReady();
                        stream = AdapterJS.WebRTCPlugin.plugin
                            .getStreamWithId(AdapterJS.WebRTCPlugin.pageId, children[i].value);
                        break;
                    }
                }
                if (stream !== null) {
                    return attachMediaStream(to, stream);
                } else {
                    console.log('Could not find the stream associated with this element');
                }
            };

            RTCIceCandidate = function(candidate) {
                if (!candidate.sdpMid) {
                    candidate.sdpMid = '';
                }

                AdapterJS.WebRTCPlugin.WaitForPluginReady();
                return AdapterJS.WebRTCPlugin.plugin.ConstructIceCandidate(
                    candidate.sdpMid, candidate.sdpMLineIndex, candidate.candidate
                );
            };

            // inject plugin
            AdapterJS.addEvent(document, 'readystatechange', AdapterJS.WebRTCPlugin.injectPlugin);
            AdapterJS.WebRTCPlugin.injectPlugin();
        };

        AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCb = function() {
            AdapterJS.addEvent(document,
                'readystatechange',
                AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCbPriv);
            AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCbPriv();
        };

        AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCbPriv = function() {
            if (AdapterJS.options.hidePluginInstallPrompt) {
                return;
            }

            var downloadLink = AdapterJS.WebRTCPlugin.pluginInfo.downloadLink;
            if (downloadLink) { // if download link
                var popupString;
                if (AdapterJS.WebRTCPlugin.pluginInfo.portalLink) { // is portal link
                    popupString = 'This website requires you to install the ' +
                        ' <a href="' + AdapterJS.WebRTCPlugin.pluginInfo.portalLink +
                        '" target="_blank">' + AdapterJS.WebRTCPlugin.pluginInfo.companyName +
                        ' WebRTC Plugin</a>' +
                        ' to work on this browser.';
                } else { // no portal link, just print a generic explanation
                    popupString = 'This website requires you to install a WebRTC-enabling plugin ' +
                        'to work on this browser.';
                }

                AdapterJS.WebRTCPlugin.renderNotificationBar(popupString, 'Install Now', downloadLink);
            } else { // no download link, just print a generic explanation
                AdapterJS.WebRTCPlugin.renderNotificationBar('Your browser does not support WebRTC.');
            }
        };

        AdapterJS.WebRTCPlugin.renderNotificationBar = function(text, buttonText, buttonLink) {
            // only inject once the page is ready
            if (document.readyState !== 'complete') {
                return;
            }

            var w = window;
            var i = document.createElement('iframe');
            i.style.position = 'fixed';
            i.style.top = '-41px';
            i.style.left = 0;
            i.style.right = 0;
            i.style.width = '100%';
            i.style.height = '40px';
            i.style.backgroundColor = '#ffffe1';
            i.style.border = 'none';
            i.style.borderBottom = '1px solid #888888';
            i.style.zIndex = '9999999';
            if (typeof i.style.webkitTransition === 'string') {
                i.style.webkitTransition = 'all .5s ease-out';
            } else if (typeof i.style.transition === 'string') {
                i.style.transition = 'all .5s ease-out';
            }
            document.body.appendChild(i);
            c = (i.contentWindow) ? i.contentWindow :
                (i.contentDocument.document) ? i.contentDocument.document : i.contentDocument;
            c.document.open();
            c.document.write('<span style="font-family: Helvetica, Arial,' +
                'sans-serif; font-size: .9rem; padding: 7px; vertical-align: ' +
                'middle; cursor: default;">' + text + '</span>');
            if (buttonText && buttonLink) {
                c.document.write('<button id="okay">' + buttonText + '</button><button>Cancel</button>');
                c.document.close();
                AdapterJS.addEvent(c.document.getElementById('okay'), 'click', function(e) {
                    window.open(buttonLink, '_top');
                    e.preventDefault();
                    try {
                        event.cancelBubble = true;
                    } catch (error) {}
                });
            } else {
                c.document.close();
            }
            AdapterJS.addEvent(c.document, 'click', function() {
                w.document.body.removeChild(i);
            });
            setTimeout(function() {
                if (typeof i.style.webkitTransform === 'string') {
                    i.style.webkitTransform = 'translateY(40px)';
                } else if (typeof i.style.transform === 'string') {
                    i.style.transform = 'translateY(40px)';
                } else {
                    i.style.top = '0px';
                }
            }, 300);
        };
        // Try to detect the plugin and act accordingly
        AdapterJS.WebRTCPlugin.isPluginInstalled(
            AdapterJS.WebRTCPlugin.pluginInfo.prefix,
            AdapterJS.WebRTCPlugin.pluginInfo.plugName,
            AdapterJS.WebRTCPlugin.defineWebRTCInterface,
            AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCb);
    }

}


(function() {
    function n(n) {
        function t(t, r, e, u, i, o) {
            for (; i >= 0 && o > i; i += n) {
                var a = u ? u[i] : i;
                e = r(e, t[a], a, t)
            }
            return e
        }
        return function(r, e, u, i) {
            e = b(e, i, 4);
            var o = !k(r) && m.keys(r),
                a = (o || r).length,
                c = n > 0 ? 0 : a - 1;
            return arguments.length < 3 && (u = r[o ? o[c] : c], c += n), t(r, e, u, o, c, a)
        }
    }

    function t(n) {
        return function(t, r, e) {
            r = x(r, e);
            for (var u = O(t), i = n > 0 ? 0 : u - 1; i >= 0 && u > i; i += n)
                if (r(t[i], i, t)) return i;
            return -1
        }
    }

    function r(n, t, r) {
        return function(e, u, i) {
            var o = 0,
                a = O(e);
            if ("number" == typeof i) n > 0 ? o = i >= 0 ? i : Math.max(i + a, o) : a = i >= 0 ? Math.min(i + 1, a) : i + a + 1;
            else if (r && i && a) return i = r(e, u), e[i] === u ? i : -1;
            if (u !== u) return i = t(l.call(e, o, a), m.isNaN), i >= 0 ? i + o : -1;
            for (i = n > 0 ? o : a - 1; i >= 0 && a > i; i += n)
                if (e[i] === u) return i;
            return -1
        }
    }

    function e(n, t) {
        var r = I.length,
            e = n.constructor,
            u = m.isFunction(e) && e.prototype || a,
            i = "constructor";
        for (m.has(n, i) && !m.contains(t, i) && t.push(i); r--;) i = I[r], i in n && n[i] !== u[i] && !m.contains(t, i) && t.push(i)
    }
    var u = this,
        i = u._,
        o = Array.prototype,
        a = Object.prototype,
        c = Function.prototype,
        f = o.push,
        l = o.slice,
        s = a.toString,
        p = a.hasOwnProperty,
        h = Array.isArray,
        v = Object.keys,
        g = c.bind,
        y = Object.create,
        d = function() {}, m = function(n) {
            return n instanceof m ? n : this instanceof m ? void(this._wrapped = n) : new m(n)
        };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = m), exports._ = m) : u._ = m, m.VERSION = "1.8.3";
    var b = function(n, t, r) {
        if (t === void 0) return n;
        switch (null == r ? 3 : r) {
            case 1:
                return function(r) {
                    return n.call(t, r)
                };
            case 2:
                return function(r, e) {
                    return n.call(t, r, e)
                };
            case 3:
                return function(r, e, u) {
                    return n.call(t, r, e, u)
                };
            case 4:
                return function(r, e, u, i) {
                    return n.call(t, r, e, u, i)
                }
        }
        return function() {
            return n.apply(t, arguments)
        }
    }, x = function(n, t, r) {
            return null == n ? m.identity : m.isFunction(n) ? b(n, t, r) : m.isObject(n) ? m.matcher(n) : m.property(n)
        };
    m.iteratee = function(n, t) {
        return x(n, t, 1 / 0)
    };
    var _ = function(n, t) {
        return function(r) {
            var e = arguments.length;
            if (2 > e || null == r) return r;
            for (var u = 1; e > u; u++)
                for (var i = arguments[u], o = n(i), a = o.length, c = 0; a > c; c++) {
                    var f = o[c];
                    t && r[f] !== void 0 || (r[f] = i[f])
                }
            return r
        }
    }, j = function(n) {
            if (!m.isObject(n)) return {};
            if (y) return y(n);
            d.prototype = n;
            var t = new d;
            return d.prototype = null, t
        }, w = function(n) {
            return function(t) {
                return null == t ? void 0 : t[n]
            }
        }, A = Math.pow(2, 53) - 1,
        O = w("length"),
        k = function(n) {
            var t = O(n);
            return "number" == typeof t && t >= 0 && A >= t
        };
    m.each = m.forEach = function(n, t, r) {
        t = b(t, r);
        var e, u;
        if (k(n))
            for (e = 0, u = n.length; u > e; e++) t(n[e], e, n);
        else {
            var i = m.keys(n);
            for (e = 0, u = i.length; u > e; e++) t(n[i[e]], i[e], n)
        }
        return n
    }, m.map = m.collect = function(n, t, r) {
        t = x(t, r);
        for (var e = !k(n) && m.keys(n), u = (e || n).length, i = Array(u), o = 0; u > o; o++) {
            var a = e ? e[o] : o;
            i[o] = t(n[a], a, n)
        }
        return i
    }, m.reduce = m.foldl = m.inject = n(1), m.reduceRight = m.foldr = n(-1), m.find = m.detect = function(n, t, r) {
        var e;
        return e = k(n) ? m.findIndex(n, t, r) : m.findKey(n, t, r), e !== void 0 && e !== -1 ? n[e] : void 0
    }, m.filter = m.select = function(n, t, r) {
        var e = [];
        return t = x(t, r), m.each(n, function(n, r, u) {
            t(n, r, u) && e.push(n)
        }), e
    }, m.reject = function(n, t, r) {
        return m.filter(n, m.negate(x(t)), r)
    }, m.every = m.all = function(n, t, r) {
        t = x(t, r);
        for (var e = !k(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) {
            var o = e ? e[i] : i;
            if (!t(n[o], o, n)) return !1
        }
        return !0
    }, m.some = m.any = function(n, t, r) {
        t = x(t, r);
        for (var e = !k(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) {
            var o = e ? e[i] : i;
            if (t(n[o], o, n)) return !0
        }
        return !1
    }, m.contains = m.includes = m.include = function(n, t, r, e) {
        return k(n) || (n = m.values(n)), ("number" != typeof r || e) && (r = 0), m.indexOf(n, t, r) >= 0
    }, m.invoke = function(n, t) {
        var r = l.call(arguments, 2),
            e = m.isFunction(t);
        return m.map(n, function(n) {
            var u = e ? t : n[t];
            return null == u ? u : u.apply(n, r)
        })
    }, m.pluck = function(n, t) {
        return m.map(n, m.property(t))
    }, m.where = function(n, t) {
        return m.filter(n, m.matcher(t))
    }, m.findWhere = function(n, t) {
        return m.find(n, m.matcher(t))
    }, m.max = function(n, t, r) {
        var e, u, i = -1 / 0,
            o = -1 / 0;
        if (null == t && null != n) {
            n = k(n) ? n : m.values(n);
            for (var a = 0, c = n.length; c > a; a++) e = n[a], e > i && (i = e)
        } else t = x(t, r), m.each(n, function(n, r, e) {
            u = t(n, r, e), (u > o || u === -1 / 0 && i === -1 / 0) && (i = n, o = u)
        });
        return i
    }, m.min = function(n, t, r) {
        var e, u, i = 1 / 0,
            o = 1 / 0;
        if (null == t && null != n) {
            n = k(n) ? n : m.values(n);
            for (var a = 0, c = n.length; c > a; a++) e = n[a], i > e && (i = e)
        } else t = x(t, r), m.each(n, function(n, r, e) {
            u = t(n, r, e), (o > u || 1 / 0 === u && 1 / 0 === i) && (i = n, o = u)
        });
        return i
    }, m.shuffle = function(n) {
        for (var t, r = k(n) ? n : m.values(n), e = r.length, u = Array(e), i = 0; e > i; i++) t = m.random(0, i), t !== i && (u[i] = u[t]), u[t] = r[i];
        return u
    }, m.sample = function(n, t, r) {
        return null == t || r ? (k(n) || (n = m.values(n)), n[m.random(n.length - 1)]) : m.shuffle(n).slice(0, Math.max(0, t))
    }, m.sortBy = function(n, t, r) {
        return t = x(t, r), m.pluck(m.map(n, function(n, r, e) {
            return {
                value: n,
                index: r,
                criteria: t(n, r, e)
            }
        }).sort(function(n, t) {
            var r = n.criteria,
                e = t.criteria;
            if (r !== e) {
                if (r > e || r === void 0) return 1;
                if (e > r || e === void 0) return -1
            }
            return n.index - t.index
        }), "value")
    };
    var F = function(n) {
        return function(t, r, e) {
            var u = {};
            return r = x(r, e), m.each(t, function(e, i) {
                var o = r(e, i, t);
                n(u, e, o)
            }), u
        }
    };
    m.groupBy = F(function(n, t, r) {
        m.has(n, r) ? n[r].push(t) : n[r] = [t]
    }), m.indexBy = F(function(n, t, r) {
        n[r] = t
    }), m.countBy = F(function(n, t, r) {
        m.has(n, r) ? n[r]++ : n[r] = 1
    }), m.toArray = function(n) {
        return n ? m.isArray(n) ? l.call(n) : k(n) ? m.map(n, m.identity) : m.values(n) : []
    }, m.size = function(n) {
        return null == n ? 0 : k(n) ? n.length : m.keys(n).length
    }, m.partition = function(n, t, r) {
        t = x(t, r);
        var e = [],
            u = [];
        return m.each(n, function(n, r, i) {
            (t(n, r, i) ? e : u).push(n)
        }), [e, u]
    }, m.first = m.head = m.take = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[0] : m.initial(n, n.length - t)
    }, m.initial = function(n, t, r) {
        return l.call(n, 0, Math.max(0, n.length - (null == t || r ? 1 : t)))
    }, m.last = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[n.length - 1] : m.rest(n, Math.max(0, n.length - t))
    }, m.rest = m.tail = m.drop = function(n, t, r) {
        return l.call(n, null == t || r ? 1 : t)
    }, m.compact = function(n) {
        return m.filter(n, m.identity)
    };
    var S = function(n, t, r, e) {
        for (var u = [], i = 0, o = e || 0, a = O(n); a > o; o++) {
            var c = n[o];
            if (k(c) && (m.isArray(c) || m.isArguments(c))) {
                t || (c = S(c, t, r));
                var f = 0,
                    l = c.length;
                for (u.length += l; l > f;) u[i++] = c[f++]
            } else r || (u[i++] = c)
        }
        return u
    };
    m.flatten = function(n, t) {
        return S(n, t, !1)
    }, m.without = function(n) {
        return m.difference(n, l.call(arguments, 1))
    }, m.uniq = m.unique = function(n, t, r, e) {
        m.isBoolean(t) || (e = r, r = t, t = !1), null != r && (r = x(r, e));
        for (var u = [], i = [], o = 0, a = O(n); a > o; o++) {
            var c = n[o],
                f = r ? r(c, o, n) : c;
            t ? (o && i === f || u.push(c), i = f) : r ? m.contains(i, f) || (i.push(f), u.push(c)) : m.contains(u, c) || u.push(c)
        }
        return u
    }, m.union = function() {
        return m.uniq(S(arguments, !0, !0))
    }, m.intersection = function(n) {
        for (var t = [], r = arguments.length, e = 0, u = O(n); u > e; e++) {
            var i = n[e];
            if (!m.contains(t, i)) {
                for (var o = 1; r > o && m.contains(arguments[o], i); o++);
                o === r && t.push(i)
            }
        }
        return t
    }, m.difference = function(n) {
        var t = S(arguments, !0, !0, 1);
        return m.filter(n, function(n) {
            return !m.contains(t, n)
        })
    }, m.zip = function() {
        return m.unzip(arguments)
    }, m.unzip = function(n) {
        for (var t = n && m.max(n, O).length || 0, r = Array(t), e = 0; t > e; e++) r[e] = m.pluck(n, e);
        return r
    }, m.object = function(n, t) {
        for (var r = {}, e = 0, u = O(n); u > e; e++) t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
        return r
    }, m.findIndex = t(1), m.findLastIndex = t(-1), m.sortedIndex = function(n, t, r, e) {
        r = x(r, e, 1);
        for (var u = r(t), i = 0, o = O(n); o > i;) {
            var a = Math.floor((i + o) / 2);
            r(n[a]) < u ? i = a + 1 : o = a
        }
        return i
    }, m.indexOf = r(1, m.findIndex, m.sortedIndex), m.lastIndexOf = r(-1, m.findLastIndex), m.range = function(n, t, r) {
        null == t && (t = n || 0, n = 0), r = r || 1;
        for (var e = Math.max(Math.ceil((t - n) / r), 0), u = Array(e), i = 0; e > i; i++, n += r) u[i] = n;
        return u
    };
    var E = function(n, t, r, e, u) {
        if (!(e instanceof t)) return n.apply(r, u);
        var i = j(n.prototype),
            o = n.apply(i, u);
        return m.isObject(o) ? o : i
    };
    m.bind = function(n, t) {
        if (g && n.bind === g) return g.apply(n, l.call(arguments, 1));
        if (!m.isFunction(n)) throw new TypeError("Bind must be called on a function");
        var r = l.call(arguments, 2),
            e = function() {
                return E(n, e, t, this, r.concat(l.call(arguments)))
            };
        return e
    }, m.partial = function(n) {
        var t = l.call(arguments, 1),
            r = function() {
                for (var e = 0, u = t.length, i = Array(u), o = 0; u > o; o++) i[o] = t[o] === m ? arguments[e++] : t[o];
                for (; e < arguments.length;) i.push(arguments[e++]);
                return E(n, r, this, this, i)
            };
        return r
    }, m.bindAll = function(n) {
        var t, r, e = arguments.length;
        if (1 >= e) throw new Error("bindAll must be passed function names");
        for (t = 1; e > t; t++) r = arguments[t], n[r] = m.bind(n[r], n);
        return n
    }, m.memoize = function(n, t) {
        var r = function(e) {
            var u = r.cache,
                i = "" + (t ? t.apply(this, arguments) : e);
            return m.has(u, i) || (u[i] = n.apply(this, arguments)), u[i]
        };
        return r.cache = {}, r
    }, m.delay = function(n, t) {
        var r = l.call(arguments, 2);
        return setTimeout(function() {
            return n.apply(null, r)
        }, t)
    }, m.defer = m.partial(m.delay, m, 1), m.throttle = function(n, t, r) {
        var e, u, i, o = null,
            a = 0;
        r || (r = {});
        var c = function() {
            a = r.leading === !1 ? 0 : m.now(), o = null, i = n.apply(e, u), o || (e = u = null)
        };
        return function() {
            var f = m.now();
            a || r.leading !== !1 || (a = f);
            var l = t - (f - a);
            return e = this, u = arguments, 0 >= l || l > t ? (o && (clearTimeout(o), o = null), a = f, i = n.apply(e, u), o || (e = u = null)) : o || r.trailing === !1 || (o = setTimeout(c, l)), i
        }
    }, m.debounce = function(n, t, r) {
        var e, u, i, o, a, c = function() {
                var f = m.now() - o;
                t > f && f >= 0 ? e = setTimeout(c, t - f) : (e = null, r || (a = n.apply(i, u), e || (i = u = null)))
            };
        return function() {
            i = this, u = arguments, o = m.now();
            var f = r && !e;
            return e || (e = setTimeout(c, t)), f && (a = n.apply(i, u), i = u = null), a
        }
    }, m.wrap = function(n, t) {
        return m.partial(t, n)
    }, m.negate = function(n) {
        return function() {
            return !n.apply(this, arguments)
        }
    }, m.compose = function() {
        var n = arguments,
            t = n.length - 1;
        return function() {
            for (var r = t, e = n[t].apply(this, arguments); r--;) e = n[r].call(this, e);
            return e
        }
    }, m.after = function(n, t) {
        return function() {
            return --n < 1 ? t.apply(this, arguments) : void 0
        }
    }, m.before = function(n, t) {
        var r;
        return function() {
            return --n > 0 && (r = t.apply(this, arguments)), 1 >= n && (t = null), r
        }
    }, m.once = m.partial(m.before, 2);
    var M = !{
        toString: null
    }.propertyIsEnumerable("toString"),
        I = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
    m.keys = function(n) {
        if (!m.isObject(n)) return [];
        if (v) return v(n);
        var t = [];
        for (var r in n) m.has(n, r) && t.push(r);
        return M && e(n, t), t
    }, m.allKeys = function(n) {
        if (!m.isObject(n)) return [];
        var t = [];
        for (var r in n) t.push(r);
        return M && e(n, t), t
    }, m.values = function(n) {
        for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++) e[u] = n[t[u]];
        return e
    }, m.mapObject = function(n, t, r) {
        t = x(t, r);
        for (var e, u = m.keys(n), i = u.length, o = {}, a = 0; i > a; a++) e = u[a], o[e] = t(n[e], e, n);
        return o
    }, m.pairs = function(n) {
        for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++) e[u] = [t[u], n[t[u]]];
        return e
    }, m.invert = function(n) {
        for (var t = {}, r = m.keys(n), e = 0, u = r.length; u > e; e++) t[n[r[e]]] = r[e];
        return t
    }, m.functions = m.methods = function(n) {
        var t = [];
        for (var r in n) m.isFunction(n[r]) && t.push(r);
        return t.sort()
    }, m.extend = _(m.allKeys), m.extendOwn = m.assign = _(m.keys), m.findKey = function(n, t, r) {
        t = x(t, r);
        for (var e, u = m.keys(n), i = 0, o = u.length; o > i; i++)
            if (e = u[i], t(n[e], e, n)) return e
    }, m.pick = function(n, t, r) {
        var e, u, i = {}, o = n;
        if (null == o) return i;
        m.isFunction(t) ? (u = m.allKeys(o), e = b(t, r)) : (u = S(arguments, !1, !1, 1), e = function(n, t, r) {
            return t in r
        }, o = Object(o));
        for (var a = 0, c = u.length; c > a; a++) {
            var f = u[a],
                l = o[f];
            e(l, f, o) && (i[f] = l)
        }
        return i
    }, m.omit = function(n, t, r) {
        if (m.isFunction(t)) t = m.negate(t);
        else {
            var e = m.map(S(arguments, !1, !1, 1), String);
            t = function(n, t) {
                return !m.contains(e, t)
            }
        }
        return m.pick(n, t, r)
    }, m.defaults = _(m.allKeys, !0), m.create = function(n, t) {
        var r = j(n);
        return t && m.extendOwn(r, t), r
    }, m.clone = function(n) {
        return m.isObject(n) ? m.isArray(n) ? n.slice() : m.extend({}, n) : n
    }, m.tap = function(n, t) {
        return t(n), n
    }, m.isMatch = function(n, t) {
        var r = m.keys(t),
            e = r.length;
        if (null == n) return !e;
        for (var u = Object(n), i = 0; e > i; i++) {
            var o = r[i];
            if (t[o] !== u[o] || !(o in u)) return !1
        }
        return !0
    };
    var N = function(n, t, r, e) {
        if (n === t) return 0 !== n || 1 / n === 1 / t;
        if (null == n || null == t) return n === t;
        n instanceof m && (n = n._wrapped), t instanceof m && (t = t._wrapped);
        var u = s.call(n);
        if (u !== s.call(t)) return !1;
        switch (u) {
            case "[object RegExp]":
            case "[object String]":
                return "" + n == "" + t;
            case "[object Number]":
                return +n !== +n ? +t !== +t : 0 === +n ? 1 / +n === 1 / t : +n === +t;
            case "[object Date]":
            case "[object Boolean]":
                return +n === +t
        }
        var i = "[object Array]" === u;
        if (!i) {
            if ("object" != typeof n || "object" != typeof t) return !1;
            var o = n.constructor,
                a = t.constructor;
            if (o !== a && !(m.isFunction(o) && o instanceof o && m.isFunction(a) && a instanceof a) && "constructor" in n && "constructor" in t) return !1
        }
        r = r || [], e = e || [];
        for (var c = r.length; c--;)
            if (r[c] === n) return e[c] === t;
        if (r.push(n), e.push(t), i) {
            if (c = n.length, c !== t.length) return !1;
            for (; c--;)
                if (!N(n[c], t[c], r, e)) return !1
        } else {
            var f, l = m.keys(n);
            if (c = l.length, m.keys(t).length !== c) return !1;
            for (; c--;)
                if (f = l[c], !m.has(t, f) || !N(n[f], t[f], r, e)) return !1
        }
        return r.pop(), e.pop(), !0
    };
    m.isEqual = function(n, t) {
        return N(n, t)
    }, m.isEmpty = function(n) {
        return null == n ? !0 : k(n) && (m.isArray(n) || m.isString(n) || m.isArguments(n)) ? 0 === n.length : 0 === m.keys(n).length
    }, m.isElement = function(n) {
        return !(!n || 1 !== n.nodeType)
    }, m.isArray = h || function(n) {
        return "[object Array]" === s.call(n)
    }, m.isObject = function(n) {
        var t = typeof n;
        return "function" === t || "object" === t && !! n
    }, m.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(n) {
        m["is" + n] = function(t) {
            return s.call(t) === "[object " + n + "]"
        }
    }), m.isArguments(arguments) || (m.isArguments = function(n) {
        return m.has(n, "callee")
    }), "function" != typeof / . / && "object" != typeof Int8Array && (m.isFunction = function(n) {
        return "function" == typeof n || !1
    }), m.isFinite = function(n) {
        return isFinite(n) && !isNaN(parseFloat(n))
    }, m.isNaN = function(n) {
        return m.isNumber(n) && n !== +n
    }, m.isBoolean = function(n) {
        return n === !0 || n === !1 || "[object Boolean]" === s.call(n)
    }, m.isNull = function(n) {
        return null === n
    }, m.isUndefined = function(n) {
        return n === void 0
    }, m.has = function(n, t) {
        return null != n && p.call(n, t)
    }, m.noConflict = function() {
        return u._ = i, this
    }, m.identity = function(n) {
        return n
    }, m.constant = function(n) {
        return function() {
            return n
        }
    }, m.noop = function() {}, m.property = w, m.propertyOf = function(n) {
        return null == n ? function() {} : function(t) {
            return n[t]
        }
    }, m.matcher = m.matches = function(n) {
        return n = m.extendOwn({}, n),
        function(t) {
            return m.isMatch(t, n)
        }
    }, m.times = function(n, t, r) {
        var e = Array(Math.max(0, n));
        t = b(t, r, 1);
        for (var u = 0; n > u; u++) e[u] = t(u);
        return e
    }, m.random = function(n, t) {
        return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1))
    }, m.now = Date.now || function() {
        return (new Date).getTime()
    };
    var B = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    }, T = m.invert(B),
        R = function(n) {
            var t = function(t) {
                return n[t]
            }, r = "(?:" + m.keys(n).join("|") + ")",
                e = RegExp(r),
                u = RegExp(r, "g");
            return function(n) {
                return n = null == n ? "" : "" + n, e.test(n) ? n.replace(u, t) : n
            }
        };
    m.escape = R(B), m.unescape = R(T), m.result = function(n, t, r) {
        var e = null == n ? void 0 : n[t];
        return e === void 0 && (e = r), m.isFunction(e) ? e.call(n) : e
    };
    var q = 0;
    m.uniqueId = function(n) {
        var t = ++q + "";
        return n ? n + t : t
    }, m.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var K = /(.)^/,
        z = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "\u2028": "u2028",
            "\u2029": "u2029"
        }, D = /\\|'|\r|\n|\u2028|\u2029/g,
        L = function(n) {
            return "\\" + z[n]
        };
    m.template = function(n, t, r) {
        !t && r && (t = r), t = m.defaults({}, t, m.templateSettings);
        var e = RegExp([(t.escape || K).source, (t.interpolate || K).source, (t.evaluate || K).source].join("|") + "|$", "g"),
            u = 0,
            i = "__p+='";
        n.replace(e, function(t, r, e, o, a) {
            return i += n.slice(u, a).replace(D, L), u = a + t.length, r ? i += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'" : e ? i += "'+\n((__t=(" + e + "))==null?'':__t)+\n'" : o && (i += "';\n" + o + "\n__p+='"), t
        }), i += "';\n", t.variable || (i = "with(obj||{}){\n" + i + "}\n"), i = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + i + "return __p;\n";
        try {
            var o = new Function(t.variable || "obj", "_", i)
        } catch (a) {
            throw a.source = i, a
        }
        var c = function(n) {
            return o.call(this, n, m)
        }, f = t.variable || "obj";
        return c.source = "function(" + f + "){\n" + i + "}", c
    }, m.chain = function(n) {
        var t = m(n);
        return t._chain = !0, t
    };
    var P = function(n, t) {
        return n._chain ? m(t).chain() : t
    };
    m.mixin = function(n) {
        m.each(m.functions(n), function(t) {
            var r = m[t] = n[t];
            m.prototype[t] = function() {
                var n = [this._wrapped];
                return f.apply(n, arguments), P(this, r.apply(m, n))
            }
        })
    }, m.mixin(m), m.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(n) {
        var t = o[n];
        m.prototype[n] = function() {
            var r = this._wrapped;
            return t.apply(r, arguments), "shift" !== n && "splice" !== n || 0 !== r.length || delete r[0], P(this, r)
        }
    }), m.each(["concat", "join", "slice"], function(n) {
        var t = o[n];
        m.prototype[n] = function() {
            return P(this, t.apply(this._wrapped, arguments))
        }
    }), m.prototype.value = function() {
        return this._wrapped
    }, m.prototype.valueOf = m.prototype.toJSON = m.prototype.value, m.prototype.toString = function() {
        return "" + this._wrapped
    }, "function" == typeof define && define.amd && define("underscore", [], function() {
        return m
    })
}).call(this);

function getChromeVersion () {     
    var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);

    return raw ? parseInt(raw[2], 10) : false;
}

//# sourceMappingURL=underscore-min.map


/** W5capi API
      @ Param [string] w5capi API key
      @ Param [String] platform ios,android,browser
      @ Param [String] channelid
      @ Param [String] websocketURL websocket URL
      */


(function() {
    window.W5Peer = function(key, platform, channelid, websocketURI) {
        console.log(key);
        var w5peer = this;
        var apikey = '1hh23bbh3333';
        var apiplatform = 'browser';
        var requested_service = key.requestedService || 'webrtc'
        w5peer.userid = getRandomString();
        w5peer.ice = {};
        window.extensionID = 'nlnfogneblaieieknkhaabhhendjdanf';
        // JUST a simple self-implemented version of events invocation!
        w5peer.events = {};
        w5peer.on = function(event, callback) {
            if (event.indexOf('private') != -1) {
                // throw 'Private events are not overridable.';
            }

            w5peer.events[event] = callback;
        };

        w5peer.extensionID = function(ID) {
            window.extensionID = ID;
        }

        w5peer.emit = function() {
            if (!w5peer.events[arguments[0]]) {
                console.warn('Event ', arguments[0], ' doesn\'t exists.', arguments[1], arguments[2], arguments[3], arguments[4]);
            } else w5peer.events[arguments[0]](arguments[1], arguments[2], arguments[3], arguments[4]);
        };

        w5peer.mediaType = {};

        w5peer.bandwidth = {
            audio: 80, // 80 kbs
            video: 256 // 256 kbs
        };
        if (key) {
            apikey = key.key;
            window.capikey=key.key;
        }
        if (platform) {
            apiplatform = platform.platform;
        }


        w5peer.datachannel = false;
        w5peer.channels = {};
        w5peer.mediaStreams = [];

        w5peer.send = function(message) {
            for (var channel in w5peer.channels) {
                var data = JSON.stringify(message);
                w5peer.channels[channel].send(data);
            }
        };

        w5peer.sendFile = function(data) {
            FileSender.send(data, w5peer);
        };

        w5peer.sendText = function(data) {
            TextSender.send(data, w5peer);
        };

        w5peer.direction = 'two-way';
        w5peer.peers = {};

        window.signalingGateway;
        /*create socket.io connection to signalling server
         with following parametter
         userid:String
         apikey:String
         platform:String
        */
        w5peer.registerUserWithId = function(userid) {
            var userid = userid != null ? userid : w5peer.userid;
            userid = (0 != userid.length) ? userid : w5peer.userid;
            userid += apikey;
            console.log(userid);
            w5peer.userid = userid;
            signalingGateway = io("https://w5capi-sig.w5rtc.com/?userid=" + userid + '&apikey=' + apikey + '&platform=' + apiplatform + '&version=' + 1.4 + '&service=' + requested_service || 'webrtc');

            /*
              Get connected respoce from signalling server
            */
            signalingGateway.on('connect', function() {


            });



            signalingGateway.send = function(data) {
                data.from = w5peer.userid;
                signalingGateway.emit('message', JSON.stringify(data));
            };


            //Send billing Message
            signalingGateway.sendBilling = function(data) {
            
                signalingGateway.emit('billing_info', JSON.stringify(data));
            };

            //Send Group chat
            signalingGateway.groupSend = function(data) {
                data.from = w5peer.userid;
                signalingGateway.emit('create-group-req', JSON.stringify(data));
            };

            //Send SIP Message
            signalingGateway.SIPSend = function(data) {
                data.from = w5peer.userid;
                signalingGateway.emit('SIP-request', JSON.stringify(data));
            };




            signalingGateway.joinSend = function(data) {
                data.from = w5peer.userid;
                signalingGateway.emit('join-group-req', JSON.stringify(data));
            }

            /*receive ice server address from signalling server
             stun:stun server address
             turnold:turn server address for old chrome version less then 28(version)
             turnnew:turn server address for new chrome version more then 28(version
           */
            signalingGateway.on('validation-res', function(data) {
                //check validation respoce
                if (data.error) {
                    w5peer.emit('registerFail-callback', {
                        event: 'Error',
                        data: {
                            msg: data.msg
                        }
                    });
                } else {
                    w5peer.ice = data;
                    console.log(data);
                    console.log(w5peer.ice.stun);
                    for (var i in w5peer.ice.stun) {
                        console.log(w5peer.ice.stun)
                    }
                    //emit success event to callback
                    w5peer.emit('registerSuccess-callback', {
                        event: 'success',
                        data: {
                            userid: userid
                        }
                    });
                }

            });


            //Receive SIP dupliacte password from signalling server
            signalingGateway.on('SIP-responce', function(data) {
                w5peer.emit('SIP-responce', data);
            });

            /*
             receive create-group responce from signalling server
             like group-created,group-exit,group-empty
            */
            signalingGateway.on('create-group-res', function(data) {
                w5peer.emit('groupres-callback', data);
            });

            /*
             receive join-group responce from signalling server
             like join-group,group-empty,etc
            */
            signalingGateway.on('join-group-res', function(data) {
                w5peer.emit('groupres-callback', data);
            });





            signalingGateway.on('message', function(data) {
                w5peer.emit('signaling-message', JSON.parse(data));
            });


              //Get Billing information
        w5peer.on('billing_info',function(data){
            signalingGateway.sendBilling(data);
        });


            /*user left message from Signalling server
             */
            signalingGateway.on('user-left', function(data) {
                w5peer.emit('user-left-all', data);
            });




            /*
            Receive registration failed event from signalling server
            */
            signalingGateway.on('InvalidUser', function(data) {
                w5peer.emit('registerFail-callback', {
                    event: 'Error',
                    data: {
                        msg: 'Invalid APIkey'
                    }
                });
            });

        };


        //Send SIP Register request to signalling server 
        w5peer.SIPSend = function(data) {
            console.log(data);
            console.log(window.signalingGateway);
            //signalingGateway.SIPSend(data);
        }

        /*w5peer callback methods
         */


        /*
        Register success callback
        */
        w5peer.onSuccess = function(callback) {
            //register success callback event
            w5peer.on('registerSuccess-callback', function(data) {
                callback(data);
            })

        }


        /*
        Register fails callback
        */
        w5peer.onFail = function(callback) {
            //register success callback event
            w5peer.on('registerFail-callback', function(data) {
                callback(data);
            });

        }


        /*
        Local stream callback method
        */
        w5peer.onLocalStream = function(callback) {
            //local stream callback event
            w5peer.on('localStream-callback', function(stream) {
                callback(stream);
            });
        }


        /*
        Remote stream callback method
        */
        w5peer.onRemoteStream = function(callback) {
            //local stream callback event
            w5peer.on('remoteStream-callback', function(stream) {
                callback(stream);
            });
        }


        /*
        Peer connected callback method
        */
        w5peer.onCallStatus = function(callback) {
            //peer connected callback event
            w5peer.on('peerConnected-callback', function(data) {
                callback({
                    event: 'connected',
                    from: data
                });
            });

            //peer disconnected callback event
            w5peer.on('peerDisconnected-callback', function(data) {
                callback({
                    event: 'disconnected',
                    from: data
                });
            });

            //peer user-left callback event
            w5peer.on('userleft-callback', function(data) {
                callback({
                    event: 'disconnected',
                    from: data
                });
            });

            //user notready callback event
            w5peer.on('usernotready-callback', function(data) {
                callback({
                    event: 'decline',
                    from: data.from
                });
            });
        }

        /*
          onCall callback
        */
        w5peer.onCall = function(callback) {
            w5peer.on('areyouready-callback', function(data) {
                callback(data);
            });
        }

        /*
          Datachannel event callback method
        */
        w5peer.onDatachannel = function(callback) {
            //Data channel open event
            w5peer.on('datachannelopen-callback', function(data) {
                callback({
                    event: 'open',
                    peerid: data
                });
            });

            //Data channel close event
            w5peer.on('datachannelclose-callback', function(data) {
                callback({
                    event: 'close',
                    peerid: data
                });
            });

            //Data channel error event
            w5peer.on('datachannelerror-callback', function(data) {
                callback({
                    event: 'error',
                    peerid: data
                });
            });



        }

        /*
        Datachannel message callback
        */
        w5peer.onMessage = function(callback) {
            w5peer.on('channelmsg-callback', function(message) {
                callback({
                    peerid: message.peerid,
                    msg: message.data
                });
            });
        }

        /*
         Accept incomming call
         */
        w5peer.accept = function(data) {
            w5peer.datachannel = data.datachannel;
            w5peer.peers[data.peerid] = new W5RTCWrapper(w5peer, data.peerid);
            w5peer.emit('are-you-ready', data);
        }

        /*
          Decline incomming call
          */
        w5peer.decline = function(data) {
            w5peer.signal({
                to: data.from,
                peerid: data.peerid,
                ready: false
            });
        }


        /*
           File Realted callback
        */
        w5peer.onFile = function(callback) {
            //file start callback
            w5peer.on('filestart-callback', function(data) {
                callback(data);
            });
            //file in progress callback
            w5peer.on('fileprogress-callback', function(data) {
                callback(data);
            });
            //file end
            w5peer.on('fileend-callback', function(data) {
                callback(data);
            });
        }

        /*
          Group related callback
        */
        w5peer.onGroup = function(data) {
            w5peer.on('groupres-callback', function(data) {
                console.log(data);
            });
        }

        w5peer.signal = function(data) {
            signalingGateway.send(data);
        };

        w5peer.on('group-signaling-message', function(data) {
            console.log(data);
            var members = data.participants;
            //call all participants in this group
            for (var i in members) {
                w5peer.groupCall(members[i], data.mediaType);
            }
        });

        w5peer.on('signaling-message', function(message) {
            if (message.isCustomMessage) {

                if (message.participants) {
                    //if it is custom groupsignalling message
                    return w5peer.emit('group-signaling-message', message);
                } else {
                    // if it is custom signaling-message; pass it over "custom-signaling-message" event
                    return w5peer.emit('custom-signaling-message', message);
                }


            }



            if (message.from == w5peer.userid) return;
            if (message.to && message.to != w5peer.userid) return;

            if (message.closePeer) {
                w5peer.emit('user-left-private', message.from);
            }

            // offer-sdp or answer-sdp
            if (message.sdp && w5peer.peers[message.peerid]) {
                // offer-sdp
                if (message.sdp.type == 'offer') {
                    w5peer.emit('offer-sdp', message);
                }

                // answer-sdp
                else {
                    w5peer.emit('answer-sdp', message);
                }
            }

            // ice-candidate
            if (message.candidate && w5peer.peers[message.peerid]) {
                log('received candidate', message.candidate.candidate);

                w5peer.peers[message.peerid].emit('candidate', message.candidate);
            }

            // offere is asking: "Are you ready to receive his offer?"
            if (message.areYouReady) {

                w5peer.emit('areyouready-callback', message);

            }

            // answere said that he is ready to receive offer
            if (message.ready) {
                w5peer.emit('user-ready', message);
            }

            //answere said that he is not ready to receive offer
            if (message.ready === false) {
                w5peer.emit('usernotready-callback', message);
            }



            if (message.userleft) {
                w5peer.emit('user-left-private', message.from);
            }

            //Cut Call
            if (message.cutCall) {
                w5peer.emit('cutCall', message.from);
            }

            //Development timer
            if (message.dev) {
                w5peer.emit('user-left-dev', message);
            }
        });

        w5peer.AllowedCandidates = {
            Host: true, // to use host candidates
            TURN: true, // to use relay candidates
            STUN: true // to use reflexive candidates
        };

        w5peer.resolutions = {
            minWidth: 320,
            minHeight: 180,
            maxWidth: 1280,
            maxHeight: 720,
            minFrameRate: 10,
            minAspectRatio: 1.33
        };

        // Supported Values:
        // ['1920:1080', '1280:720', '960:720', '640:360', '640:480', '320:240', '320:180'];
        w5peer.setResolutions = function(width, height) {
            w5peer.resolutions.maxWidth = width;
            w5peer.resolutions.maxHeight = height;
        };

        // now, target user is ready; create offer anad send him
        w5peer.on('user-ready', function(message) {
            log('user whose id is ', message.from, ', is ready.');

            if (w5peer.datachannel && isEmpty(w5peer.mediaType)) {
                w5peer.peers[message.peerid].createOffer().sendTo(message.from);
            } else
                w5peer.peers[message.peerid].getLocalStream(function() {
                    w5peer.peers[message.peerid].createOffer().sendTo(message.from);

                });
        });

        // the person, who's is planning to create offer, is asking that are you ready to receive his offer?
        w5peer.on('are-you-ready', function(message) {
            log(message.from, ' asked that are you ready?');

            // if offerer is sharing audio; you should share audio
            // if offerer is sharing video; you should share video
            // if offerer is sharing audio+video; you should share audio+video
            // if offerer is sharing screen; you should screen
            // if offerer is sharing screen + audio or screen+video then you share same like him
            w5peer.mediaType = message.mediaType;
            sessionStorage.targetUser = message.from;
            // if offerer said that his stream should be one-way; then you shouldn't attach/capture your own webcam/mic
            if (message.direction == 'one-way') {
                w5peer.signal({
                    to: message.from,
                    peerid: message.peerid,
                    ready: true
                });
            }

            // otherwise, stream is two-way
            if (message.direction == 'two-way') {
                if (isEmpty(w5peer.mediaType)) {
                    w5peer.datachannel = true;
                }
                if (w5peer.datachannel && isEmpty(w5peer.mediaType)) {
                    // tell offerer that you're ready to receive his offer;
                    // because offerer will quickly send you the offer-sdp; that's why
                    // local media stream is captured earlier in the above line.
                    w5peer.signal({
                        to: message.from,
                        peerid: message.peerid,
                        ready: true
                    });
                }

                // capture offerer-like stream because direction is two-way
                else
                    w5peer.peers[message.peerid].getLocalStream(function() {
                        // tell offerer that you're ready to receive his offer;
                        // because offerer will quickly send you the offer-sdp; that's why
                        // local media stream is captured earlier in the above line.
                        w5peer.signal({
                            to: message.from,
                            peerid: message.peerid,
                            ready: true
                        });
                    });
            }
        });

        // if offerer created offer; and sent you
        w5peer.on('offer-sdp', function(message) {
            log('got', message.sdp.type);
            // you can set remote description
            // create answer-sdp
            // and send to offerer
            w5peer.peers[message.peerid].setRemoteDescription(message.sdp).createAnswer().sendTo(message.from);
        });

        // if answerer (i.e. you!) created answer; and sent to offerer
        w5peer.on('answer-sdp', function(message) {
            log('got', message.sdp.type);

            // complete the handshake by setting remote description for offerer
            w5peer.peers[message.peerid].setRemoteDescription(message.sdp);
        });

        //W5peer cut call
        w5peer.on('cutCall', function(message) {
            w5peer.emit('cutCall'.message);
        });


        //Stop LocalStream
        w5peer.stopStream = function() {

            window.currentUserMediaRequest = {
                streams: [],
                mutex: false,
                queueRequests: []
            };

            try {
                
                if(getChromeVersion() > 44)
                {
                    window.localStream.getTracks().forEach(function(track) {
    track.stop();
    
  })
                    
                }else
                {
                   window.localStream.stop();
                }
            } catch (e) {
                console.warn('localStream not running now');
            }
            w5peer.mediaStreams = [];


        }

        //Mute Audio
        w5peer.muteAudio = function() {
            try {
                window.localStream.getAudioTracks()[0].enabled = false;
            } catch (e) {
                console.log('LocalStream not running now');
            }


        }

        //unmute Audio
        w5peer.unmuteAudio = function() {
            try {
                window.localStream.getAudioTracks()[0].enabled = true;
            } catch (e) {
                console.log('LocalStream not running now');
            }

        }

        //stoptream
        w5peer.hangup = function() {
            w5peer.mediaStreams = [];
            window.currentUserMediaRequest = {
                streams: [],
                mutex: false,
                queueRequests: []
            };

            try {
                for (var peer in w5peer.peers) {

                    var connection = w5peer.peers[peer].peer.connection;

                    if (connection.getRemoteStreams()[0]) {
                        try {
                            connection.getRemoteStreams()[0].stop();
                        } catch (e)

                        {}

                            
                if(getChromeVersion() > 44)
                {
                    window.localStream.getTracks().forEach(function(track) {
    track.stop();
    
  })
                    
                }else
                {
                   window.localStream.stop();
                }

                        w5peer.signal({
                            to: w5peer.peers[peer].targetUser,
                            // ask him,to disconnect call
                            cutCall: true
                        });
                    }
                    if (isSafari) {

                    } else {
                        if (!connection.ondatachannel) {
                            if (w5peer.peers[peer].peer.connection.signalingState !== 'closed' && w5peer.peers[peer].peer.connection.iceConnectionState.search(/disconnected|failed/gi) === -1) {
                                var connection = w5peer.peers[peer].peer.connection.close();
                                delete w5peer.peers[peer];
                            }
                        }
                    }



                }

            } catch (e) {
                console.warn('Reomte Stream Not Running');
                console.log(e);
            }
        }

        //Pause Video
        w5peer.pauseVideo = function() {
            try {
                window.localStream.getVideoTracks()[0].enabled = false;
            } catch (e) {
                console.warn('LocalStream not running now');
            }
        }

        //play video
        w5peer.playVideo = function() {
            try {
                window.localStream.getVideoTracks()[0].enabled = true;
            } catch (e) {
                console.warn('LocalStream not running now');
            }
        }



        //Close DataChannel
        w5peer.closePeer = function() {

            window.currentUserMediaRequest = {
                streams: [],
                mutex: false,
                queueRequests: []
            };
            for (var channel in w5peer.channels) {
                if (w5peer.channels[channel]) {
                    w5peer.channels[channel].close();
                    delete w5peer.channels[channel];
                }
            }

            try {
                    
                if(getChromeVersion() > 44)
                {
                    window.localStream.getTracks().forEach(function(track) {
    track.stop();
  })
                    
                }else
                {
                   window.localStream.stop();
                }
            } catch (e) {
                console.warn('localStream not running now');
            }
            if (isFirefox) {
                setTimeout(function() {
                    w5peer.emit('datachannel-close', 'event');
                }, 200);
            }

            for (var peer in w5peer.peers) {

                try {
                    if (w5peer.peers[peer].targetUser) {
                        var userid = w5peer.peers[peer].targetUser;

                        if (w5peer.peers[peer].peer.connection.signalingState !== 'closed' && w5peer.peers[peer].peer.connection.iceConnectionState.search(/disconnected|failed/gi) === -1) {
                            var connection = w5peer.peers[peer].peer.connection.close();
                            delete w5peer.peers[peer];
                        }

                        if (userid) {
                            w5peer.emit('user-left-private', userid);

                            w5peer.signal({
                                to: userid,
                                // to synchronize peer-id
                                peerid: peer,
                                // ask him, if he is ready
                                closePeer: true
                            });
                        }
                    }
                } catch (e) {

                }


            }
        };

        /*
        SIP ----->Freeswitch<----- SIP
        using mod_verto
        */

        var cur_call = null;
        var share_call = null;
        var verto_ice = [];
        var verto_id;
        var verto_video;

        //Get video tag ID
        w5peer.setSIPVideo = function(videotag) {
            if (!_.isObject) {
                w5peer.emit('w5capipstn_status', {
                    event: 'DOM',
                    Error: 'Invalid video tag'
                });
            }

            verto_video = videotag;
            console.error(verto_video);

        }


        w5peer.onSIPRing = function(callback) {
            w5peer.on('w5capipstn_ring', function(data) {
                callback({
                    event: 'ring',
                    session: data.data.params
                });
            });

        }

        w5peer.onSIPStatus = function(callback) {
            w5peer.on('w5capipstn_status', function(data) {
                callback(data);
            });
        }

       w5peer.onSIPLocalStream=function(callback)
       {
           window.w5capi_SIP.on('SIP-localstream',function(stream){
               callback(stream);
           });
       }
       
        w5peer.onSIPRemoteStream=function(callback)
       {
           window.w5capi_SIP.on('SIP-remotestream',function(stream){
               callback(stream);
           });
       }
        
        w5peer.SIPCall = function(callinfo) {
            if(_.isEmpty(callinfo) || _.isEmpty(callinfo.number))
            {
                return;
            }
            var w5rtc=/@w5rtc.com$/;
            if(w5rtc.test(callinfo.number))
            {
                var userid=callinfo.number.split('@w5rtc.com');
                var caller_id=userid[0]+window.capikey+'_w5rtc'+window.capikey;
                callinfo.number=caller_id.toString();
            }
            vertoHandle.iceServers(verto_ice);
            console.error(verto_ice)
            docall(callinfo);

        }


        w5peer.SIPAnswer = function(videoOpt) {
           cur_call.answer({
                useVideo: videoOpt.video || false
            });
        }

        w5peer.SIPHangup = function() {
            cur_call.hangup();
        }


        w5peer.SIPHold = function() {
            cur_call.toggleHold();
        }

        w5peer.SIPPause=function()
        {
            cur_call.setVideoMute('off')
        }

      
        w5peer.SIPPlay=function()
        {
            cur_call.setVideoMute('on')
        }

        w5peer.SIPMute=function()
        {
            cur_call.setMute('off')
        }

        w5peer.SIPUnmute=function()
        {
            cur_call.setMute('on')
        }

        w5peer.on('SIP-responce', function(data) {
            if(!window.jQuery)
            {
               w5peer.emit('w5capipstn_status', {
                        event: 'sip_register',
                        status: 'failure',
                        desc:'You must include jquery 2.0 or later'
                    });
                   return;
            }
        
            verto_ice.push(w5peer.ice.stun[0]);
            verto_ice.push(w5peer.ice.turnnew[0]);
   $.verto.init({
                skipPermCheck: true
            },init(data));

           
        });


        var logincallbacks = {
            onWSLogin: function(v, success) {

                if (success) {
                    w5peer.emit('w5capipstn_status', {
                        event: 'sip_register',
                        status: 'success'
                    });
                    verto.username = info.username
                } else {
                    w5peer.emit('w5capipstn_status', {
                        event: 'sip_register',
                        status: 'failure',
                        desc: 'Registration Failed'
                    });
                }
            },

            onMessage: function(v, dialog, msg, params) {
                console.debug('onMessage:', v, dialog, msg, params);

                switch (msg) {
                    case $.verto.enum.message.pvtEvent:
                        if (params.pvtData) {
                            switch (params.pvtData.action) {
                                case "conference-liveArray-join":
                                    console.log("conference-liveArray-join");
                                    break;
                                case "conference-liveArray-part":
                                    console.log("conference-liveArray-part");
                                    break;
                            }
                        }
                        break;

                    case $.verto.enum.message.info:
                        var body = params.body;
                        var from = params.from_msg_name || params.from;

                        break;
                    default:
                        break;
                }
            },

            onDialogState: function(d) {
                switch (d.state.name) {


                    case "ringing":
                        cur_call = d;
                        w5peer.emit('w5capipstn_ring', {
                            event: 'ringing',
                            data: d
                        });
                        
                        break;
                    case "trying":

                        w5peer.emit('w5capipstn_status', {
                            event: 'trying',
                            data: d
                        });
                        break;
                    case "early":
                        w5peer.emit('w5capipstn_status', {
                            event: 'progress',
                            data: d
                        });
                        break;
                    case "active":
                        cur_call = d;
                        w5peer.emit('w5capipstn_status', {
                            event: 'connected',
                            data: d
                        });
                        break;
                    case "hangup":
                        if(cur_call)
                        {
                            cur_call.hangup()
                        }
                        w5peer.emit('w5capipstn_status', {
                            event: 'hangup',
                            data: d
                        });
                        break;
                    case "destroy":
                         cur_call = null;
                        w5peer.emit('w5capipstn_status', {
                            event: 'terminate',
                            data: d
                        });
                       
                        //console.debug('Destroying: ' + d.cause);
                        break;
                }
            },

            onWSClose: function(v, success) {
                console.debug('onWSClose:', success);
            },

            onEvent: function(v, e) {
               
                console.debug('onEvent:', e);
            }
        };



       
        function init(info) {
            cur_call = null;


            vertoHandle = new $.verto({
                login: info.userId + '@w5fs.w5rtc.com',
                passwd: info.password.toString(),
                socketUrl: 'wss://w5fs.w5rtc.com',
                tag: verto_video.remote || null,
                ringFile:info.ringtone || null,
                iceServers: true
            }, logincallbacks);
        }




        function docall(callinfo) {
            cur_call = vertoHandle.newCall({
                destination_number: callinfo.number,
                caller_id_name: callinfo.caller_name || 'w5rtc',
                caller_id_number: verto_id || '1212121',
                useVideo: callinfo.video || false
            });
        }
        /*
        w5peer.sipRegister = function(info) {

            var logincallbacks = {
                onWSLogin: function(v, success) {

                    if (success) {
                        w5peer.emit('w5capipstn_status', {
                            event: 'sip_register',
                            status: 'success'
                        });
                        verto.username=info.username
                    } else {
                        w5peer.emit('w5capipstn_status', {
                            event: 'sip_register',
                            status: 'failure',
                            desc: 'invalid username or password'
                        });
                    }
                },

                onMessage: function(v, dialog, msg, params) {
                    console.debug('onMessage:', v, dialog, msg, params);

                    switch (msg) {
                        case $.verto.enum.message.pvtEvent:
                            if (params.pvtData) {
                                switch (params.pvtData.action) {
                                    case "conference-liveArray-join":
                                        console.log("conference-liveArray-join");
                                        break;
                                    case "conference-liveArray-part":
                                        console.log("conference-liveArray-part");
                                        break;
                                }
                            }
                            break;
                           
                        case $.verto.enum.message.info:
                            var body = params.body;
                            var from = params.from_msg_name || params.from;

                            break;
                        default:
                            break;
                    }
                },

                onDialogState: function(d) {


                    if (!dialcall) {
                        dialcall = d;
                    } else {
                        //dialcall = null;   
                    }
                    /*   if (d.state.name !== 'ringing') {
                   console.log('2')
                 //    inCall()
                } 
            } */
        /*   switch (d.state.name) {


                        case "ringing":
                            w5peer.emit('w5capipstn_ring', {
                                event: 'ringing',
                                data: d
                            });
                            break;
                        case "trying":

                            w5peer.emit('w5capipstn_status', {
                                event: 'trying',
                                data: d
                            });
                            break;
                        case "early":
                            w5peer.emit('w5capipstn_status', {
                                event: 'progress',
                                data: d
                            });
                            break;
                        case "active":
                            w5peer.emit('w5capipstn_status', {
                                event: 'connected',
                                data: d
                            });
                            break;
                        case "hangup":
                            w5peer.emit('w5capipstn_status', {
                                event: 'hangup',
                                data: d
                            });
                            verto.callState = 'hangup';
                            dialcall == null;
                            break;
                        case "destroy":
                            w5peer.emit('w5capipstn_status', {
                                event: 'terminate',
                                data: d
                            });
                            dialcall == null;
                            //console.debug('Destroying: ' + d.cause);
                            break;
                    }
                },

                onWSClose: function(v, success) {
                    console.debug('onWSClose:', success);
                },

                onEvent: function(v, e) {
                    console.debug('onEvent:', e);
                }
            };


            function start() {
                verto = new $.verto({
                    login: info.username + '@192.168.1.3',
                    passwd: info.password,
                    socketUrl: 'wss://192.168.1.3:8082',
                    tag: "webcam",
                    localTag: 'source',
                    ringFile: "https://webrtc.freeswitch.org/sounds/bell_ring2.wav",
                    audioParams: {
                        googAutoGainControl: false,
                        googNoiseSuppression: false,
                        googHighpassFilter: false
                    },
                    iceServers:false
                }, logincallbacks);

            }

            $(document).ready(function() {
                start();
            });
        }
*/





        // w5peer.sipRegister();

        /*
        SIP  End----->Freeswitch<----- SIP End
        */




        /*
        make media call
        */

        w5peer.call = function(targetUser, mediaType) {
            /*
            Check media type Object
            */

            w5peer.datachannel = (mediaType.data) === true ? true : false;
            w5peer.direction = (mediaType.direction) === 'one-way' ? 'one-way' : 'two-way';
            var mediatype = (typeof mediaType) === 'object' ? mediaType : {};
            if (mediaType.hasOwnProperty('video') && mediaType.hasOwnProperty('audio')) {
                w5peer.mediaType = {
                    audio: mediaType.audio,
                    video: mediaType.video
                };
            } else if (mediaType.hasOwnProperty('screen')) {
                w5peer.mediaType = {
                    screen: true
                };
            } else if (mediaType.hasOwnProperty('screen') && mediaType.hasOwnProperty('audio')) {
                w5peer.mediaType = {
                    screen: true,
                    audio: true
                };
            } else if (mediaType.hasOwnProperty('video')) {
                w5peer.mediaType = {
                    video: true,
                    audio: false
                };
            } else if (mediaType.hasOwnProperty('audio')) {
                w5peer.mediaType = {
                    video: false,
                    audio: true
                };
            } else {
                w5peer.mediaType = {};
            }
            var targetUser = targetUser + apikey;
            // in multi-user connectivity scenario; we need unique-id for each peer
            // it should be set for offerer; same peer-id must be used by answerer
            // that's why peer-id is shared in the below "send" method;
            var peerid = getRandomString();
            w5peer.peers[peerid] = new W5RTCWrapper(w5peer, peerid, targetUser);

            // to match offerer's and answerer's type; we need to exchange
            // media-type and direction with answerer
            sessionStorage.targetUser = targetUser;
            w5peer.signal({
                to: targetUser,

                // to synchronize peer-id
                peerid: peerid,
                datachannel: w5peer.datachannel,

                // to synchronize direction and media-type
                direction: w5peer.direction,
                mediaType: w5peer.mediaType,

                // ask him, if he is ready
                areYouReady: true
            });
        };

        /*
         Making group call with media
        */

        w5peer.groupCall = function(targetUser, mediaType) {
            /*
            Check media type Object
            */

            w5peer.datachannel = (mediaType.data) === true ? true : false;
            w5peer.direction = (mediaType.direction) === 'one-way' ? 'one-way' : 'two-way';
            var mediatype = (typeof mediaType) === 'object' ? mediaType : {};
            if (mediaType.hasOwnProperty('video') && mediaType.hasOwnProperty('audio')) {
                w5peer.mediaType = {
                    audio: mediaType.audio,
                    video: mediaType.video
                };
            } else if (mediaType.hasOwnProperty('screen')) {
                w5peer.mediaType = {
                    screen: true
                };
            } else {
                w5peer.mediaType = {};
            }
            var targetUser = targetUser;
            // in multi-user connectivity scenario; we need unique-id for each peer
            // it should be set for offerer; same peer-id must be used by answerer
            // that's why peer-id is shared in the below "send" method;
            var peerid = getRandomString();
            w5peer.peers[peerid] = new W5RTCWrapper(w5peer, peerid, targetUser);

            // to match offerer's and answerer's type; we need to exchange
            // media-type and direction with answerer
            sessionStorage.targetUser = targetUser;
            w5peer.signal({
                to: targetUser,

                // to synchronize peer-id
                peerid: peerid,

                // to synchronize direction and media-type
                direction: w5peer.direction,
                mediaType: w5peer.mediaType,

                // ask him, if he is ready
                areYouReady: true
            });
        };

        w5peer.saveToDisk = function(url, fileName) {
            FileSaver.SaveToDisk(url, fileName);
        };

        w5peer.sendCustomMessage = function(data) {
            data.userid = w5peer.userid;
            data.isCustomMessage = true;

            // console.error('sendiong-custom-signaling-message', data);

            signalingGateway.send(data);

        };



        w5peer.createGroup = function(groupid, mediaType) {
            var data = {};
            data.group_id = groupid + apikey;
            data.group_moderator = w5peer.userid;
            data.mediaType = mediaType;
            data.userid = w5peer.userid;
            data.isCustomMessage = true;

            signalingGateway.groupSend(data);
        }

        w5peer.joinGroup = function(groupid) {
            var data = {};
            data.group_id = groupid + apikey;
            data.userid = w5peer.userid;
            data.isCustomMessage = true;

            signalingGateway.joinSend(data);
        }

        function alertOtherUsers() {
            w5peer.signal({
                to: 'all',
                userleft: true
            });
        };

        //Call disconnected if development account
        w5peer.on('user-left-dev', function(data) {
            //check call type
            if (data.media) {
                try {
                    var userid = data.userid;
                    var peer = data.peerid;

                    if (w5peer.peers[peer].peer.connection.signalingState !== 'closed' && w5peer.peers[peer].peer.connection.iceConnectionState.search(/disconnected|failed/gi) === -1) {
                        var connection = w5peer.peers[peer].peer.connection.close();
                        w5peer.emit('userleft-callback', userid);

                    }

                    delete w5peer.peers[peer];
                    //check peer object
                    for (var j in w5peer.peers) {}
                    //peer object empty
                    if (j) {

                    } else {
                        //stop localstream
                        
                if(getChromeVersion() > 44)
                {
                    window.localStream.getTracks().forEach(function(track) {
    track.stop();
  })
                    
                }else
                {
                   window.localStream.stop();
                }
                    }
                    w5peer.emit('user-left', userid);
                } catch (e) {

                }

            } else if (data.datachannel) {

                try {
                    var userid = data.userid;
                    var channel = data.peerid;
                    w5peer.channels[userid].close();
                    delete w5peer.channels[userid];
                    w5peer.emit('user-left', userid);
                } catch (e) {}
            }

        });




        w5peer.on('user-left-private', function(userid) {
            //Remote exit Data channel
            var check = false;
            for (var peer in w5peer.peers) {
                if (w5peer.peers[peer].targetUser == userid) {
                    check = true;
                    if (w5peer.peers[peer].peer.connection.signalingState !== 'closed' && w5peer.peers[peer].peer.connection.iceConnectionState.search(/disconnected|failed/gi) === -1) {
                        var connection = w5peer.peers[peer].peer.connection.close();
                        w5peer.emit('userleft-callback', userid);
                    }
                    delete w5peer.peers[peer];

                }
                if (check) {
                    for (var channel in w5peer.channels) {
                        if (channel == userid) {
                            w5peer.channels[channel].close();
                            delete w5peer.channels[channel];
                            check = true;

                        }
                    }

                }


            }
            w5peer.emit('user-left', userid);
        });

        function onMediaStream(stream, event) {
            stream.onended = function() {
                w5peer.emit('stream-removed', callback);
            };

            var mediaElement = getMediaElement(stream, {
                buttons: ['stop', 'volume-slider', 'full-screen', 'mute-audio', 'mute-video'],
                width: innerWidth / 2 - 20,
                showOnMouseEnter: false
            });

            mediaElement.media.play();

            if (event.indexOf('local') != -1) {
                mediaElement.media.muted = true;
                mediaElement.media.volume = 0;
            }

            var callback = {
                mediaElement: mediaElement,
                stream: stream
            };

            w5peer.emit(event, callback);
        }

        w5peer.on('remote-stream-private', function(stream) {
            //onMediaStream(stream, 'remote-stream');
            /*
            Emit remote stream to callback method
            */
            w5peer.emit('remoteStream-callback', stream);
        });

        w5peer.on('local-stream-private', function(stream) {
            //onMediaStream(stream, 'local-stream');
            /*
            Emit remote stream to callback method
            */
            w5peer.emit('localStream-callback', stream);
        });

        w5peer.on('stream-removed', function(e) {
            if (e.mediaElement && e.mediaElement.parentNode) {
                e.mediaElement.parentNode.removeChild(e.mediaElement);
            }
        });

        window.addEventListener('beforeunload', function() {
            alertOtherUsers();
        }, false);

        window.addEventListener('keydown', function(e) {
            if (e.keyCode == 116) {
                alertOtherUsers();
            }
        }, false);
    };

    window.MediaStream = window.MediaStream || window.webkitMediaStream;
    window.AudioContext = window.AudioContext || window.webkitAudioContext;



    function W5RTCWrapper(w5peer, peerid, targetUser) {
        var W5RTC = {};

        W5RTC.peer = null;

        // JUST a simple self-implemented version of events invocation!
        // We will use "EventEmitter.js" in future!
        W5RTC.events = {};
        W5RTC.on = function(event, callback) {
            W5RTC.events[event] = callback;
        };

        W5RTC.emit = function() {
            W5RTC.events[arguments[0]](arguments[1], arguments[2], arguments[3], arguments[4]);
        };

        var fileReceiver = new FileReceiver(w5peer);
        var textReceiver = new TextReceiver(w5peer);

        W5RTC.on('datachannel-message', function(msg) {
            data = JSON.parse(msg.data);

            if (data.type == 'text') {
                textReceiver.receive(data);
            }

            if (typeof data.maxChunks != 'undefined') {
                fileReceiver.receive(data, msg.peerid);
            }

            if (!data.type && !data.maxChunks) {
                w5peer.emit('datachannel-message', data);
                w5peer.emit('channelmsg-callback', {
                    data: data,
                    peerid: msg.peerid
                });

            }
        });

        W5RTC.datachannel = w5peer.datachannel;

        W5RTC.candidates = {};
        W5RTC.on('candidate', function(candidate) {
            log('on-candidate is fired');
            if (!W5RTC.peer) {
                if (!W5RTC.candidates[peerid]) W5RTC.candidates[peerid] = [];
                W5RTC.candidates[peerid].push(candidate);
            } else {
                W5RTC.peer.addIceCandidate(candidate);
                log('adding ice candidate', candidate.candidate);

                if (W5RTC.candidates[peerid]) {
                    for (var i = 0; i < W5RTC.candidates[peerid].length; i++) {
                        log('adding ice candidate', W5RTC.candidates[peerid][i].candidate);
                        W5RTC.peer.addIceCandidate(W5RTC.candidates[peerid][i]);
                    }
                    W5RTC.candidates[peerid] = [];
                }
            }
        });

        var W5RTCPeer = {
            create: function(type, options,billing_info) {
                this.options = options;

                var self = this;
                 if(billing_info)
                {
                     this.billing_info=billing_info;
                     this.billing_info['media_type']=w5peer.mediaType;
                    this.billing_info['from_user']=w5peer.userid;
                }
               

                this.type = type;
                this.init();
                this.attachMediaStreams();
                if (this.options.datachannel && isEmpty(w5peer.mediaType) && isFirefox) {
                    if (this.options.datachannel && type == 'offer') {
                        this.createDataChannel();
                    }

                    this.getLocalDescription(type);

                    if (this.options.datachannel && type == 'answer') {
                        this.createDataChannel();
                    }
                }

                if (this.options.datachannel && isEmpty(w5peer.mediaType) && isSafari) {
                    if (this.options.datachannel && type == 'offer') {
                        this.createDataChannel();
                    }

                    this.getLocalDescription(type);

                    if (this.options.datachannel && type == 'answer') {
                        this.createDataChannel();
                    }
                }

                if (this.options.datachannel && isEmpty(w5peer.mediaType) && isIE) {
                    if (this.options.datachannel && type == 'offer') {
                        this.createDataChannel();
                    }

                    this.getLocalDescription(type);

                    if (this.options.datachannel && type == 'answer') {
                        this.createDataChannel();
                    }
                }

                if (!isEmpty(w5peer.mediaType) && isFirefox) {
                    if (this.options.datachannel && type == 'offer') {
                        this.createDataChannel();
                    }

                    this.getLocalDescription(type);

                    if (this.options.datachannel && type == 'answer') {
                        this.createDataChannel();
                    }
                }

                if (!isEmpty(w5peer.mediaType) && isSafari) {
                    if (this.options.datachannel && type == 'offer') {
                        this.createDataChannel();
                    }

                    this.getLocalDescription(type);

                    if (this.options.datachannel && type == 'answer') {
                        this.createDataChannel();
                    }
                }

                if (!isEmpty(w5peer.mediaType) && isIE) {
                    if (this.options.datachannel && type == 'offer') {
                        this.createDataChannel();
                    }

                    this.getLocalDescription(type);

                    if (this.options.datachannel && type == 'answer') {
                        this.createDataChannel();
                    }
                }

                isChrome && self.getLocalDescription(type);
                return this;
            },
            getLocalDescription: function(type) {
                log('peer type is', type);

                if (type == 'answer') {
                    this.setRemoteDescription(W5RTC.offerDescription);
                }

                var self = this;
                this.connection[type == 'offer' ? 'createOffer' : 'createAnswer'](function(sessionDescription) {
                    sessionDescription.sdp = self.serializeSdp(sessionDescription.sdp);
                    self.connection.setLocalDescription(sessionDescription, function() {}, function(err) {
                        console.error(err)
                    });
                    self.options.onSessionDescription(sessionDescription);
                }, this.onSdpError, this.constraints);
            },
            serializeSdp: function(sdp) {
                sdp = this.setBandwidth(sdp);
                return sdp;
            },
            init: function() {
                this.setConstraints();
                this.connection = new RTCPeerConnection(this.iceServers, this.optionalArgument);

                if (this.options.datachannel && isChrome) {
                    this.createDataChannel();
                }

                this.connection.onicecandidate = function(event) {
                    if (self.renegotiate) return;

                    if (event.candidate) {
                        W5RTC.onicecandidate(event.candidate);
                    }
                };

                this.connection.onaddstream = function(e) {
                    e.stream.userid = self.options.targetUser;
                    log('onaddstream', e.stream);
                    w5peer.emit('remote-stream-private', e.stream);
                    // w5peer.emit('remote-stream-private', e.stream);
                };

                this.connection.onremovestream = function() {
                    warn('media stream is removed');

                };

                this.connection.onsignalingstatechange = function() {
                    self.connection && log(toStr({
                        iceConnectionState: self.connection.iceConnectionState,
                        iceGatheringState: self.connection.iceGatheringState,
                        signalingState: self.connection.signalingState
                    }));
                };

                this.connection.oniceconnectionstatechange = function() {
                    self.connection && log(toStr({
                        iceConnectionState: self.connection.iceConnectionState,
                        iceGatheringState: self.connection.iceGatheringState,
                        signalingState: self.connection.signalingState
                    }));

                    if (self.connection.iceConnectionState == 'disconnected') {
                        console.error('its executed from here ');
                        w5peer.emit('peerDisconnected-callback', self.options.targetUser);
                        if(self.type=='offer')
                        {
                            self.billing_info['state']='disconnected';
                            w5peer.emit('billing_info',self.billing_info);
                        }
                    }
                    if (self.connection.iceConnectionState == 'connected') {
                        //emit peer connected event
                        w5peer.emit('peerConnected-callback', self.options.targetUser);
                        if(self.type=='offer')
                        {
                            self.billing_info['state']='connected';
                            w5peer.emit('billing_info',self.billing_info);
                        }
                    }

                    if (self.connection.iceConnectionState == 'failed') {
                        //emit peer connected event
                        w5peer.emit('peerFailure-callback', self.options.targetUser);
                    }
                    
                    if (self.connection.iceConnectionState == 'closed') {
                        //emit peer connected event
                        if(self.type=='offer')
                        {
                            self.billing_info['state']='disconnected';
                            w5peer.emit('billing_info',self.billing_info);
                        }
                    }
                
                };
                var self = this;
            },
            setBandwidth: function(sdp) {
                if (isMobileDevice || isFirefox || !this.options.bandwidth) return sdp;

                var bandwidth = this.options.bandwidth;



                return sdp;
            },
            setConstraints: function() {
                this.constraints = {
                    optional: [{
                        googIPv6: true
                    }, {
                        googImprovedWifiBwe: true
                    }, {
                        googDscp: true
                    }, {
                        googScreencastMinBitrate: 400
                    }],
                    mandatory: {
                        OfferToReceiveAudio: !! w5peer.mediaType.audio,
                        OfferToReceiveVideo: !! w5peer.mediaType.video || !! w5peer.mediaType.screen
                    }
                };

                log('sdp-constraints', toStr(this.constraints.mandatory));

                this.optionalArgument = {
                    optional: [{
                        DtlsSrtpKeyAgreement: true
                    }]
                };

                // this.optionalArgument.optional.push({ googIPv6: true });
                // this.optionalArgument.optional.push({ googDscp: true });

                log('optional-argument', toStr(this.optionalArgument.optional));

                var iceServers = [];

                for (var i in w5peer.ice.stun) {
                    iceServers.push(w5peer.ice.stun[i]);
                }


                for (var i in w5peer.ice.turnnew) {
                    iceServers.push(w5peer.ice.turnnew[i]);
                }

                this.iceServers = {
                    iceServers: iceServers
                };

                log('ice-servers', toStr(this.iceServers.iceServers));
            },
            onSdpError: function(e) {
                var message = toStr(e);

                if (message && message.indexOf('RTP/SAVPF Expects at least 4 fields') != -1) {
                    message = 'It seems that you are trying to interop RTP-datachannels with SCTP. It is not supported!';
                }
                error('onSdpError:', message);
            },
            onMediaError: function(err) {
                error(toStr(err));
            },
            setRemoteDescription: function(sessionDescription) {
                if (!sessionDescription) throw 'Remote session description should NOT be NULL.';

                log('setting remote description', sessionDescription);
                this.connection.setRemoteDescription(
                    new RTCSessionDescription(sessionDescription), function() {}, function(err) {
                        console.error(err)
                    });
            },
            addIceCandidate: function(candidate) {
                this.connection.addIceCandidate(new RTCIceCandidate({
                    sdpMLineIndex: candidate.sdpMLineIndex,
                    candidate: candidate.candidate
                }), function() {}, function(err) {
                    console.error(err)
                });
            },
            createDataChannel: function(channelIdentifier) {
                if (!this.channels) this.channels = [];

                // protocol: 'text/chat', preset: true, stream: 16
                // maxRetransmits:0 && ordered:false
                var dataChannelDict = {
                    'id': 34
                };

                if (this.type == 'answer' || isFirefox || isSafari || isIE) {
                    this.connection.ondatachannel = function(event) {
                        self.setChannelEvents(event.channel);
                    };
                }

                if ((isChrome && this.type == 'offer') || isFirefox | isSafari || isIE) {
                    this.setChannelEvents(
                        this.connection.createDataChannel(channelIdentifier || 'channel', dataChannelDict)
                    );
                }

                var self = this;
            },
            setChannelEvents: function(channel) {
                var self = this;
                channel.onmessage = function(event) {
                    self.options.emit('datachannel-message', {
                        data: event.data,
                        peerid: self.options.targetUser
                    });
                };
                channel.onopen = function() {
                    w5peer.channels[self.options.targetUser] = channel;
                    w5peer.emit('datachannel-open', channel);
                    w5peer.emit('datachannelopen-callback', self.options.targetUser);
                    w5peer.emit('peerConnected-callback', self.options.targetUser);
                };

                channel.onerror = function(event) {
                    w5peer.emit('datachannel-error', event);
                    w5peer.emit('datachannelerror-callback', self.options.targetUser);
                };

                channel.onclose = function(event) {
                    w5peer.emit('datachannel-close', event);
                    //delete w5peer.channels[self.options.targetUser];
                    w5peer.emit('datachannelclose-callback', self.options.targetUser);
                };

                this.channels.push(channel);
            },
            attachMediaStreams: function() {
                var streams = w5peer.mediaStreams;
                for (var i = 0; i < streams.length; i++) {
                    log('attaching', toStr(streams[i]));
                    this.connection.addStream(streams[i]);
                }
            }
        };

        // allows capturing of single or multiple local media streams
        W5RTC.getLocalStream = function(callback) {
            var screen_constraints = {
                audio: false,
                video: {
                    mandatory: {
                        chromeMediaSource: 'screen'
                    },
                    optional: []
                }
            };

            if (w5peer.mediaType.screen) {
                if (w5peer.mediaType.audio || w5peer.mediaType.video) {
                    captureUserMedia(screen_constraints, function() {
                        captureUserMedia(w5peer.mediaType, callback);

                    });
                } else {
                    window.postMessage({
                        task: "desktop-share"
                    }, "*");
                    window.waiting = window.setTimeout(function() {
                        if (sessionStorage.w5rtc_capiext) {

                        } else {
                            w5peer.emit('extention-notAvailabel', 'W5RTC');
                        }

                    }, 1000);

                }
            } else captureUserMedia(w5peer.mediaType, callback);



            w5peer.on('extention-notAvailabel', function(data) {


                /*      //install chrome extension
                chrome.webstore.install('https://chrome.google.com/webstore/detail/' +window.extensionID,
                    function (arg) {
                        window.postMessage({
                            task: "desktop-share",
                        }, "*");
                    }, function (err) {
                        console.error(err)
                    });*/
            });
            window.addEventListener('message', function(even) {
                //Get data from chrome extension background
                if (even.origin != window.location.origin) return;

                var data = even.data;
                //if(!data.streamId)return;
                if (data.task == 'finished') {
                    window.clearTimeout(window.waiting);
                    var screen_constraints = {
                        audio: false,
                        video: {
                            mandatory: {
                                chromeMediaSource: 'desktop',
                                maxWidth: window.screen.width,
                                maxHeight: window.screen.height
                            },
                            optional: []
                        }
                    }

                    screen_constraints.video.mandatory.chromeMediaSourceId = data.streamId;

                    //send screen share id
                    captureUserMedia(screen_constraints, callback);
                }
            });

            function captureUserMedia(constraints, cb) {
                log('constraints', toStr(constraints));

                userMedia({
                    constraints: constraints,
                    media: w5peer.resolutions,
                    success: function(localStream, returnBack) {
                        window.localStream = localStream;
                        localStream.userid = w5peer.userid;
                        w5peer.mediaStreams.push(window.localStream);
                        console.log('getting media stream');
                        if (!returnBack) {
                            w5peer.emit('local-stream-private', localStream);
                            console.log('return back');
                        }
                        if (cb) cb();
                    }
                });
            }
        };

        function userMedia(options) {

            if (isEmpty(options.constraints)) {
                throw 'You MUST set mediaType.';
            }

            if (currentUserMediaRequest.mutex === true) {
                currentUserMediaRequest.queueRequests.push(options);
                return;
            }
            currentUserMediaRequest.mutex = true;


            // tools.ietf.org/html/draft-alvestrand-constraints-resolution-00
            var mediaConstraints = options.mediaConstraints || {};
            var n = navigator,
                hints = options.constraints || {
                    audio: true,
                    video: video_constraints
                };


            if (hints.video == true) hints.video = video_constraints;

            // connection.mediaConstraints.audio = false;
            if (typeof mediaConstraints.audio != 'undefined')
                hints.audio = mediaConstraints.audio;

            // connection.media.min(320,180);
            // connection.media.max(1920,1080);
            var media = options.media;
            if (isChrome) {
                var mandatory = {
                    minWidth: media.minWidth,
                    minHeight: media.minHeight,
                    maxWidth: media.maxWidth,
                    maxHeight: media.maxHeight,
                    minAspectRatio: media.minAspectRatio,
                    minFrameRate: media.minFrameRate
                };

                // code.google.com/p/chromium/issues/detail?id=143631#c9
                var allowed = ['1920:1080', '1280:720', '960:720', '640:360', '640:480', '320:240', '320:180'];

                if (allowed.indexOf(mandatory.minWidth + ':' + mandatory.minHeight) == -1 ||
                    allowed.indexOf(mandatory.maxWidth + ':' + mandatory.maxHeight) == -1) {
                    error('The min/max width/height constraints you passed "seems" NOT supported.', toStr(mandatory));
                }

                if (mandatory.minWidth > mandatory.maxWidth || mandatory.minHeight > mandatory.maxHeight) {
                    error('Minimum value must not exceed maximum value.', toStr(mandatory));
                }

                if (mandatory.minWidth >= 1280 && mandatory.minHeight >= 720) {
                    warn('Enjoy HD video! min/' + mandatory.minWidth + ':' + mandatory.minHeight + ', max/' + mandatory.maxWidth + ':' + mandatory.maxHeight);
                }

                if (hints.video) {
                    hints.video.mandatory = merge(hints.video.mandatory, mandatory);
                }
            }

            if (mediaConstraints.mandatory && hints.video)
                hints.video.mandatory = merge(hints.video.mandatory, mediaConstraints.mandatory);

            // mediaConstraints.optional.bandwidth = 1638400;
            if (mediaConstraints.optional && hints.video)
                hints.video.optional[0] = merge({}, mediaConstraints.optional);

            log('media hints:', toStr(hints));

            // easy way to match
            var idInstance = JSON.stringify(hints);

            function streaming(stream, returnBack) {
                options.success(stream, returnBack, idInstance);
                currentUserMediaRequest.streams[idInstance] = stream;
                currentUserMediaRequest.mutex = false;

                if (currentUserMediaRequest.queueRequests.length)
                    userMedia(currentUserMediaRequest.queueRequests.shift());
            }

            if (currentUserMediaRequest.streams[idInstance]) {
                streaming(currentUserMediaRequest.streams[idInstance], true);

            } else {
                n.getMedia = n.webkitGetUserMedia || n.mozGetUserMedia || getUserMedia;
                if (window.xwalk) {
                    hints.video = true;
                }
                n.getMedia(hints, streaming, options.error || function(e) {
                    error(toStr(e));

                });
            }
        }

        W5RTC.createOffer = function() {
            return merge({
                sendTo: function(targetUser) {
                    W5RTC.peer = W5RTCPeer.create('offer', merge(W5RTC, {
                        targetUser: targetUser,
                        bandwidth: w5peer.bandwidth,
                        onSessionDescription: function(sdp) {
                            w5peer.signal({
                                to: targetUser,
                                sdp: sdp,
                                peerid: peerid
                            });
                        }
                    }),{peer_id:peerid,to_user:targetUser});
                }
            }, W5RTC);
        };

        W5RTC.setRemoteDescription = function(sdp) {
            if (!W5RTC.peer) W5RTC.offerDescription = sdp;
            else W5RTC.peer.setRemoteDescription(sdp);
            return W5RTC;
        };

        W5RTC.createAnswer = function() {
            return merge({
                sendTo: function(targetUser) {
                    W5RTC.peer = W5RTCPeer.create('answer', merge(W5RTC, {
                        targetUser: targetUser,
                        bandwidth: w5peer.bandwidth,
                        onSessionDescription: function(sdp) {
                            w5peer.signal({
                                to: targetUser,
                                sdp: sdp,
                                peerid: peerid
                            });
                        }
                    }));
                }
            }, W5RTC);
        };

        W5RTC.onicecandidate = function(candidate) {

            if (!w5peer.AllowedCandidates.Host && candidate.candidate.indexOf('typ host') != -1) return;
            if (!w5peer.AllowedCandidates.TURN && candidate.candidate.indexOf('typ relay') != -1) return;
            if (!w5peer.AllowedCandidates.STUN && candidate.candidate.indexOf('typ srflx') != -1) return;

            w5peer.signal({
                peerid: peerid,
                to: sessionStorage.targetUser,
                candidate: {
                    sdpMLineIndex: candidate.sdpMLineIndex,
                    id: candidate.sdpMid,
                    candidate: candidate.candidate,
                    peerid: peerid
                }
            });
            console.log('OnIce Candiadet');
            console.log(sessionStorage.targetUser);
        };

        return W5RTC;
    }


    function toStr(obj) {
        if (!isIE) {
            return JSON.stringify(obj, function(key, value) {
                if (value && value.sdp) {
                    log(value.sdp.type, '\t', value.sdp.sdp);
                    return '';
                } else return value;
            }, '\t');
        }
    }

    function merge(mergein, mergeto) {
        for (var item in mergeto) {
            mergein[item] = mergeto[item];
        }
        return mergein;
    }

    function log() {
        console.log(Array.prototype.slice.call(arguments).join('\n'));
    }

    function error() {
        console.error(Array.prototype.slice.call(arguments).join('\n'));
    }

    function warn() {
        console.warn(Array.prototype.slice.call(arguments).join('\n'));
    }

    function getRandomString() {
        return (Math.random() * new Date().getTime()).toString(36).replace(/\./g, '');
    }

    function isEmpty(mediaType) {
        var length = 0;
        for (var m in mediaType) {
            length++;
        }
        return length == 0;
    }

    var isChrome = !! navigator.webkitGetUserMedia;
    var isFirefox = !! navigator.mozGetUserMedia;
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    var isIE = /*@cc_on!@*/ false || !! document.documentMode;
    if (isChrome) {
        var chromeVersion = !! navigator.mozGetUserMedia ? 0 : parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2]);
    }
    var isMobileDevice = navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile/i);

    var video_constraints = {
        mandatory: {},
        optional: []
    };

    window.currentUserMediaRequest = {
        streams: [],
        mutex: false,
        queueRequests: []
    };



    var FileSender = {
        send: function(file, w5peer) {
            // max chunk sending limit on chrome is 64k
            // max chunk receiving limit on firefox is 16k
            var packetSize = 15 * 1000;

            if (w5peer.chunkSize) {
                packetSize = w5peer.chunkSize;
            }

            var textToTransfer = '';
            var numberOfPackets = 0;
            var packets = 0;

            file.uuid = getRandomString();

            function processInWebWorker() {
                var blob = URL.createObjectURL(new Blob(['function readFile(_file) {postMessage(new FileReaderSync().readAsDataURL(_file));};this.onmessage =  function (e) {readFile(e.data);}'], {
                    type: 'application/javascript'
                }));

                var worker = new Worker(blob);
                URL.revokeObjectURL(blob);
                return worker;
            }

            if ( !! window.Worker) {
                var webWorker = processInWebWorker();

                webWorker.onmessage = function(event) {
                    onReadAsDataURL(event.data);
                };

                webWorker.postMessage(file);
            } else {
                var reader = new FileReader();
                reader.onload = function(e) {
                    onReadAsDataURL(e.target.result);
                };
                reader.readAsDataURL(file);
            }

            function onReadAsDataURL(dataURL, text) {
                var data = {
                    type: 'file',
                    uuid: file.uuid,
                    maxChunks: numberOfPackets,
                    currentPosition: numberOfPackets - packets,
                    name: file.name,
                    fileType: file.type,
                    size: file.size
                };

                if (dataURL) {
                    text = dataURL;
                    numberOfPackets = packets = data.packets = parseInt(text.length / packetSize);

                    file.maxChunks = data.maxChunks = numberOfPackets;
                    data.currentPosition = numberOfPackets - packets;

                    w5peer.emit('file-start', file);
                    w5peer.emit('filestart-callback', {
                        file: file,
                        event: 'file-start'
                    });
                }

                packets--;
                w5peer.emit('file-progress', {
                    uuid: file.uuid,
                    maxChunks: numberOfPackets,
                    currentPosition: numberOfPackets - packets
                });
                w5peer.emit('fileprogress-callback', {
                    event: 'file-progress',
                    uuid: file.uuid,
                    maxChunks: numberOfPackets,
                    currentPosition: numberOfPackets - packets
                });
                if (text.length > packetSize) data.message = text.slice(0, packetSize);
                else {
                    data.message = text;
                    data.last = true;
                    data.name = file.name;

                    file.url = URL.createObjectURL(file);

                    w5peer.emit('file-end', file);
                    w5peer.emit('fileend-callback', {
                        file: file,
                        event: 'file-end'
                    });
                }

                w5peer.send(data);

                textToTransfer = text.slice(data.message.length);
                if (textToTransfer.length) {
                    setTimeout(function() {
                        onReadAsDataURL(null, textToTransfer);
                    }, w5peer.chunkInterval || 500);
                }
            }
        }
    };


    function getMediaElement(mediaElement, config) {
        config = config || {};

        if (!mediaElement.nodeName || (mediaElement.nodeName.toLowerCase() != 'audio' && mediaElement.nodeName.toLowerCase() != 'video')) {
            if (!mediaElement.getVideoTracks().length) {
                return getAudioElement(mediaElement, config);
            }

            var mediaStream = mediaElement;
            mediaElement = document.createElement(mediaStream.getVideoTracks().length ? 'video' : 'audio');
            mediaElement[ !! navigator.mozGetUserMedia ? 'mozSrcObject' : 'src'] = !! navigator.mozGetUserMedia ? mediaStream : window.webkitURL.createObjectURL(mediaStream);
        }

        if (mediaElement.nodeName && mediaElement.nodeName.toLowerCase() == 'audio') {
            return getAudioElement(mediaElement, config);
        }

        mediaElement.controls = false;

        var buttons = config.buttons || ['mute-audio', 'mute-video', 'full-screen', 'volume-slider', 'stop'];
        buttons.has = function(element) {
            return buttons.indexOf(element) !== -1;
        };

        config.toggle = config.toggle || [];
        config.toggle.has = function(element) {
            return config.toggle.indexOf(element) !== -1;
        };

        var mediaElementContainer = document.createElement('div');
        mediaElementContainer.className = 'media-container';

        var mediaControls = document.createElement('div');
        mediaControls.className = 'media-controls';
        mediaElementContainer.appendChild(mediaControls);

        if (buttons.has('mute-audio')) {
            var muteAudio = document.createElement('div');
            muteAudio.className = 'control ' + (config.toggle.has('mute-audio') ? 'unmute-audio selected' : 'mute-audio');
            mediaControls.appendChild(muteAudio);

            muteAudio.onclick = function() {
                if (muteAudio.className.indexOf('unmute-audio') != -1) {
                    muteAudio.className = muteAudio.className.replace('unmute-audio selected', 'mute-audio');
                    mediaElement.muted = false;
                    mediaElement.volume = 1;
                    if (config.onUnMuted) config.onUnMuted('audio');
                } else {
                    muteAudio.className = muteAudio.className.replace('mute-audio', 'unmute-audio selected');
                    mediaElement.muted = true;
                    mediaElement.volume = 0;
                    if (config.onMuted) config.onMuted('audio');
                }
            };
        }

        if (buttons.has('mute-video')) {
            var muteVideo = document.createElement('div');
            muteVideo.className = 'control ' + (config.toggle.has('mute-video') ? 'unmute-video selected' : 'mute-video');
            mediaControls.appendChild(muteVideo);

            muteVideo.onclick = function() {
                if (muteVideo.className.indexOf('unmute-video') != -1) {
                    muteVideo.className = muteVideo.className.replace('unmute-video selected', 'mute-video');
                    mediaElement.muted = false;
                    mediaElement.volume = 1;
                    mediaElement.play();
                    if (config.onUnMuted) config.onUnMuted('video');
                } else {
                    muteVideo.className = muteVideo.className.replace('mute-video', 'unmute-video selected');
                    mediaElement.muted = true;
                    mediaElement.volume = 0;
                    mediaElement.pause();
                    if (config.onMuted) config.onMuted('video');
                }
            };
        }

        if (buttons.has('take-snapshot')) {
            var takeSnapshot = document.createElement('div');
            takeSnapshot.className = 'control take-snapshot';
            mediaControls.appendChild(takeSnapshot);

            takeSnapshot.onclick = function() {
                if (config.onTakeSnapshot) config.onTakeSnapshot();
            };
        }

        if (buttons.has('stop')) {
            var stop = document.createElement('div');
            stop.className = 'control stop';
            mediaControls.appendChild(stop);

            stop.onclick = function() {
                mediaElementContainer.style.opacity = 0;
                setTimeout(function() {
                    if (mediaElementContainer.parentNode) {
                        mediaElementContainer.parentNode.removeChild(mediaElementContainer);
                    }
                }, 800);
                if (config.onStopped) config.onStopped();
            };
        }

        var volumeControl = document.createElement('div');
        volumeControl.className = 'volume-control';

        if (buttons.has('record-audio')) {
            var recordAudio = document.createElement('div');
            recordAudio.className = 'control ' + (config.toggle.has('record-audio') ? 'stop-recording-audio selected' : 'record-audio');
            volumeControl.appendChild(recordAudio);

            recordAudio.onclick = function() {
                if (recordAudio.className.indexOf('stop-recording-audio') != -1) {
                    recordAudio.className = recordAudio.className.replace('stop-recording-audio selected', 'record-audio');
                    if (config.onRecordingStopped) config.onRecordingStopped('audio');
                } else {
                    recordAudio.className = recordAudio.className.replace('record-audio', 'stop-recording-audio selected');
                    if (config.onRecordingStarted) config.onRecordingStarted('audio');
                }
            };
        }

        if (buttons.has('record-video')) {
            var recordVideo = document.createElement('div');
            recordVideo.className = 'control ' + (config.toggle.has('record-video') ? 'stop-recording-video selected' : 'record-video');
            volumeControl.appendChild(recordVideo);

            recordVideo.onclick = function() {
                if (recordVideo.className.indexOf('stop-recording-video') != -1) {
                    recordVideo.className = recordVideo.className.replace('stop-recording-video selected', 'record-video');
                    if (config.onRecordingStopped) config.onRecordingStopped('video');
                } else {
                    recordVideo.className = recordVideo.className.replace('record-video', 'stop-recording-video selected');
                    if (config.onRecordingStarted) config.onRecordingStarted('video');
                }
            };
        }

        if (buttons.has('volume-slider')) {
            var volumeSlider = document.createElement('div');
            volumeSlider.className = 'control volume-slider';
            volumeControl.appendChild(volumeSlider);

            var slider = document.createElement('input');
            slider.type = 'range';
            slider.min = 0;
            slider.max = 100;
            slider.value = 100;
            slider.onchange = function() {
                mediaElement.volume = '.' + slider.value.toString().substr(0, 1);
            };
            volumeSlider.appendChild(slider);
        }

        if (buttons.has('full-screen')) {
            var zoom = document.createElement('div');
            zoom.className = 'control ' + (config.toggle.has('zoom-in') ? 'zoom-out selected' : 'zoom-in');

            if (!slider && !recordAudio && !recordVideo && zoom) {
                mediaControls.insertBefore(zoom, mediaControls.firstChild);
            } else volumeControl.appendChild(zoom);

            zoom.onclick = function() {
                if (zoom.className.indexOf('zoom-out') != -1) {
                    zoom.className = zoom.className.replace('zoom-out selected', 'zoom-in');
                    exitFullScreen();
                } else {
                    zoom.className = zoom.className.replace('zoom-in', 'zoom-out selected');
                    launchFullscreen(mediaElementContainer);
                }
            };

            function launchFullscreen(element) {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                }
            }

            function exitFullScreen() {
                if (document.fullscreen) {
                    document.cancelFullScreen();
                }

                if (document.mozFullScreen) {
                    document.mozCancelFullScreen();
                }

                if (document.webkitIsFullScreen) {
                    document.webkitCancelFullScreen();
                }
            }

            function screenStateChange(e) {
                if (e.srcElement != mediaElementContainer) return;

                var isFullScreeMode = document.webkitIsFullScreen || document.mozFullScreen || document.fullscreen;

                mediaElementContainer.style.width = (isFullScreeMode ? (window.innerWidth - 20) : config.width) + 'px';
                mediaElementContainer.style.display = isFullScreeMode ? 'block' : 'inline-block';

                if (config.height) {
                    mediaBox.style.height = (isFullScreeMode ? (window.innerHeight - 20) : config.height) + 'px';
                }

                if (!isFullScreeMode && config.onZoomout) config.onZoomout();
                if (isFullScreeMode && config.onZoomin) config.onZoomin();

                if (!isFullScreeMode && zoom.className.indexOf('zoom-out') != -1) {
                    zoom.className = zoom.className.replace('zoom-out selected', 'zoom-in');
                    if (config.onZoomout) config.onZoomout();
                }
                setTimeout(adjustControls, 1000);
            }

            document.addEventListener('fullscreenchange', screenStateChange, false);
            document.addEventListener('mozfullscreenchange', screenStateChange, false);
            document.addEventListener('webkitfullscreenchange', screenStateChange, false);
        }

        if (buttons.has('volume-slider') || buttons.has('full-screen') || buttons.has('record-audio') || buttons.has('record-video')) {
            mediaElementContainer.appendChild(volumeControl);
        }

        var mediaBox = document.createElement('div');
        mediaBox.className = 'media-box';
        mediaElementContainer.appendChild(mediaBox);

        mediaBox.appendChild(mediaElement);

        if (!config.width) config.width = (innerWidth / 2) - 50;

        mediaElementContainer.style.width = config.width + 'px';

        if (config.height) {
            mediaBox.style.height = config.height + 'px';
        }

        mediaBox.querySelector('video').style.maxHeight = innerHeight + 'px';

        var times = 0;

        function adjustControls() {
            mediaControls.style.marginLeft = (mediaElementContainer.clientWidth - mediaControls.clientWidth - 2) + 'px';

            if (slider) {
                slider.style.width = (mediaElementContainer.clientWidth / 3) + 'px';
                volumeControl.style.marginLeft = (mediaElementContainer.clientWidth / 3 - 30) + 'px';

                if (zoom) zoom.style['border-top-right-radius'] = '5px';
            } else {
                volumeControl.style.marginLeft = (mediaElementContainer.clientWidth - volumeControl.clientWidth - 2) + 'px';
            }

            volumeControl.style.marginTop = (mediaElementContainer.clientHeight - volumeControl.clientHeight - 2) + 'px';

            if (times < 10) {
                times++;
                setTimeout(adjustControls, 1000);
            } else times = 0;
        }

        if (config.showOnMouseEnter || typeof config.showOnMouseEnter === 'undefined') {
            mediaElementContainer.onmouseenter = mediaElementContainer.onmousedown = function() {
                adjustControls();
                mediaControls.style.opacity = 1;
                volumeControl.style.opacity = 1;
            };

            mediaElementContainer.onmouseleave = function() {
                mediaControls.style.opacity = 0;
                volumeControl.style.opacity = 0;
            };
        } else {
            setTimeout(function() {
                adjustControls();
                setTimeout(function() {
                    mediaControls.style.opacity = 1;
                    volumeControl.style.opacity = 1;
                }, 300);
            }, 700);
        }

        adjustControls();

        mediaElementContainer.toggle = function(clasName) {
            if (typeof clasName != 'string') {
                for (var i = 0; i < clasName.length; i++) {
                    mediaElementContainer.toggle(clasName[i]);
                }
                return;
            }

            if (clasName == 'mute-audio' && muteAudio) muteAudio.onclick();
            if (clasName == 'mute-video' && muteVideo) muteVideo.onclick();

            if (clasName == 'record-audio' && recordAudio) recordAudio.onclick();
            if (clasName == 'record-video' && recordVideo) recordVideo.onclick();

            if (clasName == 'stop' && stop) stop.onclick();

            return this;
        };

        mediaElementContainer.media = mediaElement;

        return mediaElementContainer;
    }

    // __________________
    // getAudioElement.js

    function getAudioElement(mediaElement, config) {
        config = config || {};

        if (!mediaElement.nodeName || (mediaElement.nodeName.toLowerCase() != 'audio' && mediaElement.nodeName.toLowerCase() != 'video')) {
            var mediaStream = mediaElement;
            mediaElement = document.createElement('audio');
            mediaElement[ !! navigator.mozGetUserMedia ? 'mozSrcObject' : 'src'] = !! navigator.mozGetUserMedia ? mediaStream : window.webkitURL.createObjectURL(mediaStream);
        }

        config.toggle = config.toggle || [];
        config.toggle.has = function(element) {
            return config.toggle.indexOf(element) !== -1;
        };

        mediaElement.controls = false;
        mediaElement.play();

        var mediaElementContainer = document.createElement('div');
        mediaElementContainer.className = 'media-container';

        var mediaControls = document.createElement('div');
        mediaControls.className = 'media-controls';
        mediaElementContainer.appendChild(mediaControls);

        var muteAudio = document.createElement('div');
        muteAudio.className = 'control ' + (config.toggle.has('mute-audio') ? 'unmute-audio selected' : 'mute-audio');
        mediaControls.appendChild(muteAudio);

        muteAudio.style['border-top-left-radius'] = '5px';

        muteAudio.onclick = function() {
            if (muteAudio.className.indexOf('unmute-audio') != -1) {
                muteAudio.className = muteAudio.className.replace('unmute-audio selected', 'mute-audio');
                mediaElement.muted = false;
                if (config.onUnMuted) config.onUnMuted('audio');
            } else {
                muteAudio.className = muteAudio.className.replace('mute-audio', 'unmute-audio selected');
                mediaElement.muted = true;
                if (config.onMuted) config.onMuted('audio');
            }
        };

        if (!config.buttons || (config.buttons && config.buttons.indexOf('record-audio') != -1)) {
            var recordAudio = document.createElement('div');
            recordAudio.className = 'control ' + (config.toggle.has('record-audio') ? 'stop-recording-audio selected' : 'record-audio');
            mediaControls.appendChild(recordAudio);

            recordAudio.onclick = function() {
                if (recordAudio.className.indexOf('stop-recording-audio') != -1) {
                    recordAudio.className = recordAudio.className.replace('stop-recording-audio selected', 'record-audio');
                    if (config.onRecordingStopped) config.onRecordingStopped('audio');
                } else {
                    recordAudio.className = recordAudio.className.replace('record-audio', 'stop-recording-audio selected');
                    if (config.onRecordingStarted) config.onRecordingStarted('audio');
                }
            };
        }

        var volumeSlider = document.createElement('div');
        volumeSlider.className = 'control volume-slider';
        volumeSlider.style.width = 'auto';
        mediaControls.appendChild(volumeSlider);

        var slider = document.createElement('input');
        slider.style.marginTop = '11px';
        slider.style.width = ' 200px';

        if (config.buttons && config.buttons.indexOf('record-audio') == -1) {
            slider.style.width = ' 241px';
        }

        slider.type = 'range';
        slider.min = 0;
        slider.max = 100;
        slider.value = 100;
        slider.onchange = function() {
            mediaElement.volume = '.' + slider.value.toString().substr(0, 1);
        };
        volumeSlider.appendChild(slider);

        var stop = document.createElement('div');
        stop.className = 'control stop';
        mediaControls.appendChild(stop);

        stop.onclick = function() {
            mediaElementContainer.style.opacity = 0;
            setTimeout(function() {
                if (mediaElementContainer.parentNode) {
                    mediaElementContainer.parentNode.removeChild(mediaElementContainer);
                }
            }, 800);
            if (config.onStopped) config.onStopped();
        };

        stop.style['border-top-right-radius'] = '5px';
        stop.style['border-bottom-right-radius'] = '5px';

        var mediaBox = document.createElement('div');
        mediaBox.className = 'media-box';
        mediaElementContainer.appendChild(mediaBox);

        var h2 = document.createElement('h2');
        h2.innerHTML = config.title || 'Audio Element';
        h2.setAttribute('style', 'position: absolute;color: rgb(160, 160, 160);font-size: 20px;text-shadow: 1px 1px rgb(255, 255, 255);padding:0;margin:0;');
        mediaBox.appendChild(h2);

        mediaBox.appendChild(mediaElement);

        mediaElementContainer.style.width = '329px';
        mediaBox.style.height = '90px';

        h2.style.width = mediaElementContainer.style.width;
        h2.style.height = '50px';
        h2.style.overflow = 'hidden';

        var times = 0;

        function adjustControls() {
            mediaControls.style.marginLeft = (mediaElementContainer.clientWidth - mediaControls.clientWidth - 7) + 'px';
            mediaControls.style.marginTop = (mediaElementContainer.clientHeight - mediaControls.clientHeight - 6) + 'px';
            if (times < 10) {
                times++;
                setTimeout(adjustControls, 1000);
            } else times = 0;
        }

        if (config.showOnMouseEnter || typeof config.showOnMouseEnter === 'undefined') {
            mediaElementContainer.onmouseenter = mediaElementContainer.onmousedown = function() {
                adjustControls();
                mediaControls.style.opacity = 1;
            };

            mediaElementContainer.onmouseleave = function() {
                mediaControls.style.opacity = 0;
            };
        } else {
            setTimeout(function() {
                adjustControls();
                setTimeout(function() {
                    mediaControls.style.opacity = 1;
                }, 300);
            }, 700);
        }

        adjustControls();

        mediaElementContainer.toggle = function(clasName) {
            if (typeof clasName != 'string') {
                for (var i = 0; i < clasName.length; i++) {
                    mediaElementContainer.toggle(clasName[i]);
                }
                return;
            }

            if (clasName == 'mute-audio' && muteAudio) muteAudio.onclick();
            if (clasName == 'record-audio' && recordAudio) recordAudio.onclick();
            if (clasName == 'stop' && stop) stop.onclick();

            return this;
        };

        mediaElementContainer.media = mediaElement;

        return mediaElementContainer;
    }









    function FileReceiver(w5peer) {
        var content = {},
            packets = {},
            numberOfPackets = {};

        function receive(data, peerid) {
            var uuid = data.uuid;

            if (typeof data.packets !== 'undefined') {
                numberOfPackets[uuid] = packets[uuid] = parseInt(data.packets);
                w5peer.emit('file-start', data);
                w5peer.emit('filestart-callback', {
                    file: data,
                    event: 'file-start',
                    from: peerid
                });
            }

            packets[uuid]--;
            w5peer.emit('file-progress', {
                uuid: uuid,
                maxChunks: numberOfPackets[uuid],
                currentPosition: numberOfPackets[uuid] - packets[uuid]
            });

            w5peer.emit('fileprogress-callback', {
                event: 'file-progress',
                uuid: uuid,
                maxChunks: numberOfPackets[uuid],
                currentPosition: numberOfPackets[uuid] - packets[uuid],
                from: peerid
            });
            if (!content[uuid]) content[uuid] = [];

            content[uuid].push(data.message);

            if (data.last) {
                var dataURL = content[uuid].join('');

                FileConverter.DataURLToBlob(dataURL, data.fileType, function(blob) {
                    blob.uuid = uuid;
                    blob.name = data.name;
                    blob.type = data.fileType;
                    blob.extra = data.extra || {};

                    blob.url = (window.URL || window.webkitURL).createObjectURL(blob);

                    if (w5peer.autoSaveToDisk) {
                        FileSaver.SaveToDisk(blob.url, data.name);
                    }

                    w5peer.emit('file-end', blob);
                    w5peer.emit('fileend-callback', {
                        file: blob,
                        from: peerid,
                        event: 'file-end'
                    });
                    delete content[uuid];
                });
            }
        }

        return {
            receive: receive
        };
    }


    var FileSaver = {
        SaveToDisk: function(fileUrl, fileName) {
            var hyperlink = document.createElement('a');
            hyperlink.href = fileUrl;
            hyperlink.target = '_blank';
            hyperlink.download = fileName || fileUrl;

            var mouseEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });

            hyperlink.dispatchEvent(mouseEvent);
            (window.URL || window.webkitURL).revokeObjectURL(hyperlink.href);
        }
    };


    var TextSender = {
        send: function(initialText, w5peer) {
            var packetSize = 1000,
                textToTransfer = '',
                isobject = false;

            if (typeof initialText !== 'string') {
                isobject = true;
                initialText = JSON.stringify(initialText);
            }
            var uuid = getRandomString();

            sendText(initialText);

            function sendText(textMessage, text) {
                var data = {
                    type: 'text',
                    uuid: uuid
                };

                if (textMessage) {
                    text = textMessage;
                    data.packets = parseInt(text.length / packetSize);
                }

                if (text.length > packetSize)
                    data.message = text.slice(0, packetSize);
                else {
                    data.message = text;
                    data.last = true;
                    data.isobject = isobject;
                }

                w5peer.send(data);

                textToTransfer = text.slice(data.message.length);

                if (textToTransfer.length) {
                    if (config.preferSCTP || isFirefox) {
                        setTimeout(function() {
                            sendText(null, textToTransfer);
                        }, 100);
                    } else {
                        setTimeout(function() {
                            sendText(null, textToTransfer);
                        }, 500);
                    }
                }
            }
        }
    };



    function TextReceiver(w5peer) {
        var content = {};

        function receive(data) {
            var uuid = data.uuid;
            if (!content[uuid]) content[uuid] = [];

            content[uuid].push(data.message);
            if (data.last) {
                var message = content[uuid].join('');
                if (data.isobject) message = JSON.parse(message);

                w5peer.emit('datachannel-message', message);


                delete content[uuid];
            }
        }

        return {
            receive: receive
        };
    }



    var FileConverter = {
        DataURLToBlob: function(dataURL, fileType, callback) {

            function processInWebWorker() {
                var blob = URL.createObjectURL(new Blob(['function getBlob(_dataURL, _fileType) {var binary = atob(_dataURL.substr(_dataURL.indexOf(",") + 1)),i = binary.length,view = new Uint8Array(i);while (i--) {view[i] = binary.charCodeAt(i);};postMessage(new Blob([view], {type: _fileType}));};this.onmessage =  function (e) {var data = JSON.parse(e.data); getBlob(data.dataURL, data.fileType);}'], {
                    type: 'application/javascript'
                }));

                var worker = new Worker(blob);
                URL.revokeObjectURL(blob);
                return worker;
            }

            if ( !! window.Worker) {
                var webWorker = processInWebWorker();

                webWorker.onmessage = function(event) {
                    callback(event.data);
                };

                webWorker.postMessage(JSON.stringify({
                    dataURL: dataURL,
                    fileType: fileType
                }));
            } else {
                var binary = atob(dataURL.substr(dataURL.indexOf(',') + 1)),
                    i = binary.length,
                    view = new Uint8Array(i);

                while (i--) {
                    view[i] = binary.charCodeAt(i);
                }

                callback(new Blob([view]));
            }
        }
    };
})();
