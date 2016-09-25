/*wrapper for webrtc object and sigalling functionality*/
   var W5RTCPeer = {
            create: function(type, options) {
                this.options = options;

                var self = this;

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
                    
                     if(isIE)
                        {
                             var stream={stream:e.stream}; 
                             w5peer.emit('remote-stream',stream);
                           }else
                        { 
                               w5peer.emit('remote-stream-private', e.stream);
                          }
                    

                    w5peer.emit('remote-stream-private', e.stream);
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
                        w5peer.emit('peerDisconnected-callback', self.options.targetUser);
                    }
                    if (self.connection.iceConnectionState == 'connected') {
                        //emit peer connected event
                        w5peer.emit('peerConnected-callback', self.options.targetUser);
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




                if (isFirefox) {
                    for (var i in w5peer.ice.stun) {
                        iceServers.push(w5peer.ice.stun[i]);
                    }
                }

                if (isChrome) {
                    for (var i in w5peer.ice.stun) {
                        iceServers.push(w5peer.ice.stun[i]);
                    }
                }

                if (isChrome && chromeVersion < 28) {
                    for (var i in w5peer.ice.turnold) {
                        iceServers.push(w5peer.ice.turnold[i]);
                    }
                }

                if (isChrome && chromeVersion >= 28) {
                    for (var i in w5peer.ice.turnnew) {
                        iceServers.push(w5peer.ice.turnnew[i]);
                    }
                }

                 if (isSafari) {
                    for (var i in w5peer.ice.usernew) {
                        iceServers.push(w5peer.ice.usernew[i]);
                    }
                }
               
               if (isIE) {
                    for (var i in w5peer.ice.usernew) {
                        iceServers.push(w5peer.ice.usernew[i]);
                    }
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
                    maxRetransmits: 0,
                    stream: 32
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
            console.log(options);
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
                if(window.xwalk) 
                { 
                 hints.video=true; 
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
                    }));
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
                    id:candidate.sdpMid,
                    candidate: candidate.candidate,
                    peerid: peerid
                }
            });
            console.log('OnIce Candiadet');
            console.log(sessionStorage.targetUser);
        };

        return W5RTC;
    }
