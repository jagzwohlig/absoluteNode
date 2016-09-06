var schema = new Schema({
    name: {
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
    logo: String,
    bank: {
        type: Schema.Types.ObjectId,
        ref: "Bank",
        key: "company"
    },
    serviceTax: String,
    pan: String,
    cin: String,
    tan: String,
    services: String,
    website: String,
    status: {
        type: Boolean,
        default: true
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: "City",
        index: true,
        required: true
    },
    address: String,
    pincode: String,
    phone: String,
    fax: String,
    email: String,
    office: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Office",
        }],
        index: true,
        restrictedDelete: true
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
            ref: "Branch",
        }],
        index: true,
        restrictedDelete: true
    },
    fieldOfficeActivity: {
        type: Number,
    },
    backOfficeActivity: {
        type: Number,
    },
    reimbursement: {
        type: Number,
    },
    reciept: {
        type: Number,
    },
    journalVoucher: {
        type: Number,
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
        },
        'bank': {
            select: 'name _id'
        }
    }

});

schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Company', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "city.district.state.zone.country bank", "city.district.state.zone.country bank"));

var model = {

};

module.exports = _.assign(module.exports, exports, model);
