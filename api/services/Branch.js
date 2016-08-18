/**
 * City.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var uniqueValidator = require('mongoose-unique-validator');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    shortName: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    office: {
        type: Schema.Types.ObjectId,
        ref: "Office",
        required: true,
    },

    isBillable: Boolean,

    seriesFormat: String,

    STAT: Boolean,
    ITAT: Boolean,
    LTAT: Boolean,
    FSR: Boolean,
    R2NR: Boolean,

    status: {
        type: Boolean,
        default: true
    },
});


schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Branch', schema);
var models = {
    saveData: function(data, callback) {
        var Model = this;
        var Const = this(data);
        if (data._id) {
            Model.findOne({
                _id: data._id
            }, function(err, data2) {
                if (err) {
                    callback(err, data2);
                } else if (data2) {
                    if (data.office != data2.office) {
                        Config.manageArrayObject(Office, data2.office, data._id, "branch", "delete", function(err, md) {
                            if (err) {
                                callback(err, md);
                            } else {
                                Config.manageArrayObject(Office, data.office, data._id, "branch", "create", function(err, md) {
                                    if (err) {
                                        callback(err, md);
                                    } else {
                                        data2.update(data, {
                                            w: 1
                                        }, callback);
                                    }
                                });
                            }
                        });
                    } else {
                        data2.update(data, {
                            w: 1
                        }, callback);
                    }
                } else {
                    callback("No Data Found", data2);
                }
            });
        } else {

            Const.save(function(err, data2) {
                if (err) {
                    callback(err, data2);
                } else {
                    Config.manageArrayObject(Office, data2.office, data2._id, "branch", "create", function(err, md) {
                        callback(err, data2);
                    });
                }
            });

        }

    },
    deleteData: function(data, callback) {
        var Model = this;
        var Const = this(data);
        Config.checkRestrictedDelete(Model, schema, {
            _id: data._id
        }, function(err, value) {
            if (err) {
                callback(err, null);
            } else if (value) {
                Model.findOne({
                    _id: data._id
                }).exec(function(err, data2) {
                    if (err) {
                        callback("Error Occured", null);
                    } else if (data2) {
                        Config.manageArrayObject(Office, data2.office, data2._id, "branch", "delete", function(err, md) {
                            if (err) {
                                callback(err, md);
                            } else {
                                data2.remove({}, function(err, data3) {
                                    if (err) {
                                        callback(err, data3);
                                    } else {
                                        callback(err, data3);
                                    }
                                });
                            }
                        });
                    }
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
        }).populate("office","company _id name").exec(callback);
    },
    search: function(data, callback) {
        var Model = this;
        var Const = this(data);
        var maxRow = Config.maxRow;

        var page = 1;
        if (data.page) {
            page = data.page;
        }
        var field = data.field;


        var options = {
            field: data.field,
            filters: {
                keyword: {
                    fields: ['name'],
                    term: data.keyword
                }
            },
            sort: {
                asc: 'name'
            },
            start: (page - 1) * maxRow,
            count: maxRow
        };

        var Search = Model.find(data.filter)
            .keyword(options)
            .order(options)
            .populate("office","company _id name")
            .page(options, callback);

    }

};
module.exports = _.assign(module.exports, models);
