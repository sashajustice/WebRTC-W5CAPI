/*w5capi xml curl for sip related activity*/
var express = require('express'),
    app = express(),
    http = require('http'),
    js2xml = require('js2xmlparser'),
    config = require('./config/config'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    phone = require('phone'),
    mongojs = require('mongojs'),
    server = http.createServer(app);
var _ = require("underscore");
var redis = require("redis"),
    redis_server = redis.createClient(config.redisPort, config.redisIP);

var db = mongojs(config.mongoIP + ':' + config.mongoPort + '/w5rtc', ['w5rtc_Master', 'w5capi', 'w5sip_gateway', 'w5sip_dialplan', 'w5sip_cdr']);


app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}));


var responce = {
    '@': {
        'type': 'freeswitch/xml'
    },
    'session': {
        '@': {
            'name': 'result'
        },
        'name': {
            '@': {
                'status': 'not found'
            }
        }
    }
};






app.post('/dialplan', function (req, res) {
    var remote_caller_id_number = req.body.variable_verto_remote_caller_id_number;
    var username = req.body.variable_user_name;
    if (_.isEmpty(remote_caller_id_number)) {
        return not_fount(res);
    }

    if (_.isEmpty(req.body.variable_user_name)) {

        return not_fount(res);
    }

    var ekiga_val = /ekiga.net$/;
    if (ekiga_val.test(remote_caller_id_number)) {
        var key = username.split('_w5rtc');

        if (_.isEmpty(key[1])) {
            return not_fount(res)
        } else {
            nibbleacc_res(key[1], function (data) {
                if (data.key) {
                    return dialplan_res(data.key, '0.0050', 'plivo')
                } else {
                    return not_fount(res)
                }

            })
        }
    }

    var linphone_val = /sip.linphone.org$/;
    if (linphone_val.test(remote_caller_id_number)) {
        var key = username.split('_w5rtc');
        if (_.isEmpty(key[1])) {
            return not_fount(res)
        } else {
            nibbleacc_res(key[1], function (data) {
                if (data.key) {
                    return dialplan_res(data.key, '0.0050', 'plivo')
                } else {
                    return not_fount(res)
                }

            })
        }
    }

    var sip2sip_val = /sip2sip.info$/;
    if (sip2sip_val.test(remote_caller_id_number)) {
        var key = username.split('_w5rtc');
        if (_.isEmpty(key[1])) {
            return not_fount(res)
        } else {
            nibbleacc_res(key[1], function (data) {
                if (data.key) {
                    return dialplan_res(data.key, '0.0050', 'plivo')
                } else {
                    return not_fount(res)
                }

            })
        }
    }

    var number = phone(remote_caller_id_number);
    if (_.isArray(number)) {
        if (_.isUndefined(number[0]) || (_.isNull(number[0]))) {
            var key = username.split('_w5rtc');
            if (_.isEmpty(key[1])) {

                return not_fount(res)
            } else {
                nibbleacc_res(key[1], function (data) {

                    if (data.key) {
                        calluser_found(res, data.key)
                    } else {
                        return not_fount(res);
                    }

                });


            }
        } else {
            var key = username.split('_w5rtc');
            if (_.isEmpty(key[1])) {

                return not_fount(res)
            } else {
                db.w5sip_dialplan.findOne({
                    country_code: number[1]
                }, function (err, userdata) {
                    if (userdata) {

                        nibbleacc_res(key[1], function (data) {
                            if (data.key) {
                                return dialplan_res(data.key, userdata.cost, userdata.gateway_name)
                            } else {
                                return not_fount(res);
                            }

                        })
                    } else {
                        return not_fount(res)
                    }

                })
            }
        }
    }




    function calluser_found(res, nibble_acc) {
        var dial_responce = {
            '@': {
                'type': 'freeswitch/xml',
            },
            'section': {
                '@': {
                    'name': 'dialplan'
                },
                'context': {
                    '@': {
                        'name': 'default'
                    },
                    'extension': {
                        '@': {
                            'name': 'Dial through Plivo'
                        },
                        'condition': {
                            '@': {
                                'filed': 'destination_number',
                                'expression': '^' + remote_caller_id_number + '$'
                            },
                            'action': [{
                                '@': {
                                    'application': 'set',
                                    'data': 'bypass_media=true'
                                }
                                        }, {
                                '@': {
                                    'application': 'set',
                                    'data': 'nibble_account=' + nibble_acc
                                }
                                        }, {
                                '@': {
                                    'application': 'set',
                                    'data': 'nibble_increment=60'
                                }
                                        }, {
                                '@': {
                                    'application': 'set',
                                    'data': 'nibble_rate=4'
                                }
                                        }, {
                                '@': {
                                    'application': 'bridge',
                                    'data': 'user/' + remote_caller_id_number
                                }
                                        }]
                        }
                    }
                }
            }
        }
        req.setEncoding('utf8');
        res.header('Content-Type', 'text/xml');
        res.send(js2xml('document', dial_responce));
    }


    function not_fount(res) {
        req.setEncoding('utf8');
        res.header('Content-Type', 'text/xml');
        res.send(js2xml('document', responce));
    }

    function dialplan_res(nibble_acc, cost, gateway_name) {
        var dial_responce = {
            '@': {
                'type': 'freeswitch/xml',
            },
            'section': {
                '@': {
                    'name': 'dialplan'
                },
                'context': {
                    '@': {
                        'name': 'default'
                    },
                    'extension': {
                        '@': {
                            'name': 'Dial through Plivo'
                        },
                        'condition': {
                            '@': {
                                'filed': 'destination_number',
                                'expression': '^' + remote_caller_id_number + '$'
                            },
                            'action': [
                                {
                                    '@': {
                                        'application': 'set',
                                        'data': 'nibble_account=' + nibble_acc
                                    }
                                        }, {
                                    '@': {
                                        'application': 'set',
                                        'data': 'nibble_rate=' + cost
                                    }
                                        }, {
                                    '@': {
                                        'application': 'bridge',
                                        'data': 'sofia/gateway/' + gateway_name + '/' + remote_caller_id_number
                                    }
                                        }]
                        }
                    }
                }
            }
        }
        req.setEncoding('utf8');
        res.header('Content-Type', 'text/xml');
        res.send(js2xml('document', dial_responce));
    }

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
        }, function (error, data) {

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

});

