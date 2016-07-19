/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
 var mongoose = require('mongoose');
 var md5 = require('md5');
 var Schema = mongoose.Schema;

 var schema = new Schema({
     name: String,
     email: String,
     password:String,
     emp_type:String,
     access:String,
     back_days:String,
     isserverer:String,
     department:String,
     branch:String,
     status:String,
     role:{
       type:[{
         user_type:String,
         roleName:String,
         menu:String,
         roleDescription:String
       }],
       index:true
     },
     module_right:String,


 });

 module.exports = mongoose.model('User', schema);
 var models = {

     saveData: function(data, callback) {
       if (data.password && data.password != "") {
           data.password = md5(data.password);
       }
         var user = this(data);
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
             user.save(function(err, data2) {
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
