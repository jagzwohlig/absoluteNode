var autoIncrement = require('mongoose-auto-increment');

var schema = new Schema({
  name: {
    type: String,
    unique: true
  },
  name1: {
    type: String,
    unique: true
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
    type: Boolean,
    required: true
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    index: true,
    required: true,
    key: "assignment"
  },
  policyDepartment: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    index: true,
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
    key: "assignment"
  },
  insurerOffice: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    index: true,
    key: "assignment"
  },
  brokerOffice: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    index: true,
    required: true,
    key: "assignment"
  },
  insured: {
    type: Schema.Types.ObjectId,
    ref: "CustomerCompany",
    index: true,
    key: "assignment"
  },
  customerCompany: {
    type: Schema.Types.ObjectId,
    ref: "CustomerCompany",
    index: true,
    key: "assignment"
  },
  provisionalInsured: {
    type: String
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
    ref: "CustomerCompany",
    index: true,
    // required: true,
    key: "assignment"
  },
  insurer: {
    type: Schema.Types.ObjectId,
    ref: "CustomerCompany",
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
  },
  timeline: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: "Timeline",
    }],
    index: true
  },
  assessment: [{
    file: {
      type: String
    },
    fileName: {
      type: String
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      index: true,
      required: true,
      key: "assignment"
    }
  }],
  photos: [{
    file: {
      type: String
    },
    fileName: {
      type: String
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      index: true,
      required: true,
      key: "assignment"
    }
  }],
  docs: [{
    file: {
      type: String
    },
    fileName: {
      type: String
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      index: true,
      required: true,
      key: "assignment"
    }
  }],
  fsrs: [{
    file: {
      type: String
    },
    fileName: {
      type: String
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      index: true,
      required: true,
      key: "assignment"
    }
  }],
  templateIla: [{
    templateName: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true
    },
    forms: {
      type: []
    },
    templateIla: {
      type: Schema.Types.ObjectId,
      ref: "TemplateIla",
      required: true,
      key: "assignment"
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  templateIsr: [{
    templateName: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true
    },
    forms: {
      type: []
    },
    templateIsr: {
      type: Schema.Types.ObjectId,
      ref: "TemplateIsr",
      required: true,
      key: "assignment"
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  templateJir: [{
    templateName: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true
    },
    forms: {
      type: []
    },
    templateJir: {
      type: Schema.Types.ObjectId,
      ref: "TemplateJir",
      required: true,
      key: "assignment"
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  templateLor: [{
    templateName: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true
    },
    forms: {
      type: []
    },
    templateLor: {
      type: Schema.Types.ObjectId,
      ref: "TemplateLor",
      required: true,
      key: "assignment"
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
});

schema.plugin(deepPopulate, {

  populate: {
    'city': {
      select: 'name _id district'
    },
    'owner': {
      select: 'name _id func houseColor photo'
    },
    'owner.func': {
      select: 'name'
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
    'insurer': {
      select: 'name _id'
    },
    'company': {
      select: ''
    },
    'company.city': {
      select: 'name'
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
    },
    'assessment.employee': {
      select: 'name _id photo'
    },
    'docs.employee': {
      select: 'name _id photo'
    },
    'photos.employee': {
      select: 'name _id photo'
    },
    'causeOfLoss': {
      select: 'name _id'
    }

  }
});
autoIncrement.initialize(mongoose.connection);
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('Assignment', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "city.district.state.zone.country products.product.category.industry shareWith.persons natureOfLoss insuredOfficer owner owner.func company company.city assessment.employee docs.employee photos.employee causeOfLoss insurer ", "city.district.state.zone.country products.product.category.industry shareWith.persons natureOfLoss insuredOfficer"));

var model = {
  saveData: function (data, callback) {
    var Model = this;
    var Const = this(data);
    var foreignKeys = Config.getForeignKeys(schema);
    if (data._id) {
      Model.findOne({
        _id: data._id
      }, function (err, data2) {
        if (err) {
          callback(err, data2);
        } else if (data2) {
          async.each(foreignKeys, function (n, callback) {
            if (data[n.name] != data2[n.name]) {
              Config.manageArrayObject(mongoose.models[n.ref], data2[n.name], data2._id, n.key, "delete", function (err, md) {
                if (err) {
                  callback(err, md);
                } else {
                  Config.manageArrayObject(mongoose.models[n.ref], data[n.name], data2._id, n.key, "create", callback);
                }
              });
            } else {
              callback(null, "no found for ");
            }
          }, function (err) {
            data2.update(data, {
              w: 1
            }, callback);
          });
        } else {
          callback("No Data Found", data2);
        }
      });
    } else {
      Const.save(function (err, data2) {
        if (err) {
          callback(err, data2);
        } else {
          async.each(foreignKeys, function (n, callback) {
            Config.manageArrayObject(mongoose.models[n.ref], data2[n.name], data2._id, n.key, "create", function (err, md) {
              callback(err, data2);
            });
          }, function (err) {
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
  generateAssignmentNumber: function (data, callback) {
    var Model = this;
    var newNumber = 1;
    Model.findOne({
      _id: data._id
    }).deepPopulate("company branch city.district.state.zone.country department typeOfClaim natureOfSurvey", "_id assignmentGeneration").exec(function (err, data2) {
      if (err) {
        callback(err);
      } else {
        Model.findOne({
          company: data2.company._id,
          // branch: data2.branch._id
          _id: {
            $ne: data._id
          }
        }).sort({
          _id: -1
        }).exec(function (err, data3) {
          if (err) {
            callback(err);
          } else {
            if (data3 && moment(data3.createdAt).month() == moment(data2.createdAt).month() && moment(data3.createdAt).year() == moment(data2.createdAt).year() && data2.company.assignmentGeneration == "Monthly") {
              newNumber = data3.assignmentNumber + 1;
            } else if (data3 && moment(data3.createdAt).year() == moment(data2.createdAt).year() && data2.company.assignmentGeneration == "Yearly") {
              newNumber = data3.assignmentNumber + 1;
            }
            data2.assignmentNumber = newNumber;
            var num = parseInt(newNumber);
            len = 4;
            if (isNaN(num) || isNaN(len)) {
              return n;
            }
            num = '' + num;
            while (num.length < len) {
              num = '0' + num;
            }
            var nos = "";
            var fourthDigit = "";
            switch (data2.typeOfClaim + "-" + data2.isInsured) {
              case "true-false":
                {
                  fourthDigit = "0";
                  break;
                }
              case "true-true":
                {
                  fourthDigit = "1";
                  break;
                }
              case "false-false":
                {
                  fourthDigit = "2";
                  break;
                }
              case "false-true":
                {
                  fourthDigit = "3";
                  break;
                }
            }
            switch (data2.typeOfClaim + "-" + data2.department.name) {
              case "false-Engineering":
                {
                  nos = "40";
                  break;
                }
              case "false-Motor":
                {
                  nos = "30";
                  break;
                }
              case "false-Pre Dispatch":
                {
                  nos = "20";
                  break;
                }
              case "false-Pre Acceptance - Fire":
                {
                  nos = "10";
                  break;
                }
              case "true-Engineering":
                {
                  nos = "44";
                  break;
                }
              case "true-Fire":
                {
                  nos = "11";
                  break;
                }
              case "true-Marine Cargo":
                {
                  nos = "21";
                  break;
                }
              case "true-Misc":
                {
                  nos = "48";
                  break;
                }
              case "true-Motor":
                {
                  nos = "31";
                  break;
                }
              default:
                {
                  nos = "00";
                  break;
                }
            }
            data2.name = data2.city.district.state.zone.country.countryCode + data2.company.companyCode + fourthDigit + "-" + nos + data2.branch.code + "-" + moment(new Date(data2.dateOfAppointment)).add(5, "hours").add(30, "minutes").format("YY") + moment(new Date(data2.dateOfAppointment)).add(5, "hours").add(30, "minutes").format("MM") + "-" + num;

            data2.name1 = moment(new Date(data2.dateOfAppointment)).add(5, "hours").add(30, "minutes").format("YY") + moment(new Date(data2.dateOfAppointment)).add(5, "hours").add(30, "minutes").format("MM") + "-" + num;
            // add this here ss
            // data2.name1=subString(data2.name.length-8);
            data2.save(function (err, data) {
              callback(err, data);
            });

          }
        });

      }
    });
  },
  getAssignmentTemplate: function (type, id, callback) {
    var Model = this;

    var aggText = [];
    aggText = [{
      "$unwind": "$" + type
    }, {
      "$match": {

      }
    }];
    aggText[1]["$match"][type + "._id"] = mongoose.Types.ObjectId(id);


    Model.aggregate(aggText).exec(function (err, data) {
      if (err || data.length === 0) {
        callback(err);
      } else if (data.length > 0) {
        var data2 = _.cloneDeep(data[0][type]);
        data2.type = type;

        Model.findOne({
          _id: data[0]._id
        }).deepPopulate("city.district.state.zone.country products.product.category.industry shareWith.persons natureOfLoss insuredOfficer owner owner.func company company.city assessment.employee docs.employee photos.employee causeOfLoss insurer", "city.district.state.zone.country products.product.category.industry shareWith.persons natureOfLoss insuredOfficer").exec(function (err, data3) {
          if (err) {
            callback(err, data3);
          } else {
            data2.assignment = data3;
            callback(null, data2);
          }

        });

      }
    });
  },
  editAssignmentTemplate: function (body, callback) {
    var Model = this;
    var data2 = _.cloneDeep(body);
    delete data2.assignment;
    delete data2.type;

    var findObj = {
      _id: body.assignment
    };
    findObj[body.type + "._id"] = body._id;

    var setObj = {};
    setObj[body.type + ".$"] = data2;
    Model.update(findObj, {
      "$set": setObj
    }, callback);
  },
  getPerson: function (data, callback) {
    var Model = this;
    var Const = this(data);
    var maxRow = Config.maxRow;
    console.log(data.segment);
    var page = 1;
    if (data.page) {
      page = data.page;
    }
    var field = data.field;
    var options = {
      field: data.field,
      filters: {
        keyword: {
          fields: ['name'],
          term: data.keyword
        }
      },
      sort: {
        asc: 'name'
      },
      start: (page - 1) * maxRow,
      count: maxRow
    };

    var Search = Employee.find({
        isSBC: false
      })
      .order(options)
      .keyword(options)
      .deepPopulate("Employee").exec(function (err, company) {
        if (err) {
          callback(err, company);
        } else {
          var company2 = {};
          company2.results = _.slice(_.filter(company, function (c) {
            return c.Employee.name == data.name;
          }), 0, Config.maxRow);
          callback(err, company2);
        }

      });


  },

  search: function (data, callback) {
    var Model = this;
    var Const = this(data);
    var maxRow = Config.maxRow;
    var page = 1;
    // var name1=subString()
    if (data.page) {
      page = data.page;
    }
    var field = data.field;
    var options = {
      field: data.field,
      filters: {
        keyword: {
          fields: ['name'],
          term: data.keyword
        }
      },

      sort: {
        desc: "name1",
      },
      start: (page - 1) * maxRow,
      count: maxRow
    };
    _.each(data.filter, function (n, key) {
      if (_.isEmpty(n)) {
        n = undefined;
      }
    });
    var Search = Model.find(data.filter)

    .order(options)
      .deepPopulate()
      .keyword(options)

    .page(options, callback);

  },
};

module.exports = _.assign(module.exports, exports, model);