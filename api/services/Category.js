var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
        capitalizeAll: true,
    },
    industry: {
        type: Schema.Types.ObjectId,
        ref: "Industry",
        index: true,
        required:true
    },
    status: {
        type: Boolean,
        default:true
    },
    product: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Product"
        }],
        index: true,
        restrictedDelete: true
    },
    assignment: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Assignment"
        }],
        index: true,
        restrictedDelete: true
    }
});


schema.plugin(deepPopulate, {
    populate: {
        'industry': {
            select: 'name _id'
        }
    }
});

schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Category', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "industry", "industry"));

var model = {};

module.exports = _.assign(module.exports, exports, model);
