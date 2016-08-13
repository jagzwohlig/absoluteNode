/**
 * Branch.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    shortName: {
        type: String,
        required: true,
        unique: true
    },
    office: {
        type: Schema.Types.ObjectId,
        ref: "Office",
        required: true,
        unique: true
    },
    companyName: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true,
        unique: true
    },

    isBillable: String,
    
    seriesFormat: String,

    STAT: Boolean,
    ITAT: Boolean,
    LTAT: Boolean,
    FSR: Boolean,
    R2NR: Boolean,

    status: Boolean
});

module.exports = mongoose.model('Branch', schema);
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
                callback(err, null);
            } else {
                callback(null, deleted);
            }
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
