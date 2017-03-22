/**
 * CountryController
 *
 * @description :: Server-side logic for managing countries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    getPerson: function (req, res) {
        if (req.body) {
            req.model.getPerson(req.body, res.callback);

        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    generateInvoicePdf: function (req, res) {
        if (req.body) {
            req.model.generateInvoicePdf(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    getNearestSurveyor: function (req, res) {
        if (req.body) {
            req.model.getNearestSurveyor(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    // assignmentNumberDetail: function (req, res) {
    //     if (req.body) {
    //         req.model.assignmentNumberDetail(req.body, res.callback);
    //     } else {
    //         res.json({
    //             value: false,
    //             data: "Invalid Request"
    //         });
    //     }
    // },
    updateSurveyor: function (req, res) {
        if (req.body) {
            req.model.updateSurveyor(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    decline: function (req, res) {
        if (req.body) {
            req.model.decline(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    mobileSubmit: function (req, res) {
        if (req.body) {
            req.model.mobileSubmit(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    taskList: function (req, res) {
        if (req.body) {
            req.model.taskList(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    getNearestSurveyor2: function (req, res) {
        if (req.body) {
            req.model.getNearestSurveyor2(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    generateAssignmentNumber: function (req, res) {
        if (req.body) {
            req.model.generateAssignmentNumber(req.body, res.callback);

        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    getAssignmentApprovalList: function (req, res) {
        if (req.body) {
            req.model.getAssignmentApprovalList(req.body, res.callback);

        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    getApprovalList: function (req, res) {
        if (req.body) {
            req.model.getApprovalList(req.body, res.callback);

        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    updateNewSurveyor: function (req, res) {
        if (req.body) {
            req.model.updateNewSurveyor(req.body, res.callback);

        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    getSurveyorApprovalList: function (req, res) {
        if (req.body) {
            req.model.getSurveyorApprovalList(req.body, res.callback);

        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    saveTemplate: function (req, res) {
        if (req.body) {
            req.model.saveTemplate(req.body, res.callback);

        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    generateAssignmentNumberForAll: function (req, res) {
        // first make all the new params of assignment as null
        // get all assignements id ascending 
        // async.eachSeries(allassignement, function(n,callback) {
        //     assignement ka generate Assignment number for n element 
        //}, final callback {}) 
        if (req.body) {
            req.model.generateAssignmentNumberForAll(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }

    },
    getAssignmentTemplate: function (req, res) {
        if (req.body) {
            req.model.getAssignmentTemplate(req.body.type, req.body._id, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    editAssignmentTemplate: function (req, res) {
        if (req.body) {
            req.model.editAssignmentTemplate(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    updateAllIntimatedLoss: function (req, res) {
        if (req.body) {
            req.model.updateAllIntimatedLoss(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },

    updateAssignment: function (req, res) {
        if (req.body) {
            req.model.updateAssignment(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    getAll: function (req, res) {
        if (req.body) {
            req.model.getAll(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    getExpenditure: function (req, res) {
        if (req.body) {
            req.model.getExpenditure(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    assignmentFilter: function (req, res) {
        if (req.body) {
            req.model.assignmentFilter(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    updateOfficeId: function (req, res) {
        if (req.body) {
            req.model.updateOfficeId(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    }
};
module.exports = _.assign(module.exports, controller);