/**
 * City.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    district: {
        type: Schema.Types.ObjectId,
        ref: "District",
        index: true
    },
    stdCode: Number,
    lat: Number,
    long: Number
});

schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model("City", schema);

var models = {
    saveData: function(data, callback) {
        var Model = this;
        var Const = this(data);
        if (data._id) {
            Model.findOneAndUpdate({
                _id: data._id
            }, data, callback);
        } else {
            Const.save(callback);
        }

    },
    getAll: function(data, callback) {
        var Model = this;
        var Const = this(data);
        Model.find({}, {}, {}).exec(callback);
    },
    deleteData: function(data, callback) {
        var Model = this;
        var Const = this(data);
        Config.checkRestrictedDelete(Model,schema {
            _id: data._id
        }, function(err, value) {
            if (err) {
                callback(err, null);
            } else if (value) {
                Model.findOne({
                    _id: data._id
                }).exec(function(err, data) {
                    data.remove({}, callback);
                });
            } else if (!value) {
                callback("Can not delete the Object as Restricted Deleted Points are available.", null);
            }
        });
    },
    getOne: function(data, callback) {
        var Model = this;
        var Const = this(data);
        Model.findOne({
            _id: data._id
        }).exec(callback);
    },

};
module.exports = _.assign(module.exports, models);
sails.City = module.exports;
