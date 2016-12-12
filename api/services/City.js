var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
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

        var keys = _.split(data.keyword, " ");
        stringMatch = [];
        console.log(keys);
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
        console.log(stringMatch);

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
    },




    populateCityDetails2: function (data, callback) {
        var Model = this;
        var Const = this(data);
        var maxRow = Config.maxRow;
        var page = 1;
        // var name1=subString()
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
                desc: "name1",
            },
            start: (page - 1) * maxRow,
            count: maxRow
        };

        // // 

        //  City.aggregate([{
        //             $lookup: {
        //                 from:"districts",
        //                 localField:"district",
        //                 foreignField: "_id",
        //                 as : "districts"
        //             }
        //         },
        //         {
        //             $unwind: "$districts"
        //         }
        //         ,{
        //             $lookup: {
        //                 from:"states",
        //                 localField:"districts.state",
        //                 foreignField: "_id",
        //                 as : "districts.states"
        //             }
        //         },{
        //             $unwind: "$districts.states"
        //         }
        //         ,{
        //             $lookup: {
        //                 from:"zones",
        //                 localField:"districts.states.zone",
        //                 foreignField: "_id",
        //                 as : "districts.states.zones"
        //             }
        //         },{
        //             $unwind: "$districts.states.zones"
        //         },{
        //             $lookup: {
        //                 from:"countries",
        //                 localField:"districts.states.zones.country",
        //                 foreignField: "_id",
        //                 as : "districts.states.zones.countries"
        //             }
        //         },{
        //             $unwind: "$districts.states.zones.countries"
        //         }
        //         ,{
        //                 $match: {

        //                     $or: [
        //                         {
        //                         "name":{
        //                             $regex: data.keyword,
        //                             $options: 'i'
        //                         } 
        //                     },{
        //                         "districts.name":{
        //                             $regex: data.keyword,
        //                             $options: 'i'
        //                         } 
        //                     }
        //                     ,{
        //                         "districts.states.name":{
        //                             $regex: data.keyword,
        //                             $options: 'i'
        //                         } 
        //                     }
        //                     ,{
        //                         "districts.states.zones.name":{
        //                             $regex: data.keyword,
        //                             $options: 'i'
        //                         } 
        //                     },
        //                     {
        //                         "districts.states.zones.countries.name":{
        //                             $regex: data.keyword,
        //                             $options: 'i'
        //                         } 
        //                     }
        //                     ]
        //                 }
        //             },{
        //                 $project:{
        //                     _id:1,
        //                     city:"$name",
        //                     district:"$districts.name",
        //                     state:"$districts.states.name",
        //                     zone:"$districts.states.zones.name",
        //                     country:"$districts.states.zones.countries.name"
        //                 }
        //             }


        //         ],function(err, data4){
        //             if(err){

        //             }else{
        //                 callback(null,data4)
        //             }
        //         })


        // // 


        var Search = Model.find(data.filter)

        .order(options)
            .deepPopulate()
            .keyword(options)

        .page(options, callback);

    },

};

module.exports = _.assign(module.exports, exports, model);