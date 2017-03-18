module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
     getTimeline: function (req, res) {
        if (req.body) {
            req.model.getTimeline(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    updateEmailStatus: function (req, res) {
        if (req.body) {
            req.model.updateEmailStatus(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },

};
module.exports = _.assign(module.exports, controller);
