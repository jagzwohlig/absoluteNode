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
        key: "customer"
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
    name: {
        type: String
    },
    TOFShortName: {
        type: String
    },
    companyShortName: {
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
    officers: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Officer",
        }],
        index: true,
        restrictedDelete: true
    },
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
        'customerCompany': {
            select: 'name _id'
        },
        'typeOfOffice': {
            select: 'name _id'
        },
        'officers': {
            select: 'name _id salutation firstName lastName birthDate designation email password officeNumber mobileNumber'
        }
    }

});

schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Customer', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "city.district.state.zone.country customerSegment customerCompany typeOfOffice officers", "city.district.state.zone.country customerSegment customerCompany typeOfOffice officers"));

var model = {
    getOfficer: function (data, callback) {
        var Model = this;
        var Search = Model.findOne(data.filter).lean().populate('officers').exec(function (err, data2) {
            if (err) {
                callback(err, data2);
            } else if (_.isEmpty(data2)) {
                callback(err, data2);
            } else {
                console.log(data2);
                var data3 = {};
                data3.results = data2.officers;
                _.each(data3, function (n) {
                    n.name = n.firstName + n.lastName;
                });
                callback(err, data3);
            }
        });
    },
    search: function (data, callback) {
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
                    fields: ['name'],
                    term: data.keyword
                }
            },
            sort: {
                asc: 'name'
            },
            start: (page - 1) * maxRow,
            count: maxRow
        };
        _.each(data.filter, function (n, key) {
            if (_.isEmpty(n)) {
                n = undefined;
            }
        });
        var Search = Model.find(data.filter)

        .order(options)
            .deepPopulate("city.district.state.zone.country customerSegment")
            .keyword(options)
            .page(options, callback);

    },
    getSegmented: function (data, callback) {
        var Model = this;
        var Const = this(data);
        var maxRow = Config.maxRow;
        console.log(data.segment);
        var page = 1;
        if (data.page) {
            page = data.page;
        }
        var field = data.field;
        var options = {
            field: data.field,
            filters: {
                keyword: {
                    fields: ['name'],
                    term: data.keyword
                }
            },
            sort: {
                asc: 'name'
            },
            start: (page - 1) * maxRow,
            count: maxRow
        };

        var Search = Model.find()
            .order(options)
            .keyword(options)
            .deepPopulate("customerSegment").exec(function (err, company) {
                if (err) {
                    callback(err, company);
                } else {
                    var company2 = {};
                    company2.results = _.slice(_.filter(company, function (c) {
                        return c.customerSegment.name == data.segment;
                    }), 0, Config.maxRow);
                    callback(err, company2);
                }

            });


    },


};

module.exports = _.assign(module.exports, exports, model);