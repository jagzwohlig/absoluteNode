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
    district: {
        type: Schema.Types.ObjectId,
        ref: "District",
        index: true,
        required: true,
        key:"city"
    },
    company: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Company",
        }],
        index: true,
        restrictedDelete: true
    },
    office: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Office",
        }],
        index: true,
        restrictedDelete: true
    },
    stdCode: Number,
    timezone: {
        type: Number,
        default: 5.5
    }
});

schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(deepPopulate, {

    populate: {
        'district': {
            select: 'name _id state'
        },
        'district.state': {
            select: 'name _id zone'
        },
        'district.state.zone': {
            select: 'name _id country'
        },
        'district.state.zone.country': {
            select: 'name _id'
        }
    }

});
module.exports = mongoose.model("City", schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema,"district.state.zone.country","district.state.zone.country"));

var model = {};

module.exports = _.assign(module.exports, exports, model);
