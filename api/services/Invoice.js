var schema = new Schema({
    name: {
        type: String,
        required: true
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

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Invoice', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);