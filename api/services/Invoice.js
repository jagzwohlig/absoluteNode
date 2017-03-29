var schema = new Schema({
    name: {
        type: String,
    },
    billedTo: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        index: true
    },
    narrationFee: {
        type: String,
    },
    grossAssessedLoss: {
        type: Number,
    },
    grossSalvage: {
        type: Number,
    },
    taxes: {
        type: Number,
    },
    excessFranchise: {
        type: Number,
    },
    grossDepreciation: {
        type: Number,
    },
    grossUnderInsurance: {
        type: Number,
    },
    netPayable: {
        type: Number,
    },
    assignment: {
        type: Schema.Types.ObjectId,
        ref: "Assignment",
        index: true
    },
    invoiceNumber: String,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        index: true
    },
    segment: {
        type: Schema.Types.ObjectId,
        ref: "CustomerSegment",
        index: true,
        required: true,
        key: "assignment"
    },
    customerCompany: {
        type: Schema.Types.ObjectId,
        ref: "CustomerCompany",
        index: true,
        key: "assignment"
    },
    invoiceList: [{
        name: String,
        description: String,
        quantity: Number,
        unit: String,
        rate: Number,
        amount: {
            type: Number,
            default: 0
        },
        type: Boolean
    }],
    tax: [{
        name: String,
        percent: Number,
        amount: {
            type: Number,
            default: 0
        }
    }],
    roundOff: {
        type: Number
    },
    grandTotal: {
        type: Number
    },
    subTotal: {
        type: Number
    },
    templateInvoice: {
        type: Schema.Types.ObjectId,
        ref: "TemplateInvoice",
        index: true
    },
    approvalStatus: {
        type: String,
        enum: ["Pending", "Revised", "Approved"]
    },
    approvalTime: {
        type: Date
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    reqtimestamp: {
        type: Date
    },
    file: {
        type: String
    },
    status: {
        type: Boolean
    }
});

