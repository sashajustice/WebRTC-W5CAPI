/*w5capi signalling server code*/
var mongo = require('mongojs'),
    db = 'w5rtc',
    collections = ['w5capi','w5capi_old','w5capi_webrtc_cdr','webrtc_dialplan','w5sip_cdr'],
    config = require('./configure'),
    db= mongo.connect(config.mongoIP+':'+config.mongoPort+'/'+db, collections);
 
var fs = require('fs');



if(config.thirdpartystunURL)
{
    var stun = [{
        url: 'stun:' + config.stunURL
    },{
        url: 'stun:' + config.thirdpartystunURL
    }];

}else
{
    var stun = [{
        url: 'stun:' + config.stunURL
    }];
}


if(config.thirdpartyturnURL)

{
    //turn server for old browser
    var turnold = [{
        url: 'turn:' + config.turnUsername + '@' + config.turnURL,
        credential: config.turnCredential
    },
    {
        url: 'turn:' + config.thirdpartyturnUsername + '@' + config.thirdpartyturnURL,
        credential: config.thirdpartyturnCredential
    }];
}else
{
    //turn server for old browser
    var turnold = [{
        url: 'turn:' + config.turnUsername + '@' + config.turnURL,
        credential: config.turnCredential
    }];
}


if(config.thirdpartyturnURL)
{
    //turn server for new browser
var turnnew = [{
        url: 'turn:' + config.turnURL,
        credential: config.turnCredential,
        username: config.turnUsername
    },
    {
        url: 'turn:' + config.thirdpartyturnURL,
        credential: config.thirdpartyturnCredential,
        username: config.thirdpartyturnUsername
        }];

}else
{

//turn server for new browser
var turnnew = [{
        url: 'turn:' + config.turnURL,
        credential: config.turnCredential,
        username: config.turnUsername
    }];

}


var sigURL = config.sigURL;


var io = require('socket.io')(8881);
var redis = require('redis');
var redisio = require('socket.io-redis');
var redisPubSub=require('./routes/pubsubredis.js');

//emit onlineUsers/lidtOfGroups
var pubGlobal = redis.createClient(config.redisPort,config.redisIP);
var subGlobal = redis.createClient(config.redisPort,config.redisIP);
//subscribe global event

//subscribe channel
subGlobal.subscribe('user');
subGlobal.subscribe('group');
subGlobal.subscribe('online');




io.adapter(redisio({
    host: config.redisIP,
    port: config.redisPort
}));

//Global Variable
var userList = {}
var listOfGroups = {};
var onlineUsers = {};

 //receive message from channel
subGlobal.on('message', function (channel, message) {
    var message=JSON.parse(message);
    //check channel message
    //user operation
    if (channel == 'user') {    
        if (message.add && message.userid) {
        var userid=message.userid;
            //add user to userlist
          userList[message.userid] =message.socketUserid;
        } else if (message.remove && message.userid) {
            //delete user fro userlist
            delete userList[message.userid];
        } else {
            return;
        }
        //group operation
         } else if (channel == 'group') {
        if (message.new) {
            //add new group
            listOfGroups[message.group_id] = {
                participants: [message.participants],
                moderator: message.moderator,
                mediaType:message.mediaType
            }
        } else if (message.exit) {
            //push member to group
            listOfGroups[message.group_id].participants.push(message.userid);
        } else if (message.remove) {
            console.log('remove member');
            //remove member from group
            console.log(listOfGroups);
            console.log(message.memid);
            console.log(listOfGroups[message.group_id].participants);
            for(var i in listOfGroups[message.group_id].participants)
            {
                if(listOfGroups[message.group_id].participants[i]===message.memid)
                {
                    console.log('delete member');
                    console.log(listOfGroups[message.group_id].participants[i]);
                    listOfGroups[message.group_id].participants.splice(i,1);
                }
                
            }
            
        } else if (message.removeGroup) {
            //delete group
            delete listOfGroups[message.groupid];
        } else {
            return;
        }
      //user status
    } else if (channel == 'online') {
        if (message.new) {
            //new group
            onlineUsers[message.apikey] = {};
            //set status
            onlineUsers[message.apikey][message.userid] = {
                userid: message.userid,
                username: message.username,
                status: 'online'
            };
        } else if (message.exit) {
            //exit group
            onlineUsers[message.apikey][message.userid] = {
                userid: message.userid,
                username: message.username,

                status: 'online'
            };
        } else if (message.remove) {
            //remove status
            delete onlineUsers[message.apikey][message.userid];
        } else {
            return;
        }
    } else {
        return;
    }
});

//redis pub/sub
redisPubSub.pubsubRedis(io,userList,listOfGroups,onlineUsers, pubGlobal,subGlobal,db,stun,turnold,turnnew,sigURL,config.devAudioVideomins,config.devDatamins)
