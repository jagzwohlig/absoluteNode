global["GoogleKey"] = "AIzaSyC62zlixVsjaq4zDaL4cefNCubjCgxkte4";
global["GoogleclientId"] = "312627343761-olnlv3n4ined2cn449q2dec3b2rvhd2d.apps.googleusercontent.com";
global["GoogleclientSecret"] = "xNXKiKG9mHMq08LBb2EKTKfP";

console.log(global["env"]);

passport.use(new GoogleStrategy({
        clientId: GoogleclientId,
        clientSecret: GoogleclientSecret,
        callbackURL: global["env"].realHost + "/api/user/loginGoogle",
        accessType: "offline"
    },
    function (accessToken, refreshToken, profile, cb) {
        profile.googleAccessToken = accessToken;
        profile.googleRefreshToken = refreshToken;
        return cb(profile);
    }
));