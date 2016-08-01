/**
 * Customer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;

 var schema = new Schema({

   address: String,
   country: String,
   state: String,
   city: String,
   pincode: String,
   finalAddress: String,
   segment: String,
   officeLevel:String,
   officeCode: String,
   shortName:String,
   creditLimit: String,
   status: Boolean,
   clientCompany: String,
   other: String,
   contactPerson: String,
   category: String,
   issueOffice: String,
   limit: String,
   direct: String,
   phone1: String,
   phone2: String,
   phone3: String,
   fax1: String,
   fax2: String,
   email: String,


 });

 module.exports = mongoose.model('Customer', schema);
 var models = {

     saveData: function(data, callback) {
         var customer = this(data);
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
             customer.save(function(err, data2) {
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
