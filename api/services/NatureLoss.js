var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
        capitalizeAll: true,
    },
    causeloss: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "CauseLoss",
        }],
        index: true,
        restrictedDelete: true
    },
    status: {
      type: Boolean,
      default: true
    }
});

schema.plugin(deepPopulate, {
  'causeloss': {
      select: 'name _id'
  },
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('NatureLoss', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "causeloss", "causeloss"));
var model = {};
module.exports = _.assign(module.exports, exports, model);
