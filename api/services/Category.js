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
    industry: {
        type: Schema.Types.ObjectId,
        ref: "Industry",
        index: true
    },
    status: Boolean,
    product: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Product"
        }],
        index: true,
        restrictedDelete: true
    }
});


schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Category', schema);

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
                    if (data.industry != data2.industry) {
                        Config.manageArrayObject(Industry, data2.industry, data._id, "category", "delete", function(err, md) {
                            if (err) {
                                callback(err, md);
                            } else {
                                Config.manageArrayObject(Industry, data.industry, data._id, "category", "create", function(err, md) {
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
                    Config.manageArrayObject(Industry, data2.industry, data2._id, "category", "create", function(err, md) {
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
                        Config.manageArrayObject(Industry, data2.industry, data2._id, "category", "delete", function(err, md) {
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
        }).populate("industry", "name _id").exec(callback);
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
            .populate("industry", "name _id")
            .page(options, callback);

    }

};
module.exports = _.assign(module.exports, models);
sails.Category = module.exports;
