/*install screen share extension and access your screen*/
w5peer.on('extention-notAvailabel', function (data) {
    //install chrome extension
    chrome.webstore.install('https://chrome.google.com/webstore/detail/' + 'our extension id',
        function (arg) {
            window.postMessage({
                task: "desktop-share",
            }, "*");
        }, function (err) {
            console.error(err)
        });
});
window.addEventListener('message', function (even) {
    console.error(event);
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
