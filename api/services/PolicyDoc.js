var schema = new Schema({
    insuredCompany: {
        type: Schema.Types.ObjectId,
        ref: "CustomerCompany",
        required: true,
        key: "policydoc"
    },
    insuredOffice: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
        key: "policydoc"
    },
    listOfDocuments: [{
        name: {
            type: String
        },
        policyNo: {
            type: String
        },
        department: {
            type: Schema.Types.ObjectId,
            ref: "Department",
            required: true,
            key: "policydoc"
        },
        policyType: {
            type: Schema.Types.ObjectId,
            ref: "PolicyType",
            required: true,
            key: "policydoc"
        },
        insurerCompany: {
            type: Schema.Types.ObjectId,
            ref: "CustomerCompany",
            required: true,
            key: "insurercompany"
        },
        insurerOffice: {
            type: Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
            key: "insureroffice"
        },
        from: {
            type: Date
        },
        to: {
            type: Date
        },
        documentImage: {
            type: String
        }
    }],
    status: {
        type: Boolean,
        default: true
    }
});

schema.plugin(deepPopulate, {
    'insuredCompany': {
        select: 'name _id'
    },
    'insuredOffice': {
        select: 'name _id'
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('PolicyDoc', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "insuredCompany insuredCompany", "insuredCompany insuredCompany"));
var model = {
    getPolicyDoc: function(data, callback) {
        var Model = this;
        var aggText = [];
        var searchText = new RegExp(data.keyword, "i");
        if (data.filter && data.filter._id && mongoose.Types.ObjectId.isValid(data.filter._id)) {
            aggText = [{
                "$unwind": "$listOfDocuments"
            }, {
                "$match": {
                    "listOfDocuments._id": mongoose.Types.ObjectId(data.filter._id),
                    "listOfDocuments.name": {
                        $regex: searchText
                    }
                }
            }, {
                "$limit": 10
            }];
        } else if (data.filter && data.filter.policyType && mongoose.Types.ObjectId.isValid(data.filter.policyType)) {
            aggText = [{
                "$unwind": "$listOfDocuments"
            }, {
                "$match": {
                    "listOfDocuments.policyType": mongoose.Types.ObjectId(data.filter.policyType),
                    "listOfDocuments.name": {
                        $regex: searchText
                    }
                }
            }, {
                "$limit": 10
            }];
        } else {
            callback("Data not Formatted", null);
            return false;
        }
        if (!data.keyword) {
            data.keyword = "";
        }

        Model.aggregate(aggText).exec(function(err, data2) {
            var data3 = [];
            _.each(data2, function(n) {
                data3.push(n.listOfDocuments);
            });
            var resultdoc = {};
            resultdoc.results = data3;
            callback(err, resultdoc);
        });
    },
};
module.exports = _.assign(module.exports, exports, model);
