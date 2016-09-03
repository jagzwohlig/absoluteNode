var schema = new Schema({
    name: {
      type: Schema.Types.ObjectId,
      ref: "City",
      index: true,
      required: true,
      key: "customer"
    },
    claim: {
        type: Schema.Types.ObjectId,
        ref: "Claims",
        index: true,
        required: true,
        key: "assignment"
    },
    natureOfSurvey: {
      type: Schema.Types.ObjectId,
      ref: "SurveyCode",
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
    dateOfIntimation: {
      type: Date
    },
    intimatedLoss: {
      type: String
    },
    appointedBy: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      index: true,
      required: true,
      key: "assignment"
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      index: true,
      required: true,
      key: "assignment"
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Assignment', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));

var model = {};

module.exports = _.assign(module.exports, exports, model);
