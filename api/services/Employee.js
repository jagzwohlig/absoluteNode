var schema = new Schema({
    name: {
        type: String,
        required: true
    },
        location: {
    type: [Number],
    index: '2dsphere'
  },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        // required: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true,
        key: "employee"
    },
    salutation: {
        type: String
    },
    branch: {
        type: Schema.Types.ObjectId,
        ref: "Branch",
        key: "employee"
    },
    func: {
        type: Schema.Types.ObjectId,
        ref: "Func",
        required: true,
        key: "employee"
    },
    postedAt: {
        type: Schema.Types.ObjectId,
        ref: "Office",
        key: "employeePosted"
    },
    grade: {
        type: Schema.Types.ObjectId,
        ref: "Grade",
        required: true,
        key: "employee"
    },
    houseColor: {
        type: String
    },
    employeeCode: {
        type: String
    },
    photo: {
        type: String
    },
    CTCDetails: [{
        amount: {
            type: String
        },
        from: {
            type: Date
        },
        to: {
            type: Date
        },
        image: {
            type: String
        },
        grade: {
            type: Schema.Types.ObjectId,
            ref: "Grade",
            required: true,
            key: "employee"
        },
    }],
    bank: {
        type: String
    },
    accountNumber: {
        type: String
    },
    branchName: {
        type: String
    },
    neftCode: {
        type: String
    },
    gender: {
        type: "String",
        enum: ["Female", "Male"],
        required: true
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: "City",
        index: true,
        required: true,
        key: "employee"
    },
    address: String,
    formatted_address:String,
    pincode: String,
    lat: {
        type: Number,
    },
    lng: {
        type: Number,
    },
    officeNumber: {
        type: String
    },
    officeMobile: {
        type: String
    },
    officeEmail: {
        type: String
    },
    homeNumber: {
        type: String
    },
    mobile: {
        type: String
    },
    email: {
        type: String
    },
    extension: {
        type: String
    },
    birthDate: {
        type: Date
    },
    marriageDate: {
        type: Date
    },
    joiningDate: {
        type: Date
    },
    leavingDate: {
        type: Date
    },
    isSBC: {
        type: Boolean
    },
    isField: {
        type: Boolean
    },
    isSurveyor: {
        type: Boolean
    },
    validUpto: {
        type: String
    },
    licence: {
        type: String
    },
    iiislaDocument: {
        type: String
    },
    personalDocument: [{
        name: {
            type: String
        },
        image: {
            type: String
        }
    }],
    licenseNumber: {
        type: String
    },
    department: [{
        type: Schema.Types.ObjectId,
        ref: "Department",
        required: true,
        key: "employee"
    }],
    licenseDocument: [{
        image: {
            type: String
        },
        from: {
            type: Date
        },
        to: {
            type: Date
        }
    }],
    IIISLACertificate: [{
        image: {
            type: String
        },
        from: {
            type: Date
        },
        department: {
            type: Schema.Types.ObjectId,
            ref: "Department",
            required: true,
            key: "employee"
        },
        membership: {
            type: Schema.Types.ObjectId,
            ref: "Membership",
            required: true,
            key: "employee"
        },
    }],
    IIISLAReciept: [{
        image: {
            type: String
        },
        from: {
            type: Date
        },
        to: {
            type: Date
        }

    }],
    assignment: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Assignment",
        }],
        index: true,
        restrictedDelete: true
    },
    user: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }],
        index: true,
        restrictedDelete: true
    }
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
        'func': {
            select: 'name _id'
        },
        'grade': {
            select: 'name _id'
        },
        'postedAt': {
            select: 'name _id'
        },
        'department': {
            select: 'name _id'
        },
        'IIISLACertificate.department': {
            select: 'name _id'
        }
    }
});
// schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Employee', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "city.district.state.zone.country func grade department IIISLACertificate.department", "city.district.state.zone.country  func grade postedAt"));
var model = {

//      getBackendEmployee: function (data, callback) {
//          console.log("..............................................",data);
//     Employee.find({
//       isSBC:false,
//       isField:false,
//       isSurveyor:false
//     }).populate("postedAt").exec(function (err, found) {
//       if (err) {
//         callback(err, null);
//       } else {
//           callback(null, found);
//       }
//       })
//   },


// Start
  getBackendEmployee: function (data, callback) {
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
        asc: "name",
      },
      start: (page - 1) * maxRow,
      count: maxRow
    };
    _.each(data.filter, function (n, key) {
      if (_.isEmpty(n)) {
        n = undefined;
      }
    });
    data.filter={
        isSBC:false,
        isField:false,
        isSurveyor:false
    }
    var Search = Model.find(data.filter)
    .order(options)
      .deepPopulate("postedAt")
      .keyword(options)

    .page(options, callback);
  },

