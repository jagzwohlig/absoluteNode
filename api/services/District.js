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
    state: {
        type: Schema.Types.ObjectId,
        ref: "State",
        index: true,
        required: true,
        key: "district"
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
        'state.zone.country': {
            select: 'name _id'
        }
    }

});
module.exports = mongoose.model('District', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "state.zone.country", "state.zone.country"));

var model = {};

module.exports = _.assign(module.exports, exports, model);
