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
        required: true
    },
    date: {
        type: Date
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true,
        key: "employee"
    },
    allBranch: [{
        type: Schema.Types.ObjectId,
        ref: "Branch",
        key: "employee"
    }],
    employee: {
        type: Schema.Types.ObjectId,
        ref: "Employee"
    },
    role: [{
        type: Schema.Types.ObjectId,
        ref: "Role"
    }],
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
    formatted_address: String,
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
    assignment: [{
        assignment: {
            type: Schema.Types.ObjectId,
            ref: "Assignment",
            index: true
        },
        status: {
            type: Boolean,
            default: false
        }
    }],
    //   assignment: {
    //     type: [{
    //         type: Schema.Types.ObjectId,
    //         ref: "Assignment",
    //     }],
    //     index: true,
    //     restrictedDelete: true
    // },

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
        'allBranch': {
            select: 'name _id'
        },
        'role': {
            select: ''
        },
        'assignment.assignment': {
            select: 'name address surveyDate city pincode siteMobile siteNumber siteEmail '
        },
        'assignment.assignment.city': {
            select: 'name district'
        },
        'assignment.assignment.city.district': {
            select: 'name _id state'
        },
        'assignment.assignment.city.district.state': {
            select: 'name _id zone'
        },
        'assignment.assignment.city.district.state.zone': {
            select: 'name _id country'
        },
        'assignment.assignment.city.district.state.zone.country': {
            select: 'name _id'
        },
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
        },
        'employee': {
            select: 'name _id officeEmail email'
        }
    }
});
// schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Employee', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "city.district.state.zone.country func grade department IIISLACertificate.department allBranch role employee", "city.district.state.zone.country  func grade postedAt allBranch role employee"));
var model = {
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
                },
                isSBC: false,
                isField: false,
                isSurveyor: false
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
        var Search = Model.find(data.filter)
            .order(options)
            .deepPopulate("postedAt")
            .keyword(options)
            .page(options, callback);
    },
    getBackendEmployeeOnly: function (data, callback, user) {

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
        // if (user) {
        //     data.filter._id = {
        //         $in: _.concat(user.children, user.employee._id)
        //     };
        // }
        var Search = Model.find(data.filter)
            .order(options)
            .deepPopulate("postedAt")
            .keyword(options)
            .page(options, callback);
    },

    // End
    getLoginEmployee: function (data, callback) {
        Employee.findOne({
            officeEmail: data.email
        }).deepPopulate("role employee").exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, found);
            }
        })
    },
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

    getLoginSurveyor: function (data, callback) {
        Employee.findOne({
            officeEmail: data.email,
            $or: [{
                isSurveyor: true
            }, {
                isField: true
            }]
        }, {
            name: 1,
            photo: 1,
            grade: 1
        }).populate("grade", "name").exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, found);
            }
        })
    },
    getSurveyor: function (data, callback) {
        Employee.find({
            $or: [{
                isSurveyor: true
            }, {
                isField: true
            }]
        }, {
            _id: 1,
            name: 1
        }).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else {
                var data = {};
                data.results = found;
                console.log(found);
                callback(null, data);
            }
        })
    },
    getTask: function (data, callback) {
        var deepSearch = "assignment.assignment assignment.assignment.city assignment.assignment.city.district assignment.assignment.city.district.state assignment.assignment.city.district.state.zone assignment.assignment.city.district.state.zone.country";
        Employee.findOne({
            _id: data.id
        }).deepPopulate(deepSearch).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else {
                var arr = [];
                _.each(found.assignment, function (n) {
                    if (n.status === false) {
                        arr.push(n);
                    }
                });
                callback(null, arr);
            }
        })
    },
    // async.parallel start
    mobileSubmit: function (data, callback) {
        async.parallel({
            saveEmployee: function (callback) {
                Employee.update({
                    "assignment._id": data.empId
                }, {
                    $set: {
                        "assignment.$.status": true
                    }
                }).exec(function (err, found) {
                    if (err) {
                        console.log(err);
                        callback(err, null);
                    } else if (found) {
                        console.log("Found", found);
                        callback(null, found);
                    } else {
                        callback(null, found);
                    }
                });
            },
            saveAssignment: function (callback) {
                _.each(data.doc, function (n) {
                    n.fileName = Date.now(),
                        n.employee = data.empId;
                });
                _.each(data.photos, function (n) {
                    n.fileName = Date.now(),
                        n.employee = data.empId;
                });
                _.each(data.jir, function (n) {
                    n.fileName = Date.now(),
                        n.employee = data.empId;
                });
                Assignment.update({
                    _id: data.assignId
                }, {
                    $push: {
                        docs: {
                            $each: data.doc
                        },
                        photos: {
                            $each: data.photos
                        },
                        jir: {
                            $each: data.jir
                        }
                    }
                }).exec(function (err, found) {
                    if (err) {
                        console.log(err);
                        callback(err, null);
                    } else if (found) {
                        console.log("Found", found);
                        callback(null, found);
                    } else {
                        callback(null, found);
                    }
                });
            },
        }, function (err, results) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else if (results && results.length > 0) {
                callback(null, results);
            } else {
                callback(null, results);
            }
        });
    },
    // async.parallel End
    saveEmployeeAssignment: function (data, callback) {
        Employee.findOne({
            _id: data._id
        }).exec(function (err, employee) {
            if (err) {
                callback(err, null);
            } else {
                console.log("In saveEmployeeAssignment", employee);
                console.log("ABC");
                employee.assignment.push(data.assignment);
                console.log("In saveEmployeeAssignment", employee);
                Employee.saveData(employee, callback);
            }
        })
    },

    getEmployeeByOfficeEmail: function (data, callback) {
        console.log("officeEmail", officeEmail);
        Employee.findOne({
            email: data.email
        }, {
            name: 1,
            officeEmail: 1,
            email: 1
        }).exec(function (err, employee) {
            if (err) {
                callback(err, null);
            } else {
                if (_.isEmpty(employee)) {
                    callback(null, "No Data found");
                } else {
                    callback(null, employee);
                }
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
                    var Search = Employee.aggregate([{
                        $lookup: {
                            from: "offices",
                            localField: "postedAt",
                            foreignField: "_id",
                            as: "postedAt"
                        }
                    }, {
                        $unwind: "$postedAt"
                    }, {
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
                            }, {
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
                            from: "offices",
                            localField: "postedAt",
                            foreignField: "_id",
                            as: "postedAt"
                        }
                    }, {
                        $unwind: "$postedAt"
                    }, {
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
                            }, {
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
                if (_.isEmpty(data4[1])) {
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
                    data5.total = data4[1][0].count;
                }
                callback(null, data5);
            });
            console.log("data.filter", data.filter);
        } else {
            console.log("data.filter", data.filter);
            var Search = Model.find(data.filter)
                .order(options)
                .deepPopulate("postedAt grade")
                .keyword(options)
                .page(options, callback);
        }
    },

    employeeSearch: function (data, callback) {

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

        var Search = Model.find(data.filter)
            .order(options)
            .deepPopulate("postedAt grade")
            .keyword(options)
            .page(options, callback);

    },

    getEmployeeNameEmail: function (data, callback) {

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

        var Search = Model.find(data.filter)
            .order(options)
            .deepPopulate("postedAt grade")
            .keyword(options)
            .page(options, function (err, userData) {
                console.log("getemp", userData);
                if (err) {
                    callback(err, null);
                } else {
                    if (_.isEmpty(userData)) {
                        callback([], null);
                    } else {
                        var newData = [];
                        _.each(userData.results, function (values) {
                            newData.push({
                                name: values.name,
                                email: values.officeEmail
                            });
                        });
                        callback(null, newData);
                    }

                }
            });

    },


    getDashboardCounts: function (data, callback) {
        var Search = Assignment.aggregate([{
            $group: {
                _id: "$timelineStatus",
                count: {
                    $sum: 1
                }
            }
        }, {
            $project: {
                "_id": 1,
                "count": 1
            }
        }], function (err, counts) {
            if (err) {
                callback(err, null);
            } else {
                if (counts == []) {
                    callback(null, counts);
                } else {
                    callback(null, counts);
                }
            }
        });
    },

    getAllBranch: function (data, callback) {
        var Model = this;
        var Search = Model.findOne({
            "_id": data.filter._id
        }).lean().populate('allBranch').exec(function (err, data2) {
            if (err) {
                callback(err, data2);
            } else if (_.isEmpty(data2)) {
                callback(err, data2);
            } else {
                var data3 = {};
                console.log("ABC", data2);
                data3.results = data2.allBranch;
                callback(err, data3);
            }
        });
    },
    getChildEmployee: function (data, callback) {
        var allEmployee = [];
        var Model = this;
        var Search = Model.find({
            "employee": data._id
        }).lean().exec(function (err, data2) {
            if (err) {
                callback(err, allEmployee);
            } else {
                allEmployee = _.map(data2, function (n) {
                    return n._id + "";
                });
                if (allEmployee.length > 0) {

                    async.each(allEmployee, function (n, callback) {

                        Model.getChildEmployee({
                            _id: n
                        }, function (err, data) {
                            if (err) {
                                callback();
                            } else {
                                allEmployee = _.concat(allEmployee, data);
                                callback();
                            }
                        });
                    }, function (err, data) {
                        callback(err, _.compact(allEmployee));
                    });
                } else {
                    callback(err, _.compact(allEmployee));
                }

            }
        });
    },

    getParentEmployee: function (data, callback) {
        var allEmployee = [];
        var Model = this;
        var Search = Model.findOne({
            "_id": data._id
        }).lean().exec(function (err, data2) {
            if (err) {
                callback(err, allEmployee);
            } else {
                console.log("data2", data2);
                // if (data2.employee) {
                if (data2 != null) {
                    allEmployee.push(data2.employee);
                    Model.getParentEmployee({
                        _id: data2.employee
                    }, function (err, data3) {
                        if (err) {

                        } else {
                            allEmployee = _.concat(allEmployee, data3);
                        }
                        callback(null, _.compact(allEmployee));
                    });
                } else {
                    callback(null, _.compact(allEmployee));
                }
            }
        });
    },

    getEmployeeData: function (data, callback) {
        Employee.getParentEmployee(data, function (err, empData) {
            if (err) {
                callback(err, null);
            } else {
                if (_.isEmpty(empData)) {
                    callback(err, null);
                } else {
                    Employee.find({
                        _id: {
                            $in: empData
                        }
                    }, {
                        _id: 1,
                        name: 1,
                        officeEmail: 1
                    }).lean().exec(function (err, userData) {
                        if (err) {
                            callback(err, null);
                        } else {
                            if (_.isEmpty(userData)) {
                                callback([], null);
                            } else {
                                var newData = [];
                                _.each(userData, function (values) {
                                    newData.push({
                                        name: values.name,
                                        email: values.officeEmail
                                    });
                                });
                                callback(null, newData);
                            }

                        }
                    });
                }
            }
        });

    }

};
module.exports = _.assign(module.exports, exports, model);