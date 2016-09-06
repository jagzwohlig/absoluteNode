var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
        capitalizeAll: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
        capitalizeAll: true,
    },
    shortName: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
        capitalizeAll: true,
    },
    company:{
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      key: "branch"
    },
    office: {
        type: Schema.Types.ObjectId,
        ref: "Office",
        required: true,
    },
    employee: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Employee",
        }],
        index: true,
        restrictedDelete: true
    },
    assignment: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Assignment",
        }],
        index: true,
        restrictedDelete: true
    },

    isBillable: Boolean,

    seriesFormat: String,

    STAT: Boolean,
    ITAT: Boolean,
    LTAT: Boolean,
    FSR: Boolean,
    R2NR: Boolean,

    status: {
        type: Boolean,
        default: true
    },
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Branch', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));

var model = {};

module.exports = _.assign(module.exports, exports, model);