// End

     getShareWith: function (data, callback) {
    Employee.find({
        
    }).exec(function (err, found) {
      if (err) {
        callback(err, null);
      } else {
          callback(null, found);
      }
      })
  },

  search: function (data, callback) {

        var Model = this;
        var Const = this(data);
        var maxRow = Config.maxRow;
        var pagestartfrom = (data.page - 1) * maxRow;
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
                asc: "name",
            },
            start: (page - 1) * maxRow,
            count: maxRow
        };
        _.each(data.filter, function (n, key) {
            if (_.isEmpty(n)) {
                n = undefined;
            }
        });
        if (data.keyword != "") {
            async.parallel([
                //Start 
                function (callback) {
                    var Search = Employee.aggregate([
                    //     {
                    //     $lookup: {
                    //         from: "offices",
                    //         localField: "postedAt",
                    //         foreignField: "_id",
                    //         as: "postedAt"
                    //     }
                    // }, {
                    //     $unwind: "$postedAt"
                    // },
                    {
                        $lookup: {
                            from: "grades",
                            localField: "grade",
                            foreignField: "_id",
                            as: "grade"
                        }
                    }, {
                        $unwind: "$grade"
                    }, {
                        $match: {
                            $or: [{
                                "grade.name": {
                                    $regex: data.keyword,
                                    $options: 'i'
                                }
                            }
                            // ,{
                            //     "postedAt.name": {
                            //         $regex: data.keyword,
                            //         $options: 'i'
                            //     }
                            // }
                            , {
                                "name": {
                                    $regex: data.keyword,
                                    $options: 'i'
                                }
                            }, {
                                "officeEmail": {
                                    $regex: data.keyword,
                                    $options: 'i'
                                }
                            }, {
                                "officeMobile": {
                                    $regex: data.keyword,
                                    $options: 'i'
                                }
                            }]
                        }
                    }, {
                        $skip: parseInt(pagestartfrom)
                    }, {
                        $limit: maxRow
                    }], function (err, data1) {
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, data1);
                        }
                    });

                },

                function (callback) {
                    var Search = Employee.aggregate([{
                        $lookup: {
                            from: "cities",
                            localField: "postedAt",
                            foreignField: "_id",
                            as: "postedAt"
                        }
                    }, {
                        $unwind: "$postedAt"
                    },{
                        $lookup: {
                            from: "grades",
                            localField: "grade",
                            foreignField: "_id",
                            as: "grade"
                        }
                    }, {
                        $unwind: "$grade"
                    }, {
                        $match: {
                           $or: [{
                                "grade.name": {
                                    $regex: data.keyword,
                                    $options: 'i'
                                }
                            },{
                                "postedAt.name": {
                                    $regex: data.keyword,
                                    $options: 'i'
                                }
                            }, {
                                "name": {
                                    $regex: data.keyword,
                                    $options: 'i'
                                }
                            }, {
                                "officeEmail": {
                                    $regex: data.keyword,
                                    $options: 'i'
                                }
                            }, {
                                "officeMobile": {
                                    $regex: data.keyword,
                                    $options: 'i'
                                }
                            }]
                        }
                    }, {
                        $group: {
                            _id: null,
                            count: {
                                $sum: 1
                            }
                        }
                    }, {
                        $project: {
                            "_id": 1,
                            "count": 1
                        }
                    }], function (err, data2) {
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, data2);
                        }
                    });
                }

                //end
            ], function (err, data4) {
                if (err) {
                    callback(err, null);
                }
                if(_.isEmpty(data4[1])){
                    var data5 = {
                    results: data4[0],
                    options: {
                        count: 0
                    }
                };
                } else {
                    var data5 = {
                    results: data4[0],
                    options: {
                        count: maxRow
                    }
                };
                data5.total=data4[1][0].count;
                }
                callback(null, data5);
            });
        } else {
            var Search = Model.find(data.filter)

            .order(options)
                .deepPopulate("postedAt grade")
                .keyword(options)
                .page(options, callback);
        }
    }
};
module.exports = _.assign(module.exports, exports, model);