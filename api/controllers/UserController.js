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
        console.log('https://www.googleapis.com/gmail/v1/users/' + req.user.email + "/" + req.body.url + "?key=" + GoogleKey);
        console.log(req.user);
        curl.request({
            url: 'https://www.googleapis.com/gmail/v1/users/' + req.user.email + "/" + req.body.url + "?key=" + GoogleKey,
            method: req.body.method,
            headers: {
                "Authorization": "Bearer " + req.user.googleAccessToken
            }
        }, function (err, data) {
            console.log(err);
            console.log(data);
            res.callback(err, JSON.parse(data));
        });
    }
};
module.exports = _.assign(module.exports, controller);