var autoIncrement = require('mongoose-auto-increment');
var objectid = require("mongodb").ObjectID;
var schema = new Schema({
  sixthDigit: {
    type: String
  },
  dateMOY: {
    type: String
  },
  brachCode: {
    type: String
  },
  billingPeriod: {
    type: String
  },
  fourthDigit: {
    type: String
  },
  surveyDate: {
    type: Date
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    index: true
  },
  survey: [{
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      index: true
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Declined"],
      default: "Pending"
    },
    timestamp: {
      type: Date,
      default: Date.now()
    },
    completionTime: {
      type: Date
    },
    declineTime: {
      type: Date
    }
  }],
  timelineStatus: {
    type: String,
    enum: ["Pending", "Survey Pending", "Survey Assigned", "ILA Pending", "LOR Pending", "Dox Pending", "Assessment Pending", "Consent Pending", "JIR Pending", "Dispatched"],
    default: "Survey Pending"
  },
  brokerClaimId: {
    type: String
  },
  insurerClaimId: {
    type: String
  },
  insuredClaimId: {
    type: String
  },
  name: {
    type: String,
    unique: true
  },
  name1: {
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
  salvage: {
    type: Schema.Types.ObjectId,
    ref: "Salvage",
    index: true
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
  dateOfLoss: {
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
    index: true
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
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      index: true,
      required: true,
      key: "assignment"
    },
    invoiceList: [{
      description: String,
      quantity: Number,
      unit: String,
      rate: Number,
      amount: Number
    }],
    subTotal: {
      type: Number
    },
    tax: [{
      taxName: {
        type: Schema.Types.ObjectId,
        ref: "Tax",
        index: true
      },
      amount: Number
    }],
    roundOff: {
      type: Number
    },
    grandTotal: {
      type: Number
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
  locationArr: [{
    locationString: {
      type: String
    },
    date: {
      type: Date
    }
  }],
  product: [{
    product: {
      type: String
    },
    date: {
      type: Date
    }
  }],
  status: {
    type: Boolean,
    default: false
  },
  ilaStatus: {
    type: Boolean,
    default: true
  },
  lorStatus: {
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
  jir: [{
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
    'assignedTo': {
      select: 'name _id'
    },
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
    'fsrs.employee': {
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

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "city.district.state.zone.country products.product.category.industry shareWith.persons natureOfLoss insuredOfficer owner owner.func company company.city assessment.employee docs.employee fsrs.employee photos.employee causeOfLoss insurer assignedTo", "city.district.state.zone.country products.product.category.industry shareWith.persons natureOfLoss insuredOfficer assignedTo"));

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

    getNearestSurveyor: function (data, callback) {
      Employee.find({
        $or: [{
          isSurveyor: true
        }, {
          isField: true
        }],
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [data.lng, data.lat]
            }
          }
        }
      }, {
        // name: 1,
        // photo: 1,
        // employeeCode: 1,
        officeEmail: 1
      }).limit(10).lean().exec(function (err, data2) {
        if (err) {
          callback(err, null);
        } else {
          callback(err, data2);
        }
      });
    },

    getNearestSurveyor2: function (data, callback) {
      // console.log("AAAAAAA", data);
      Employee.find({
        _id: {
          $in: data.ids
        }
      }, {
        name: 1,
        photo: 1,
        employeeCode: 1,
        officeEmail: 1
      }).lean().exec(function (err, data2) {
        // console.log("Data2", data2);
        if (err) {
          callback(err, null);
        } else {
          callback(err, data2);
        }
      });
    },
    generateAssignmentNumberForAll: function (data, callback) {
      Assignment.find({}).sort({
        _id: 1
      }).exec(function (err, data) {
        if (err) {
          callback(err, null);
        } else {
          async.eachSeries(data, function (n, callback1) {
            console.log("NNNNN", n);
            Assignment.generateAssignmentNumber(n, function (err, data3) {
              if (err) {
                callback1(err, null)
              } else {
                console.log(data3);
                callback1(null, data3);
              }
            });

          }, function (err, data2) {
            if (err) {
              callback(err, data2);
            } else {
              callback(null, data2);
            }
          });
        }
      })
    },

    generateAssignmentNumber: function (data, callback) {
      Branch.getBillingType(data.branch, function (err, branchDetails) {
        if (err) {
          callback(err, null);
        } else if (branchDetails) {
          // console.log("AAAAAAAAAA", branchDetails);
          data.dateMOY = branchDetails.seriesFormat;
          data.brachCode = branchDetails.code;
          data.fourthDigit = Assignment.getFourthDigit(data);
          // console.log("Data Before ", data.fourthDigit);
          Assignment.getSixthDigit(data, function (err, sixthDigit) {
            if (err) {
              callback(err, null)
            } else {
              data.sixthDigit = sixthDigit;
              data.billingPeriod = Assignment.getDate(data);
              Assignment.find({
                dateMOY: data.dateMOY,
                brachCode: data.brachCode,
                fourthDigit: data.fourthDigit,
                nos: data.nos,
                billingPeriod: data.billingPeriod
              }).sort({
                assignmentNumber: -1
              }).exec(function (err, assignmentNo) {
                if (err) {
                  callback(err, null);
                } else if (assignmentNo.length == 0) {
                  data.assignmentNumber = 1;
                  var num = data.assignmentNumber;
                  num = '' + num;
                  while (num.length < 4) {
                    num = '0' + num;
                  }
                  data.name = "IN1" + data.fourthDigit + "-" + sixthDigit + data.brachCode + "-" + moment(new Date(data.dateOfAppointment)).add(5, "hours").add(30, "minutes").format("YY") + moment(new Date(data.dateOfAppointment)).add(5, "hours").add(30, "minutes").format("MM") + "-" + num;
                  data.save(function (err, data) {
                    if (err) {
                      callback(err, data);
                    } else {
                      callback(null, data);
                    }
                  });
                } else {
                  data.assignmentNumber = assignmentNo[0].assignmentNumber + 1
                  var num = data.assignmentNumber;
                  num = '' + num;
                  while (num.length < 4) {
                    num = '0' + num;
                  }
                  data.name = "IN1" + data.fourthDigit + "-" + sixthDigit + data.brachCode + "-" + moment(new Date(data.dateOfAppointment)).add(5, "hours").add(30, "minutes").format("YY") + moment(new Date(data.dateOfAppointment)).add(5, "hours").add(30, "minutes").format("MM") + "-" + num;
                  data.save(function (err, data) {
                    if (err) {
                      callback(err, data);
                    } else {
                      callback(null, data);
                    }
                  });

                }
              });
            }
          });
        } else {
          callback(err, null);
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
          }).deepPopulate("city.district.state.zone.country products.product.category.industry shareWith.persons natureOfLoss insuredOfficer owner owner.func company company.city assessment.employee docs.employee fsrs.employee photos.employee causeOfLoss insurer", "city.district.state.zone.country products.product.category.industry shareWith.persons natureOfLoss insuredOfficer").exec(function (err, data3) {
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
      var timelStatus = body.assignment.timelineStatus;
      if (body.type == "templateIla") {
        timelStatus = "LOR Pending";
      } else if (body.type == "templateLor") {
        timelStatus = "Dox Pending";
      }
      var $scope = {};
      var data2 = _.cloneDeep(body);
      delete data2.assignment;
      $scope.data = data2;

      _.each($scope.data.forms, function (n) {
        _.each(n.items, function (m) {
          if (m.value == "Date") {
            m.field = moment(m.field).format('ddd, MMM Do, YYYY');
          }
        });
      });
      var findObj = {
        _id: body.assignment
      };
      findObj[body.type + "._id"] = body._id;

      var setObj = {};
      setObj[body.type + ".$"] = data2;
      Model.update(findObj, {
        "$set": setObj,
        timelineStatus: timelStatus
      }, function (err, data3) {
        if (err) {
          callback(err, null);
        } else {
          $scope.assignment = findObj._id;
          // console.log("...................................$scope",$scope);
          Config.generatePdf("pdf/abs-synopsis", $scope, callback);
        }
      });
    },
    getPerson: function (data, callback) {
      var Model = this;
      var Const = this(data);
      var maxRow = Config.maxRow;
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
        .deepPopulate("owner insuredOffice insurerOffice city department")
        .keyword(options)

        .page(options, callback);

    },
    updateSurveyor: function (data, callback) {
      Assignment.update({
        _id: data._id
      }, {
        timelineStatus: "Survey Assigned",
        $push: {
          survey: data.survey
        }
      }).exec(function (err, found) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else if (found) {
          console.log("Found", found);
          callback(null, found);
        } else {
          callback(null, found);
        }
      });
    },
    //    TASK LIST
    taskList: function (data, callback) {
      Assignment.aggregate([{
        $lookup: {
          from: "cities",
          localField: "city",
          foreignField: "_id",
          as: "city"
        }
      }, {
        $unwind: "$city"
      }, {
        $lookup: {
          from: "districts",
          localField: "city.district",
          foreignField: "_id",
          as: "city.districts"
        }
      }, {
        $unwind: "$city.districts"
      }, {
        $lookup: {
          from: "states",
          localField: "city.districts.state",
          foreignField: "_id",
          as: "city.districts.states"
        }
      }, {
        $unwind: "$city.districts.states"
      }, {
        $lookup: {
          from: "zones",
          localField: "city.districts.states.zone",
          foreignField: "_id",
          as: "city.districts.states.zones"
        }
      }, {
        $unwind: "$city.districts.states.zones"
      }, {
        $lookup: {
          from: "countries",
          localField: "city.districts.states.zones.country",
          foreignField: "_id",
          as: "city.districts.states.zones.country"
        }
      }, {
        $unwind: "$city.districts.states.zones.country"
      }, {
        $unwind: "$survey"
      }, {
        $match: {
          "survey.employee": objectid(data.id),
          "survey.status": "Pending"
        }
      }, {
        $limit: 30
      }, {
        $project: {
          name: 1,
          surveyDate: 1,
          address: 1,
          city: "$city.name",
          district: "$city.districts.name",
          state: "$city.districts.states.name",
          zone: "$city.districts.states.zones.name",
          country: "$city.districts.states.zones.country.name",
          pincode: 1,
          siteEmail: 1,
          siteMobile: 1,
          siteNumber: 1,
          survey: 1
        }
      }], function (err, data1) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, data1);
        }
      });
    },

    // Declined
    decline: function (data, callback) {
      Assignment.update({
        "survey._id": data.surveyId
      }, {
        $set: {
          "survey.$.status": "Declined",
          "survey.$.declineTime": Date.now(),
          timelineStatus: "Survey Pending",
        }
      }).exec(function (err, found) {

        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          var newChat = {};
          newChat.employee = data.empId,
            newChat.type = "Normal",
            newChat.title = "Has Declined the Assignment",
            newChat.message = data.message
          Timeline.update({
            assignment: data.assignId
          }, {
            $push: {
              chat: newChat
            }
          }).exec(function (err, data) {
            if (err) {
              red("Decline");
              callback(err, null);
            } else {
              green("Decline");
              callback(null, data);
            }
          });
        }
      });
    },

    // Doc  Photos JIR

    mobileSubmit: function (data, callback) {
      console.log("Data ", data);
      var fileArray = [];
      var docCount = 0;
      if (!_.isEmpty(data.doc)) {
        _.each(data.doc, function (n) {
          n.fileName = Date.now(),
            n.employee = data.empId,
            fileArray[docCount] = {
              attachment: n.file,
              message: "Document"
            },
            docCount = docCount + 1;
        });
      }
      if (!_.isEmpty(data.photos)) {
        console.log("In Photos", data.photos);
        _.each(data.photos, function (n) {
          n.fileName = Date.now(),
            n.employee = data.empId,
            fileArray[docCount] = {
              attachment: n.file,
              message: "Photo"
            },
            docCount = docCount + 1;
        });
      }
      if (!_.isEmpty(data.jir)) {
        console.log("In JIR", data.jir);

        _.each(data.jir, function (n) {
          n.fileName = Date.now(),
            n.employee = data.empId,
            fileArray[docCount] = {
              attachment: n.file,
              message: "JIR"
            },
            docCount = docCount + 1;
        });
      }
      Assignment.update({
        "survey._id": data.surveyId
      }, {
        timelineStatus: "ILA Pending",
        $set: {
          "survey.$.status": "Completed",
          // "survey.$.dateOfSurvey": new Date(data.dateOfSurvey),
          "survey.$.completionTime": Date.now()
          // "survey.$.surveyEndTime":new Date(data.surveyEndTime),
          // "survey.$.surveyStartTime": new Date(data.surveyStartTime)
        },
        $push: {
          docs: {
            $each: data.doc
          },
          photos: {
            $each: data.photos
          },
          jir: {
            $each: data.jir
          }
        },
      }).exec(function (err, found) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          var newChat = {};
          newChat.employee = data.empId,
            newChat.type = "SurveyDone",
            newChat.title = "Survey Done",
            newChat.surveyEndTime = new Date(data.endTime),
            newChat.surveyStartTime = new Date(data.startTime),
            newChat.surveyDate = new Date(data.surveyDate),
            newChat.address = data.address,
            _.each(fileArray, function (n) {
              n.employee = data.empId,
                n.type = "Normal",
                n.title = "Survey Done";
            })
          console.log("Final Count", fileArray);
          fileArray.push(newChat);
          Timeline.update({
            assignment: data.assignId
          }, {
            $push: {
              chat: {
                $each: fileArray
              }
            }
          }).exec(function (err, data) {
            if (err) {
              callback(err, null);
            } else {
              green("Success");
              callback(null, data);
            }
          });
        }
      });
    },
    getFourthDigit: function (data) {
      var fourthDigit = "";
      switch (data.typeOfClaim + "-" + data.isInsured) {
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
      return fourthDigit;
    },
    getDate: function (data) {
      if (data.dateMOY == "yearly") {
        var newDate = "";
        var currentDateMonth = moment(new Date(data.dateOfAppointment)).add(5, "hours").add(30, "minutes").format("MM");
        green(currentDateMonth);
        if (currentDateMonth > 3) {
          newDate = moment(new Date(data.dateOfAppointment)).add(5, "hours").add(30, "minutes").add(1, "year").format("YYYY");
          console.log("New Date", newDate);
        } else {
          newDate = moment(new Date(data.dateOfAppointment)).add(5, "hours").add(30, "minutes").format("YYYY");
          console.log("New Date", newDate);
        }
        return newDate;
      } else {
        var currentDateMonth = moment(new Date(data.dateOfAppointment)).add(5, "hours").add(30, "minutes").format("MM-YYYY");
        console.log("New Date", currentDateMonth);
        return currentDateMonth;
      }
    },

    getSixthDigit: function (data, callback) {
      Department.findOne({
        _id: data.department
      }, {
        name: 1
      }).exec(function (err, data2) {
        if (err) {
          return 0;
        } else {
          var sixthDigit = "";
          switch (data.typeOfClaim + "-" + data2.name) {
            case "false-Engineering":
              {
                sixthDigit = "40";
                break;
              }
            case "false-Motor":
              {
                sixthDigit = "30";
                break;
              }
            case "false-Pre Dispatch":
              {
                sixthDigit = "20";
                break;
              }
            case "false-Pre Acceptance - Fire":
              {
                sixthDigit = "10";
                break;
              }
            case "true-Engineering":
              {
                sixthDigit = "44";
                break;
              }
            case "true-Fire":
              {
                sixthDigit = "11";
                break;
              }
            case "true-Marine Cargo":
              {
                sixthDigit = "21";
                break;
              }
            case "true-Misc":
              {
                sixthDigit = "48";
                break;
              }
            case "true-Motor":
              {
                sixthDigit = "31";
                break;
              }
            default:
              {
                sixthDigit = "00";
                break;
              }
          }
          callback(null, sixthDigit);
        }
      })
    },

    getAll: function (data, callback) {
      if (data.timelineStatus == "All") {
        data.timelineStatus = {
          $regex: ''
        }
      }

      if (data.ownerStatus == "My files") {
        var ownerStatus = {
          'owner': objectid(data.owner)
        };
      } else if (data.ownerStatus == "Shared with me") {

      } else if (data.ownerStatus == "All files") {
        var ownerStatus = undefined
      }
      console.log("owner", data.ownerStatus, ownerStatus);

      var pageStartFrom = (data.pagenumber - 1) * data.pagelimit;
      async.parallel([

        //get assignment
        function (callback) {
          Assignment.aggregate([{
            $lookup: {
              from: "cities",
              localField: "city",
              foreignField: "_id",
              as: "city"
            }
          }, {
            $unwind: "$city"
          }, {
            $lookup: {
              from: "customers",
              localField: "insurerOffice",
              foreignField: "_id",
              as: "insurer"
            }
          }, {
            $unwind: "$insurer"
          }, {
            $lookup: {
              from: "customers",
              localField: "insuredOffice",
              foreignField: "_id",
              as: "insurerd"
            }
          }, {
            $unwind: "$insurerd"
          }, {
            $lookup: {
              from: "departments",
              localField: "department",
              foreignField: "_id",
              as: "department"
            }
          }, {
            $unwind: "$department"
          }, {
            $match: {
              $and: [{
                timelineStatus: data.timelineStatus,
                ownerStatus,
              }]

            }
          }, {
            $sort: {
              createdAt: -1
            }
          }, {
            $skip: parseInt(pageStartFrom)
          }, {
            $limit: data.pagelimit
          }, {
            $project: {
              _id: 1,
              name: 1,
              insurerName: "$insurer.name",
              insurerdName: "$insurerd.name",
              depratment: "$department.name",
              city: "$city.name",
              intimatedLoss: 1,
              timelineStatus: 1,
              status: 1
            }
          }], function (err, data1) {
            if (err) {
              console.log("err", err);
              callback(null, data1);
            } else {
              callback(null, data1);
            }
          });
        },

        //get all assignment count
        function (callback) {
          Assignment.aggregate([{
            $lookup: {
              from: "cities",
              localField: "city",
              foreignField: "_id",
              as: "city"
            }
          }, {
            $unwind: "$city"
          }, {
            $lookup: {
              from: "customers",
              localField: "insurerOffice",
              foreignField: "_id",
              as: "insurer"
            }
          }, {
            $unwind: "$insurer"
          }, {
            $lookup: {
              from: "customers",
              localField: "insuredOffice",
              foreignField: "_id",
              as: "insurerd"
            }
          }, {
            $unwind: "$insurerd"
          }, {
            $lookup: {
              from: "departments",
              localField: "department",
              foreignField: "_id",
              as: "department"
            }
          }, {
            $unwind: "$department"
          }, {
            $group: {
              _id: null,
              count: {
                $sum: 1
              }
            }
          }], function (err, data1) {
            if (err) {
              console.log("err", err);
              callback(null, data1);
            } else {
              callback(null, data1);
            }
          });
        },

      ], function (err, data3) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          if (_.isEmpty(data3[0])) {
            callback(null, []);
          } else {
            var data4 = {};
            data4.results = data3[0];
            data4.total = data3[1][0].count;
            callback(null, data4);
          }
        }
      });

    },


    assignmentFilter: function (data, callback) {
      var Model = this;
      var maxRow = Config.maxRow;
      var pagestartfrom = (data.page - 1) * maxRow;
      var aggText = [];
      var arr = [];
      if (data.name !== "") {
        {
          var name = {
            'name': {
              $regex: data.name,
              $options: 'i'
            }
          }
          arr.push(name);
        }
      }
      if (data.owner !== "") {
        var owner = {
          'owner.name': {
            $regex: data.owner,
            $options: 'i'
          }
        }
        arr.push(owner);
      }
      if (data.city !== "") {
        var city = {
          'city.name': {
            $regex: data.city,
            $options: 'i'
          }
        }
        arr.push(city);
      }
      if (data.department !== "") {
        var department = {
          'department.name': {
            $regex: data.department,
            $options: 'i'
          }
        }
        arr.push(department);
      }
      if (data.insurer !== "") {
        var insurer = {
          'insurer.name': {
            $regex: data.insurer,
            $options: 'i'
          }
        }
        arr.push(insurer);
      }
      if (data.insured !== "") {
        var insured = {
          'insured.name': {
            $regex: data.insured,
            $options: 'i'
          }
        }
        arr.push(insured);
      }
      if (data.intimatedLoss !== "") {
        var intimatedLoss = {
          'intimatedLoss': {
            $regex: data.intimatedLoss,
            $options: 'i'
          }
        }
        arr.push(intimatedLoss);
      }
      if (data.timelineStatus !== "") {
        var timelineStatus = {
          'timelineStatus': {
            $regex: data.timelineStatus,
            $options: 'i'
          }
        }
        arr.push(timelineStatus);
      }

      green(arr);


      aggText = [{
          $lookup: {
            from: "employees",
            localField: "owner",
            foreignField: "_id",
            as: "owner"
          }
        }, {
          $unwind: "$owner"
        }, {
          $lookup: {
            from: "cities",
            localField: "city",
            foreignField: "_id",
            as: "city"
          }
        }, {
          $unwind: "$city"
        }, {
          $lookup: {
            from: "customers",
            localField: "insurerOffice",
            foreignField: "_id",
            as: "insurer"
          }
        }, {
          $unwind: "$insurer"
        }, {
          $lookup: {
            from: "customers",
            localField: "insuredOffice",
            foreignField: "_id",
            as: "insured"
          }
        }, {
          $unwind: "$insured"
        }, {
          $lookup: {
            from: "departments",
            localField: "department",
            foreignField: "_id",
            as: "department"
          }
        }, {
          $unwind: "$department"
        }, {
          $match: {
            $and: arr
          }
        },
        {
          $skip: parseInt(pagestartfrom)
        }, {
          $limit: maxRow
        }, {
          $project: {
            _id: 1,
            name: 1,
            owner: "$owner.name",
            insurer: "$insurer.name",
            insured: "$insured.name",
            department: "$department.name",
            city: "$city.name",
            intimatedLoss: 1,
            timelineStatus: 1,
            status: 1
          }
        }
      ]

    Model.aggregate(aggText).exec(function (err, data) {
      if (err || data.length === 0) {
        callback(err, null);
      } else if (data.length > 0) {
        callback(null, data);
      } else {
        callback(err, null);
      }
    });
  },

};

module.exports = _.assign(module.exports, exports, model);