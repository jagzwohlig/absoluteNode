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
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        index: true
    },
    status: Boolean
});

schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Product', schema);

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
        Config.checkRestrictedDelete(Model, {
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
sails.Product = module.exports;
