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
        console.log(req.user);
        var obj = {
            body: {
                url: "messages",
                other: "&maxResults=10",
                method: "GET"
            },
            user: req.user
        };
        User.gmailCall(obj, function (err, data) {
            if (err) {
                res.callback(err);
            } else {
                console.log("LENGTH" + data.messages.length);
                async.each(data.messages, function (n, callback) {
                    var obj = {
                        body: {
                            url: "messages/" + n.id,
                            other: "&format=metadata",
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
                    console.log("LAG GAI");
                    console.log(err);
                    console.log(data.messages);
                    if (err) {
                        res.callback(err);
                    } else {
                        res.callback(err, data.messages);
                    }
                });
            }

        });
    }
};
module.exports = _.assign(module.exports, controller);