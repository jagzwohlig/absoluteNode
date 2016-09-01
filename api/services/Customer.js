var schema = new Schema({
    customerSegment: {
        type: Schema.Types.ObjectId,
        ref: "CustomerSegment",
        required: true,
        key: "customer"
    },
    typeOfOffice: {
        type: Schema.Types.ObjectId,
        ref: "TypeOfOffice",
        required: true,
        // key: "customer"
    },
    customerCompany: {
        type: Schema.Types.ObjectId,
        ref: "CustomerCompany",
        required: true,
        key: "customer"
    },
    issueOffice: {
        type: String
    },
    customerCode: {
        type: String
    },
    officeCode: {
        type: String
    },
    category: {
        type: String
    },
    creditLimitAlloted: {
        type: String
    },
    creditLimitExhausted: {
        type: String
    },
    creditLimitPending: {
        type: String
    },
    direct: {
        type: String
    },
    phone1: {
        type: String
    },
    phone2: {
        type: String
    },
    phone3: {
        type: String
    },
    email: {
        type: String
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: "City",
        index: true,
        required: true,
        key: "customer"
    },
    address: {
        type: String
    },
    pincode: {
        type: String
    },
    lat: {
        type: Number,
    },
    lng: {
        type: Number,
    },
    status: {
        type: Boolean,
        default: true
    },
    officers: [{
        salutation: String,
        firstName: String,
        lastName: String,
        birthDate: Date,
        designation: String,
        email: String,
        password: String,
        officeNumber: String,
        mobileNumber: String
    }],
    policydoc: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "PolicyDoc",
        }],
        index: true,
        restrictedDelete: true
    },
    insureroffice: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "PolicyDoc",
        }],
        index: true,
        restrictedDelete: true
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
        'customerSegment': {
            select: 'name _id'
        },
    }

});

schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Customer', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "city.district.state.zone.country customerSegment", "city.district.state.zone.country customerSegment"));

var model = {

    search: function(data,callback) {
        var Model = this;
        var Const = this(data);
        var maxRow = Config.maxRow;

        var page = 1;
        if (data.page) {
            page = data.page;
        }
        var field = data.field;
        var options = {
            field: data.field,
            filters: {
                keyword: {
                    fields: ['officeCode'],
                    term: data.keyword
                }
            },
            sort: {
                asc: 'officeCode'
            },
            start: (page - 1) * maxRow,
            count: maxRow
        };

        var Search = Model.find(data.filter)

        .order(options)
        .deepPopulate("city.district.state.zone.country customerSegment")
        .keyword(options)
        .page(options, callback);

    }


};

module.exports = _.assign(module.exports, exports, model);
