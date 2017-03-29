module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    generateSalesRegisterExcel: function (req, res) {
        req.model.generateSalesRegisterExcel(req.query, res);
    }

};
module.exports = _.assign(module.exports, controller);
