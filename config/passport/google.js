var googleCredentials = {
    clientID: "529279279497-hdm2ul03erq4kitk7qlqbf41h6pl8f7p.apps.googleusercontent.com",
    clientSecret: "nNZiqXW5U2364QI9--sVIR8B",
    callbackURL: "/api/user/loginGoogle"
};
global["GoogleKey"] = "AIzaSyDMgwXi6D38isibUfShc9C2mJyaHZZ2LpE";
passport.use(new GoogleStrategy({
        clientID: "529279279497-hdm2ul03erq4kitk7qlqbf41h6pl8f7p.apps.googleusercontent.com",
        clientSecret: "nNZiqXW5U2364QI9--sVIR8B",
        callbackURL: "/api/user/loginGoogle"
    },
    function (accessToken, refreshToken, profile, cb) {
        profile.googleAccessToken = accessToken;
        console.log(profile);
        return cb(profile);
    }
));



// var gmail = google.gmail('v1');
// var OAuth2 = google.auth.OAuth2;

// var oauth2Client = new OAuth2(googleCredentials.clientID, googleCredentials.clientSecret, googleCredentials.callbackURL);