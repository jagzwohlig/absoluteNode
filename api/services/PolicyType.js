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
        key: "policytype"
    },
    insurer:[{
      type: Schema.Types.ObjectId,
      ref: "CustomerCompany",
      required: true,
      key: "insurer"
    }],
    policydoc: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "PolicyDoc",
        }],
        index: true,
        restrictedDelete: true
    },
    status:{
      type: Boolean,
      default:true
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
    "insurer":[{
      select: 'name _id'
    }]
  }
});

schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('PolicyType', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema,"department insurer","department insurer"));

var model = {};

module.exports = _.assign(module.exports, exports, model);
