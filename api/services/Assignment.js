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
  createBy: {
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
      enum: ["Approval Pending", "Pending", "Completed", "Declined"]
    },
    timestamp: {
      type: Date,
      default: Date.now()
    },
    approvalTime: {
      type: Date
    },
    completionTime: {
      type: Date
    },
    declineTime: {
      type: Date
    },
    surveyEndTime: {
      type: Date
    },
    surveyStartTime: {
      type: Date
    },
    surveyDate: {
      type: Date
    },
    address: {
      type: String
    }
  }],
  assignmentapprovalStatus: {
    type: String,
    enum: ["Pending ForceClosed", "ForceClosed", "Pending ReOpened", "ReOpened", "Pending OnHold", "OnHold"],
    index: true
  },
  forceClosedComment: String,
  forceClosedReqTime: {
    type: Date
  },
  forceClosedRespTime: {
    type: Date
  },
  reopenComment: String,
  reopenReqTime: {
    type: Date
  },
  reopenRespTime: {
    type: Date
  },
  onholdComment: String,
  onholdReqTime: {
    type: Date
  },
  onholdRespTime: {
    type: Date
  },
  prevtimelineStatus: {
    type: String
  },
  timelineStatus: {
    type: String,
    enum: ["Pending", "Unassigned", "Survey Pending", "ILA Pending", "LOR Pending", "Dox Pending", "Part Dox Pending", "Assessment Pending", "Consent Pending", "JIR Pending", "FSR Pending", "BBND", "DBND", "Collected", "Dispatched", "Force Closed", "ReOpened", "ForceClosed", "OnHold", "Delivered"],
    default: "Unassigned",
    index: true
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
    // required: true,
    key: "assignment"
  },
  assignmentNumber: {
    type: Number,
    default: 0
  },
  typeOfClaim: {
    type: Boolean
  },
  showAddressForDesktop: {
    type: Boolean
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
  office: {
    type: Schema.Types.ObjectId,
    ref: "Office",
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
  dateOfLoss: {
    type: Date
  },
  intimatedLoss: {
    type: Number
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    index: true,
    // required: true,
    key: "assignment"
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    index: true,
    key: "assignment"
  },
  segment: {
    type: Schema.Types.ObjectId,
    ref: "CustomerSegment",
    index: true,
    // required: true,
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
    key: "assignment"
  },
  natureOfLoss: [{
    type: Schema.Types.ObjectId,
    ref: "NatureLoss",
    index: true,
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
      key: "assignment"
    },
    item: {
      type: String
    }
  }],
  invoices: [{
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
      key: "assignment"
    }
  }],
  invoice: [{
    type: Schema.Types.ObjectId,
    ref: "Invoice",
    index: true,
    key: "assignment"
  }],
  templateIla: [{
    templateName: {
      type: String
    },
    name: {
      type: String
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
      key: "assignment"
    },
    reqtimestamp: {
      type: Date
    },
    restimestamp: {
      type: Date
    },
    timestamp: {
      type: Date,
      default: Date.now()
    },
    authTimestamp: {
      type: Date
    },
    file: {
      type: String
    },
    approvalStatus: {
      type: String,
      enum: ["Pending", "Approved", "Reject", "Revised", "Draft"],
      default: "Pending",
      index: true
    }
  }],
  templateIsr: [{
    templateName: {
      type: String
    },
    name: {
      type: String
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
      key: "assignment",
      index: true
    },
    timestamp: {
      type: Date,
      default: Date.now()
    },
    authTimestamp: {
      type: Date
    },
    file: {
      type: String
    },
    approvalStatus: {
      type: String,
      enum: ["Pending", "Approved", "Reject", "Revised", "Draft"],
      default: "Pending",
      index: true
    }
  }],
  templateJir: [{
    templateName: {
      type: String
    },
    name: {
      type: String
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
      key: "assignment"
    },
    timestamp: {
      type: Date,
      default: Date.now()
    },
    authTimestamp: {
      type: Date
    },
    approvalStatus: {
      type: String,
      enum: ["Pending", "Approved", "Reject", "Revised", "Draft"],
      default: "Pending",
      index: true
    }
  }],
  templateLor: [{
    templateName: {
      type: String
    },
    name: {
      type: String
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
      key: "assignment"
    },
    reqtimestamp: {
      type: Date
    },
    restimestamp: {
      type: Date
    },
    timestamp: {
      type: Date,
      default: Date.now()
    },
    authTimestamp: {
      type: Date
    },
    file: {
      type: String
    },
    approvalStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Revised", "Draft"],
      default: "Pending",
      index: true
    },
    lorCount: {
      type: String,
      enum: ["NA", "LOR", "Reminder 1", "Reminder 2", "Notice"],
      default: "NA"
    },
  }],
  outwardDate: {
    type: Date
  },
  logistictype: {
    type: String
  },
  sentTo: {
    type: String
  },
  courier: {
    type: String
  },
  docketDate: {
    type: Date
  },
  docketNumber: {
    type: String
  },
  by: {
    type: String
  },
  recievedDate: {
    type: String
  },
  recievedTime: {
    type: Date
  },
  remark: {
    type: String
  },
  documentDetails: {
    type: String
  },
  email: {
    type: {}
  },
  threadId: {
    type: String
  }

});

