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
    shortName: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    customerSegment:{
      type: Schema.Types.ObjectId,
      ref: "CustomerSegment",
      required: true,
      key: "customercompany"
    },
    customer: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Customer",
        }],
        index: true,
        restrictedDelete: true
    },
});

schema.plugin(deepPopulate, {
  populate: {
      'CustomerSegment': {
          select: 'name _id'
      }
  }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('TransferOfficer', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema,"customerSegment","customerSegment"));
var model = {};
module.exports = _.assign(module.exports, exports, model);