module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    loginFacebook: function (req, res) {
        passport.authenticate('facebook', {
            scope: ['public_profile', 'user_friends', 'email'],
            failureRedirect: '/'
        }, res.socialLogin)(req, res);
    },
    loginGoogle: function (req, res) {
        if (req.query.returnUrl) {
            req.session.returnUrl = req.query.returnUrl;
        } else {

        }

        passport.authenticate('google', {
            scope: ['openid', 'profile', 'email', "https://mail.google.com/", "https://www.googleapis.com/auth/gmail.readonly", "https://www.googleapis.com/auth/gmail.compose", "https://www.googleapis.com/auth/gmail.send", "https://www.googleapis.com/auth/gmail.insert", "https://www.googleapis.com/auth/gmail.labels", "https://www.googleapis.com/auth/gmail.modify", "https://www.googleapis.com/auth/gmail.settings.basic", "https://www.googleapis.com/auth/gmail.settings.sharing", "https://www.googleapis.com/auth/calendar"],
            failureRedirect: '/'
        }, res.socialLogin)(req, res);
    },
    profile: function (req, res) {
        if (req.body && req.body.accessToken) {
            User.profile(req.body, res.callback);
        } else {
            res.callback("Please provide Valid AccessToken", null);
        }
    },
    listEmail: function (req, res) {
        var pageToken = "";
        if (req.body.nextPageToken) {
            pageToken = "&pageToken=" + req.body.nextPageToken;
        }
        var search = "";
        if (req.body.search) {
            search = "&q=" + req.body.search;
        }
        var labelIds = "";
        if (req.body.labelIds) {
            labelIds = "&labelIds=" + req.body.labelIds;
        }

        var obj = {
            body: {
                url: "messages",
                other: "&maxResults=10" + pageToken + search,
                labelIds: labelIds,
                method: "GET"
            },
            user: req.user
        };
        User.gmailCall(obj, function (err, data) {
            if (err) {
                res.callback(err);
            } else {
                async.each(data.messages, function (n, callback) {
                    var obj = {
                        body: {
                            url: "messages/" + n.id,
                            other: "&format=metadata",
                            labelIds: labelIds,
                            method: "GET"
                        },
                        user: req.user
                    };
                    User.gmailCall(obj, function (err, data2) {
                        if (err) {
                            callback(err);
                        } else {
                            n.detail = data2;
                            callback();
                        }
                    });
                }, function (err) {
                    if (err) {
                        res.callback(err);
                    } else {
                        res.callback(err, data);
                    }
                });
            }

        });
    },
    detailEmail: function (req, res) {
        var obj = {
            body: {
                url: "messages/" + req.body.messageId,
                method: "GET",
                // other: "&format=raw"
            },
            user: req.user
        };
        User.gmailCall(obj, res.callback);
    },
    sendEmail: function (req, res) {
        var obj = {
            body: {
                url: "messages/send",
                method: "POST"
            },
            user: req.user
        };
        var rawData = "From: " + req.user.email + "\r\n" +
            "To: " + req.body.to + "\r\n" +
            "Cc: " + req.body.cc + "\r\n" +
            "Bcc: " + req.body.bcc + "\r\n" +
            "Subject: " + req.body.subject + "\r\n" +
            "Content-Type: text/html; charset=UTF-8\r\n" +
            "Content-Transfer-Encoding: QUOTED-PRINTABLE\r\n" +
            "Content-Disposition: inline\r\n\r\n" +
            "" + req.body.message + "";
        var rawDataProcessed = btoa(rawData).replace(/\+/g, '-').replace(/\//g, '_');
        obj.form = {
            raw: rawDataProcessed
        };
        User.gmailCall(obj, res.callback);
    },
    getAttachment: function (req, res) {
        var obj = {
            body: {
                url: "messages/" + req.query.messageId + "/attachments/" + req.query.attachmentId,
                method: "GET"
            },
            user: req.user
        };
        User.gmailCall(obj, function (err, data) {
            if (err) {
                res.callback(err, data);
            } else {
                res.setHeader('Content-Disposition', 'attachment; filename=' + req.query.fileName);
                res.setHeader('Content-Type', 'application/octet-stream; name=' + req.query.fileName);
                res.send(base64url.toBuffer(data.data));
            }
        });
    },
    import: function (req, res) {
        var xlsx = require('node-xlsx').default;
        var jsonExcel = xlsx.parse("./demo.xlsx");
        var retVal = [];
        var excelDataToExport = _.slice(jsonExcel[0].data, 1);
        async.eachSeries(excelDataToExport, function (n, callback) {
            Industry.getIdByName({
                name: n[0]
            }, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                    Category.getIdByName({
                        industry: data,
                        name: n[1]
                    }, function (err, data2) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(data2);
                            Product.getIdByName({
                                industry: data,
                                category: data2,
                                name: n[2]
                            }, function (err, data3) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    retVal.push(data3);
                                    callback(null, data3);
                                }
                            });

                        }
                    });

                }
            });
        }, function (err,data) {
            if(err) {
                callback(err,data);
            } else {
                res.json(retVal);
            }
        });
    }
};
module.exports = _.assign(module.exports, controller);