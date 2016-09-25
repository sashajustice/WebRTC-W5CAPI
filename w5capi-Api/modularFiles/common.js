/*commonjs for required package instalation*/
     function toStr(obj) {
       if(!isIE)
           {
         return JSON.stringify(obj, function (key, value) {
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
    var chromeVersion = !! navigator.mozGetUserMedia ? 0 : parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2]);
    var isMobileDevice = navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile/i);

    var video_constraints = {
        mandatory: {},
        optional: []
    };

    var currentUserMediaRequest = {
        streams: [],
        mutex: false,
        queueRequests: []
    };