schema.plugin(deepPopulate, {

  populate: {
    salvage: {
      select: ''
    },
    customer: {
      select: 'name _id'
    },
    'insurerOffice': {
      select: 'name _id'
    },
    department: {
      select: 'name _id'
    },
    'branch': {
      select: ''
    },
    'office': {
      select: ''
    },
    'office.city': {
      select: 'name _id district'
    },
    'office.city.district': {
      select: 'name _id state'
    },
    'office.city.district.state': {
      select: 'name _id'
    },
    'invoice': {
      select: 'name invoiceNumber _id grandTotal createdBy approvalStatus file approvalTime'
    },
    'invoice.createdBy': {
      select: 'name _id'
    },
    'assignedTo': {
      select: 'name _id'
    },
    'city': {
      select: 'name _id district'
    },
    'owner': {
      select: 'name _id func houseColor photo email mobile officeMobile  officeEmail employee'
    },
    'owner.func': {
      select: 'name'
    },
    'owner.employee': {
      select: 'name officeEmail'
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
      select: ''
    },
    'company': {
      select: ''
    },
    'company.city': {
      select: 'name district'
    },
    'company.city.district': {
      select: 'name state _id'
    },
    'company.city.district.state': {
      select: 'name _id'
    },
    'company.bank': {
      select: ''
    },
    'natureOfLoss': {
      select: 'name _id'
    },
    'shareWith.persons': {
      select: 'name _id email officeEmail'
    },
    'insured': {
      select: 'name _id'
    },
    'insuredOffice': {
      select: ''
    },
    'insuredOffice.city': {
      select: 'name _id district'
    },
    'insuredOffice.city.district': {
      select: 'name _id state'
    },
    'insuredOffice.city.district.state': {
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
    'templateInvoice.forms.invoiceExpenditure': {
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
    },
    'policyType': {
      select: 'name _id'
    },
    'survey.employee': {
      select: 'name _id email mobile officeMobile officeEmail address city'
    },
    'survey.employee.city': {
      select: 'name _id state'
    },
    'survey.employee.city.district': {
      select: 'name _id state'
    },
    'survey.employee.city.district.state': {
      select: 'name _id zone'
    },
    'survey.employee.city.district.state.zone': {
      select: 'name _id country'
    },
    'survey.employee.city.district.state.zone.country': {
      select: 'name countryCode _id'
    },
  }
});
autoIncrement.initialize(mongoose.connection);
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('Assignment', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "city.district.state.zone.country products.product.category.industry department shareWith.persons policyType natureOfLoss invoice invoice.createdBy insured insuredOffice owner owner.func company company.city insurerOffice company.city.district.state assessment.employee docs.employee fsrs.employee photos.employee causeOfLoss insurer assignedTo office branch survey.employee survey.employee.city company.bank owner.employee survey.employee.city.district survey.employee.city.district.state survey.employee.city.district.state.zone survey.employee.city.district.state.zone.country", "city.district.state.zone.country products.product.category.industry department shareWith.persons natureOfLoss company invoice invoice.createdBy insuredOffice assignedTo insurerOffice office branch survey.employee company.bank owner owner.employee survey.employee.city.district survey.employee.city.district.state survey.employee.city.district.state.zone survey.employee.city.district.state.zone.country survey.employee.city"));

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
            }, function (err, updated) {
              if (err) {
                callback(err, null);
              } else {
                // console.log("updated data", updated, data);
                // callback(null,updated);
                Assignment.getOne({
                  _id: data._id
                }, function (err, assignmentData) {
                  console.log("assignmentData =========", assignmentData);
                  if (err) {
                    console.log("err", err);
                    callback("No data found in assignment", null);
                  } else {
                    console.log("assignmentData else", assignmentData);
                    if (_.isEmpty(assignmentData)) {
                      callback("No data found in assignment search", null);
                    } else {
                      console.log("assignmentData In ", assignmentData);
                      var emailData = {};
                      emailData.assignmentNo = assignmentData.name;
                      emailData.ownerName = assignmentData.owner.name;
                      emailData.ownerEmail = assignmentData.owner.officeEmail;
                      emailData.ownerPhone = assignmentData.owner.officeMobile;
                      emailData.siteAddress = (assignmentData.address ? assignmentData.address : '');
                      if (assignmentData.city.name) {
                        emailData.siteCity = assignmentData.city.name;
                        if (assignmentData.city.district) {
                          emailData.siteDistrict = assignmentData.city.district.name;
                          if (assignmentData.city.district.state) {
                            emailData.siteState = assignmentData.city.district.state.name;
                            if (assignmentData.city.district.state.zone) {
                              emailData.siteZone = assignmentData.city.district.state.zone.name;
                              if (assignmentData.city.district.state.zone.country) {
                                emailData.siteCountry = assignmentData.city.district.state.zone.country.name;
                              }
                            }
                          }
                        }
                      }
                      emailData.fullAddress = emailData.siteAddress + " " + emailData.siteCity + " " + emailData.siteState + " " + emailData.siteZone + " " + emailData.siteCountry;
                      console.log("emaildata fullAddress", emailData.fullAddress);
                      emailData.invoiceNumber = data.invoiceNumber;
                      if (assignmentData.insured) {
                        if (assignmentData.insured.name) {
                          emailData.insuredName = (assignmentData.insured.name ? assignmentData.insured.name : "");
                        } else {
                          emailData.insuredName = "";
                        }
                      } else {
                        emailData.insuredName = "";
                      }
                      if (assignmentData.templateIla[0]) {
                        emailData.ilaAuthDate = assignmentData.templateIla[0].authTimestamp;
                      }
                      // emailData.surveyDate = (surveyDate ? moment(surveyDate).format("DD/MM/YYYY") : "");
                      // console.log("emailData In 1 ", emailData);
                      if (assignmentData.survey) {
                        _.each(assignmentData.survey, function (values) {
                          console.log("survey: ", values);
                          if (values.status == "Approval Pending") {
                            console.log("In surveyor");
                            console.log(" values.employee.mobile", values.employee.officeMobile);
                            emailData.surveyorNumber = values.employee.officeMobile;
                            emailData.surveyorName = values.employee.name;
                            emailData.surveyorEmail = values.employee.officeEmail;
                            emailData.surveyDate = (values.surveyDate ? moment(values.surveyDate).format("DD/MM/YYYY") : "");
                          }
                        });
                      }


                      // console.log("emailData In 2 ", emailData);
                      emailData.to = [];
                      emailData.to.push({
                        name: assignmentData.owner.name,
                        email: assignmentData.owner.officeEmail
                      });

                      if (assignmentData.shareWith) {
                        _.each(assignmentData.shareWith, function (values) {
                          console.log("values", values);
                          _.each(values.persons, function (personss) {
                            console.log("persons", personss);
                            emailData.to.push({
                              name: personss.name,
                              email: personss.officeEmail
                            })
                          });
                        });
                      }


                      if (data.users) {
                        emailData.assignmentAuthorizer = data.users.name;
                      }
                      if (data.forceClosedComment) {
                        emailData.forceClosedComment = (data.forceClosedComment ? data.forceClosedComment : "");
                      }
                      if (data.reopenComment) {
                        emailData.reopenComment = (data.reopenComment ? data.reopenComment : "");
                      }
                      if (data.onholdComment) {
                        emailData.onholdComment = (data.onholdComment ? data.onholdComment : "");
                      }

                      console.log('mailData', emailData);

                      //Find Acknowledgment Email data
                      if (data.assignmentapprovalStatus == "Pending ForceClosed") {

                        var mailData = [];
                        mailData[0] = "Assignment Force Close Request";
                        mailData[1] = emailData;
                        mailData[2] = data.accessToken;
                        mailData[3] = data.users.email;
                        Assignment.getMailAndSendMail(mailData, function (err, newData) {
                          if (err) {
                            callback(null, err);
                          } else {
                            if (_.isEmpty(newData)) {
                              callback("There was an error while sending mail", null);
                            } else {
                              callback(null, newData);
                            }
                          }
                        });
                      } else if (data.assignmentapprovalStatus == "ForceClosed") {
                        var mailData = [];
                        mailData[0] = "Assignment Force Close Aprproved";
                        mailData[1] = emailData;
                        mailData[2] = data.accessToken;
                        mailData[3] = data.users.email;
                        Assignment.getMailAndSendMail(mailData, function (err, newData) {
                          if (err) {
                            callback(null, err);
                          } else {
                            if (_.isEmpty(newData)) {
                              callback("There was an error while sending mail", null);
                            } else {
                              callback(null, newData);
                            }
                          }
                        });
                      } else if (data.assignmentapprovalStatus == "Rejected ForceClosed") {
                        var mailData = [];
                        mailData[0] = "Assignment Force Close Rejected";
                        mailData[1] = emailData;
                        mailData[2] = data.accessToken;
                        mailData[3] = data.users.email;
                        Assignment.getMailAndSendMail(mailData, function (err, newData) {
                          if (err) {
                            callback(null, err);
                          } else {
                            if (_.isEmpty(newData)) {
                              callback("There was an error while sending mail", null);
                            } else {
                              callback(null, newData);
                            }
                          }
                        });
                      } else if (data.assignmentapprovalStatus == "Pending ReOpened") {

                        var mailData = [];
                        mailData[0] = "Assignment Reopen Request";
                        mailData[1] = emailData;
                        mailData[2] = data.accessToken;
                        mailData[3] = data.users.email;
                        Assignment.getMailAndSendMail(mailData, function (err, newData) {
                          if (err) {
                            callback(null, err);
                          } else {
                            if (_.isEmpty(newData)) {
                              callback("There was an error while sending mail", null);
                            } else {
                              callback(null, newData);
                            }
                          }
                        });
                      } else if (data.assignmentapprovalStatus == "ReOpened") {
                        var mailData = [];
                        mailData[0] = "Assignment Reopen Approved";
                        mailData[1] = emailData;
                        mailData[2] = data.accessToken;
                        mailData[3] = data.users.email;
                        Assignment.getMailAndSendMail(mailData, function (err, newData) {
                          if (err) {
                            callback(null, err);
                          } else {
                            if (_.isEmpty(newData)) {
                              callback("There was an error while sending mail", null);
                            } else {
                              callback(null, newData);
                            }
                          }
                        });
                      } else if (data.assignmentapprovalStatus == "Rejected ReOpened") {
                        var mailData = [];
                        mailData[0] = "Assignment Reopen Rejected";
                        mailData[1] = emailData;
                        mailData[2] = data.accessToken;
                        mailData[3] = data.users.email;
                        Assignment.getMailAndSendMail(mailData, function (err, newData) {
                          if (err) {
                            callback(null, err);
                          } else {
                            if (_.isEmpty(newData)) {
                              callback("There was an error while sending mail", null);
                            } else {
                              callback(null, newData);
                            }
                          }
                        });
                      } else if (data.assignmentapprovalStatus == "Pending OnHold") {

                        var mailData = [];
                        mailData[0] = "Assignment On Hold Request";
                        mailData[1] = emailData;
                        mailData[2] = data.accessToken;
                        mailData[3] = data.users.email;
                        Assignment.getMailAndSendMail(mailData, function (err, newData) {
                          if (err) {
                            callback(null, err);
                          } else {
                            if (_.isEmpty(newData)) {
                              callback("There was an error while sending mail", null);
                            } else {
                              callback(null, newData);
                            }
                          }
                        });
                      } else if (data.assignmentapprovalStatus == "OnHold") {
                        var mailData = [];
                        mailData[0] = "Assignment On Hold Aprproved";
                        mailData[1] = emailData;
                        mailData[2] = data.accessToken;
                        mailData[3] = data.users.email;
                        Assignment.getMailAndSendMail(mailData, function (err, newData) {
                          if (err) {
                            callback(null, err);
                          } else {
                            if (_.isEmpty(newData)) {
                              callback("There was an error while sending mail", null);
                            } else {
                              callback(null, newData);
                            }
                          }
                        });
                      } else if (data.assignmentapprovalStatus == "Rejected OnHold") {
                        var mailData = [];
                        mailData[0] = "Assignment On Hold Rejected";
                        mailData[1] = emailData;
                        mailData[2] = data.accessToken;
                        mailData[3] = data.users.email;
                        Assignment.getMailAndSendMail(mailData, function (err, newData) {
                          if (err) {
                            callback(null, err);
                          } else {
                            if (_.isEmpty(newData)) {
                              callback("There was an error while sending mail", null);
                            } else {
                              callback(null, newData);
                            }
                          }
                        });
                      } else {
                        callback(null, updated);
                      }

                    }
                  }
                });
              }
            });
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
          Assignment.generateAssignmentNumber(n, function (err, data3) {
            if (err) {
              callback1(err, null)
            } else {
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
        data.dateMOY = branchDetails.seriesFormat;
        data.brachCode = branchDetails.code;
        data.fourthDigit = Assignment.getFourthDigit(data);
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
        }).deepPopulate("city.district.state.zone.country insuredOffice.city.district.state products.product.category.industry shareWith.persons branch natureOfLoss department insurerOffice office office.city office.city.district office.city.district.state insuredOffice owner owner.func company company.city assessment.employee customer docs.employee fsrs.employee photos.employee causeOfLoss insurer policyType insured salvage natureOfLoss", "city.district.state.zone.country products.product.category.industry shareWith.persons natureOfLoss insurerOffice insuredOffice").lean().exec(function (err, data3) {
          if (err) {
            callback(err, data3);
          } else {
            var filter = {
              _id: data3.policyDoc
            }
            PolicyDoc.getPolicyDoc({
              filter
            }, function (err, data4) {
              if (err) {
                data2.assignment = data3;
                callback(null, data2);
              } else {
                console.log("Data4- Policy.....", data4);
                data2.assignment = data3;
                if (data4.results[0]) {
                  data2.assignment.policyNumber = (data4.results[0].policyNo ? data4.results[0].policyNo : "");
                }
                callback(null, data2);
              }
            });
          }
        });

      }
    });
  },

  editAssignmentTemplate: function (body, callback) {
    var Model = this;
    var timelStatus = body.assignment.timelineStatus;
    var approvalType = "None";
    var approvalStatus = "Pending";
    if (body.type == "templateIla" && body.approvalStatus == "Approved") {
      timelStatus = "LOR Pending";
      approvalType = "ILA";
    } else if (body.type == "templateLor" && body.approvalStatus == "Approved") {
      timelStatus = "Dox Pending";
      approvalType = "LOR";
    }
    var $scope = {};
    var data2 = _.cloneDeep(body);
    delete data2.assignment;
    $scope.data = data2;

    _.each($scope.data.forms, function (n) {
      _.each(n.items, function (m) {
        if (m.value == "Date") {
          // m.field = moment(m.field).format('ddd, MMM Do, YYYY');
          m.field = moment(m.field).format('DD/MM/YYYY');
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
      timelineStatus: timelStatus,
      approvalType: approvalType,
      approvalStatus: approvalStatus
    }, function (err, data3) {
      if (err) {
        callback(err, null);
      } else {
        $scope.assignment = findObj._id;
        toName = "";
        toEmail = "";
        if (body.officeEmail) {
          console.log("office Email", body.officeEmail);
          var to = body.officeEmail;
          to = to.split("<");
          // console.log("to[1]",to[1]);
          toName = to[0];
          var toEmails = to[1].split(">");
          toEmail = toEmails[0];
          // console.log("to NAME",toName);  
          // console.log("to toEmails",toEmails);
          // console.log("to Email",toEmail);
          // callback(null,"Sent!");
        }
        Assignment.getOne({
          _id: body.assignment._id
        }, function (err, assignmentData) {
          if (err) {
            callback("No data found in assignment", null);
          } else {
            if (_.isEmpty(assignmentData)) {
              callback("No data found in assignment search", null);
            } else {
              var emailData = {};
              emailData.assignmentNo = assignmentData.name;
              emailData.ownerName = assignmentData.owner.name;
              emailData.ownerEmail = assignmentData.owner.officeEmail;
              emailData.ownerPhone = assignmentData.owner.officeMobile;
              emailData.siteAddress = (assignmentData.address ? assignmentData.address : '');
              if (assignmentData.city.name) {
                emailData.siteCity = assignmentData.city.name;
                if (assignmentData.city.district) {
                  emailData.siteDistrict = assignmentData.city.district.name;
                  if (assignmentData.city.district.state) {
                    emailData.siteState = assignmentData.city.district.state.name;
                    if (assignmentData.city.district.state.zone) {
                      emailData.siteZone = assignmentData.city.district.state.zone.name;
                      if (assignmentData.city.district.state.zone.country) {
                        emailData.siteCountry = assignmentData.city.district.state.zone.country.name;
                      }
                    }
                  }
                }
              }
              emailData.fullAddress = emailData.siteAddress + " " + emailData.siteCity + " " + emailData.siteState + " " + emailData.siteZone + " " + emailData.siteCountry;
              console.log("emaildata fullAddress", emailData.fullAddress);
              if (assignmentData.insured) {
                if (assignmentData.insured.name) {
                  emailData.insuredName = (assignmentData.insured.name ? assignmentData.insured.name : "");
                } else {
                  emailData.insuredName = "";
                }
              } else {
                emailData.insuredName = "";
              }
              if (assignmentData.products[0]) {
                if (assignmentData.products[0].product) {
                  emailData.productName = (assignmentData.products[0].product.name ? assignmentData.products[0].product.name : "NA");
                }
              }
              if (assignmentData.templateIla[0]) {
                emailData.ilaAuthDate = assignmentData.templateIla[0].authTimestamp;
              }
              // emailData.surveyDate = (surveyDate ? moment(surveyDate).format("DD/MM/YYYY") : "");
              // console.log("emailData In 1 ", emailData);
              if (assignmentData.survey) {
                _.each(assignmentData.survey, function (values) {
                  // console.log("survey: ", values);
                  if (values.status == "Pending") {
                    // console.log("In surveyor");
                    // console.log(" values.employee.mobile", values.employee.mobile);
                    emailData.surveyorNumber = values.employee.officeMobile;
                    emailData.surveyorName = values.employee.name;
                    emailData.surveyorEmail = values.employee.officeEmail;
                    emailData.surveyDate = (values.surveyDate ? moment(values.surveyDate).format("DD/MM/YYYY") : "");
                  }
                });
              }


              // console.log("emailData In 2 ", emailData);
              emailData.to = [];
              emailData.to.push({
                name: toName,
                email: toEmail
              });
              console.log("emaildata.to ", emailData.to);

              emailData.cc = [];

              if (body.users) {
                emailData.assignmentAuthorizer = body.users.name;
              }
              // console.log('mailData', mailData);
              var mailData = [];
              if ($scope.data.type == "templateLor") {
                mailData[0] = "LOR Send Authorization";
                mailData[1] = emailData;
                mailData[2] = body.accessToken;
                mailData[3] = body.users.email;
                Assignment.getMailAndSendMail(mailData, function (err, newData) {
                  console.log("newData", newData);
                  if (err) {
                    callback(null, err);
                  } else {
                    if (_.isEmpty(newData)) {
                      callback("There was an error while sending mail", null);
                    } else {
                      console.log("LOR DATA.................................................", $scope.data);
                      Config.generatePdf("pdf/new-lor", $scope, callback);
                      // callback(null, newData);
                    }
                  }
                });

              } else if ($scope.data.type == "templateIla") {
                mailData[0] = "ILA Send for Authorization";
                mailData[1] = emailData;
                mailData[2] = body.accessToken;
                mailData[3] = body.users.email;
                Assignment.getMailAndSendMail(mailData, function (err, newData) {
                  console.log("newData", newData);
                  if (err) {
                    callback(null, err);
                  } else {
                    if (_.isEmpty(newData)) {
                      callback("There was an error while sending mail", null);
                    } else {
                      console.log("LOR DATA.................................................", $scope.data);
                      Config.generatePdf("new-ila", $scope, callback);
                    }
                  }
                });

              } else {
                Config.generatePdf("pdf/abs-synopsis", $scope, callback);
              }
            }
          }
        });
      }
    });
  },

  generateInvoicePdf: function (data, callback) {
    green(data._id);
    $scope = {};
    Invoice.findOne({
      _id: data._id
    }).lean().deepPopulate("assignment assignment.company assignment.company.bank assignment.department assignment.products.product.category assignment.natureOfLoss assignment.causeOfLoss assignment.policyType assignment.customer assignment.insurerOffice assignment.insuredOffice billedTo.customerCompany billedTo.city.district.state.zone.country assignment.city.district.state.zone.country assignment.company.city.district.state").exec(function (err, data2) {
      if (err) {
        callback(err, null);
      } else {
        $scope.data = data2;
        var filter = {
          _id: data2.assignment.policyDoc
        }
        // For policyNumber
        PolicyDoc.getPolicyDoc({
          filter
        }, function (err, data4) {
          if (err) {
            green($scope.data);
            console.log("Name Of Bank.........................................", $scope.data.assignment.company.bank.name, $scope.data.assignment.company.bank.accountNumber);
            Config.generatePdf("pdf/abs-invoice", $scope, callback);
          } else {
            if (data4.results[0]) {
              $scope.data.assignment.policyNumber = (data4.results[0].policyNo ? data4.results[0].policyNo : "");
            }
            console.log("Name Of Bank...........................................", $scope.data.assignment.company.bank.name, $scope.data.assignment.company.bank.accountNumber);
            Config.generatePdf("pdf/abs-invoice", $scope, callback);
          }
        });
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
      .deepPopulate("city.district.state.zone.country products.product.category.industry department shareWith.persons policyType natureOfLoss invoice invoice.createdBy insured insuredOffice owner owner.func company company.city insurerOffice company.city.district.state assessment.employee docs.employee fsrs.employee photos.employee causeOfLoss insurer assignedTo office branch survey.employee survey.employee.city survey.employee.city.district survey.employee.city.district.state survey.employee.city.district.state.zone survey.employee.city.district.state.zone.country")
      .keyword(options)
      .page(options, callback);

  },

  updateSurveyor: function (data, callback) {
    data.survey.timestamp = Date.now();
    Assignment.update({
      _id: data._id
    }, {
      timelineStatus: "Survey Pending",
      $push: {
        survey: data.survey
      }
    }).exec(function (err, found) {
      if (err) {
        callback(err, null);
      } else {
        if (found.nModified == 1) {
          Assignment.getOne({
            _id: data._id
          }, function (err, assignmentData) {
            // console.log("assignmentData =========", assignmentData);
            if (err) {
              // console.log("err", err);
              callback("No data found in assignment", null);
            } else {
              // console.log("assignmentData else", assignmentData);
              if (_.isEmpty(assignmentData)) {
                callback("No data found in assignment search", null);
              } else {
                // console.log("assignmentData In ", assignmentData);
                var emailData = {};
                emailData.sbcTo = [];
                var filter = {
                  filter: {
                    isSBC: true
                  }
                };
                Employee.employeeSearch(filter, function (err, sbc) {
                  console.log("searchEmployee", sbc);
                  _.each(sbc.results, function (values) {
                    console.log("sbcTo", values);
                    emailData.sbcTo.push({
                      name: values.name,
                      email: values.officeEmail
                    });
                  });
                  console.log("emailData.sbcTo", emailData.sbcTo);

                  emailData.assignmentNo = assignmentData.name;
                  emailData.ownerName = assignmentData.owner.name;
                  emailData.ownerEmail = assignmentData.owner.officeEmail;
                  emailData.ownerPhone = assignmentData.owner.officeMobile;
                  emailData.siteAddress = (assignmentData.address ? assignmentData.address : '');
                  if (assignmentData.city.name) {
                    emailData.siteCity = assignmentData.city.name;
                    if (assignmentData.city.district) {
                      emailData.siteDistrict = assignmentData.city.district.name;
                      if (assignmentData.city.district.state) {
                        emailData.siteState = assignmentData.city.district.state.name;
                        if (assignmentData.city.district.state.zone) {
                          emailData.siteZone = assignmentData.city.district.state.zone.name;
                          if (assignmentData.city.district.state.zone.country) {
                            emailData.siteCountry = assignmentData.city.district.state.zone.country.name;
                          }
                        }
                      }
                    }
                  }
                  emailData.fullAddress = emailData.siteAddress + " " + emailData.siteCity + " " + emailData.siteState + " " + emailData.siteZone + " " + emailData.siteCountry;
                  console.log("emaildata fullAddress", emailData.fullAddress);
                  if (assignmentData.insured) {
                    emailData.insuredName = (assignmentData.insured.name ? assignmentData.insured.name : "");
                  }
                  if (assignmentData.templateIla[0]) {
                    emailData.ilaAuthDate = assignmentData.templateIla[0].authTimestamp;
                  }

                  if (assignmentData.survey) {
                    _.each(assignmentData.survey, function (values) {
                      // console.log("survey: ", values);
                      if (values.status == "Approval Pending") {
                        // console.log("In surveyor");
                        // console.log(" values.employee.mobile", values.employee.mobile);
                        emailData.surveyorNumber = values.employee.officeMobile;
                        emailData.surveyorName = values.employee.name;
                        emailData.surveyorEmail = values.employee.officeEmail;
                        emailData.surveyDate = (values.surveyDate ? moment(values.surveyDate).format("DD/MM/YYYY") : "");
                      }
                    });
                  }


                  console.log("assignmentData.owner.officeEmail ", assignmentData.owner.officeEmail);
                  emailData.to = [];
                  emailData.to.push({
                    name: assignmentData.owner.name,
                    email: assignmentData.owner.officeEmail
                  });

                  emailData.cc = [];
                  if (assignmentData.shareWith) {
                    _.each(assignmentData.shareWith, function (values) {
                      console.log("values", values);
                      _.each(values.persons, function (personss) {
                        console.log("persons", personss);
                        emailData.cc.push({
                          name: personss.name,
                          email: personss.officeEmail
                        })
                      });
                    });
                  }


                  //Find Acknowledgment Email data
                  var mailData = [];
                  mailData[0] = "SBC For Approval";
                  mailData[1] = emailData;
                  mailData[2] = data._id;
                  mailData[3] = data.accessToken;
                  // console.log('mailData', mailData);
                  callback(null, mailData);

                });

              }
            }
          });
        } else {
          callback("There was an error while assigning surveyor", found);
        }
      }
    });
  },

  getEmailsData: function (data, callback) {
    // console.log("getEmailsData ==== ", data);
    Assignment.getMailData(data, function (err, emailData) {
      // console.log("emailData ==== ", emailData);
      if (err) {
        // console.log("err", err);
      } else {
        if (_.isEmpty(emailData)) {
          callback("No mail data found", null);
        } else {
          //Find create assignment mail
          // Assignment.getAssignmentCreateMail({
          //   _id: data[2]
          // }, function (err, firstMailData) {
          //   // console.log("firstMailData", firstMailData);
          //   if (err) {
          //     callback(err, null);
          //     // console.log("err", err);
          //   } else {
          //     if (_.isEmpty(firstMailData)) {
          //       // console.log("No first create assignment mail data found", null);
          //       callback("No first create assignment mail data found", null);
          //     } else {
          //       emailData.message = emailData.message + firstMailData;
          // console.log("emailData.message", emailDasta.message);
          emailData.accessToken = data[3];
          callback(null, emailData);

          //Update thread id
          // Assignment.updateThreadId({
          //   _id: data[2]._id,
          //   threadId: mailData.threadId
          // }, function (err, threadData) {
          //   console.log("threadData", threadData);
          //   if (err) {
          //     callback(err, null);
          //     console.log("err", err);
          //   } else {
          //     if (_.isEmpty(threadData)) {
          //       console.log("There was an updating data in survey thread", null);
          //       callback(err, null);
          //     } else {
          //       callback(null, threadData);
          //     }
          //   }
          // });

          //     }
          //   }
          // });

        }
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
      $unwind: {
        path: "$city",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $lookup: {
        from: "districts",
        localField: "city.district",
        foreignField: "_id",
        as: "city.districts"
      }
    }, {
      $unwind: {
        path: "$city.districts",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $lookup: {
        from: "states",
        localField: "city.districts.state",
        foreignField: "_id",
        as: "city.districts.states"
      }
    }, {
      $unwind: {
        path: "$city.districts.states",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $lookup: {
        from: "zones",
        localField: "city.districts.states.zone",
        foreignField: "_id",
        as: "city.districts.states.zones"
      }
    }, {
      $unwind: {
        path: "$city.districts.states.zones",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $lookup: {
        from: "countries",
        localField: "city.districts.states.zones.country",
        foreignField: "_id",
        as: "city.districts.states.zones.country"
      }
    }, {
      $unwind: {
        path: "$city.districts.states.zones.country",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $unwind: {
        path: "$survey",
        preserveNullAndEmptyArrays: true
      }
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
        timelineStatus: "Unassigned",
      }
    }).exec(function (err, found) {

      if (err) {
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
        "survey.$.surveyDate": new Date(data.surveyDate),
        "survey.$.status": "Completed",
        "survey.$.address": data.address,
        // "survey.$.dateOfSurvey": new Date(data.dateOfSurvey),
        "survey.$.completionTime": Date.now(),
        "survey.$.surveyEndTime": new Date(data.endTime),
        "survey.$.surveyStartTime": new Date(data.startTime)
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
      // console.log("update assignment", found);
      if (err) {
        callback(err, null);
      } else {
        var newChat = {};
        newChat.employee = data.empId;
        newChat.type = "SurveyDone";
        newChat.title = "Survey Done";
        newChat.surveyEndTime = new Date(data.endTime);
        newChat.surveyStartTime = new Date(data.startTime);
        newChat.surveyDate = new Date(data.surveyDate);
        newChat.address = data.address;
        newChat.event = "On Survey Attended";
        newChat.onSurveyAttended = true
        _.each(fileArray, function (n) {
          n.employee = data.empId,
            n.type = "Normal",
            n.title = "Survey Done";
        })
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
          // console.log("update timeline", data);
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
      } else {
        newDate = moment(new Date(data.dateOfAppointment)).add(5, "hours").add(30, "minutes").format("YYYY");
      }
      return newDate;
    } else {
      var currentDateMonth = moment(new Date(data.dateOfAppointment)).add(5, "hours").add(30, "minutes").format("MM-YYYY");
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
    });
  },
  projectionOfGetAssignmentAggregate: function () {
    var allTable = [{
      $lookup: {
        from: "cities",
        localField: "city",
        foreignField: "_id",
        as: "city"
      }
    }, {
      $unwind: {
        path: "$city",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $lookup: {
        from: "branches",
        localField: "branch",
        foreignField: "_id",
        as: "branch"
      }
    }, {
      $unwind: {
        path: "$branch",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $lookup: {
        from: "customers",
        localField: "insurerOffice",
        foreignField: "_id",
        as: "insurer"
      }
    }, {
      $unwind: {
        path: "$insurer",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $lookup: {
        from: "customers",
        localField: "brokerOffice",
        foreignField: "_id",
        as: "broker"
      }
    }, {
      $unwind: {
        path: "$broker",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $lookup: {
        from: "employees",
        localField: "owner",
        foreignField: "_id",
        as: "owner"
      }
    }, {
      $unwind: {
        path: "$owner",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $lookup: {
        from: "customers",
        localField: "insuredOffice",
        foreignField: "_id",
        as: "insured"
      }
    }, {
      $unwind: {
        path: "$insured",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $lookup: {
        from: "departments",
        localField: "department",
        foreignField: "_id",
        as: "department"
      }
    }, {
      $unwind: {
        path: "$department",
        preserveNullAndEmptyArrays: true
      }
    }];

    return allTable;
  },
  projectionOfGetAssignmentExcelAggregate: function () {
    var allTable = [{
      $lookup: {
        from: "cities",
        localField: "city",
        foreignField: "_id",
        as: "city"
      }
    }, {
      $unwind: {
        path: "$city",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $lookup: {
        from: "branches",
        localField: "branch",
        foreignField: "_id",
        as: "branch"
      }
    }, {
      $unwind: {
        path: "$branch",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $lookup: {
        from: "customers",
        localField: "insurerOffice",
        foreignField: "_id",
        as: "insurer"
      }
    }, {
      $unwind: {
        path: "$insurer",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $lookup: {
        from: "customers",
        localField: "brokerOffice",
        foreignField: "_id",
        as: "broker"
      }
    }, {
      $unwind: {
        path: "$broker",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $lookup: {
        from: "employees",
        localField: "owner",
        foreignField: "_id",
        as: "owner"
      }
    }, {
      $unwind: {
        path: "$owner",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $lookup: {
        from: "customers",
        localField: "insuredOffice",
        foreignField: "_id",
        as: "insured"
      }
    }, {
      $unwind: {
        path: "$insured",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $lookup: {
        from: "departments",
        localField: "department",
        foreignField: "_id",
        as: "department"
      }
    }, {
      $unwind: {
        path: "$department",
        preserveNullAndEmptyArrays: true
      }
    }];

    return allTable;
  },
  typeOfGetAssignmentAggregate: function (data, user) {
    var retObj = {};
    if (data.ownerStatus == "My files") {
      retObj = {
        $match: {
          'owner': objectid(data.ownerId),
        }
      };
    } else if (data.ownerStatus == "Shared with me") {
      retObj = {
        $match: {
          'shareWith.persons': objectid(data.ownerId),
        }
      };
    } else if (data.ownerStatus == "All files") {
      var allUsersUnder = _.map(_.concat(user.children, data.ownerId), function (n) {
        return objectid(n);
      });
      retObj = {
        $match: {
          $or: [{
            'shareWith.persons': {
              $in: allUsersUnder
            }
          }, {
            'owner': {
              $in: allUsersUnder
            }
          }]
        },
      };
    }

    return [retObj];
  },
  filterOfGetAssignmentAggregate: function (data) {
    var filterObject = {};
    //Timeline status filter
    if (!_.isEmpty(data.timelineStatus)) {
      var timelineStatus = {
        timelineStatus: {
          $in: data.timelineStatus
        }
      };
      filterObject = _.assign(filterObject, timelineStatus);
    }

    //Intimated Loss from range to to range
    if (!_.isEmpty(data.from) && !_.isEmpty(data.to)) {
      var intimatedLoss = {
        intimatedLoss: {
          "$gte": data.from,
          "$lte": data.to
        }
      };
      filterObject = _.assign(filterObject, intimatedLoss);
    }

    //Assignment from date to to date
    if (!_.isEmpty(data.fromDate) && !_.isEmpty(data.toDate)) {
      var createdAt = {
        createdAt: {
          "$gte": new Date(data.fromDate),
          "$lte": new Date(data.toDate)
        }
      };
      filterObject = _.assign(filterObject, createdAt);
    }

    //Mr number filter
    if (!_.isEmpty(data.name)) {
      var name = {
        name: {
          $regex: data.name,
          $options: 'i'
        }
      };
      filterObject = _.assign(filterObject, name);
    }

    //Owner of assignment filter
    if (!_.isEmpty(data.owner)) {
      var owner = {
        'owner': {
          $in: _.map(data.owner, function (n) {
            return objectid(n);
          })
        },
      };
      console.log(owner);
      filterObject = _.assign(filterObject, owner);
    }

    //City filter
    if (!_.isEmpty(data.city)) {
      var city = {
        'city': {
          $in: _.map(data.city, function (n) {
            return objectid(n);
          })
        },
      };
      filterObject = _.assign(filterObject, city);
    }

    ///Branch filter 
    if (!_.isEmpty(data.branch)) {
      var branch = {
        'branch': {
          $in: _.map(data.branch, function (n) {
            return objectid(n);
          })
        },
      };
      filterObject = _.assign(filterObject, branch);
    }

    //Insurer filter
    if (!_.isEmpty(data.insurer)) {
      var insurer = {
        'insurer': {
          $in: _.map(data.insurer, function (n) {
            return objectid(n);
          })
        }
      };
      filterObject = _.assign(filterObject, insurer);
    }

    //Insured filter
    if (!_.isEmpty(data.insured)) {
      var insured = {
        'insured': {
          $in: _.map(data.insured, function (n) {
            return objectid(n);
          })
        },
      };
      filterObject = _.assign(filterObject, insured);
    }

    //Department filter
    if (!_.isEmpty(data.department)) {
      var department = {
        'department': {
          $in: _.map(data.department, function (n) {
            return objectid(n);
          })
        },
      };
      filterObject = _.assign(filterObject, department);
    }

    //Broker Office filter
    if (!_.isEmpty(data.brokerOffice)) {
      var brokerOffice = {
        'customer': {
          $in: _.map(data.brokerOffice, function (n) {
            return objectid(n);
          })
        },
      };
      filterObject = _.assign(filterObject, brokerOffice);
    }
    if (_.isEmpty(filterObject)) {
      return null;
    } else {
      return [{
        $match: filterObject
      }];
    }

  },
  sortOfGetAssignmentAggregate: function (data) {
    //Sorting
    var sort = {
      $sort: {
        createdAt: -1
      }
    };

    function makeSort(name, value) {
      sort.$sort[name] = value;
    }
    if (_.isEmpty(data.sorting[0])) {
      sort = {
        $sort: {
          createdAt: -1
        }
      };
    } else {
      switch (data.sorting[0]) {
        case "name":
          makeSort(data.sorting[0], data.sorting[1]);
          break;
        case "intimatedLoss":
          makeSort(data.sorting[0], data.sorting[1]);
          break;
        case "owner":
          makeSort(data.sorting[0] + ".name", data.sorting[1]);
          break;
        case "insurer":
          makeSort(data.sorting[0] + ".name", data.sorting[1]);
          break;
        case "insured":
          makeSort(data.sorting[0] + ".name", data.sorting[1]);
          break;
        case "department":
          makeSort(data.sorting[0] + ".name", data.sorting[1]);
          break;
        case "city":
          makeSort(data.sorting[0] + ".name", data.sorting[1]);
          break;
        case "timelineStatus":
          makeSort(data.sorting[0], data.sorting[1]);
          break;
      }
    }
    return [sort];
  },
  completeGetAssignmentAggregate: function (data, user) {
    var aggregateArr = _.concat(this.filterOfGetAssignmentAggregate(data), this.typeOfGetAssignmentAggregate(data, user), this.projectionOfGetAssignmentAggregate());
    return _.compact(aggregateArr);
  },
  getAll: function (data, callback, user) {
    var coreArr = this.completeGetAssignmentAggregate(data, user);
    var paginationArr = [{
      $skip: parseInt((data.pagenumber - 1) * data.pagelimit)
    }, {
      $limit: data.pagelimit
    }, {
      $project: {
        _id: 1,
        name: 1,
        owner: "$owner.name",
        insurerName: "$insurer.name",
        insuredName: "$insured.name",
        brokerName: "$broker.name",
        department: "$department.name",
        city: "$city.name",
        intimatedLoss: 1,
        timelineStatus: 1,
        status: 1
      }
    }];
    var countArr = [{
      $group: {
        _id: null,
        count: {
          $sum: 1
        }
      }
    }];
    var sortArr = this.sortOfGetAssignmentAggregate(data);

    async.parallel({
      results: function (callback) {
        Assignment.aggregate(_.concat(coreArr, sortArr, paginationArr)).exec(callback);
      },
      total: function (callback) {
        Assignment.aggregate(_.concat(coreArr, countArr)).exec(callback);
      }
    }, function (err, data2) {
      if (err || _.isEmpty(data2.results)) {
        callback(err, data2);
      } else {
        data2.total = data2.total[0].count;
        callback(err, data2);
      }
    });
  },
  generateAssignmentExcel: function (data, callback, res, user) {
    var coreArr = this.completeGetAssignmentAggregate(data, user);
    var paginationArr = [{
      $skip: parseInt((data.pagenumber - 1) * data.pagelimit)
    }, {
      $limit: data.pagelimit
    }, {
      $project: {
        _id: 1,
        name: 1,
        owner: "$owner.name",
        insurerName: "$insurer.name",
        insuredName: "$insured.name",
        brokerName: "$broker.name",
        department: "$department.name",
        city: "$city.name",
        intimatedLoss: 1,
        timelineStatus: 1,
        status: 1
      }
    }];
    var countArr = [{
      $group: {
        _id: null,
        count: {
          $sum: 1
        }
      }
    }];
    var sortArr = this.sortOfGetAssignmentAggregate(data);

    Assignment.aggregate(_.concat(coreArr, sortArr)).allowDiskUse(true).exec(function (err, data1) {
      if (err) {
        console.log("In IF");
        callback(null, data1);
      } else {
        console.log("In Else", data1); {
          if (_.isEmpty(data1)) {
            callback("No Payment found.", null);
          } else {
            // console.log("Done", data1[37]);
            var excelData = [];
            // console.log("ABCD", data1[3].invoice[0]);
            _.each(data1, function (n, key) {
              // console.log("Key",);
              var obj = {};
              obj["SR #"] = key + 1;
              obj["Branch"] = n.branch;
              obj["MR #"] = n.name;
              obj["Insurer Claim #"] = n.insurerClaimId;
              obj["Insured Claim #"] = n.insuredClaimId;
              obj["Broker Claim #"] = n.brokerClaimId;
              obj["Date of Assignment"] = moment(n.createdAt).format("DD-MM-YYYY");
              obj["Insured"] = n.insuredName;
              obj["Insurer"] = n.insurerName;
              obj["Broker"] = n.brokerName;
              obj["Department"] = n.department;
              obj["Nature of Loss"] = n.natureOfLoss;
              obj["Estimated Loss"] = n.intimatedLoss;
              obj["Owner"] = n.owner;
              if (n.survey) {
                if (n.survey.length > 0 && n.survey != undefined) {
                  if (n.survey[n.survey.length - 1].status == "Completed") {
                    console.log("In Survey", n.survey[n.survey.length - 1].surveyDate)
                    obj["Survey Date"] = moment(n.survey[n.survey.length - 1].surveyDate).format("DD-MM-YYYY");
                  }
                } else {
                  obj["Survey Date"] = "NA"
                }
              } else {
                obj["Survey Date"] = "NA"
              }
              if (n.invoice) {
                console.log("Invoice........", n.invoice);
                if (n.invoice.length > 0 && n.invoice != undefined) {
                  console.log("Invoice........", n.invoice[0]);
                  obj["Reported Date"] = moment(n.invoice[0]).format("DD-MM-YYYY");
                } else {
                  obj["Reported Date"] = "NA"
                }
              } else {
                obj["Reported Date"] = "NA"
              }

              obj["Status"] = n.timelineStatus
              // obj.nature=n.natureOfLoss[0];
              excelData.push(obj);
            });
            Config.generateExcel("Assignment", excelData, res);
          }
        }
        // callback(null, data1);
      }
    });



  },

  assignmentFilter: function (data, callback) {
    var Model = this;
    var Const = this(data);
    var maxRow = Config.maxRow;
    var pagestartfrom = (data.page - 1) * maxRow;
    var page = 1;
    var aggText = [];
    var arr = [];
    if (data.name !== "") {
      var name = {
        "name": {
          $regex: data.name,
          $options: 'i'
        }
      }
      arr.push(name);
    }
    if (data.intimatedLoss !== "") {
      var intimatedLoss = {
        "intimatedLoss": {
          $regex: data.intimatedLoss,
          $options: 'i'
        }
      }
      arr.push(intimatedLoss);
    }
    if (data.city !== "") {
      var name = {
        "city.name": {
          $regex: data.city,
          $options: 'i'
        }
      }
      arr.push(name);
    }
    if (data.city !== "") {
      var city = {
        "city.name": {
          $regex: data.city,
          $options: 'i'
        }
      };
      arr.push(city);
    }
    if (data.insurer !== "") {
      var insurer = {
        "insurer.name": {
          $regex: data.insurer,
          $options: 'i'
        }
      };
      arr.push(insurer);
    }
    if (data.insured !== "") {
      var insured = {
        "insured.name": {
          $regex: data.insured,
          $options: 'i'
        }
      };
      arr.push(insured);
    }
    if (data.owner !== "") {
      var owner = {
        "owner.name": {
          $regex: data.owner,
          $options: 'i'
        }
      };
      arr.push(owner);
    }
    if (data.department !== "") {
      var department = {
        "department.name": {
          $regex: data.department,
          $options: 'i'
        }
      };
      arr.push(department);
    }
    if (data.timelineStatus !== "") {
      var timelineStatus = {
        "timelineStatus": {
          $regex: data.timelineStatus,
          $options: 'i'
        }
      };
      arr.push(timelineStatus);
    }

    aggText = [{
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
        from: "employees",
        localField: "owner",
        foreignField: "_id",
        as: "owner"
      }
    }, {
      $unwind: "$owner"
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
    }, {
      $project: {
        name: 1,
        timelineStatus: 1,
        intimatedLoss: 1,
        city: "$city.name",
        insurer: "$insurer.name",
        insured: "$insured.name",
        owner: "$owner.name",
        department: "$department.name"
      }
    }, {
      $skip: parseInt(pagestartfrom)
    }, {
      $limit: maxRow
    }];
    Assignment.aggregate(aggText).exec(function (err, found) {

      if (err) {
        callback(err, null);
      } else {
        callback(null, found);
      }
    });
  },

  getExpenditure: function (data, callback) {
    Assignment.aggregate([{
        $unwind: "$templateInvoice"
      }, {
        $unwind: "$templateInvoice.forms"
      }, {
        $lookup: {
          from: "invoiceexpenditures",
          localField: "templateInvoice.forms.invoiceExpenditure",
          foreignField: "_id",
          as: "templateInvoice.forms.InvoiceExpenditure"
        }
      }, {
        $unwind: "$templateInvoice.forms.InvoiceExpenditure"
      }, {
        $match: {
          'templateInvoice._id': objectid(data._id)
        }
      }, {
        $group: {
          _id: "$_id",
          forms: {
            $addToSet: "$templateInvoice.forms"
          },
          tax: {
            $addToSet: "$templateInvoice.tax"
          },
          templateId: {
            $addToSet: "$templateInvoice._id"
          },
          name: {
            $addToSet: "$templateInvoice.name"
          }
        }
      }, {
        $unwind: "$templateId"
      }, {
        $unwind: "$name"
      }
      // , {
      //   $project: {
      //     name: 1,
      //     surveyDate: 1,
      //     address: 1,
      //     InvoiceExpenditure: "$templateInvoice.forms.InvoiceExpenditure.name"
      //     }
      // }
    ], function (err, data1) {
      if (err) {
        callback(err, null);
      } else if (data1 && data1.length > 0) {
        callback(null, data1);
      } else {
        callback(null, []);
      }
    });
  },

  updateOfficeId: function (data, callback) {
    Assignment.find({}, {
      branch: 1
    }).populate("branch", "office").lean().exec(function (err, findData) {
      if (err) {
        // console.log("err", err);
        callback(err, null);
      } else {
        if (_.isEmpty(findData)) {
          callback("No Data found", null);
        } else {
          // callback(null,findData);
          async.eachSeries(findData, function (n, callback1) {
            // console.log("n", n);
            Assignment.update({
              _id: n._id
            }, {
              office: n.branch.office
            }, function (err, data3) {
              if (err) {
                callback1(err, null)
              } else {
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
      }
    });
  },
  getSurveyorApprovalList: function (data, callback) {
    var Model = this;
    var maxRow = Config.maxRow;
    var pagestartfrom = (data.page - 1) * maxRow;
    var page = 1;
    var aggText = [];
    var aggTextCount = [];
    var type = data.type;
    var unwind1 = {};
    var match1 = {};
    var sort1 = {};
    if (_.isEmpty(data.name)) {
      var name = {
        $match: {
          "survey.status": "Approval Pending"
        }
      }
    } else {
      var name = {
        $match: {
          "survey.status": "Approval Pending",
          "name": {
            $regex: data.name,
            $options: 'i'
          }
        }
      }
    }
    aggText = [{
        $unwind: {
          path: "$survey"
        }
      }, name, {
        $lookup: {
          from: "cities",
          localField: "city",
          foreignField: "_id",
          as: "city"
        }
      }, {
        $unwind: {
          path: "$city"
        }
      }, {
        $lookup: {
          from: "employees",
          localField: "survey.employee",
          foreignField: "_id",
          as: "survey.employee"
        }
      }, {
        $unwind: {
          path: "$survey.employee"
        }
      }, {
        $sort: {
          "survey.timestamp": 1
        }
      }, {
        $skip: parseInt(pagestartfrom)
      }, {
        $limit: maxRow
      }],
      aggTextCount = [{
        $unwind: {
          path: "$survey"
        }
      }, name, {
        $lookup: {
          from: "cities",
          localField: "city",
          foreignField: "_id",
          as: "city"
        }
      }, {
        $unwind: {
          path: "$city"
        }
      }, {
        $lookup: {
          from: "employees",
          localField: "survey.employee",
          foreignField: "_id",
          as: "survey.employee"
        }
      }, {
        $unwind: {
          path: "$survey.employee"
        }
      }, {
        $sort: {
          "survey.timestamp": 1
        }
      }, {
        $group: {
          _id: null,
          count: {
            $sum: 1
          }
        }
      }, {
        $project: {
          "_id": 1,
          "count": 1
        }
      }]
    async.parallel([
        function (callback) {
          Model.aggregate(aggText,
            function (err, data1) {
              if (err) {
                callback(err, null);
              } else {
                callback(null, data1)
              }

            });
        },
        function (callback) {
          Model.aggregate(aggTextCount,
            function (err, data2) {
              if (err) {
                callback(err, null);
              } else {
                callback(null, data2)
              }

            });
        }
      ],
      function (err, data4) {
        if (err) {
          callback(err, null);
        } else {
          if (_.isEmpty(data4[1])) {
            var data5 = {
              results: data4[0],
              options: {
                count: 0
              }
            };
          } else {
            var data5 = {
              results: data4[0],
              options: {
                count: maxRow
              }
            };
            data5.total = data4[1][0].count;
          }
          callback(null, data5);
        }
      });
  },


  getApprovalList: function (data, callback) {
    var Model = this;
    var maxRow = Config.maxRow;
    var pagestartfrom = (data.page - 1) * maxRow;
    var page = 1;
    var aggText = [];
    var aggTextCount = [];
    var type = data.type;
    var unwind1 = {};
    var match1 = {};
    var sort1 = {};
    if (type == "templateIla") {
      unwind1 = {
        "$unwind": "$templateIla"
      };
      match1 = {
        "$match": {
          "templateIla.approvalStatus": "Pending"
        }
      };
      sort1 = {
        "$sort": {
          "templateIla.timestamp": 1
        }
      };
    } else if (type == "templateLor") {
      unwind1 = {
        "$unwind": "$templateLor"
      };
      match1 = {
        "$match": {
          "templateLor.approvalStatus": "Pending"
        }
      };
      sort1 = {
        "$sort": {
          "templateLor.timestamp": 1
        }
      };
    }
    aggText = [{
        $lookup: {
          from: "employees",
          localField: "owner",
          foreignField: "_id",
          as: "owner"
        }
      }, {
        $unwind: {
          path: "$owner",
          preserveNullAndEmptyArrays: true
        }
      }, unwind1, match1, sort1, {
        $skip: parseInt(pagestartfrom)
      }, {
        $limit: maxRow
      }],
      aggTextCount = [{
        $lookup: {
          from: "employees",
          localField: "owner",
          foreignField: "_id",
          as: "owner"
        }
      }, {
        $unwind: {
          path: "$owner",
          preserveNullAndEmptyArrays: true
        }
      }, unwind1, match1, sort1, {
        $group: {
          _id: null,
          count: {
            $sum: 1
          }
        }
      }, {
        $project: {
          "_id": 1,
          "count": 1
        }
      }]
    async.parallel([
        function (callback) {
          Model.aggregate(aggText,
            function (err, data1) {
              if (err) {
                callback(err, null);
              } else {
                callback(null, data1)
              }

            });
        },
        function (callback) {
          Model.aggregate(aggTextCount,
            function (err, data2) {
              if (err) {
                callback(err, null);
              } else {
                callback(null, data2)
              }

            });
        }
      ],
      function (err, data4) {
        if (err) {
          callback(err, null);
        } else {
          if (_.isEmpty(data4[1])) {
            var data5 = {
              results: data4[0],
              options: {
                count: 0
              }
            };
          } else {
            var data5 = {
              results: data4[0],
              options: {
                count: maxRow
              }
            };
            data5.total = data4[1][0].count;
          }
          callback(null, data5);
        }
      });
  },

  saveTemplate: function (data, callback) {
    var matchObj = {};
    var matchObj2 = {};
    var approvalStatus = {};
    var authTimestamp = {};
    var reqtimestamp = {};
    var file = {};
    var lorCount = {};
    if (data.type == "templateIla") {
      if (!_.isEmpty(data.approvalStatus)) {
        var approvalStatus = {
          "templateIla.$.approvalStatus": data.approvalStatus
        };
      }
      if (!_.isEmpty(data.authTimestamp)) {
        var authTimestamp = {
          "templateIla.$.authTimestamp": data.authTimestamp
        };
      }
      if (!_.isEmpty(data.file)) {
        var file = {
          "templateIla.$.file": data.file
        };
      }
      if (!_.isEmpty(data.reqtimestamp)) {
        var reqtimestamp = {
          "templateIla.$.reqtimestamp": data.reqtimestamp
        };
      }
    }
    if (data.type == "templateLor") {
      if (!_.isEmpty(data.approvalStatus)) {
        var approvalStatus = {
          "templateLor.$.approvalStatus": data.approvalStatus
        };
      }
      if (!_.isEmpty(data.authTimestamp)) {
        var authTimestamp = {
          "templateLor.$.authTimestamp": data.authTimestamp
        };
      }
      if (!_.isEmpty(data.file)) {
        var file = {
          "templateLor.$.file": data.file
        };
      }
      if (!_.isEmpty(data.reqtimestamp)) {
        var reqtimestamp = {
          "templateLor.$.reqtimestamp": data.reqtimestamp
        };
      }
      if (!_.isEmpty(data.lorCount)) {
        var lorCount = {
          "templateLor.$.lorCount": data.lorCount
        };
      }
    }

    var set2 = Object.assign(approvalStatus, authTimestamp, file, reqtimestamp, lorCount);
    console.log("Set2................................................", set2);
    if (data.type == "templateIla") {
      matchObj = {
        _id: data.assignId,
        templateIla: {
          $elemMatch: {
            _id: data._id
          }
        }
      };
      matchObj2 = {
        $set: set2
      };
    } else if (data.type == "templateLor") {
      console.log("In templateLor", data);
      matchObj = {
        _id: data.assignId,
        templateLor: {
          $elemMatch: {
            _id: data._id
          }
        }
      };
      matchObj2 = {
        $set: set2
      };
    } else if (data.type == "survey") {
      matchObj = {
        _id: data.assignId,
        survey: {
          $elemMatch: {
            _id: data._id
          }
        }
      };
      matchObj2 = {
        $set: {
          "survey.$.status": "Pending"
        }
      };
    }
    Assignment.update(matchObj, matchObj2).exec(function (err, updated) {
      if (err) {
        callback(err, null);
      } else {

        Assignment.getOne({
          _id: data.assignId
        }, function (err, assignmentData) {
          if (err) {
            callback("No data found in assignment", null);
          } else {
            if (_.isEmpty(assignmentData)) {
              callback("No data found in assignment search", null);
            } else {
              var emailData = {};
              emailData.assignmentNo = assignmentData.name;
              emailData.ownerName = assignmentData.owner.name;
              emailData.ownerEmail = assignmentData.owner.officeEmail;
              emailData.ownerPhone = assignmentData.owner.officeMobile;
              emailData.siteAddress = (assignmentData.address ? assignmentData.address : '');
              if (assignmentData.city.name) {
                emailData.siteCity = assignmentData.city.name;
                if (assignmentData.city.district) {
                  emailData.siteDistrict = assignmentData.city.district.name;
                  if (assignmentData.city.district.state) {
                    emailData.siteState = assignmentData.city.district.state.name;
                    if (assignmentData.city.district.state.zone) {
                      emailData.siteZone = assignmentData.city.district.state.zone.name;
                      if (assignmentData.city.district.state.zone.country) {
                        emailData.siteCountry = assignmentData.city.district.state.zone.country.name;
                      }
                    }
                  }
                }
              }
              emailData.fullAddress = emailData.siteAddress + " " + emailData.siteCity + " " + emailData.siteState + " " + emailData.siteZone + " " + emailData.siteCountry;
              console.log("emaildata fullAddress", emailData.fullAddress);
              if (assignmentData.insured) {
                if (assignmentData.insured.name) {
                  emailData.insuredName = (assignmentData.insured.name ? assignmentData.insured.name : "");
                } else {
                  emailData.insuredName = "";
                }
              } else {
                emailData.insuredName = "";
              }
              if (assignmentData.templateIla[0]) {
                emailData.ilaAuthDate = assignmentData.templateIla[0].authTimestamp;
              }

              // emailData.surveyDate = (surveyDate ? moment(surveyDate).format("DD/MM/YYYY") : "");
              // console.log("emailData In 1 ", emailData);
              if (assignmentData.survey) {
                _.each(assignmentData.survey, function (values) {
                  // console.log("survey: ", values);
                  if (values.status == "Pending") {
                    // console.log("In surveyor");
                    // console.log(" values.employee.mobile", values.employee.mobile);
                    emailData.surveyorNumber = values.employee.officeMobile;
                    emailData.surveyorName = values.employee.name;
                    emailData.surveyorEmail = values.employee.officeEmail;
                    emailData.surveyDate = (values.surveyDate ? moment(values.surveyDate).format("DD/MM/YYYY") : "");
                  }
                });
              }


              // console.log("emailData In 2 ", emailData);
              emailData.to = [];
              emailData.to.push({
                name: assignmentData.owner.name,
                email: assignmentData.owner.officeEmail
              });
              emailData.cc = [];
              if (assignmentData.shareWith) {
                _.each(assignmentData.shareWith, function (values) {
                  // console.log("values", values);
                  _.each(values.persons, function (personss) {
                    // console.log("persons", personss);
                    emailData.cc.push({
                      name: personss.name,
                      email: personss.officeEmail
                    })
                  });
                });
              }

              if (data.users) {
                emailData.assignmentAuthorizer = data.users.name;
              }
              // console.log('mailData', mailData);
              if (data.type == "survey") {
                // console.log("IN survey");
                //Find Acknowledgment Email data
                var mailData = [];
                mailData[0] = "SBC Approves Surveyor";
                mailData[1] = emailData;
                mailData[2] = data.accessToken;
                mailData[3] = data.users.email;
                // mailData[4] = assignmentData.threadId;
                Assignment.getMailAndSendMail(mailData, function (err, newData) {
                  if (err) {
                    callback(null, err);
                  } else {
                    if (_.isEmpty(newData)) {
                      callback("There was an error while sending mail", null);
                    } else {
                      callback(null, newData);
                    }
                  }
                });
              } else if (data.type == "templateIla") {
                // console.log("IN templateIla");
                //Find Acknowledgment Email data
                if (data.approvalStatus == "Approved") {

                  var mailData = [];
                  mailData[0] = "ILA Authorization";
                  mailData[1] = emailData;
                  mailData[2] = data.accessToken;
                  mailData[3] = data.users.email;
                  Assignment.getMailAndSendMail(mailData, function (err, newData) {
                    if (err) {
                      callback(null, err);
                    } else {
                      if (_.isEmpty(newData)) {
                        callback("There was an error while sending mail", null);
                      } else {
                        callback(null, newData);
                      }
                    }
                  });
                } else if (data.approvalStatus == "Revised") {
                  var mailData = [];
                  mailData[0] = "ILA Back to Regenerate";
                  mailData[1] = emailData;
                  mailData[2] = data.accessToken;
                  mailData[3] = data.users.email;
                  Assignment.getMailAndSendMail(mailData, function (err, newData) {
                    if (err) {
                      callback(null, err);
                    } else {
                      if (_.isEmpty(newData)) {
                        callback("There was an error while sending mail", null);
                      } else {
                        callback(null, newData);
                      }
                    }
                  });
                } else {
                  callback(null, updated);
                }
              } else if (data.type == "templateLor") {
                // console.log("IN templateIlor");
                //Find Acknowledgment Email data
                if (data.approvalStatus == "Approved") {

                  var mailData = [];
                  mailData[0] = "LOR Authorization";
                  mailData[1] = emailData;
                  mailData[2] = data.accessToken;
                  mailData[3] = data.users.email;
                  Assignment.getMailAndSendMail(mailData, function (err, newData) {
                    if (err) {
                      callback(null, err);
                    } else {
                      if (_.isEmpty(newData)) {
                        callback("There was an error while sending mail", null);
                      } else {
                        callback(null, newData);
                      }
                    }
                  });
                } else if (data.approvalStatus == "Revised") {
                  var mailData = [];
                  mailData[0] = "LOR Back to Regenerate";
                  mailData[1] = emailData;
                  mailData[2] = data.accessToken;
                  mailData[3] = data.users.email;
                  Assignment.getMailAndSendMail(mailData, function (err, newData) {
                    if (err) {
                      callback(null, err);
                    } else {
                      if (_.isEmpty(newData)) {
                        callback("There was an error while sending mail", null);
                      } else {
                        callback(null, newData);
                      }
                    }
                  });
                } else {
                  callback(null, updated);
                }
              } else {
                callback(null, updated);
              }
            }
          }
        });
      }
    });
  },

  getMailAndSendMail: function (data, callback) {
    Assignment.getMailData(data, function (err, emailData) {
      console.log("emailData ==== ", emailData);
      if (err) {
        // console.log("err", err);
      } else {
        if (_.isEmpty(emailData)) {
          callback("No mail data found", null);
        } else {
          emailData.accessToken = data[2];
          //Get User google accessToken
          Assignment.getUserData({
            email: data[3]
          }, function (err, userdata) {
            if (err) {
              callback(err, null);
              // console.log("err", err);
            } else {
              if (_.isEmpty(userdata)) {
                // console.log("No user data found!", null);
                callback(err, null);
              } else {
                emailData.user = userdata;
                // callback(null, emailData);
                //Send email

                if (data[4]) {
                  emailData.threadId = data[4];
                }

                Assignment.sendEmails(emailData, function (err, mailData) {
                  console.log("mailData", mailData);
                  if (err) {
                    callback(err, null);
                    console.log("err", err);
                  } else {
                    console.log("mail datas", mailData);
                    callback(null, mailData);
                  }
                });
              }
            }
          });

        }
      }
    });
  },
  // 
  updateNewSurveyor: function (data, callback) {
    Assignment.update({
      _id: data.assignId,
      survey: {
        $elemMatch: {
          _id: data.surveyId
        }
      }
    }, {
      $set: {
        "survey.$.employee": data.employee
      }
    }).exec(function (err, data) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  getAssignmentApprovalList: function (data, callback) {
    var Model = this;
    var maxRow = Config.maxRow;
    var pagestartfrom = (data.page - 1) * maxRow;
    var page = 1;
    var aggText = [];
    var aggTextCount = [];
    var arr = ["Pending ForceClosed", "Pending ReOpened", "Pending OnHold"];

    aggText = [{
        $match: {
          assignmentapprovalStatus: {
            $in: arr
          }
        }
      }, {
        $skip: parseInt(pagestartfrom)
      }, {
        $limit: maxRow
      }],
      aggTextCount = [{
        $match: {
          assignmentapprovalStatus: {
            $in: arr
          }
        }
      }, {
        $group: {
          _id: null,
          count: {
            $sum: 1
          }
        }
      }, {
        $project: {
          "_id": 1,
          "count": 1
        }
      }]
    async.parallel([
        function (callback) {
          Model.aggregate(aggText,
            function (err, data1) {
              if (err) {
                callback(err, null);
              } else {
                callback(null, data1)
              }

            });
        },
        function (callback) {
          Model.aggregate(aggTextCount,
            function (err, data2) {
              if (err) {
                callback(err, null);
              } else {
                callback(null, data2)
              }

            });
        }
      ],
      function (err, data4) {
        if (err) {
          callback(err, null);
        } else {
          if (_.isEmpty(data4[1])) {
            var data5 = {
              results: data4[0],
              options: {
                count: 0
              }
            };
          } else {
            var data5 = {
              results: data4[0],
              options: {
                count: maxRow
              }
            };
            data5.total = data4[1][0].count;
          }
          callback(null, data5);
        }
      });
  },

  searchLogistic: function (data, callback) {
    var Model = this;
    var maxRow = Config.maxRow;
    var pagestartfrom = (data.page - 1) * maxRow;
    var page = 1;
    var aggText = [];
    var aggTextCount = [];
    var arr = ["BBND", "Dispatched", "DBND", "Delivered"];

    aggText = [{
        $match: {
          timelineStatus: {
            $in: arr
          }
        }
      }, {
        $skip: parseInt(pagestartfrom)
      }, {
        $limit: maxRow
      }],
      aggTextCount = [{
        $match: {
          timelineStatus: {
            $in: arr
          }
        }
      }, {
        $group: {
          _id: null,
          count: {
            $sum: 1
          }
        }
      }, {
        $project: {
          "_id": 1,
          "count": 1
        }
      }]
    async.parallel([
        function (callback) {
          Model.aggregate(aggText,
            function (err, data1) {
              if (err) {
                callback(err, null);
              } else {
                callback(null, data1)
              }

            });
        },
        function (callback) {
          Model.aggregate(aggTextCount,
            function (err, data2) {
              if (err) {
                callback(err, null);
              } else {
                callback(null, data2)
              }

            });
        }
      ],
      function (err, data4) {
        if (err) {
          callback(err, null);
        } else {
          if (_.isEmpty(data4[1])) {
            var data5 = {
              results: data4[0],
              options: {
                count: 0
              }
            };
          } else {
            var data5 = {
              results: data4[0],
              options: {
                count: maxRow
              }
            };
            data5.total = data4[1][0].count;
          }
          callback(null, data5);
        }
      });
  },

  updateThreadId: function (data, callback) {
    Assignment.update({
      _id: data._id,
    }, {
      threadId: data.threadId
    }).exec(function (err, data) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  getMailData: function (data, callback) {
    var mailData = data[1];
    // if(data[3]){
    //   emailData.assignmentAuthorizerEmail = (data[3] ? data[3] : "NA");
    // }
    // console.log("email Data == in ", data);
    emailData = {};
    var i = 0;
    var toData = [];
    mailData.to = _.cloneDeep(mailData.to);
    _.map(mailData.to, function (values) {
      console.log("mailData values", values);
      if (values.email == undefined) {
        values.email = "";
      }
      values.email.toString();
      values.name.toString();
    });
    emailData.to = _.uniqBy(mailData.to, "email");
    // console.log("values array ", mailData.to, emailData.to);
    emailData.sbcTo = (mailData.sbcTo ? mailData.sbcTo : []);
    emailData.assignmentNo = (mailData.assignmentNo ? mailData.assignmentNo : "NA");
    emailData.assignmentAuthorizer = (mailData.assignmentAuthorizer ? mailData.assignmentAuthorizer : "NA");
    emailData.ownerName = (mailData.ownerName ? mailData.ownerName : "NA");
    emailData.ownerEmail = (mailData.ownerEmail ? mailData.ownerEmail : "NA");
    emailData.ownerPhone = (mailData.ownerPhone ? mailData.ownerPhone : "NA");
    emailData.siteCity = (mailData.siteCity ? mailData.siteCity : "NA");
    emailData.invoiceNumber = (mailData.invoiceNumber ? mailData.invoiceNumber : "NA");
    emailData.to = (mailData.to ? mailData.to : []);
    emailData.cc = (mailData.cc ? mailData.cc : []);
    emailData.bcc = (mailData.bcc ? mailData.bcc : []);
    emailData.surveyorNumber = (mailData.surveyorNumber ? mailData.surveyorNumber : "NA");
    emailData.surveyorName = (mailData.surveyorName ? mailData.surveyorName : "NA");
    emailData.surveyorEmail = (mailData.surveyorEmail ? mailData.surveyorEmail : "NA");
    emailData.insuredName = (mailData.insuredName ? mailData.insuredName : "NA");
    emailData.ilaAuthDate = (mailData.ilaAuthDate ? mailData.ilaAuthDate : "NA");
    emailData.surveyorNumber = (mailData.surveyorNumber ? mailData.surveyorNumber : "NA");
    emailData.surveyorName = (mailData.surveyorName ? mailData.surveyorName : "NA");
    emailData.surveyorEmail = (mailData.surveyorEmail ? mailData.surveyorEmail : "NA");
    emailData.surveyDate = (mailData.surveyDate ? mailData.surveyDate : "NA");
    emailData.fullAddress = (mailData.fullAddress ? mailData.fullAddress : "NA");
    emailData.surveyorCity = (mailData.surveyorCity ? mailData.surveyorCity : "NA");
    emailData.productName = (mailData.productName ? mailData.productName : "NA");
    emailData.forceClosedComment = (mailData.forceClosedComment ? mailData.forceClosedComment : "NA");
    emailData.reopenComment = (mailData.reopenComment ? mailData.reopenComment : "NA");
    emailData.onholdComment = (mailData.onholdComment ? mailData.onholdComment : "NA");

    console.log("emailData : ", emailData);

    switch (data[0]) {
      case "Acknowledgment Email":
        {
          var emails = {
            name: 'Acknowledgment Email',
            from: emailData.ownerEmail,
            to: emailData.to,
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: "Assignment : " + emailData.assignmentNo + " | Site City : " + emailData.siteCity,
            message: "<html><body><p style='font-size: 16px;'>Dear Sir/Madam,</p><p style='font-size: 16px;'>Thank you for retaining us to inspect & assess the subject loss. This is to confirm that " + emailData.surveyorName + " shall be attending this claim. He can be reached on " + emailData.surveyorNumber + ". Our reference number for this claim would be " + emailData.assignmentNo + "</p> <p style='font-size: 16px;'>Should you ever need any support / information / update, please feel at ease to get in touch with me.</p><br>" + "<p style='font-size: 16px;'>Warm Regards, <br>" + emailData.ownerName + "<br> " + emailData.ownerPhone + "<br>" + emailData.ownerEmail + "</p></body></html>"
          }
          callback(null, emails);
        }
        break;
      case "Deputation mail":
        {
          var to = [];
          to.push({
            name: emailData.surveyorName,
            email: emailData.surveyorEmail
          })
          var emails = {
            name: 'Deputation mail',
            from: emailData.ownerEmail,
            to: to,
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: "Assignment : " + emailData.assignmentNo + " | Site City : " + emailData.siteCity,
            message: "<html><body><p style='font-size: 16px;'>Dear " + emailData.surveyorName + ",</p><p style='font-size: 16px;'>Please refer to our telecom, in respect of the subject claim. You are requested to kindly attend the loss inline with the discussions held and specific requirements of the claim. Our reference number for this claim would be " + emailData.assignmentNo + "</p> <p style='font-size: 16px;'>In order to assist you, we are attaching relevant format of JIR. Please ensure to capture every detail there in & get the same duly signed by the concerned person. In an unlikely event wherein there is a difference of opinion between yourself & the concerned person, both the opinions may be recorded. We would appreciate a brief call from the site while you are attending the loss as this helps us update the insurer's of the developments. Should you ever need any support / information / update please feel at ease to get in touch with me. I will be more than willing to assist.</p><br>" + "<p style='font-size: 16px;'>Warm Regards, <br>" + emailData.ownerName + "<br> " + emailData.ownerPhone + "<br>" + emailData.ownerEmail + "</p></body></html>"
          }
          callback(null, emails);
        }
        break;
      case "On Survey Attended":
        {
          var emails = {
            name: 'On Survey Attended',
            from: emailData.ownerEmail,
            to: emailData.to,
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: "Assignment : " + emailData.assignmentNo + " | Site City : " + emailData.siteCity,
            message: "<html><body><p style='font-size: 16px;'>We are pleased to inform you that the survey for the said claim has been attended on " + emailData.surveyDate + " No sooner we receive further details, we shall update you in this regard. Meanwhile, request you to kindly bear with us. Should you ever need any support / information / update please feel at ease to get in touch with me. I will be more than willing to assist.</p><br>" + "<p style='font-size: 16px;'>Warm Regards, <br>" + emailData.ownerName + "<br> " + emailData.ownerPhone + "<br>" + emailData.ownerEmail + "</p></body></html>"
          }
          callback(null, emails);
        }
        break;
      case "ILA Authorization":
        {
          var emails = {
            name: 'ILA Authorization',
            from: emailData.ownerEmail,
            to: emailData.to,
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: "ILA Authorized of Assignment : " + emailData.assignmentNo,
            message: "<html><body><p style='font-size: 16px;'>Dear " + emailData.ownerName + "</p><p style='font-size: 16px;'>I have gone through the ILA prepared for " + emailData.insuredName + ", Assignment No. " + emailData.assignmentNo + " and have  authorized the same. It is OK to release</p><br>" + "<p style='font-size: 16px;'> Warm Regards, <br>" + emailData.assignmentAuthorizer + "</p></body></html>"
          }
          callback(null, emails);
        }
        break;

      case "ILA Back to Regenerate":
        {
          var emails = {
            name: 'ILA Back to Regenerate',
            from: emailData.ownerEmail,
            to: emailData.to,
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: "ILA Sent back for regeneration of Assignment : " + emailData.assignmentNo,
            message: "<html><body><p style='font-size: 16px;'>Dear " + emailData.ownerName + "</p><p style='font-size: 16px;'>This is to inform you that ILA No. " + emailData.assignmentNo + " has NOT been authorized on " + emailData.ilaAuthDate + ". Please regenrate as per the comments.</p><br>" + "<p style='font-size: 16px;'> Warm Regards, <br>" + emailData.assignmentAuthorizer + "</p></body></html>"
          }
          callback(null, emails);
        }
        break;

      case "ILA Release":
        {
          var emails = {
            name: 'ILA Release',
            from: emailData.ownerEmail,
            to: emailData.to,
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: "ILA Authorized of Assignment : " + emailData.assignmentNo,
            message: "<html><body><p style='font-size: 16px;'>Dear Sir/Madam,</p><p style='font-size: 16px;'>We are pleased to release the ILA in respect of our Assignment No. " + emailData.assignmentNo + " and your #ClaimNo# and #PolicyNo#.</p><p style='font-size: 16px;'>We hope that the same shall serve your purpose. Should you ever need any support / information / update please feel at ease to get in touch with me. I will be more than willing to assist.</p>" + "<p style='font-size: 16px;'> Warm Regards, <br>" + emailData.ownerName + "<br> " + emailData.ownerPhone + "<br>" + emailData.ownerEmail + "</p></body></html>"
          }
          callback(null, emails);
        }
        break;

      case "ILA Send for Authorization":
        {
          var emails = {
            name: 'ILA Send for Authorization',
            from: emailData.ownerEmail,
            to: emailData.to,
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: "ILA Send for Authorization Mail of Assignment : " + emailData.assignmentNo,
            message: "<html><body><p style='font-size: 16px;'>Please go through the ILA for Assignment No. " + emailData.assignmentNo + " in respect of loss sustained by " + emailData.insuredName + " on account of damage to " + emailData.productName + " and authorize the same.</p><br>" + "<p style='font-size: 16px;'> Warm Regards, <br>" + emailData.assignmentAuthorizer + "</p></body></html>"
          }
          callback(null, emails);
        }
        break;

      case "Invoice Authorization":
        {
          var emails = {
            name: 'Invoice Authorization',
            from: emailData.ownerEmail,
            to: emailData.to,
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: "Invoice Authorization : " + emailData.invoiceNumber,
            message: "<html><body><p style='font-size: 16px;'>I have gone through the Invoice prepared for " + emailData.insuredName + ", Invoice No. " + emailData.invoiceNumber + " and authorized the same. It is OK to release.</p><br>" + "<p style='font-size: 16px;'> Warm Regards, <br>" + emailData.ownerName + "<br> " + emailData.ownerPhone + "<br>" + emailData.ownerEmail + "</p></body></html>"
          }
          callback(null, emails);
        }
        break;

      case "Invoice Back to Regenerate":
        {
          var emails = {
            name: 'Invoice Back to Regenerate',
            from: emailData.ownerEmail,
            to: emailData.to,
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: "Invoice Back to Regenerate : " + emailData.invoiceNumber,
            message: "<html><body><p style='font-size: 16px;'>I have gone through the Invoice prepared for " + emailData.insuredName + ", Invoice No. " + emailData.invoiceNumber + ", Kindly make the changes as advised to you & resend for authorization.</p><p style='font-size: 16px;'>Please let me know if assistance required.</p>" + "<p style='font-size: 16px;'> Warm Regards, <br>" + emailData.ownerName + "<br> " + emailData.ownerPhone + "<br>" + emailData.ownerEmail + "</p></body></html>"
          }
          callback(null, emails);
        }
        break;

      case "Invoice Cancel":
        {
          var emails = {
            name: 'Invoice Cancel',
            from: emailData.ownerEmail,
            to: emailData.to,
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: "Invoice Cancel : #InvoiceNo#",
            message: "<html><body><p style='font-size: 16px;'>This is to inform all that the Invoice #InvoiceNo# has been canceled.</p><p style='font-size: 16px;'>You may update your record accordingly.</p>" + "<p style='font-size: 16px;'> Warm Regards, <br>" + emailData.ownerName + "<br> " + emailData.ownerPhone + "<br>" + emailData.ownerEmail + "</p></body></html>"
          }
          callback(null, emails);
        }
        break;

      case "Invoice Release":
        {
          var emails = {
            name: 'Invoice Release',
            from: emailData.ownerEmail,
            to: emailData.to,
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: "",
            message: "<html><body><p style='font-size: 16px;'>Dear Sir/Madam,We are pleased to attach our bill for professional services rendered for your kind perusal & payment. Our bank details are as follows: #BankDetails# You are requested to kindly release our payment & confirm in order to enable us to release the report.</p><br>" + "<p style='font-size: 16px;'> Warm Regards, <br>" + emailData.ownerName + "<br> " + emailData.ownerPhone + "<br>" + emailData.ownerEmail + "</p></body></html>"
          }
          callback(null, emails);
        }
        break;

      case "Invoice Revise":
        {
          var emails = {
            name: 'Invoice Revise',
            from: emailData.ownerEmail,
            to: emailData.to,
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: "Invoice Revise : #InvoiceNo#",
            message: "<html><body><p style='font-size: 16px;'>Invoice #InvoiceNo# has been revised, you are requested to kindly make a note of the same. Copy of the revised invoice is attached for perusal.</p><br>" + "<p style='font-size: 16px;'> Warm Regards, <br>" + emailData.ownerName + "<br> " + emailData.ownerPhone + "<br>" + emailData.ownerEmail + "</p></body></html>"
          }
          callback(null, emails);
        }
        break;

      case "Invoice Send Authorization":
        {
          var emails = {
            name: 'Invoice Send Authorization',
            from: emailData.ownerEmail,
            to: emailData.to,
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: "Invoice Send Authorization : " + emailData.invoiceNumber,
            message: "<html><body><p style='font-size: 16px;'>Please go through the Invoice for Assignment No. " + emailData.assignmentNo + " in respect of loss sustained by " + emailData.insuredName + " on account of damage to " + emailData.productName + " and authorize the same</p><br>" + "<p style='font-size: 16px;'> Warm Regards, <br>" + emailData.ownerName + "<br> " + emailData.ownerPhone + "<br>" + emailData.ownerEmail + "</p></body></html>"
          }
          callback(null, emails);
        }
        break;

      case "LOR Authorization":
        {

          var emails = {
            name: 'LOR Authorization',
            from: emailData.ownerEmail,
            to: emailData.to,
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: "LOR is Authorizaed For Assignment : " + emailData.assignmentNo,
            message: "<html><body><p style='font-size: 16px;'>I have gone through the LOR prepared for " + emailData.insuredName + ", Assignment " + emailData.assignmentNo + " and have authorized the same. It is OK to release.</p><br>" + "<p style='font-size: 16px;'> Warm Regards, <br>" + emailData.assignmentAuthorizer + "</p></body></html>"
          }
          callback(null, emails);
        }
        break;

      case "LOR Back to Regenerate":
        {
          var emails = {
            name: 'LOR Back to Regenerate',
            from: emailData.ownerEmail,
            to: emailData.to,
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: "LOR Back to Regenerate For Assignment No : " + emailData.assignmentNo,
            message: "<html><body><p style='font-size: 16px;'>I have gone through the LOR prepared for " + emailData.insuredName + ", assignment " + emailData.assignmentNo + " Kindly make the changes as advised to you & resend for authorization. Please let me know if assistance required.</p><br>" + "<p style='font-size: 16px;'> Warm Regards, <br>" + emailData.assignmentAuthorizer + "</p></body></html>"
          }
          callback(null, emails);
        }
        break;

      case "LOR Send Authorization":
        {
          var emails = {
            name: 'LOR Send Authorization',
            from: emailData.ownerEmail,
            to: emailData.to,
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: "LOR is Send For Authorization For Assignment : " + emailData.assignmentNo,
            message: "<html><body><p style='font-size: 16px;'>Requesting you to go through the LOR prepared for " + emailData.insuredName + ", assignment " + emailData.assignmentNo + " and authorize the same.</p><br>" + "<p style='font-size: 16px;'> Warm Regards, <br>" + emailData.assignmentAuthorizer + "</p></body></html>"
          }
          callback(null, emails);
        }
        break;

      case "Assignment Force Close Request":
        {
          var emails = {
            name: 'Assignment Force Close Request',
            from: emailData.ownerEmail,
            to: emailData.to,
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: "Assignment Force Close Request for Assignment : " + emailData.assignmentNo,
            message: "<html><body><p style='font-size: 16px;'>Dear " + emailData.ownerName + " ,<br> Requesting you to please Force Close the Assignment. Reason mentioned below. Reason : " + emailData.forceClosedComment + " </p><br>" + "<p style='font-size: 16px;'> Warm Regards, <br>" + emailData.ownerName + "<br> " + emailData.ownerPhone + "<br>" + emailData.ownerEmail + "</p></body></html>"
          }
          callback(null, emails);
        }
        break;

      case "Assignment Force Close Aprproved":
        {
          var emails = {
            name: 'Assignment Force Close Aprproved',
            from: emailData.ownerEmail,
            to: emailData.to,
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: "Assignment Force Close Approved for Assignment : " + emailData.assignmentNo,
            message: "<html><body><p style='font-size: 16px;'>Dear " + emailData.ownerName + " ,<br> As per your request, i have Force Closed the assignment.</p><br>" + "<p style='font-size: 16px;'> Warm Regards, <br>" + emailData.ownerName + "<br> " + emailData.ownerPhone + "<br>" + emailData.ownerEmail + "</p></body></html>"
          }
          callback(null, emails);
        }
        break;

      case "Assignment Force Close Rejected":
        {
          var emails = {
            name: 'Assignment Force Close Rejected',
            from: emailData.ownerEmail,
            to: emailData.to,
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: "Assignment Force Close Rejected for Assignment : " + emailData.assignmentNo,
            message: "<html><body><p style='font-size: 16px;'>Dear " + emailData.ownerName + " ,<br> Your Request for Force Closing the Assignment is Rejected. #Reason#</p><br>" + "<p style='font-size: 16px;'> Warm Regards, <br>" + emailData.ownerName + "<br> " + emailData.ownerPhone + "<br>" + emailData.ownerEmail + "</p></body></html>"
          }
          callback(null, emails);
        }
        break;

      case "Assignment Reopen Request":
        {
          var emails = {
            name: 'Assignment Reopen Request',
            from: emailData.ownerEmail,
            to: emailData.to,
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: "Request for Reopening of Assignment : " + emailData.assignmentNo,
            message: "<html><body><p style='font-size: 16px;'>Dear " + emailData.ownerName + ",<br> Requesting you to please Re-open the Assignment due to some reasons. Reason : " + emailData.reopenComment + " </p><br>" + "<p style='font-size: 16px;'> Warm Regards, <br>" + emailData.ownerName + "<br> " + emailData.ownerPhone + "<br>" + emailData.ownerEmail + "</p></body></html>"
          }
          callback(null, emails);
        }
        break;

      case "Assignment Reopen Approved":
        {
          var emails = {
            name: 'Assignment Reopen Approved',
            from: emailData.ownerEmail,
            to: emailData.to,
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: "Assignment Reopen Request Approved for Assignment : " + emailData.assignmentNo,
            message: "<html><body><p style='font-size: 16px;'>Dear " + emailData.ownerName + " ,<br> As requested, Assignment " + emailData.assignmentNo + " has been re-opened.</p><br>" + "<p style='font-size: 16px;'> Warm Regards, <br>" + emailData.ownerName + "<br> " + emailData.ownerPhone + "<br>" + emailData.ownerEmail + "</p></body></html>"
          }
          callback(null, emails);
        }
        break;

      case "Assignment Reopen Rejected":
        {
          var emails = {
            name: 'Assignment Reopen Rejected',
            from: emailData.ownerEmail,
            to: emailData.to,
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: "Assignment Reopen Request Rejected for Assignment : " + emailData.assignmentNo,
            message: "<html><body><p style='font-size: 16px;'>Dear " + emailData.ownerName + ",<br> Your Request for Re-opening the Assignment has been Rejected. #Reason#</p><br>" + "<p style='font-size: 16px;'> Warm Regards, <br>" + emailData.ownerName + "<br> " + emailData.ownerPhone + "<br>" + emailData.ownerEmail + "</p></body></html>"
          }
          callback(null, emails);
        }
        break;

      case "Assignment On Hold Request":
        {
          var emails = {
            name: 'Assignment On Hold Request',
            from: emailData.ownerEmail,
            to: emailData.to,
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: "Assignment On Hold Request for Assignment : " + emailData.assignmentNo,
            message: "<html><body><p style='font-size: 16px;'>Dear " + emailData.ownerName + " ,<br>Requesting you to please put the Assignment On Hold. Reason : " + emailData.onholdComment + " </p><br>" + "<p style='font-size: 16px;'> Warm Regards, <br>" + emailData.ownerName + "<br> " + emailData.ownerPhone + "<br>" + emailData.ownerEmail + "</p></body></html>"
          }
          callback(null, emails);
        }
        break;

      case "Assignment On Hold Aprproved":
        {
          var emails = {
            name: 'Assignment On Hold Aprproved',
            from: emailData.ownerEmail,
            to: emailData.to,
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: "Assignment On Hold Approved for Assignment : " + emailData.assignmentNo,
            message: "<html><body><p style='font-size: 16px;'>Dear " + emailData.ownerName + " ,<br>As per your request, i have put the assignment On Hold.</p><br>" + "<p style='font-size: 16px;'> Warm Regards, <br>" + emailData.ownerName + "<br> " + emailData.ownerPhone + "<br>" + emailData.ownerEmail + "</p></body></html>"
          }
          callback(null, emails);
        }
        break;

      case "Assignment On Hold Rejected":
        {
          var emails = {
            name: 'Assignment On Hold Rejected',
            from: emailData.ownerEmail,
            to: emailData.to,
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: "Assignment On Hold Rejected for Assignment :  " + emailData.assignmentNo,
            message: "<html><body><p style='font-size: 16px;'>Dear " + emailData.ownerName + ",<br> Your Request for putting the Assignment On Hold is Rejected. #Reason# </p><br>" + "<p style='font-size: 16px;'> Warm Regards, <br>" + emailData.ownerName + "<br> " + emailData.ownerPhone + "<br>" + emailData.ownerEmail + "</p></body></html>"
          }
          callback(null, emails);
        }
        break;

      case "Assignment Transfer":
        {
          var emails = {
            name: 'Assignment Transfer',
            from: emailData.ownerEmail,
            to: emailData.to,
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: "Transfer of Assignment : " + emailData.assignmentNo,
            message: "<html><body><p style='font-size: 16px;'>This is to inform you that the Assignment No. " + emailData.assignmentNo + " being handled by #PreviousOwner# so far has been now transferred to #NewAssignmentOwner# for operational reasons.</p><br>" + "<p style='font-size: 16px;'> Warm Regards, <br>" + emailData.ownerName + "<br> " + emailData.ownerPhone + "<br>" + emailData.ownerEmail + "</p></body></html>"
          }
          callback(null, emails);
        }
        break;

      case "SBC For Approval":
        {
          var emails = {
            name: 'SBC For Approval',
            from: emailData.ownerEmail,
            to: emailData.sbcTo,
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: "Request for deputation of Surveyor : " + emailData.surveyorName + " for Assignment : " + emailData.assignmentNo,
            message: "<html><body><p style='font-size: 16px;'>Please approve " + emailData.surveyorName + " for " + emailData.assignmentNo + " on " + emailData.surveyDate + " at " + emailData.fullAddress + "</p><br>" + "<p style='font-size: 16px;'> Warm Regards, <br>" + emailData.ownerName + "<br> " + emailData.ownerPhone + "<br>" + emailData.ownerEmail + "</p></body></html>"
          }
          callback(null, emails);
        }
        break;

      case "SBC Approves Surveyor":
        {
          var emails = {
            name: 'SBC Approves Surveyor',
            from: emailData.ownerEmail,
            to: emailData.to,
            cc: emailData.cc,
            bcc: emailData.bcc,
            subject: "Request approved of Surveyor : " + emailData.surveyorName + " for Assignment : " + emailData.assignmentNo,
            message: "<html><body><p style='font-size: 16px;'>" + emailData.surveyorName + " has been authorized for " + emailData.assignmentNo + " on " + emailData.surveyDate + " at " + emailData.fullAddress + "</p><br>" + "<p style='font-size: 16px;'> Warm Regards, <br>" + emailData.assignmentAuthorizer + "</p></body></html>"
          }
          callback(null, emails);
        }
        break;

        //  case "Invoice Send Authorization":
        // {
        //   var emails = {
        //     name: 'Invoice Send Authorization',
        //     from: emailData.ownerEmail,
        //     to: emailData.to,
        //     cc: emailData.cc,
        //     bcc: emailData.bcc,
        //     subject: "Invoice Send Authorization : #InvoiceNo#",
        //     message: "<html><body><p style='font-size: 16px;'>Please go through the Invoice for Assignment No. " + emailData.assignmentNo + " in respect of loss sustained by " + emailData.insuredName + " on account of damage to #ProductDetails# and authorize the same</p><br>" + "<p style='font-size: 16px;'> Warm Regards, <br>" + emailData.ownerName + "<br> " + emailData.ownerPhone + "<br>" + emailData.ownerEmail + "</p></body></html>"
        //   }
        //   callback(null, emails);
        // }
        // break;

      default:
        {
          // $scope.formData.push($scope.newjson);
          // cal
          // console.log("IN default switch!!");
        }

    }
  },


  getDataFromHeader: function (data, name, callback) {
    _.each(data, function (values) {
      // console.log("values =  ", values);
      if (values.name === name) {
        // console.log("values = ", values.name);
        callback(null, values.value);
      }
    });
  },

  getAssignmentCreateMail: function (data, callback) {
    console.log("getassignment ", data);
    Assignment.findOne({
      _id: data._id
    }).lean().exec(function (err, emailData) {
      console.log("payload", emailData);
      if (err) {
        console.log("No Assignment mail data found", err);
        callback(null, "No Assignment mail data found");
      } else {
        var From = "";
        var Subject = "";
        var To = "";
        var Cc = "";
        var Date = "";
        var decodeMessage = "";
        if (emailData.email) {
          if (emailData.email.payload) {
            Assignment.getDataFromHeader(emailData.email.payload.headers, "From", function (err, value) {
              From = (value ? value : "");
            });
            Assignment.getDataFromHeader(emailData.email.payload.headers, "Subject", function (err, value) {
              Subject = (value ? value : "");
            });
            Assignment.getDataFromHeader(emailData.email.payload.headers, "To", function (err, value) {
              To = (value ? value : "");
            });
            Assignment.getDataFromHeader(emailData.email.payload.headers, "Cc", function (err, value) {
              Cc = (value ? value : "");
            });
            Assignment.getDataFromHeader(emailData.email.payload.headers, "Date", function (err, value) {
              Date = (value ? value : "");
            });
          }

          console.log("payload", emailData.email.payload.body.data);
          console.log("from", From, "Subject", Subject, "To", To, "Cc", Cc);
          if (emailData.email.payload) {
            if (emailData.email.payload.body.data) {
              var decodeMessage = base64url.decode(emailData.email.payload.body.data);
            } else {
              var decodeMessage = "";
            }
          } else {
            var decodeMessage = "";
          }

          var message =
            "<br>---------- Forwarded message ----------<br>" +
            "From: " + From + "<br>" +
            "Date: " + Date + "<br>" +
            "Subject: " + Subject + "<br>" +
            "To: " + To + "<br>" +
            "Cc: " + Cc + "<br>" + decodeMessage
        } else {
          var message = "-";
        }

        callback(null, message);
      }
    });
  },

  sendEmails: function (req, callback) {

    if (_.isEmpty(req.threadId)) {
      req.threadId = ""
    }
    console.log("mail", req.message, "threadID", req.threadId, "req.user", req.user);
    var obj = {
      body: {
        url: "messages/send",
        method: "POST"
      },
      user: req.user
    };
    // req.to = [{
    //   name: "priyank",
    //   email: "priyank.parmar@wohlig.com"
    // }];
    req.to = _.join(_.map(req.to, function (n) {
      return n.email;
    }), ",");

    // console.log('req.to ',req.to.toString);
    // req.to = _.cloneDeep(req.to);
    console.log('req.to ', req.to);
    // var to = req.to.toString;  
    var rawData =
      "From: " + req.user.officeEmail + "\r\n" +
      "To: " + req.to + "\r\n" +
      "Cc: " + req.cc + "\r\n" +
      "Bcc: " + req.bcc + "\r\n" +
      "Subject: " + req.subject + "\r\n" +
      "Content-Type: text/html; charset=UTF-8\r\n" +
      "Content-Transfer-Encoding: QUOTED-PRINTABLE\r\n" +
      "Content-Disposition: inline\r\n\r\n" + "" + req.message + "";
    var rawDataProcessed = btoa(rawData).replace(/\+/g, '-').replace(/\//g, '_');
    obj.form = {
      raw: rawDataProcessed,
      threadId: req.threadId
    };
    console.log("obj  = ", obj, rawData);
    User.gmailCall(obj, function (err, userData) {
      if (err) {
        console.log("err : ", err);
        callback(err, null);
      } else {
        console.log("userData  : ", userData);
        callback(null, userData);
      }
    });
  },

  getUserData: function (data, callback) {
    User.findOne({
      email: data.email
    }).lean().exec(function (err, userData) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, userData);
      }
    });
  },

  generateMRExcel: function (data, res) {
    Assignment.find()
      .sort({
        createdAt: -1
      })
      .deepPopulate("branch insurerOffice insuredOffice invoice owner natureOfLoss department brokerOffice insuredOffice insurerOffice")
      .exec(
        function (err, data1) {
          if (err) {
            console.log(err);
            res(err, null);
          } else if (data1) {
            if (_.isEmpty(data1)) {
              res("No Payment found.", null);
            } else {
              // console.log("Done", data1[37]);
              var excelData = [];
              console.log(data1[0]);
              _.each(data1, function (n, key) {
                // console.log("Key",);
                var obj = {};
                obj.sr = key + 1;
                obj.MR_Number = n.name;
                if (n.branch == null) {} else {
                  obj.Branch = n.branch.name;
                }
                obj.Insurer_Claim_Id = n.insurerClaimId;
                obj.Insured_Claim_Id = n.insuredClaimId;
                obj.Broker_Claim_Id = n.brokerClaimId;
                obj.Date_Of_Assignment = moment(n.createdAt).format("DD-MM-YYYY");
                if (n.insuredOffice == null) {} else {
                  obj.Insured = n.insuredOffice.name;
                }
                if (n.insurerOffice == null) {} else {
                  obj.Insurer = n.insurerOffice.name;
                }
                if (n.brokerOffice == null) {} else {
                  obj.Broker = n.brokerOffice.name;
                }
                if (n.department == null) {} else {
                  obj.Department = n.department.name;
                }
                if (n.natureOfLoss) {
                  if (n.natureOfLoss.length > 0) {
                    obj.Nature_Of_Loss = n.natureOfLoss[0].name;
                  }
                }


                obj.Estimated_Loss = n.intimatedLoss;
                if (n.owner == null) {} else {
                  obj.Owner = n.owner.name;
                }
                if (n.survey) {
                  if (n.survey.length > 0) {
                    obj.Survey_Date = n.survey[0].surveyDate;
                  }
                }
                if (n.invoice) {
                  if (n.invoice.length > 0) {
                    // n.invoice.length
                    obj.Date_Of_Intimation = moment(n.invoice[n.invoice.length - 1].approvalTime).format("DD-MM-YYYY");
                  }
                }
                obj.Status = n.timelineStatus
                excelData.push(obj);
              });
              Config.generateExcel("Assignment", excelData, res);
            }
          } else {
            res("Invalid data", null);
          }
        });
  },

  generateExcel: function (data, res) {
    Invoice.find()
      .sort({
        createdAt: -1
      })
      .deepPopulate("assignment assignment.branch billedTo assignment.insured")
      .exec(
        function (err, data1) {
          if (err) {
            console.log(err);
            res(err, null);
          } else if (data1) {
            if (_.isEmpty(data1)) {
              res("No Payment found.", null);
            } else {
              // console.log("Done", data1[37]);
              var excelData = [];
              console.log(data1[0]);
              _.each(data1, function (n, key) {
                // console.log("Key",);
                var obj = {};
                obj.sr = key + 1;
                if (n.assignment != null) {
                  if (n.assignment.branch == null) {} else {
                    obj.Branch = n.assignment.branch.name;
                  }
                }
                obj.Invoice_Number = n.invoiceNumber;
                if (n.billedTo == null) {} else {
                  obj.Billed_To = n.billedTo.name;
                }
                if (n.assignment != null) {
                  if (n.assignment.insurerClaimId == null) {
                    obj.Insurer_Claim_No = n.assignment.insurerClaimId;
                  }
                }
                if (n.assignment != null) {
                  if (n.assignment.insured == null) {
                    obj.Insurer_Claim_No = n.assignment.insured;
                  }
                }


                excelData.push(obj);
              });
              Config.generateExcel("Assignment", excelData, res);
            }
          } else {
            res("Invalid data", null);
          }
        });
  }
};

module.exports = _.assign(module.exports, exports, model);