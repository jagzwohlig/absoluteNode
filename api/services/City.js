var schema = new Schema({
    name: {
        type: String,
        required: true,
        capitalizeAll: true,
    },
    district: {
        type: Schema.Types.ObjectId,
        ref: "District",
        index: true,
        required: true,
        key: "city"
    },
    company: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Company",
        }],
        index: true,
        restrictedDelete: true
    },
    office: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Office",
        }],
        index: true,
        restrictedDelete: true
    },
    customer: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Customer",
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
    employeePosted: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Employee",
        }],
        index: true,
        restrictedDelete: true
    },
    stdCode: Number,
    timezone: {
        type: Number,
        default: 5.5
    }
});

schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(deepPopulate, {

    populate: {
        'district': {
            select: 'name _id state'
        },
        'district.state': {
            select: 'name _id zone'
        },
        'district.state.zone': {
            select: 'name _id country'
        },
        'district.state.zone.country': {
            select: 'name countryCode _id'
        }
    }

});
module.exports = mongoose.model("City", schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "district.state.zone.country", "district.state.zone.country"));

var model = {

    populateCityDetails: function (data, callback) {
        if (data && data.filter && data.filter._id) {
            City.search(data, function (err, data1) {
                data4 = _.cloneDeep(data1);
                _.each(data4.results, function (n) {
                    n.name = n.name + ", " + n.district.name + ", " + n.district.state.name + ", " + n.district.state.zone.name + ", " + n.district.state.zone.country.name;
                });
                callback(err, data4);
            });
        } else {
            var keys = _.split(data.keyword, " ");
            stringMatch = [];
            _.each(keys, function (key) {
                var data = {
                    keyword: key
                };

                stringMatch.push({
                    "name": {
                        $regex: data.keyword,
                        $options: 'i'
                    }
                });

                stringMatch.push({
                    "districts.name": {
                        $regex: data.keyword,
                        $options: 'i'
                    }
                });

                stringMatch.push({
                    "districts.states.name": {
                        $regex: data.keyword,
                        $options: 'i'
                    }
                });

                stringMatch.push({
                    "districts.states.zones.name": {
                        $regex: data.keyword,
                        $options: 'i'
                    }
                });

                stringMatch.push({
                    "districts.states.zones.countries.name": {
                        $regex: data.keyword,
                        $options: 'i'
                    }
                });
            });

            City.aggregate([{
                $lookup: {
                    from: "districts",
                    localField: "district",
                    foreignField: "_id",
                    as: "districts"
                }
            }, {
                $unwind: "$districts"
            }, {
                $lookup: {
                    from: "states",
                    localField: "districts.state",
                    foreignField: "_id",
                    as: "districts.states"
                }
            }, {
                $unwind: "$districts.states"
            }, {
                $lookup: {
                    from: "zones",
                    localField: "districts.states.zone",
                    foreignField: "_id",
                    as: "districts.states.zones"
                }
            }, {
                $unwind: "$districts.states.zones"
            }, {
                $lookup: {
                    from: "countries",
                    localField: "districts.states.zones.country",
                    foreignField: "_id",
                    as: "districts.states.zones.countries"
                }
            }, {
                $unwind: "$districts.states.zones.countries"
            }, {
                $match: {
                    $or: stringMatch
                }
            }, {
                $project: {
                    _id: 1,
                    city: "$name",
                    district: "$districts.name",
                    state: "$districts.states.name",
                    zone: "$districts.states.zones.name",
                    country: "$districts.states.zones.countries.name"
                }
            }, {
                $limit: 10
            }], function (err, data4) {
                if (err) {

                } else {
                    _.each(data4, function (n) {
                        n.name = n.city + ", " + n.district + ", " + n.state + ", " + n.zone + ", " + n.country;
                    });
                    var obj = {
                        results: data4
                    };
                    callback(null, obj)
                }
            })
        }
    }

};

module.exports = _.assign(module.exports, exports, model);