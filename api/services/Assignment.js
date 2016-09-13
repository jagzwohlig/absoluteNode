var schema = new Schema({
    name: {
      type: String
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
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
    department: {
        type: Schema.Types.ObjectId,
        ref: "Department",
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
    dateOfAppointment: {
      type: Date
    },
    dateOfIntimation: {
      type: Date
    },
    intimatedLoss: {
      type: String
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      index: true,
      required: true,
      key: "assignment"
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      index: true,
      required: true,
      key: "assignment"
    },
    segment: {
      type: Schema.Types.ObjectId,
      ref: "CustomerSegment",
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
    broker: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      index: true,
      required: true,
      key: "assignment"
    },
    insurer: {
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
    policyDoc: {
      type: Schema.Types.ObjectId,
      index: true,
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
    siteNumber: {
      type: String
    },
    siteMobile: {
      type: String
    },
    siteEmail: {
      type: String
    },
    shareWith: [{
      name: {
        type: String
      },
      office: {
        type: Schema.Types.ObjectId,
        ref: "Office",
        index: true,
        required: true,
        key: "assignment"
      },
      persons: [{
        type: Schema.Types.ObjectId,
        ref: "Employee",
        index: true,
        required: true,
        key: "assignment"
      }]
    }],
    isInsured: {
      type: Boolean
    },
    postLoss: {
      type: Boolean
    },
    products: [{
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        index: true,
        required: true,
        key: "assignment"
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
          },
          'bank': {
              select: 'name _id'
          },
          'natureOfLoss': {
              select: 'name _id'
          },
          'shareWith.persons': {
              select: 'name _id'
          },
          'insuredOfficer': {
            select: 'name _id'
          },
          'products.industry': {
              select: 'name _id'
          },
          'products.category': {
              select: 'name _id'
          }
      }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Assignment', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema,"city.district.state.zone.country products.industry products.category shareWith.persons natureOfLoss insuredOfficer","city.district.state.zone.country products.industry products.category shareWith.persons natureOfLoss insuredOfficer"));

var model = {};

module.exports = _.assign(module.exports, exports, model);
