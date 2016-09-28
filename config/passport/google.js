passport.use(new GoogleStrategy({
        clientID: "529279279497-hdm2ul03erq4kitk7qlqbf41h6pl8f7p.apps.googleusercontent.com",
        clientSecret: "nNZiqXW5U2364QI9--sVIR8B",
        callbackURL: "/api/user/loginGoogle"
    },
    function(accessToken, refreshToken, profile, cb) {
        return cb(profile);
    }
));