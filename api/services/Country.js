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
                            data2.save(function(err, data2) {
                                callback(err, data2);
                            });
                        }
                        break;
                    case "delete":
                        {
                            _.remove(data2[key], function(n) {
                                return n == data;
                            });
                            data2.save(function(err, data2) {
                                callback(err, data2);
                            });
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
            }, data, function(err, data2) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, data2);
                }
            });
        } else {
            Const.save(function(err, data2) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, data2);
                }
            });
        }

    },
    getAll: function(data, callback) {
        var Model = this;
        var Const = this(data);
        Model.find({}, {}, {}).exec(function(err, deleted) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, deleted);
            }
        });
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
                    data.remove({}, function(err, data) {
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, data);
                        }
                    });
                });
            } else if (!value) {
                callback("Can not delete the Object as Restricted Deleted Points are available.",null);
            }
        });


    },
    getOne: function(data, callback) {
        var Model = this;
        var Const = this(data);
        Model.findOne({
            _id: data._id
        }).exec(function(err, data2) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data2);
            }
        });
    },

};
module.exports = _.assign(module.exports, models);
sails.Country = module.exports;
