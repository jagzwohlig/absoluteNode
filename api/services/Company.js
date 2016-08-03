/**
 * Company.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: String,
  companyCode: String,
  NEFT: String,
  shortName: String,
  image: String,

  serviceTax: String,
  pan: String,
  services: String,
  cin: String,
  website: String,
  status: Boolean,

  address: String,
  country: String,
  state: String,
  city: String,
  pincode: String,
  finalAddress: String,

  mobile: String,
  office:String,
  home:String,
  fax: String,
  email: String,
  extension: String,

});

module.exports = mongoose.model('Company', schema);
var models = {

  saveData: function(data, callback) {
    var company = this(data);
    if (data._id) {
      this.findOneAndUpdate({
        _id: data._id
      }, data, function(err, data2) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, data2);
        }
      });
    } else {
      company.save(function(err, data2) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, data2);
        }
      });
    }

  },
  getAll: function(data, callback) {
    this.find({}, {}, {}).exec(function(err, deleted) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, deleted);
      }
    });
  },
  deleteData: function(data, callback) {
    this.findOneAndRemove({
      _id: data._id
    }, function(err, deleted) {
      if (err) {
        callback(err, null)
      } else {
        callback(null, deleted)
      }
    });
  },
  getOne: function(data, callback) {
    this.findOne({
      _id: data._id
    }).exec(function(err, data2) {
      if (err) {
        console.log(err);
        callback(err, null)
      } else {
        callback(null, data2);
      }
    });
  },

};
module.exports = _.assign(module.exports, models);
