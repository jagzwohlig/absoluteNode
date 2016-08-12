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
    getAll: function(data, callback) {
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
