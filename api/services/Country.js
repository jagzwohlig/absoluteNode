/**
 * Country.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var mongoose = require('mongoose-populate-virtuals')(require('mongoose'));
var uniqueValidator = require('mongoose-unique-validator');
var timestamps = require('mongoose-timestamp');

var Schema = mongoose.Schema;

var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    countryCode: {
        type: String,
        required: true,
        unique: true
    },
    ISDCodes: {
        type: String,
        default: 0,
        unique: true
    },
    zone: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Zone",
        }],
        index: true,
        restrictedDelete: true
    }
});


schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Country', schema);

var models = {

    getAll:function(data, callback){
      var values = schema.tree;
      _.each(values,function(n,key) {
        if(n.restrictedDelete)
        {
          console.log(key);
        }


      });
      callback(null,values);
    },
    saveData: function(data, callback) {
        var country = this(data);
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
            country.save(function(err, data2) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, data2);
                }
            });
        }

    },
    getAll1: function(data, callback) {
        console.log(data);
        this.find({}, {}, {}).exec(function(err, deleted) {
            console.log(deleted);
            if (err) {
                callback(err, null);
            } else {
                callback(null, deleted);
            }
        });
    },
    deleteData: function(data, callback) {
        this.findOne({
            _id: data._id
        }).exec(function(err, data) {
            data.remove({}, function(err, data) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, data);
                }
            });
        });

    },
    getOne: function(data, callback) {
        this.findOne({
            _id: data._id
        }).exec(function(err, data2) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                callback(null, data2);
            }
        });
    },
};
module.exports = _.assign(module.exports, models);
