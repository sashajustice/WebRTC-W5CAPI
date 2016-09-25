/*redis pubsub code for w5capi scalability*/
var u = require("underscore");
var config = require('../configure'),
  _ = require('underscore'),
  pg = require('pg'),
  redis = require("redis"),
  redis_server = redis.createClient(config.redisPort, config.redisIP);

var conString = "postgresql://w5rtc:w5rtc@172.33.3.11/w5rtc";
var psql = new pg.Client(conString);
psql.connect();

exports.pubsubRedis = function(io, userList, listOfGroups, onlineUsers, pubGlobal, subGlobal, db, stun, turnold, turnnew, sigURL, devaudiovideomins, devdatamins) {

  io.sockets.on('connection', function(socket) {
    console.log('its connected ')
    var address = socket.handshake.address;
    console.log('IP Address:' + address);
    console.log('IP Address:' + address.address);
    var userid = socket.handshake.query.userid;
    var url = socket.handshake.headers.origin;
    var apikey = socket.handshake.query.apikey;
    var username = socket.handshake.query.username;
    var platform = socket.handshake.query.platform;
    var service = socket.handshake.query.service;
    var pkg = socket.handshake.query.pkgname;


    var version = socket.handshake.query.version;
    //check version 1.4
    if (version) {


      if (userid) {
        //Add userid to userList
        var data = JSON.stringify({
          userid: userid,
          add: true,
          socketUserid: socket.id
        });
        socket.userid = socket;
        pubGlobal.publish('user', data);
      }

      //Validate Key
      if (apikey) {
        if (platform === 'browser' && url) {

          var array = url.split('//');
          var domainname = array[1];

          if (domainname) {
            try {
              //check user key
              db.w5capi.aggregate({
                $unwind: '$apps'
              }, {
                $match: {
                  'apps.app_key': apikey
                }
              }, {
                $project: {
                  apps: "$apps"
                }
              }, function(err, data) {
                if (!err) {
                  if ((data) && (data.length == 1)) {
                    //check user domian name
                    if (data[0].apps.web_apps[0].domain === domainname) {
                      //set session
                      socket.apikey = apikey;
                      //send TURN/STUN to user
                      socket.emit('validation-res', {
                        stun: stun,
                        turnold: turnold,
                        turnnew: turnnew,
                        sigURL: sigURL
                      });

                      //check licience type
                      if (data[0].apps.license_type === 'development') {
                        socket.dev = true;
                      }

                      if (service === 'sip' || service === 'sip&webrtc') {
                        //Generate random password
                        var r_pwd = u.random(1000000000000, 100000000000000000000);
                        //send random password to redis
                        redis_server.set(userid + '_w5rtc' + apikey, r_pwd);
                        //send generate password to capi_PSTN
                        socket.emit('SIP-responce', {
                          userId: userid + '_w5rtc' + apikey,
                          password: r_pwd
                        });
                      }

                    } else {
                      //duplicate user request
                      socket.emit('validation-res', {
                        msg: 'Invalid domain name',
                        error: true
                      });
                      socket.disconnect();
                    }

                  } else {
                    socket.emit('validation-res', {
                      msg: 'Invalid API key',
                      error: true

                    });
                    socket.disconnect();
                  }
                } else {
                  socket.emit('validation-res', {
                    msg: 'Internal error',
                    error: true
                  });
                  socket.disconnect();
                }
              })
            } catch (e) {
              socket.emit('InvalidUser', {
                msg: 'Internal error',
                error: true
              });
              socket.disconnect();
            }
          } else {
            socket.emit('InvalidUser', {
              msg: 'Invalid domain name',
              error: true
            });
            socket.disconnect();
          }
        } else if (platform === 'mobile' && pkg) {

          //check user key
          db.w5capi.aggregate({
            $unwind: '$apps'
          }, {
            $match: {
              'apps.app_key': apikey
            }
          }, {
            $project: {
              apps: "$apps"
            }
          }, function(err, data) {

            if (!err) {
              if ((data) && (data.length == 1)) {

                try {
                  //check user domian name
                  if (data[0].apps.native_apps[0].pkg_name === pkg) {
                    //set session
                    socket.apikey = apikey;
                    //send TURN/STUN to user
                    socket.emit('validation-res', {
                      stun: stun,
                      turnold: turnold,
                      turnnew: turnnew,
                      sigURL: sigURL
                    });

                    //check licience type
                    if (data[0].apps.license_type === 'development') {
                      socket.dev = true;
                    }

                  } else {
                    //duplicate user request
                    socket.emit('validation-res', {
                      msg: 'Invalid package ',
                      error: true
                    });
                    socket.disconnect();
                  }
                } catch (e) {
                  //duplicate user request
                  socket.emit('validation-res', {
                    msg: 'Invalid package ',
                    error: true
                  });
                  socket.disconnect();
                }

              } else {
                socket.emit('validation-res', {
                  msg: 'Invalid key',
                  error: true
                });
                socket.disconnect();
              }

            } else {
              socket.emit('validation-res', {
                msg: 'Invalid key',
                error: true
              });
            }
          })
        }
      }





      //Get list of online user status when user join
      socket.on('user-status', function(data) {
        //check user already exit
        if (onlineUsers[apikey]) {
          //emit online user list
          socket.emit('onlineuser', onlineUsers[apikey]);
          //pub/sub redis
          pubGlobal.publish('online', {
            apikey: apikey,
            userid: userid,
            exit: true,
            username: username,
            status: 'online'
          });
          setTimeout(function() {
            io.to(apikey).emit('onlineuser', onlineUsers[apikey]);
          }, 200)
          socket.join(apikey);
        } else {
          //enter new user
          socket.join(apikey);
          //pub/sub redis
          pubGlobal.publish('online', {
            apikey: apikey,
            userid: userid,
            new: true,
            username: username,
            status: 'online'
          });
        }

      });


      //Status change from user and emit to every user
      socket.on('status-change', function(data) {
        onlineUsers[apikey][data.from].status = data.status;
        io.to(apikey).emit('user-status', data);
      });


      //get signalling message and emit signalling message
      socket.on('message', function(data) {
        //check socket user session
        if (socket.apikey) {
          var msg

          if (typeof data === 'object') {
            msg = data;
          } else {
            msg = JSON.parse(data);
          }

          if (msg.sdp) {
            var sdpmline = msg.sdp.sdp.split('/r/n');
            for (var i in sdpmline) {
              console.log(sdpmline[i].search('audio'));
              console.log(sdpmline[i].search('video'));
              if ((sdpmline[i].search('audio')) > 0 || (sdpmline[i].search('video')) > 0) {
                //check licience type
                if (socket.dev) {
                  setTimeout(function() {

                    var info = {
                      dev: true,
                      media: true,
                      userid: msg.to,
                      peerid: msg.peerid
                    };
                    socket.emit('message', JSON.stringify(info));

                  }, devaudiovideomins * 6000);
                }

              } else {
                if (socket.dev) {
                  setTimeout(function() {
                    console.log('its executed');
                    console.log(devdatamins);
                    var info = {
                      dev: true,
                      datachannel: true,
                      userid: msg.to,
                      peerid: msg.peerid
                    };
                    socket.emit('message', JSON.stringify(info));
                  }, devdatamins * 6000);
                }

              }

            }
            //console.log(msg.sdp.split('/r/n'));
          }

          if (userList[msg.to]) { //get socketio of user
            var user = userList[msg.to];
            if (user) {

              if (typeof data === 'object') {
                io.to(user).emit('message', JSON.stringify(data));
              } else {

                io.to(user).emit('message', data);
              }
            }
          }
        } else {
          //invalid user
          socket.emit('InvalidUser', {
            user: 'InvalidUser'
          });
          //close socket session
          socket.disconnect();
        }
      });



      //group call extablish
      socket.on('create-group-req', function(data) {
        try {
          var msg = JSON.parse(data);
          if (!listOfGroups[msg.group_id]) {
            var info = JSON.stringify({
              group_id: msg.group_id,
              participants: msg.from,
              mediaType: msg.mediaType,
              moderator: msg.group_moderator,
              new: true
            });
            console.log(msg.mediaType);
            //send info to sub
            pubGlobal.publish('group', info);
            //set global variable
            socket.groupid = msg.group_id;
            //emit group already exit responce to user
            socket.emit('create-group-res', {
              event: 'group-created',
              groupname: msg.group_id
            });
          } else {
            //emit group already exit responce to user
            socket.emit('create-group-res', {
              event: 'group-exit',
              groupname: msg.group_id
            });
          }

        } catch (e) {
          console.log(e);
        }
      });


      //join new group for video/audio call
      socket.on('join-group-req', function(data) {
        try {
          var msg = JSON.parse(data);
          if (!listOfGroups[msg.group_id]) {
            //emit group not exit responce to user
            socket.emit('join-group-res', {
              event: 'group-empty',
              groupname: msg.group_id
            });
          } else {

            var participants = listOfGroups[msg.group_id].participants;
            var mediaType = listOfGroups[msg.group_id].mediaType;

            var info = {
              isCustomMessage: true,
              mediaType: mediaType,
              participants: participants
            };
            //send participants
            var info = JSON.stringify(info);
            socket.emit('message', info);
            var groupData = JSON.stringify({
              group_id: msg.group_id,
              mediaType: mediaType,
              userid: msg.userid,
              exit: true
            });
            //send pub/sub
            pubGlobal.publish('group', groupData);
            //set global value
            socket.groupmem = msg.group_id;
            //set global value
            socket.memid = msg.userid;
            //emit group not exit responce to user
            socket.emit('join-group-res', {
              event: 'joined-group',
              groupname: msg.group_id
            });
          }
        } catch (e) {
          console.log(e);
        }

      });


      //Get billing information
      socket.on('billing_info', function(data) {

        try {

          var data = JSON.parse(data);
          console.log(data);
          var date = new Date();
          if (data.state == 'connected') {
            db.w5sip_cdr.save({
              apikey: apikey,
              start_time: date,
              start_timestamp: date.getTime(),
              end_time: 134,
              end_timestamp: 134,
              media_type: data.media_type,
              peer_id: data.peer_id,
              from: data.from_user,
              to: data.to_user,
              variables: {
                answer_stamp: date,
                direction: 'outbound',
                type: 'peer-to-peer',
                user_name: 'w5rtc3u2i3u2o3_' + apikey
              }
            }, function(err, data) {
              if (err) {

              }
            });
          } else if (data.state == 'disconnected') {
            db.w5sip_cdr.findOne({
              apikey: apikey,
              from: userid,
              to: data.to_user,
              end_time: 134
            }, function(err, bill) {
              if (bill) {
                findAmt(apikey, function(error,ammount) {
                  if (!error) {
                    var bal_amt = 0;
                      
                    if (ammount) {
                        
                      bal_amt = ammount.variables.nibble_current_balance || 0;
                    }
                    var start_time = bill.start_timestamp;
                    var date = new Date();
                    var end_time = date.getTime();
                    var bill_sec = m2m(end_time - start_time);
                    var bill_amt = 1;
                    if (bill_sec > 0) {
                      bill_amt = bill_sec * 1;
                    }else
                    {
                        bill_sec=1;
                    }
                      
                    db.w5sip_cdr.update({
                      apikey: apikey,
                      from: userid,
                      to: data.to_user,
                      end_time: 134
                    }, {
                      $set: {
                        end_time: date,
                        end_timestamp: date.getTime(),
                        'variables.end_stamp': date,
                        'variables.billsec': bill_sec,
                        'variables.nibble_total_billed': bill_amt,
                        'variables.nibble_current_balance': bal_amt - bill_amt
                      }
                    }, function(err, data) {
                      if (!err) {

                        nibbleacc_res(apikey, function(data) {
                          if (data.key) {
                             psql.query("UPDATE accounts SET cash = cash - '"+bill_amt+"' WHERE name='"+data.key+"'",function(errr,result){
                                 console.log(err);
                                 console.log(result);
                             });;
                          } else {
                            return;
                          }
                        });

                      }
                    });
                  }
                });


              } else {

                return;
              }
            });

          }
        } catch (e) {

        }
      })




      //socket disconnect event
      socket.on('disconnect', function() {
        //send user disconnect message to every user
        socket.broadcast.emit('user-left', userid);
        var data = JSON.stringify({
          userid: userid,
          remove: true
        });



        //billing info
            db.w5sip_cdr.findOne({
              apikey: apikey,
              from: userid,
              end_time: 134
            }, function(err, bill) {
              if (bill) {
                findAmt(apikey, function(error,ammount) {
                  if (!error) {
                    var bal_amt = 0;
                      
                    if (ammount) {
                        
                      bal_amt = ammount.variables.nibble_current_balance || 0;
                    }
                    var start_time = bill.start_timestamp;
                    var date = new Date();
                    var end_time = date.getTime();
                    var bill_sec = m2m(end_time - start_time);
                    var bill_amt = 1;
                    if (bill_sec > 0) {
                      bill_amt = bill_sec * 1;
                    }else
                    {
                        bill_sec=1;
                    }
                      
                    db.w5sip_cdr.update({
                      apikey: apikey,
                      from: userid,
                      end_time: 134
                    }, {
                      $set: {
                        end_time: date,
                        end_timestamp: date.getTime(),
                        'variables.end_stamp': date,
                        'variables.billsec': bill_sec * 60,
                        'variables.nibble_total_billed': bill_amt,
                        'variables.nibble_current_balance': bal_amt - bill_amt
                      }
                    }, function(err, data) {
                      if (!err) {

                        nibbleacc_res(apikey, function(data) {
                          if (data.key) {
                             psql.query("UPDATE accounts SET cash = cash - '"+bill_amt+"' WHERE name='"+data.key+"'",function(errr,result){
                                 console.log(err);
                                 console.log(result);
                             });;
                          } else {
                            return;
                          }
                        });

                      }
                    });
                  }
                });


              } else {

                return;
              }
            });


        //pub/sub for redis
        pubGlobal.publish('user', data);
        //leave  socket connection
        socket.leave(apikey);
        if (onlineUsers[apikey]) {
          try {
            var data = JSON.stringify({
              userid: userid,
              apikey: apikey,
              remove: true
            });
            //pub/sub redis
            pubGlobal.publish('online', data);
            var data = {
              userid: userid
            };
            //send user status
            io.to(apikey).emit('offline-user', data);
          } catch (e) {}
        } else {
          io.to(apikey).emit('onlineuser', 'Empty');
        }
        if (socket.groupmem) {
          if (!listOfGroups[socket.groupmem]) return;
          var data = JSON.stringify({
            group_id: socket.groupmem,
            memid: socket.memid,
            remove: true
          });
          //pub/sub redis
          pubGlobal.publish('group', data);

        }
        if (socket.groupid) {
          if (!listOfGroups[socket.groupid]) return;
          //send group information
          var data = JSON.stringify({
            groupid: socket.groupid,
            removeGroup: true
          });
          //pub/sub redis
          pubGlobal.publish('group', data);
        }
      });

    }


  });
    
    
    //Update ammount to postgress
function nibbleacc_res(key, callback) {

  db.w5capi.aggregate({
    $unwind: '$apps'
  }, {
    $match: {
      'apps.app_key': key
    }
  }, {
    $project: {
      apps: "$apps"
    }
  }, function(error, data) {

    if (data) {
      if (_.isEmpty(data)) {
        return callback({
          error: 'error'
        });
      }
      if (_.isArray(data[0].apps.sip_apps)) {
        callback({
          'key': data[0].apps.sip_apps[0].account_no
        })
      } else {
        callback({
          error: 'error'
        })
      }
    } else {
      callback({
        error: 'error'
      })
    }
  })

}


function findAmt(key, callback) {
    var apikey = key + '$';
  db.w5sip_cdr.find({
      apikey:key,
    "variables.nibble_current_balance": { $exists: true }
  }).sort({end_timestamp:-1}).limit(1).toArray(function(err, data) {
    if (!_.isEmpty(data)) {
      callback(err, data[0]);
    } else {
      callback(err, null);
    }
  })
}

//Convert Millistomi
function m2m(millis) {
  var minutes = Math.floor(millis / 60000);
  return minutes;
}
      
}




