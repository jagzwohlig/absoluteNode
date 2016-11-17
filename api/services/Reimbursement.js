var schema = new Schema({
    name: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    cost: Number,
    reason: String,
    status: String,
    assignment: String,
    approvedAmount: Number,
    document: [{
        image: {
            type: String
        }
    }]
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Reimbursement', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);