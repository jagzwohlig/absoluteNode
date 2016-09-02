var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
        capitalizeAll: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        index: true,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
});

schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(deepPopulate, {
    populate: {
        'category': {
            select: 'name _id industry'
        },
        'category.industry': {
            select: 'name _id'
        }
    }
});
module.exports = mongoose.model('Product', schema);


var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "category.industry", "category.industry"));

var model = {};

module.exports = _.assign(module.exports, exports, model);
