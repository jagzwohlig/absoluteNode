var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var uniqueValidator = require('mongoose-unique-validator');
var timestamps = require('mongoose-timestamp');
var validators = require('mongoose-validators');
var monguurl = require('monguurl');
require('mongoose-middleware').initialize(mongoose);

var Schema = mongoose.Schema;

var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        index: true,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
});

schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(deepPopulate, {
    populate: {
        'category': {
            select: 'name _id industry'
        },
        'category.industry': {
            select: 'name _id'
        }
    }
});
module.exports = mongoose.model('Product', schema);


var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "category.industry", "category.industry"));

var model = {};

module.exports = _.assign(module.exports, exports, model);
