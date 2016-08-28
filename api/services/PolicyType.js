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
    department: {
        type: Schema.Types.ObjectId,
        ref: "Department",
        required: true,
        key: "policytype"
    },
    insurer:[{
      type: Schema.Types.ObjectId,
      ref: "CustomerCompany",
      required: true,
      key: "insurer"
    }],
    status:{
      type: Boolean,
      default:true
    }
});

schema.plugin(deepPopulate, {
  populate:{
    "department":{
      select: 'name _id'
    },
    "insurer":[{
      select: 'name _id'
    }]
  }
});

schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('PolicyType', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema,"department insurer","department insurer"));

var model = {};

module.exports = _.assign(module.exports, exports, model);
