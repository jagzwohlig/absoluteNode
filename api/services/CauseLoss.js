var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
        capitalizeAll: true,
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: "Department",
        required: true,
        key: "causeloss"
    },
    natureOfLoss:[{
      type: Schema.Types.ObjectId,
      ref: "Nature",
      required: true,
      key: "natureofloss"
    }],
    status: {
      type: Boolean,
      default: true
    },
    assignment: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Assignment",
        }],
        index: true,
        restrictedDelete: true
    },
});

schema.plugin(deepPopulate, {
  populate:{
    "department":{
      select: 'name _id'
    },
    "natureOfLoss":[{
      select: 'name _id'
    }]
  }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('CauseLoss', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema,"department natureOfLoss","department natureOfLoss"));
var model = {};
module.exports = _.assign(module.exports, exports, model);
