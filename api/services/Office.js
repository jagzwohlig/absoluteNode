var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
        capitalizeAll: true,
    },
    location: {
        type: [Number],
        index: '2dsphere'
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
    assignment: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Assignment",
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

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "city.district.state.zone.country"));

var model = {
    getIdByName: function (data, callback) {
        callback(null, null);
    },
    getNearestOffice: function (data, callback) {
        var finalArr = [];
        Office.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [data.lng, data.lat]
                    }
                }
            }
        }, {
            name: 1
        }).lean().exec(function (err, data2) {
            // Please Ask And Change Office Limit (Multiple Confirmed All)
            if (err) {
                callback(err, null);
            } else {
                console.log("Data of Office",data2);
                async.eachSeries(data2, function (n,callback1) {
                    // console.log("N",n._id);
                    Employee.find({
                        postedAt: n._id,
                        $or: [{
                            isSurveyor: true
                        }, {
                            isField: true
                        }]
                    }, {
                        officeEmail: 1,
                        date: 1,
                        photo:1,
                        name:1
                    }).exec(function (err, data3) {
                        if (err) {
                            callback1(err, null);
                        } else {
                            // console.log("Array Of Employee", data3);
                            _.each(data3, function (n) {
                                n.date = data.surveyDate;
                            finalArr.push(n);
                        });
                        callback1(null,"Done");
                        }
                    });
                }, function (err) {
                    if (err) {
                        console.log("Err");
                    } else {
                        callback(err, finalArr);
                    }
                });
            }
        });
    },
//     getNearestOffice: function (data, callback) {
//         var finalArr = [];
//         Office.aggregate([
//             {
// near: { type: "Point", coordinates: [ data.lng , data.lat ] },
// distanceField: "dist.calculated",
// spherical: true
// }
//         ]).lean().exec(function (err, data2) {
//             // Please Ask And Change Office Limit (Multiple Confirmed All)
//             if (err) {
//                 callback(err, null);
//             } else {
//                 async.each(data2, function (n,callback1) {
//                     // console.log("N",n._id);
//                     Employee.find({
//                         postedAt: n._id,
//                         $or: [{
//                             isSurveyor: true
//                         }, {
//                             isField: true
//                         }]
//                     }, {
//                         officeEmail: 1,
//                         date: 1
//                     }).exec(function (err, data3) {
//                         if (err) {
//                             callback1(err, null);
//                         } else {
//                             // console.log("Array Of Employee", data3);
//                             _.each(data3, function (n) {
//                                 n.date = data.surveyDate
//                             finalArr.push(n);
//                         });
//                         callback1(null,"Done");
//                         }
//                     });
//                 }, function (err) {
//                     if (err) {
//                         console.log("Err");
//                     } else {
//                         callback(err, finalArr);
//                     }
//                 });
//             }
//         });
//     },
    getNearestOfficeBackUp: function (data, callback) {
        Office.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [data.lng, data.lat]
                    }
                }
            }
        }, {
            name: 1
        }).lean().exec(function (err, data2) {
            // Please Ask And Change Office Limit (Multiple Confirmed All)
            if (err) {
                callback(err, null);
            } else {
                console.log("List Of Near Office", data2);
                var arr = [];
                _.each(data2, function (n) {
                    arr.push(n._id);
                });
                Employee.find({
                    $or: [{
                        isSurveyor: true
                    }, {
                        isField: true
                    }],
                    postedAt: {
                        $in: arr
                    }
                }, {
                    officeEmail: 1,
                    date: 1
                }).exec(function (err, data3) {
                    if (err) {
                        callback(err, null);
                    } else {
                        _.each(data3, function (n) {
                            n.date = data.surveyDate
                        });
                        console.log("Data", data3);
                        callback(err, data3);
                    }
                });
            }
        });
    },
};

module.exports = _.assign(module.exports, exports, model);