var schema = new Schema({
    name: {
        type: String,
    },
    billedTo: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        index: true
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
        }
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
        'assignment': {
            select: ''
        },
        'assignment.customer': {
            select: 'name'
        },
        'assignment.department': {
            select: 'name'
        },
        'assignment.policyType': {
            select: ''
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
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Invoice', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "assignment.company assignment.products.product.category", "assignment.companyassignment.products.product.category"));
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