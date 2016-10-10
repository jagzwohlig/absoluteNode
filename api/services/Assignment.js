var autoIncrement = require('mongoose-auto-increment');

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
  assignmentNumber: {
    type: Number,
    default: 0
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
    key: "assignment"
  },
  causeOfLoss: {
    type: Schema.Types.ObjectId,
    ref: "CauseLoss",
    index: true,
    // required: true,
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
    // required: true,
    key: "assignment"
  },
  insurer: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    index: true,
    // required: true,
    key: "assignment"
  },
  policyType: {
    type: Schema.Types.ObjectId,
    ref: "PolicyType",
    key: "assignment"
  },
  policyDoc: {
    type: Schema.Types.ObjectId,
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
      select: 'name countryCode _id'
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
    'products.product': {
      select: 'name _id category'
    },
    'products.product.category': {
      select: 'name _id industry'
    },
    'products.product.category.industry': {
      select: 'name _id'
    }
  }
});
autoIncrement.initialize(mongoose.connection);
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('Assignment', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "city.district.state.zone.country products.product.category.industry shareWith.persons natureOfLoss insuredOfficer", "city.district.state.zone.country products.product.category.industry shareWith.persons natureOfLoss insuredOfficer"));

var model = {
  saveData: function(data, callback) {
    var Model = this;
    var Const = this(data);
    var foreignKeys = Config.getForeignKeys(schema);
    if (data._id) {
      Model.findOne({
        _id: data._id
      }, function(err, data2) {
        if (err) {
          callback(err, data2);
        } else if (data2) {
          async.each(foreignKeys, function(n, callback) {
            if (data[n.name] != data2[n.name]) {
              Config.manageArrayObject(mongoose.models[n.ref], data2[n.name], data2._id, n.key, "delete", function(err, md) {
                if (err) {
                  callback(err, md);
                } else {
                  Config.manageArrayObject(mongoose.models[n.ref], data[n.name], data2._id, n.key, "create", callback);
                }
              });
            } else {
              callback(null, "no found for ");
            }
          }, function(err) {
            data2.update(data, {
              w: 1
            }, callback);
          });
        } else {
          callback("No Data Found", data2);
        }
      });
    } else {
      Const.save(function(err, data2) {
        if (err) {
          callback(err, data2);
        } else {
          async.each(foreignKeys, function(n, callback) {
            Config.manageArrayObject(mongoose.models[n.ref], data2[n.name], data2._id, n.key, "create", function(err, md) {
              callback(err, data2);
            });
          }, function(err) {
            if (err) {
              callback(err, data2);
            } else {
              Model.generateAssignmentNumber(data2, callback);
            }
          });
        }
      });
    }
  },
  generateAssignmentNumber: function(data, callback) {
    var Model = this;
    var newNumber = 1;
    Model.findOne({
      _id: data._id
    }).deepPopulate("company branch city.district.state.zone.country typeOfClaim natureOfSurvey", "_id assignmentGeneration").exec(function(err, data2) {
      if (err) {
        callback(err);
      } else {
        Model.findOne({
          company: data2.company._id,
          _id: {
            $ne: data._id
          }
        }).sort({
          _id: -1
        }).exec(function(err, data3) {
          if (err) {
            callback(err);
          } else {
            if (data3 && moment(data3.createdAt).month() == moment(data2.createdAt).month() && moment(data3.createdAt).year() == moment(data2.createdAt).year() && data2.company.assignmentGeneration == "Monthly") {
              newNumber = data3.assignmentNumber + 1;
            } else if (data3 && moment(data3.createdAt).year() == moment(data2.createdAt).year() && data2.company.assignmentGeneration == "Yearly") {
              newNumber = data3.assignmentNumber + 1;
            }
            data2.assignmentNumber = newNumber;
            var num = parseInt(newNumber, 10);
            len = parseInt(4, 10);
            if (isNaN(num) || isNaN(len)) {
              return n;
            }
            num = '' + num;
            while (num.length < len) {
              num = '0' + num;
            }
            data2.name = data2.city.district.state.zone.country.countryCode + data2.company.companyCode + data2.typeOfClaim.claimNumber + "-" + data2.natureOfSurvey.code + data2.branch.code + "-" + moment(new Date(data2.dateOfAppointment)).format("YY") + moment(new Date(data2.dateOfAppointment)).format("MM") + "-" + num;
            //add this here
            data2.save(function(err, data) {
              callback(err, data);
            });

          }
        });

      }
    });
  }
};

module.exports = _.assign(module.exports, exports, model);