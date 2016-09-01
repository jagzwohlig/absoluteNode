var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    shortName: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    customerSegment: {
        type: Schema.Types.ObjectId,
        ref: "CustomerSegment",
        required: true,
        key: "customercompany"
    },
    customer: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Customer",
        }],
        index: true,
        restrictedDelete: true
    },
    insurer: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "PolicyType",
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
    insurercompany: {
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
        'customerSegment': {
            select: 'name _id'
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('CustomerCompany', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "customerSegment", "customerSegment"));
var model = {
    getInsurer: function(data, callback) {
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

        var Search = Model.find()
            .order(options)
            .keyword(options)
            .deepPopulate("customerSegment").exec(function(err, company) {
                if (err) {
                    callback(err, company);
                } else {
                    var company2 = {};
                    company2.results = _.slice(_.filter(company, function(c) {
                        return c.customerSegment.name == "Insurer";
                    }), 0, Config.maxRow);
                    callback(err, company2);
                }

            });


    },
    getInsured: function(data, callback) {
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

        var Search = Model.find()
            .order(options)
            .keyword(options)
            .deepPopulate("customerSegment").exec(function(err, company) {
                if (err) {
                    callback(err, company);
                } else {
                    var company2 = {};
                    company2.results = _.slice(_.filter(company, function(c) {
                        return c.customerSegment.name == "Insured";
                    }), 0, Config.maxRow);
                    callback(err, company2);
                }

            });


    },
};
module.exports = _.assign(module.exports, exports, model);
