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


    gmailCall: function (req, res, next) {

        var noTry = 0;

        function makeGmailCall() {
            request({
                url: 'https://www.googleapis.com/gmail/v1/users/' + req.user.email + "/" + req.body.url + "?key=" + GoogleKey,
                method: req.body.method,
                headers: {
                    "Authorization": "Bearer " + req.user.googleAccessToken
                }
            }, function (err, httpResponse, body) {
                console.log(noTry);
                if (err) {
                    if (noTry === 0) {
                        refreshToken();
                    } else {
                        res.callback(err);
                    }
                } else if (body) {
                    res.callback(err, JSON.parse(body));
                } else {
                    res.callback(err, body);
                }

            });
        }

        function refreshToken() {
            request.post({
                url: 'https://www.googleapis.com/oauth2/v4/token',
                form: {
                    refresh_token: req.user.googleRefreshToken,
                    client_id: GoogleclientId,
                    client_secret: GoogleclientSecret,
                    grant_type: 'refresh_token',
                }
            }, function (err, httpResponse, body) {
                if (err) {
                    res.callback(err);
                } else if (body) {

                    body = JSON.parse(body);
                    req.user.googleAccessToken = body.access_token;
                    User.updateAccessToken(req.user.id, body.access_token);
                    noTry = 1;
                    makeGmailCall();
                } else {
                    res.callback(err);
                }
            });
        }
        console.log("Chi");
        makeGmailCall();
    }
};
module.exports = _.assign(module.exports, controller);