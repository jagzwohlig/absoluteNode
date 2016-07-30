/**
 * Employee.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var mongoose = require('mongoose');
var md5 = require('md5');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: String,
  company: String,
  division: String,
  designation: String,
  other: String,
  mobile: String,
  OfficeMobile: String,
  removeFax: String,
  hourlyRateFromDate: String,
  hourlyRateToDate: String,
  houseColor: String,
  PostedAt: String,
  City: String,
  EmployeeCode: String,
  SlabRate: String,
  EmployeeDocuments: String,
  address: {
    type: [{
      homeaddress: String,
      country: String,
      state: String,
      city: String,
      pincode: String
    }],
    index: true
  },
  contact: {
    type: [{
      office: String,
      home: String,
      mobile: String,
      extention: String,
      email: String
    }],
    index: true
  },
  surveyor: {
    type: [{
      issurveyou: String,
      valid_upto: String,
      licence: String,
      docs: String
    }],
    index: true
  },


});

module.exports = mongoose.model('Employee', schema);
var models = {

  saveData: function(data, callback) {
    if (data.password && data.password != "") {
      data.password = md5(data.password);
    }
    var employee = this(data);
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
      employee.save(function(err, data2) {
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