app.get('/configuration', function (req, res) {

    var respoce = {
        '@': {
            'type': 'freeswitch/xml'
        },
        'session': {
            '@': {
                'name': 'result'
            },
            'name': {
                '@': {
                    'status': 'not found'
                }
            }
        }
    };
    req.setEncoding('utf8');
    res.header('Content-Type', 'text/xml');
    res.send(js2xml('document', respoce));

});

app.post('/directory', function (req, res) {
    if (_.isEmpty(req.body.user)) {
        req.setEncoding('utf8');
        res.header('Content-Type', 'text/xml');
        res.send(js2xml('document', responce));
        return;
    }
    var user = req.body.user;
    var key = user.split('_w5rtc');


    if (_.isUndefined(key[1])) {
        req.setEncoding('utf8');
        res.header('Content-Type', 'text/xml');
        res.send(js2xml('document', responce));
        return
    } else {
        db.w5capi.aggregate({
            $unwind: '$apps'
        }, {
            $match: {
                'apps.app_key': key[1]
            }
        }, {
            $project: {
                apps: "$apps"
            }
        }, function (error, userdata) {

            if (userdata) {

                if (_.isEmpty(userdata)) {
                    req.setEncoding('utf8');
                    res.header('Content-Type', 'text/xml');
                    res.send(js2xml('document', responce));
                    return
                }

                if (_.isArray(userdata[0].apps.sip_apps)) {
                    if (userdata[0].apps.sip_apps[0].sip_active == 'Active') {
                        var users = []

                        redis_server.get(req.body.user, function (err, data) {
                            if (data) {
                                users.push({
                                    '@': {
                                        'id': user
                                    },
                                    'params': {
                                        'param': [{
                                            '@': {
                                                'name': 'password',
                                                'value': data
                                            }
                                            }]
                                    },
                                    'variables': {
                                        'variable': [{
                                            '@': {
                                                'name': 'user_context',
                                                'value': 'default'
                                            }
                                            }, {
                                            '@': {
                                                'name': 'nibble_rounding',
                                                'value': '20'
                                            }
                                            }]
                                    }
                                })
                            } else {
                                req.setEncoding('utf8');
                                res.header('Content-Type', 'text/xml');
                                res.send(js2xml('document', responce));
                            }

                            var dir = {
                                '@': {
                                    'type': 'freeswitch/xml',
                                },
                                'section': {
                                    '@': {
                                        'name': 'directory'
                                    },
                                    'domain': {
                                        '@': {
                                            'name': '$${domain}'
                                        },
                                        'params': {
                                            'param': [{
                                                '@': {
                                                    'name': 'dial-string',
                                                    'value': "{^^:sip_invite_domain=${dialed_domain}:presence_id=${dialed_user}@${dialed_domain}}${sofia_contact(*/${dialed_user}@${dialed_domain})},${verto_contact ${dialed_user}@${dialed_domain}}"
                                                }
                    }, {
                                                '@': {
                                                    'name': 'jsonrpc-allowed-methods',
                                                    'value': 'verto'
                                                }
                    }]
                                        },
                                        'groups': {
                                            'group': {
                                                '@': {
                                                    'name': 'default'
                                                },
                                                'users': {
                                                    'user': users
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            req.setEncoding('utf8');
                            res.header('Content-Type', 'text/xml');
                            res.send(js2xml('document', dir));
                        })
                    } else {
                        req.setEncoding('utf8');
                        res.header('Content-Type', 'text/xml');
                        res.send(js2xml('document', responce));
                    }
                } else {
                    req.setEncoding('utf8');
                    res.header('Content-Type', 'text/xml');
                    res.send(js2xml('document', responce));
                }
            } else {
                req.setEncoding('utf8');
                res.header('Content-Type', 'text/xml');
                res.send(js2xml('document', responce));
            }
        })
    }

})

server.listen(9894);
