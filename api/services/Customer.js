var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var uniqueValidator = require('mongoose-unique-validator');
var timestamps = require('mongoose-timestamp');
var validators = require('mongoose-validators');
var monguurl = require('monguurl');
require('mongoose-middleware').initialize(mongoose);

var Schema = mongoose.Schema;

var schema = new Schema({
  customerSegment: {
      type: Schema.Types.ObjectId,
      ref: "Customersegment",
      required: true,
      key: "customer"
  },
  typeOfOffice: {
      type: Schema.Types.ObjectId,
      ref: "TypeOfOffice",
      required: true,
      key: "customer"
  },
  customerCompany: {
      type: Schema.Types.ObjectId,
      ref: "Customercompany",
      required: true,
      key: "customer"
  },
    creditLimit: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    issueOffice:{
      type: Boolean
    },
    customerName:{
      type: String
    },
    officeCode:{
      type: String
    },
    category: {
      type: String
    },
    creditLimitAlloted: {
      type: String
    },
    creditLimitExhausted: {
      type: String
    },
    creditLimitPending: {
      type: String
    },
    direct: {
      type: String
    },
    phone1: {
      type: String
    },
    phone2: {
      type: String
    },
    phone3: {
      type: String
    },
    email: {
      type: String
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: "City",
        index: true,
        required: true
    },
    address: {
      type: String
    },
    pincode: {
      type: String
    },
    lat: {
        type: Number,
    },
    lng: {
        type: Number,
    },
    status: {
      type: Boolean,
      default: true
    }

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
module.exports = mongoose.model('Customer', schema);

var exports = _.cloneDeep(require("sails-wohlig-service","city.district.state.zone.country","city.district.state.zone.country")(schema));

var model = {};

module.exports = _.assign(module.exports, exports, model);
