var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
        capitalizeAll: true,
    },
    shortCode: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
    },
    status: {
        type: Boolean,
        default: true
    },
    office: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Office",
        }],
        index: true,
        restrictedDelete: true
    },
    customer: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Customer",
        }],
        index: true,
        restrictedDelete: true
    },
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('TypeOfOffice', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));

var model = {};

module.exports = _.assign(module.exports, exports, model);
