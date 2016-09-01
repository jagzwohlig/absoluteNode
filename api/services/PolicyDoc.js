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
    }],
    status:{
      type:Boolean,
      default: true
    }
});

schema.plugin(deepPopulate, {
  'insuredCompany':{
    select: 'name _id'
  },
  'insuredOffice':{
    select: 'name _id'
  }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('PolicyDoc', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema,"insuredCompany insuredCompany","insuredCompany insuredCompany"));
var model = {};
module.exports = _.assign(module.exports, exports, model);
