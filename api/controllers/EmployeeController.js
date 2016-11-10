module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    import: function (req, res) {
        var xlsx = require('node-xlsx').default;
        var jsonExcel = xlsx.parse("./employee.ods");
        // console.log(jsonExcel[0].data);
        // res.json(jsonExcel[0].data);
        var retVal = [];
        var excelDataToExport = _.slice(jsonExcel[0].data, 1);
        // async.eachSeries(excelDataToExport, function (n, callback) {
        //     Grade.getIdByName({
        //         name: n[7],
        //     }, function (err, data) {
        //         if (err) {
        //             retVal.push(err);
        //             callback(null, data);
        //         } else {
        //             Func.getIdByName({
        //                 name: n[6]
        //             }, function (err, data2) {
        //                 if (err) {
        //                     retVal.push(err);
        //                     callback(null, data3);
        //                 } else {
        //                     Employee.getIdByName({
        //                         name: n[3] + " " + n[4],
        //                         firstName: n[3],
        //                         lastName: n[4],
        //                         company: "57b08c39e69e5abf43334252",
        //                         salutation: n[2],
        //                         branch: {
        //                             type: Schema.Types.ObjectId,
        //                             ref: "Branch",
        //                             required: true,
        //                             key: "employee"
        //                         },
        //                         func: {
        //                             type: Schema.Types.ObjectId,
        //                             ref: "Func",
        //                             required: true,
        //                             key: "employee"
        //                         },
        //                         postedAt: {
        //                             type: Schema.Types.ObjectId,
        //                             ref: "Office",
        //                             required: true,
        //                             key: "employee"
        //                         },
        //                         grade: {
        //                             type: Schema.Types.ObjectId,
        //                             ref: "Grade",
        //                             required: true,
        //                             key: "employee"
        //                         },
        //                         houseColor: {
        //                             type: String
        //                         },
        //                         employeeCode: {
        //                             type: String
        //                         },
        //                         photo: {
        //                             type: String
        //                         },
        //                         CTCDetails: [{
        //                             amount: {
        //                                 type: String
        //                             },
        //                             from: {
        //                                 type: Date
        //                             },
        //                             to: {
        //                                 type: Date
        //                             },
        //                             image: {
        //                                 type: String
        //                             },
        //                             grade: {
        //                                 type: Schema.Types.ObjectId,
        //                                 ref: "Grade",
        //                                 required: true,
        //                                 key: "employee"
        //                             },
        //                         }],
        //                         bank: {
        //                             type: String
        //                         },
        //                         accountNumber: {
        //                             type: String
        //                         },
        //                         branchName: {
        //                             type: String
        //                         },
        //                         neftCode: {
        //                             type: String
        //                         },
        //                         gender: {
        //                             type: "String",
        //                             enum: ["Female", "Male"],
        //                             required: true
        //                         },
        //                         city: {
        //                             type: Schema.Types.ObjectId,
        //                             ref: "City",
        //                             index: true,
        //                             required: true
        //                         },
        //                         address: String,
        //                         pincode: String,
        //                         lat: {
        //                             type: Number,
        //                         },
        //                         lng: {
        //                             type: Number,
        //                         },
        //                         officeNumber: {
        //                             type: Number
        //                         },
        //                         officeMobile: {
        //                             type: Number
        //                         },
        //                         officeEmail: {
        //                             type: String
        //                         },
        //                         homeNumber: {
        //                             type: Number
        //                         },
        //                         mobile: {
        //                             type: Number
        //                         },
        //                         email: {
        //                             type: String
        //                         },
        //                         extension: {
        //                             type: Number
        //                         },
        //                         birthDate: {
        //                             type: Date
        //                         },
        //                         marriageDate: {
        //                             type: Date
        //                         },
        //                         joiningDate: {
        //                             type: Date
        //                         },
        //                         leavingDate: {
        //                             type: Date
        //                         },
        //                         isSBC: {
        //                             type: Boolean
        //                         },
        //                         isField: {
        //                             type: Boolean
        //                         },
        //                         isSurveyor: {
        //                             type: Boolean
        //                         },
        //                         name: n[4]
        //                     }, function (err, data3) {
        //                         if (err) {
        //                             retVal.push(err);
        //                             callback(null, data3);
        //                         } else {
        //                             retVal.push(data3);
        //                             callback(null, data3);
        //                         }
        //                     });

        //                 }
        //             });

        //         }
        //     });
        // }, function (err, data) {
        //     if (err) {
        //         callback(err, data);
        //     } else {
        //         res.json({
        //             total: retVal.length,
        //             value: retVal
        //         });
        //     }
        // });
    }
};
module.exports = _.assign(module.exports, controller);