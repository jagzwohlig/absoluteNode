var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var uniqueValidator = require('mongoose-unique-validator');
var timestamps = require('mongoose-timestamp');
var validators = require('mongoose-validators');
var monguurl = require('monguurl');
require('mongoose-middleware').initialize(mongoose);

var Schema = mongoose.Schema;

var schema = new Schema({
    insuredCompany:{
      type: Schema.Types.ObjectId,
      ref: "CustomerCompany",
      required: true,
      key: "policydoc"
    },
    insuredOffice:{
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      key: "policydoc"
    },
    listOfDocuments:[{
      policyName:{
        type:String
      },
      policyNo:{
        type:String
      },
      department:{
        type: Schema.Types.ObjectId,
        ref: "Department",
        required: true,
        key: "policydoc"
      },
      policyType:{
        type: Schema.Types.ObjectId,
        ref: "PolicyType",
        required: true,
        key: "policydoc"
      },
      insurerCompany:{
        type: Schema.Types.ObjectId,
        ref: "CustomerCompany",
        required: true,
        key: "insurercompany"
      },
      insurerOffice:{
        type: Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
        key: "insureroffice"
      },
      from:{
        type: Date
      },
      to:{
        type: Date
      },
      documentImage: {
        type: String
      }
    }]
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('PolicyDoc', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
