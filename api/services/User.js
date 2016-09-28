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
    }).lean().exec(function (err, data) {
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
        if (user.photos && user.photos.length > 0) {
          modelUser.photo = user.photos[0].value;
        }
        Model.saveData(modelUser, function (err, data2) {
          if (err) {
            callback(err, data2);
          } else {
            data3 = data2.toObject();
            console.log(data3);
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
        callback(err, data);
      }
    });
  },
  profile: function (data, callback) {
    User.findOne({
      accessToken: data.accessToken
    }, 'name email photo mobile accessLevel').exec(function (err, data) {
      if (err) {
        callback(err);
      } else if (data) {
        callback(null, data)
      } else {
        callback("No Data Found", data);
      }
    });
  }

};
module.exports = _.assign(module.exports, exports, model);