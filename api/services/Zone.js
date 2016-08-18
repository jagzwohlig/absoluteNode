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
    country: {
        type: Schema.Types.ObjectId,
        ref: "Country",
        required: true,
        index: true,
        key: "zone"
    },
    state: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "State",

        }],
        index: true,
        restrictedDelete: true
    }
});

schema.plugin(deepPopulate, {
    populate: {
        'country': {
            select: 'name _id country'
        }
    }
});

schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Zone', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "country", "country"));

var model = {};

module.exports = _.assign(module.exports, exports, model);
