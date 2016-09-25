   /*wrapper for modverto*/
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
            	console.log(d);
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
            	console.log(e);
                console.debug('onEvent:', e);
            }
        };



       
        function init(info) {
            cur_call = null;


            vertoHandle = new $.verto({
                login: info.userId + '@54.169.88.82',
                passwd: info.password.toString(),
                socketUrl: 'ws://54.169.88.82:8081',
                tag: verto_video.remote || null,
                ringFile:info.ringtone || null,
                iceServers: true
            }, logincallbacks);
        }




        function docall(callinfo) {
             console.error(callinfo);
            cur_call = vertoHandle.newCall({
                destination_number: callinfo.number,
                caller_id_name: callinfo.caller_name || 'murugan',
                caller_id_number: verto_id || '1212',
                useVideo: callinfo.video || false
            });
        }
