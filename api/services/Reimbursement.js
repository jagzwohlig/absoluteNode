var schema = new Schema({
    name: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    cost: Number,
    reason: String,
    status: String,
    assignment: {
        type: Schema.Types.ObjectId,
        ref: "Assignment",
        required: true
    },
    approvedAmount: Number,
    image: {
        type: String
    }
});

schema.plugin(deepPopulate, {
    populate: {
        'name': {
            select: 'name _id'
        },
        'assignment': {
            select: 'name _id'
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Reimbursement', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "name assignment", "name assignment"));
var model = {};
module.exports = _.assign(module.exports, exports, model);