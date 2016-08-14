var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var timestamps = require('mongoose-timestamp');
require('mongoose-middleware').initialize(mongoose);
var Schema = mongoose.Schema;


var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    typeOfOffice: {
        type: Schema.Types.ObjectId,
        ref: "TypeOfOffice",
        required: true,
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },

    city: {
        type: Schema.Types.ObjectId,
        ref: "City",
        index: true,
        required: true
    },
    branch: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Branch",
        }],
        index: true,
        restrictedDelete: true
    },
    phone: String,
    fax: String,
    email: String,
    status: {
        type: Boolean,
        default: true
    },
});

schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Office', schema);

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
                    if (data.typeOfOffice != data2.typeOfOffice || data.company != data2.company || data.city != data2.city) {
                        async.parallel([
                            function(callback) {
                                if (data.typeOfOffice != data2.typeOfOffice) {
                                    Config.manageArrayObject(TypeOfOffice, data2.typeOfOffice, data2._id, "office", "delete", function(err, md) {
                                        if (err) {
                                            callback(err, md);
                                        } else {
                                            Config.manageArrayObject(TypeOfOffice, data2.typeOfOffice, data2._id, "office", "create", function(err, md) {
                                                if (err) {
                                                    callback(err, md);
                                                } else {

                                                }
                                            });
                                        }
                                    });
                                } else {
                                    callback("null", "no found");
                                }

                            },
                            function(callback) {
                                if (data.typeOfOffice != data2.typeOfOffice) {
                                    Config.manageArrayObject(Company, data2.company, data2._id, "office", "delete", function(err, md) {
                                        if (err) {
                                            callback(err, md);
                                        } else {
                                            Config.manageArrayObject(Company, data2.company, data2._id, "office", "create", function(err, md) {
                                                if (err) {
                                                    callback(err, md);
                                                } else {

                                                }
                                            });
                                        }
                                    });
                                } else {
                                    callback("null", "no found");
                                }

                            },
                            function(callback) {
                                if (data.typeOfOffice != data2.typeOfOffice) {
                                    Config.manageArrayObject(City, data2.city, data2._id, "office", "delete", function(err, md) {
                                        if (err) {
                                            callback(err, md);
                                        } else {
                                            Config.manageArrayObject(City, data2.city, data2._id, "office", "office", "create", function(err, md) {
                                                if (err) {
                                                    callback(err, md);
                                                } else {

                                                }
                                            });
                                        }
                                    });
                                } else {
                                    callback("null", "no found");
                                }
                            }
                        ], function(err, results) {
                            data2.update(data, {
                                w: 1
                            }, callback);
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
                    async.parallel([
                        function(callback) {
                            Config.manageArrayObject(TypeOfOffice, data2.typeOfOffice, data2._id, "office", "create", function(err, md) {
                                callback(err, data2);
                            });
                        },
                        function(callback) {
                            Config.manageArrayObject(Company, data2.company, data2._id, "office", "create", function(err, md) {
                                callback(err, data2);
                            });
                        },
                        function(callback) {
                            Config.manageArrayObject(City, data2.city, data2._id, "office", "create", function(err, md) {
                                callback(err, data2);
                            });
                        }
                    ], function(err, results) {
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
                        async.parallel([
                            function(callback) {
                                Config.manageArrayObject(TypeOfOffice, data2.typeOfOffice, data2._id, "office", "delete", function(err, md) {
                                    callback(err, data2);
                                });
                            },
                            function(callback) {
                                Config.manageArrayObject(Company, data2.company, data2._id, "office", "delete", function(err, md) {
                                    callback(err, data2);
                                });
                            },
                            function(callback) {
                                Config.manageArrayObject(City, data2.city, data2._id, "office", "delete", function(err, md) {
                                    callback(err, data2);
                                });
                            }
                        ], function(err, results) {
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
        }).populate("country", "name _id").exec(callback);
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

        console.log(data.filter);
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
            .populate("country", "name _id")
            .page(options, callback);

    }

};

module.exports = _.assign(module.exports, models);
sails.Office = module.exports;
