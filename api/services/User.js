var schema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    validate: validators.isEmail()
  },
  photo: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    default: ""
  },
  forgotPassword: {
    type: String,
    default: ""
  },
  mobile: {
    type: String,
    default: ""
  },
  otp: {
    type: String,
    default: ""
  },
  accessToken: {
    type: [String],
    index: true
  },
  googleAccessToken: String,
  googleRefreshToken: String,
  oauthLogin: {
    type: [{
      socialId: String,
      socialProvider: String
    }],
    index: true
  },
  accessLevel: {
    type: String,
    default: "User",
    enum: ['User', 'Admin']
  }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('User', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

  existsSocial: function (user, callback) {
    var Model = this;
    Model.findOne({
      "oauthLogin.socialId": user.id,
      "oauthLogin.socialProvider": user.provider,
    }).exec(function (err, data) {
      if (err) {
        callback(err, data);
      } else if (_.isEmpty(data)) {
        var modelUser = {
          name: user.displayName,
          accessToken: [uid(16)],
          oauthLogin: [{
            socialId: user.id,
            socialProvider: user.provider,
          }]
        };
        if (user.emails && user.emails.length > 0) {
          modelUser.email = user.emails[0].value;
        }
        modelUser.googleAccessToken = user.googleAccessToken;
        modelUser.googleRefreshToken = user.googleRefreshToken;
        if (user.image && user.image.url) {
          modelUser.photo = user.image.url + "0";
        }
        Model.saveData(modelUser, function (err, data2) {
          if (err) {
            callback(err, data2);
          } else {
            data3 = data2.toObject();
            delete data3.oauthLogin;
            delete data3.password;
            delete data3.forgotPassword;
            delete data3.otp;
            callback(err, data3);
          }
        });
      } else {
        delete data.oauthLogin;
        delete data.password;
        delete data.forgotPassword;
        delete data.otp;
        data.googleAccessToken = user.googleAccessToken;
        data.save(function () {});
        callback(err, data);
      }
    });
  },
  profile: function (data, callback, getGoogle) {
    var str = "name email photo mobile accessLevel";
    if (getGoogle) {
      str += " googleAccessToken googleRefreshToken";
    }
    User.findOne({
      accessToken: data.accessToken
    }, str).exec(function (err, data) {
      if (err) {
        callback(err);
      } else if (data) {
        callback(null, data);
      } else {
        callback("No Data Found", data);
      }
    });
  },
  updateAccessToken: function (id, accessToken) {
    User.findOne({
      "_id": id
    }).exec(function (err, data) {
      data.googleAccessToken = accessToken;
      data.save(function () {});
    });
  },
  gmailCall: function (req, callback) {
    var noTry = 0;

    function makeGmailCall() {
      if (!req.body.other) {
        req.body.other = "";
      }
      console.log({
        url: 'https://www.googleapis.com/gmail/v1/users/' + req.user.email + "/" + req.body.url + "?key=" + GoogleKey + req.body.other,
        method: req.body.method,
        headers: {
          "Authorization": "Bearer " + req.user.googleAccessToken
        }
      });
      request({
        url: 'https://www.googleapis.com/gmail/v1/users/' + req.user.email + "/" + req.body.url + "?key=" + GoogleKey + req.body.other,
        method: req.body.method,
        headers: {
          "Authorization": "Bearer " + req.user.googleAccessToken
        }
      }, function (err, httpResponse, body) {
        console.log(err);
        console.log(body);
        console.log("Watch this");
        if (err) {
          callback(err);
        } else if (body) {

          console.log("WHERE IS IT GOING");
          if (noTry === 0 && body.error) {
            console.log("GOING INSIDE");
            refreshToken();
          } else {
            console.log("GOING INSIDE 2");
            callback(err, JSON.parse(body));
          }
        } else {
          callback(err, body);
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
          callback(err);
        } else if (body) {

          body = JSON.parse(body);
          req.user.googleAccessToken = body.access_token;
          User.updateAccessToken(req.user.id, body.access_token);
          noTry = 1;
          makeGmailCall();
        } else {
          callback(err);
        }
      });
    }
    makeGmailCall();
  }

};
module.exports = _.assign(module.exports, exports, model);