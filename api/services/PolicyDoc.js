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
        if (!data.filter || !data.filter._id) {
            callback("no ID found for Policy Type", null);
        }
        if (!data.keyword) {
            data.keyword = "";
        }
        var searchText = new RegExp(data.keyword, "i");
        Model.aggregate([{
            "$unwind": "$listOfDocuments"
        }, {
            "$match": {
                "listOfDocuments.policyType": mongoose.Types.ObjectId(data.filter._id),
                "listOfDocuments.name": {
                    $regex: searchText
                }
            }
        }, {
            "$limit": 10
        }]).exec(function(err, data2) {
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
