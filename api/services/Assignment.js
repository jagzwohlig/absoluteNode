var schema = new Schema({
    name: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      index: true,
      required: true,
      key: "assignment"
    },
    typeOfClaim: {
        type: Schema.Types.ObjectId,
        ref: "Claims",
        index: true,
        required: true,
        key: "assignment"
    },
    natureOfSurvey: {
      type: Schema.Types.ObjectId,
      ref: "SurveyCode",
      index: true,
      required: true,
      key: "assignment"
    },
    branch: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      index: true,
      required: true,
      key: "assignment"
    },
    appointment: {
      type: String
    },
    dateOfIntimation: {
      type: Date
    },
    intimatedLoss: {
      type: String
    },
    appointedBy: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      index: true,
      required: true,
      key: "assignment"
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      index: true,
      required: true,
      key: "assignment"
    },
    insuredOffice: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      index: true,
      required: true,
      key: "assignment"
    },
    insuredOfficer: {
        type: Schema.Types.ObjectId,
        ref: "Officer",
        index: true,
        required: true,
        key: "assignment"
    },
    causeOfLoss: {
      type: Schema.Types.ObjectId,
      ref: "CauseLoss",
      index: true,
      required: true,
      key: "assignment"
    },
    natureOfLoss: [{
      type: Schema.Types.ObjectId,
      ref: "NatureLoss",
      index: true,
      required: true,
      key: "assignment"
    }],
    brokerOffice: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      index: true,
      required: true,
      key: "assignment"
    },
    policyType: {
      type: Schema.Types.ObjectId,
      ref: "PolicyType",
      index: true,
      required: true,
      key: "assignment"
    },
    siteContact: {
      type: String
    },
    shareWith: [{
      type: Schema.Types.ObjectId,
      ref: "Employee",
      index: true,
      required: true,
      key: "assignment"
    }],
    products: [{
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        index: true,
        required: true,
        key: "assignment"
      },
      name:{
        type: String
      },
      item: {
        type: String
      }
    }],
    invoice: [{
      invoiceNumber: {
        type: String
      },
      invoiceNumberDate: {
        type: Date
      }
    }],
    LRs: [{
      lrNumber: {
        type: String
      },
      lrNumberDate: {
        type: Date
      }
    }],
    vehicleNumber: [{
      vehicleNumber: {
        type: String
      }
    }],
    others: [{
      locationID: {
        type: String
      },
      productID: {
        type: String
      }
    }],
});

schema.plugin(deepPopulate, {
  'natureOfLoss': {
      select: 'name _id'
  },
  'shareWith': {
      select: 'name _id'
  },
  'insuredOfficer': {
    select: 'name _id'
  }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Assignment', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema,"natureOfLoss shareWith insuredOfficer","natureOfLoss shareWith insuredOfficer"));

var model = {};

module.exports = _.assign(module.exports, exports, model);
