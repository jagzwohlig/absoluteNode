var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var uniqueValidator = require('mongoose-unique-validator');
var timestamps = require('mongoose-timestamp');
var validators = require('mongoose-validators');
var monguurl = require('monguurl');
require('mongoose-middleware').initialize(mongoose);

var Schema = mongoose.Schema;

<<<<<<< HEAD
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
    employee: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Employee",
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
=======
var schema = new Schema({});
>>>>>>> master

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Company', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
