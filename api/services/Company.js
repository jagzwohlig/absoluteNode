var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
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
    shortName: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    logo: String,
    accountName: String,
    accountNumber: String,
    neftCode: String,
    bankName: String,
    branchName: String,
    serviceTax: String,
    pan: String,
    cin: String,
    tan: String,
    services: String,
    website: String,
    status: {
        type: Boolean,
        default: true
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: "City",
        index: true,
        required: true
    },
    address: String,
    pincode: String,
    phone: String,
    fax: String,
    email: String,
    office: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Office",
        }],
        index: true,
        restrictedDelete: true
    },
    fieldOfficeActivity: {
        type: Number,
    },
    backOfficeActivity: {
        type: Number,
    },
    reimbursement: {
        type: Number,
    },
    reciept: {
        type: Number,
    },
    journalVoucher: {
        type: Number,
    },
    lat: {
        type: Number,
    },
    lng: {
        type: Number,
    },
});

schema.plugin(deepPopulate, {

    populate: {
        'city': {
            select: 'name _id district'
        },
        'city.district': {
            select: 'name _id state'
        },
        'city.district.state': {
            select: 'name _id zone'
        },
        'city.district.state.zone': {
            select: 'name _id country'
        },
        'city.district.state.zone.country': {
            select: 'name _id'
        }
    }

});

schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Company', schema);
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
                    if (data.city != data2.city) {
                        Config.manageArrayObject(City, data2.city, data._id, "company", "delete", function(err, md) {
                            if (err) {
                                callback(err, md);
                            } else {
                                Config.manageArrayObject(City, data.city, data._id, "company", "create", function(err, md) {
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
                    Config.manageArrayObject(City, data2.city, data2._id, "company", "create", function(err, md) {
                        callback(err, data2);
                    });
                }
            });

        }

    },
    getOne: function(data, callback) {
        var Model = this;
        var Const = this(data);
        Model.findOne({
            _id: data._id
        }).deepPopulate('city.district.state.zone.country').exec(callback);
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
                        Config.manageArrayObject(City, data2.city, data2._id, "company", "delete", function(err, md) {
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
            .populate('city')
            .page(options, callback);

    }

};
module.exports = _.assign(module.exports, models);
sails.Company = module.exports;
