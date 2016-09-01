var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    status: {
        type: Boolean,
        default: true
    },
    category: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Category",
        }],
        index: true,
        restrictedDelete: true
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Industry', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));

var model = {};

module.exports = _.assign(module.exports, exports, model);
