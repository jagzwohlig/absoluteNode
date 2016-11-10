/**
 * CountryController
 *
 * @description :: Server-side logic for managing countries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    getOfficer: function (req, res) {
        if (req.body) {
            req.model.getOfficer(req.body, res.callback);

        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    getSegmented: function (req, res) {
        if (req.body) {
            req.model.getSegmented(req.body, res.callback);

        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    import: function (req, res) {
        var xlsx = require('node-xlsx').default;
        var jsonExcel = xlsx.parse("./custommer.ods");
        var retVal = [];
        var excelDataToExport = _.slice(jsonExcel[0].data, 1);
        async.eachSeries(excelDataToExport, function (n, callback) {
                TypeOfOffice.getIdByName({
                    shortCode: n[3]
                }, function (err, data) {
                    if (err) {
                        retVal.push(err);
                        callback(null, data);
                    } else {
                        CustomerCompany.getIdByName({
                            shortCode: n[2]
                        }, function (err, data2) {
                            if (err) {
                                retVal.push(err);
                                callback(null, data3);
                            } else {
                                City.getIdByName({
                                    name: n[14]
                                }, function (err, data3) {
                                    if (err) {
                                        retVal.push(err);
                                        callback(null, data3);
                                    } else {
                                        Customer.getIdByName({
                                                customerSegment: "57c3ef9b6fb3c3420233a00d",
                                                typeOfOffice: data,
                                                customerCompany: data2,
                                                issueOffice: n[5],
                                                officeCode: n[4],
                                                category: n[6],
                                                creditLimitAlloted: n[7],
                                                creditLimitExhausted: "0",
                                                creditLimitPending: n[9],
                                                direct: n[19],
                                                phone1: n[20],
                                                phone2: n[21],
                                                phone3: "",
                                                email: n[22],
                                                city: data3,
                                                address: n[15],
                                                pincode: n[16],
                                                lat: 0,
                                                lng: 0,
                                            },
                                            function (err, data4) {
                                                if (err) {
                                                    retVal.push(err);
                                                    callback(null, data4);
                                                } else {
                                                    retVal.push(data3);
                                                    callback(null, data4);
                                                }
                                            });
                                    }
                                });

                            }
                        });

                    }
                });
            },
            function (err, data) {
                if (err) {
                    callback(err, data);
                } else {
                    res.json({
                        total: retVal.length,
                        value: retVal
                    });
                }
            });
    }
};
module.exports = _.assign(module.exports, controller);