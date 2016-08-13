/**
 * District.js
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
        unique: true
    },
    state: {
        type: Schema.Types.ObjectId,
        ref: "State",
        index: true
    },
    city: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "City"
        }],
        index: true,
        restrictedDelete: true
    }
});


schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(deepPopulate, {

    populate: {
        'state': {
            select: 'name _id zone'
        },
        'state.zone': {
            select: 'name _id country'
        },
        'zone.country': {
            select: 'name _id'
        }
    }

});
module.exports = mongoose.model('District', schema);

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
                    if (data.state != data2.state) {
                        Config.manageArrayObject(State, data2.state, data._id, "zone", "delete", function(err, md) {
                            if (err) {
                                callback(err, md);
                            } else {
                                Config.manageArrayObject(State, data.state, data._id, "zone", "create", function(err, md) {
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
                    Config.manageArrayObject(State, data2.state, data2._id, "zone", "create", function(err, md) {
                        callback(err, data2);
                    });
                }
            });

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
                        Config.manageArrayObject(State, data2.state, data2._id, "zone", "delete", function(err, md) {
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
                },
                mandatory: {
                    exact: data.filter
                }
            },
            sort: {
                asc: 'name'
            },
            start: (page - 1) * maxRow,
            count: maxRow
        };

        var Search = Model.find()
            .keyword(options)
            .filter(options)
            .order(options)
            .deepPopulate('state.zone.country')
            .page(options, callback);

    }

};
module.exports = _.assign(module.exports, models);
sails.District = module.exports;
