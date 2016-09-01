var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: "Country",
        required: true,
        index: true,
        key: "zone"
    },
    state: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "State",

        }],
        index: true,
        restrictedDelete: true
    }
});

schema.plugin(deepPopulate, {
    populate: {
        'country': {
            select: 'name _id country'
        }
    }
});

schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Zone', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "country", "country"));

var model = {};

module.exports = _.assign(module.exports, exports, model);
