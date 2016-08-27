var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var uniqueValidator = require('mongoose-unique-validator');
var timestamps = require('mongoose-timestamp');
var validators = require('mongoose-validators');
var monguurl = require('monguurl');
require('mongoose-middleware').initialize(mongoose);

var Schema = mongoose.Schema;

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
                    var company2 = _.slice(_.filter(company, function(c) {
                        return c.customerSegment.name == "Insurer";
                    }), 0, Config.maxRow);
                    callback(err, company2);
                }

                // company.where("customerSegment.name").equals("Insurer").page(options, callback);
            });

        // var Search = Model.find()
        //     .order(options)
        //     .deepPopulate("customerSegment").find({}, function(err, company) {
        //         company.filter({
        //             "customerSegment.name": "Insurer"
        //         }).page(options, callback);
        //     });

    }
};
module.exports = _.assign(module.exports, exports, model);
