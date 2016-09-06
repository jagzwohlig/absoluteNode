var schema = new Schema({
    name: {
      type: Schema.Types.ObjectId,
      ref: "City",
      index: true,
      required: true,
      key: "customer"
    },
    claim: {
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
    //insured officers
    causeOfLoss: {
      type: Schema.Types.ObjectId,
      ref: "CauseLoss",
      index: true,
      required: true,
      key: "assignment"
    },
    //Nature of loss
    brokerOffice: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      index: true,
      required: true,
      key: "assignment"
    },
    insurancePolicy: {
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
        type: Date
      }
    }],
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Assignment', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));

var model = {};

module.exports = _.assign(module.exports, exports, model);
