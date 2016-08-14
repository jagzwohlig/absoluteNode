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
    status: {
        type: Boolean,
        default:true
    },
    category: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Category",
        }],
        index: true,
        restrictedDelete: true
    }
});

schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Industry', schema);

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
    deleteData: function(data, callback) {
        var Model = this;
        var Const = this(data);
        Config.checkRestrictedDelete(Model, schema, {
            _id: data._id
        }, function(err, value) {
            if (err) {
                callback(err, null);
            } else if (value) {
                console.log(value);
                Model.findOne({
                    _id: data._id
                }).exec(function(err, data2) {
                    if (err) {
                        callback("Error Occured", null);
                    } else if (data2) {
                        data2.remove({}, callback);
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
        }).exec(callback);
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
            .page(options, callback);
    }
};
module.exports = _.assign(module.exports, models);
sails.Industry = module.exports;
