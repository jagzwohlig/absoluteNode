/**
 * State.js
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
    zone: {
        type: Schema.Types.ObjectId,
        ref: "Zone",
        index: true
    },
    district: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "District",

        }],
        index: true,
        restrictedDelete: true
    }
});

schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('State', schema);

var models = {
    checkRestrictedDelete: function(data, callback) {
        var Model = this;
        var values = schema.tree;
        var arr = [];
        var ret = true;
        _.each(values, function(n, key) {
            if (n.restrictedDelete) {
                arr.push(key);
            }
        });
        Model.findOne({
            "_id": data._id
        }, function(err, data2) {
            if (err) {
                callback(err, null);
            } else {
                _.each(arr, function(n) {
                    console.log(n);
                    if (data2[n].length !== 0) {
                        ret = false;
                    }
                });
                callback(null, ret);
            }
        });
    },
    manageArrayObject: function(id, data, key, action, callback) {
        var Model = this;

        Model.findOne({
            "_id": id
        }, function(err, data2) {
            if (err) {
                callback(err, null);
            } else {
                switch (action) {
                    case "create":
                        {
                            data2[key].push(data);
                            data2.save(callback);
                        }
                        break;
                    case "delete":
                        {
                            _.remove(data2[key], function(n) {
                                return n == data;
                            });
                            data2.save(callback);
                        }
                        break;

                }
            }
        });


    },
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
        Model.checkRestrictedDelete({
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
sails.State = module.exports;
