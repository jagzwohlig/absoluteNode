var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var uniqueValidator = require('mongoose-unique-validator');
var timestamps = require('mongoose-timestamp');
var validators = require('mongoose-validators');
var monguurl = require('monguurl');
require('mongoose-middleware').initialize(mongoose);

var Schema = mongoose.Schema;

var schema = new Schema({
    firstName: {
        type: String,
        required: true,
        // unique: true,
        // uniqueCaseInsensitive: true
    },
    lastName: {
        type: String,
        required: true,
        // unique: true,
        // uniqueCaseInsensitive: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true,
        key: "employee"
    },
    salutation: {
        type: String
    },
    branch: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      key: "employee"
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: "Department",
        required: true,
        key: "employee"
    },
    func: {
        type: Schema.Types.ObjectId,
        ref: "Func",
        required: true,
        key: "employee"
    },
    postedAt: {
        type: Schema.Types.ObjectId,
        ref: "Office",
        required: true,
        key: "employee"
    },
    grade: {
        type: Schema.Types.ObjectId,
        ref: "Grade",
        required: true,
        key: "employee"
    },
    houseColor: {
      type: String
    },
    employeeCode: {
      type: String
    },
    photo: {
      type: String
    },
    CTCAmount: {
      type: Number
    },
    CTCFrom: {
      type: Date
    },
    CTCTo: {
      type: Date
    },
    bank: {
      type: String
    },
    accountNumber: {
      type: String
    },
    branchName: {
      type: String
    },
    accountName: {
      type: String
    },
    neftCode: {
      type: String
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: "City",
        index: true,
        required: true
    },
    address: String,
    pincode: String,
    lat: {
        type: Number,
    },
    lng: {
        type: Number,
    },
    officeNumber: {
      type: Number
    },
    officeMobile: {
      type: Number
    },
    officeEmail: {
      type: String
    },
    homeNumber: {
      type: Number
    },
    mobile: {
      type: Number
    },
    email: {
      type: String
    },
    extension: {
      type: Number
    },
    birthDate: {
      type: Date
    },
    marriageDate: {
      type: Date
    },
    joiningDate: {
      type: Date
    },
    leavingDate: {
      type: Date
    },
    isSBC: {
      type: Boolean
    },
    isField: {
      type: Boolean
    },
    isSurveyor: {
      type: Boolean
    },
    validUpto:{
      type: String
    },
    licence: {
      type: String
    },
    iiislaDocument: {
      type: String
    },
    EmployeeDocument:{
      type: String
    }
});

schema.plugin(deepPopulate, {});
// schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Employee', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
