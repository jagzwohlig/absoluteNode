var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
        capitalizeAll: true,
    },
    typeOfOffice: {
        type: Schema.Types.ObjectId,
        ref: "TypeOfOffice",
        required: true,
        key: "office"
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true,
        key: "office"
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: "City",
        index: true,
        required: true,
        key: "office"
    },
    employee: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Employee",
        }],
        index: true,
        restrictedDelete: true
    },
    branch: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Branch"
        }],
        index: true,
        restrictedDelete: true
    },
    address: String,
    pincode: String,
    phone: String,
    fax: String,
    email: String,
    status: {
        type: Boolean,
        default: true
    },
    lat: {
        type: Number,
    },
    lng: {
        type: Number,
    },
});

schema.plugin(deepPopulate, {
    populate: {
        'city': {
            select: 'name _id district'
        },
        'city.district': {
            select: 'name _id state'
        },
        'city.district.state': {
            select: 'name _id zone'
        },
        'city.district.state.zone': {
            select: 'name _id country'
        },
        'city.district.state.zone.country': {
            select: 'name _id'
        }
    }

});

schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Office', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema,"city.district.state.zone.country"));

var model = {};

module.exports = _.assign(module.exports, exports, model);