schema.plugin(deepPopulate, {
    populate: {
        'billedTo': {
            select: ''
        },
        'billedTo.city': {
            select: 'name _id district'
        },
        'billedTo.city.district': {
            select: 'name _id state'
        },
        'billedTo.city.district.state': {
            select: 'name _id zone'
        },
        'billedTo.city.district.state.zone': {
            select: 'name _id country'
        },
        'billedTo.city.district.state.zone.country': {
            select: 'name _id'
        },
        'billedTo.customerCompany': {
            select: 'name _id'
        },
        'createdBy': {
            select: 'name'
        },
        'assignment': {
            select: ''
        },
        'assignment.customer': {
            select: 'name'
        },
        'assignment.department': {
            select: 'name'
        },
        'assignment.products.product': {
            select: 'name _id category'
        },
        'assignment.products.product.category': {
            select: 'name _id industry'
        },
        'assignment.causeOfLoss': {
            select: 'name'
        },
        'assignment.natureOfLoss': {
            select: 'name'
        },
        'assignment.insurerOffice': {
            select: 'name'
        },
        'assignment.insuredOffice': {
            select: 'name'
        },
        'assignment.city': {
            select: 'name _id district'
        },
        'assignment.city.district': {
            select: 'name _id state'
        },
        'assignment.city.district.state': {
            select: 'name _id zone'
        },
        'assignment.city.district.state.zone': {
            select: 'name _id country'
        },
        'assignment.city.district.state.zone.country': {
            select: 'name _id'
        },
        'assignment.company': {
            select: ''
        },
        'assignment.company.city': {
            select: 'name district'
        },
        'assignment.company.city.district': {
            select: 'name state _id'
        },
        'assignment.company.city.district.state': {
            select: 'name _id'
        },
        'assignment.insurer': {
            select: ''
        },
        'assignment.insured': {
            select: ''
        },
        'assignment.policyType': {
            select: ''
        },
        'assignment.branch': {
            select: ''
        },
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Invoice', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "assignment.company assignment.products.product.category billedTo createdBy", "assignment.companyassignment.products.product.category billedTo createdBy"));
var model = {
    search: function (data, callback) {
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
                    fields: ['invoiceNumber'],
                    term: data.keyword
                }
            },
            sort: {
                desc: 'invoiceNumber'
            },
            start: (page - 1) * maxRow,
            count: maxRow
        };
        var Search = Invoice.find(data.filter)
            .order(options)
            .keyword(options)
            .deepPopulate("assignment.company assignment.insuredOffice assignment.products.product.category billedTo createdBy")
            .page(options, function (err, found) {
                if (err) {
                    callback(err, found);
                } else {
                    if (_.isEmpty(found)) {
                        callback("No data found!!", found);
                    } else {
                        callback(null, found);
                    }
                }
            });
    },

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
                                console.log("updated data", updated, data);
                                // callback(null,updated);
                                Assignment.getOne({
                                    _id: data.assignment._id
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
                                            emailData.ownerEmail = assignmentData.owner.email;
                                            emailData.ownerPhone = assignmentData.owner.mobile;
                                            emailData.siteCity = assignmentData.city.name;
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
                                            if (assignmentData.products[0]) {
                                                if (assignmentData.products[0].product) {
                                                    emailData.productName = (assignmentData.products[0].product.name ? assignmentData.products[0].product.name : "NA");
                                                }
                                            }

                                            // emailData.surveyDate = (surveyDate ? moment(surveyDate).format("DD/MM/YYYY") : "");
                                            // console.log("emailData In 1 ", emailData);
                                            if (assignmentData.survey) {
                                                _.each(assignmentData.survey, function (values) {
                                                    console.log("survey: ", values);
                                                    if (values.status == "Pending") {
                                                        console.log("In surveyor");
                                                        console.log(" values.employee.mobile", values.employee.mobile);
                                                        emailData.surveyorNumber = values.employee.mobile;
                                                        emailData.surveyorName = values.employee.name;
                                                        emailData.surveyorEmail = values.employee.email;
                                                        emailData.surveyDate = values.surveyDate;
                                                    }
                                                });
                                            }


                                            // console.log("emailData In 2 ", emailData);
                                            emailData.to = [];
                                            emailData.to.push({
                                                name: assignmentData.owner.name,
                                                email: assignmentData.owner.email
                                            });

                                            if (assignmentData.shareWith) {
                                                _.each(assignmentData.shareWith, function (values) {
                                                    console.log("values", values);
                                                    _.each(values.persons, function (personss) {
                                                        console.log("persons", personss);
                                                        emailData.to.push({
                                                            name: personss.name,
                                                            email: personss.email
                                                        })
                                                    });
                                                });
                                            }

                                            if (data.user) {
                                                emailData.assignmentAuthorizer = data.user.name;
                                            }
                                            console.log('mailData', mailData);

                                            //Find Acknowledgment Email data
                                            if (data.approvalStatus == "Pending") {

                                                var mailData = [];
                                                mailData[0] = "Invoice Send Authorization";
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
                                            } else if (data.approvalStatus == "Approved") {

                                                var mailData = [];
                                                mailData[0] = "Invoice Authorization";
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
                                                mailData[0] = "Invoice Back to Regenerate";
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
                            Model.generateInvoiceNumber(data2, callback);
                        }
                    });
                }
            });
        }
    },
    generateInvoiceNumber: function (data, callback) {
        Invoice.find({
            assignment: data.assignment
        }).sort({
            createdBy: 1
        }).lean().deepPopulate('assignment').exec(function (err, invNumber) {
            if (err) {
                callback(err, null)
            } else {

                if (invNumber.length === 1) {
                    console.log("Invoice...............................", invNumber, invNumber[0].assignment.name);
                    var sInput = '';
                    sInput = _.split(invNumber[0].assignment.name, '-');
                    data.invoiceNumber = sInput[1] + "-" + sInput[2] + "-" + sInput[3];
                    console.log("........", sInput, data.invoiceNumber);
                    data.save(function (err, data) {
                        if (err) {
                            callback(err, data);
                        } else {
                            callback(null, data);
                        }
                    });
                } else {
                    console.log("In Else...............................", invNumber, invNumber[invNumber.length - 1].assignment.name);
                    var sInput = '';
                    sInput = _.split(invNumber[invNumber.length - 1].assignment.name, '-');
                    data.invoiceNumber = sInput[1] + "-" + sInput[2] + "-" + sInput[3] + "-" + String.fromCharCode(63 + invNumber.length);
                    console.log("........", sInput, data.invoiceNumber);
                    data.save(function (err, data) {
                        if (err) {
                            callback(err, data);
                        } else {
                            callback(null, data);
                        }
                    });
                }

            }
        });
    },
};
module.exports = _.assign(module.exports, exports, model);