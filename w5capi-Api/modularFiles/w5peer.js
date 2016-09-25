 /*create RTC object for webrtc related activity*/
 window.W5Peer = function(key, platform, channelid, websocketURI) {
        console.log(key);
        var w5peer = this;
        var apikey = '1hh23bbh3333';
        var apiplatform = 'browser'
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
        
        w5peer.extensionID=function(ID)
        {
            window.extensionID=ID;
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
            apikey = key;
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

        var signalingGateway;
        /*create socket.io connection to signalling server 
         with following parametter
         userid:String
         apikey:String
         platform:String
        */
        w5peer.registerUserWithId = function(userid) {
            var userid = userid != null ? userid : w5peer.userid;
            userid = (0 != userid.length) ? userid : w5peer.userid;
            userid+=apikey;
            console.log(userid);
            w5peer.userid = userid;
            signalingGateway = io("http://localhost:8881/?userid=" + userid + '&apikey=' + apikey + '&platform=' + apiplatform+'&version='+ 1.4);

            /*
              Get connected respoce from signalling server
            */
            signalingGateway.on('connect', function() {


            });



            signalingGateway.send = function(data) {

                data.from = w5peer.userid;
                signalingGateway.emit('message', JSON.stringify(data));

            };

            //Send Group chat 
            signalingGateway.groupSend = function(data) {
                data.from = w5peer.userid;
                signalingGateway.emit('create-group-req', JSON.stringify(data));
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
                console.log(data);
                w5peer.emit('signaling-message', JSON.parse(data));
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
            console.log(data);
            w5peer.peers[data.peerid] = new W5RTCWrapper(w5peer, data.peerid);
            w5peer.emit('are-you-ready', data);
        }

        /*
          Decline incomming call
          */
        w5peer.decline = function(data) {
            console.error('executed two times');
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

                window.localStream.stop();
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

        //stopstream
        w5peer.hanghup = function() {
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

                        window.localStream.stop();

                        w5peer.signal({
                            to: w5peer.peers[peer].targetUser,
                            // ask him,to disconnect call
                            cutCall: true
                        });
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
                console.log('LocalStream not running now');
            }
        }

        //play video
        w5peer.playVideo = function() {
            try {
                window.localStream.getVideoTracks()[0].enabled = true;
            } catch (e) {
                console.log('LocalStream not running now');
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
                window.localStream.stop();
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
            } else if(mediaType.hasOwnProperty('screen')){
                w5peer.mediaType = {screen:true};
            }else
            {
                w5peer.mediaType={};
            }
            var targetUser=targetUser+apikey;
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
            } else if(mediaType.hasOwnProperty('screen')){
                w5peer.mediaType = {screen:true};
            }else
            {
                w5peer.mediaType={};
            }
            var targetUser=targetUser;
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

           console.log(mediaType);
            var data = {};
            data.group_id = groupid+apikey;
            data.group_moderator = w5peer.userid;
            data.mediaType = mediaType;
            data.userid = w5peer.userid;
            data.isCustomMessage = true;

            signalingGateway.groupSend(data);
        }

        w5peer.joinGroup = function(groupid) {
            var data = {};
            data.group_id = groupid+apikey;
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
                try{
                var userid =data.userid;
                var peer = data.peerid;
                
                if (w5peer.peers[peer].peer.connection.signalingState !== 'closed' && w5peer.peers[peer].peer.connection.iceConnectionState.search(/disconnected|failed/gi) === -1) {
                    var connection = w5peer.peers[peer].peer.connection.close();
                    w5peer.emit('userleft-callback', userid);

                }
                
                delete w5peer.peers[peer];
                //check peer object
                for(var j in w5peer.peers)
                {
                }
                    //peer object empty
                if(j)
                {
                    
                }else
                {
                    //stop localstream
                    window.localStream.stop();
                }
                w5peer.emit('user-left', userid);
                }catch(e)
                {
                    
                }
                
            } else if (data.datachannel) {
                
              try{
                var userid = data.userid;
                var channel = data.peerid;
                console.log(userid);
                console.log(w5peer.channels[userid]);
                w5peer.channels[userid].close();
                delete w5peer.channels[userid];
                w5peer.emit('user-left', userid);
              }catch(e){
                  }
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
            onMediaStream(stream, 'remote-stream');
            /*
            Emit remote stream to callback method
            */
            w5peer.emit('remoteStream-callback', stream);
        });

        w5peer.on('local-stream-private', function(stream) {
            onMediaStream(stream, 'local-stream');
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
