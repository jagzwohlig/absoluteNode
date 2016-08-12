/**
 * CountryController
 *
 * @description :: Server-side logic for managing countries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    save: function(req, res) {
        req.model.saveData(req.body, res.callback);
    },
    getAll: function(req, res) {
        req.model.getAll(req.body, res.callback);
    },
    delete: function(req, res) {
        if (req.body._id && req.body._id !== "") {
            req.model.deleteData(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Id"
            });
        }
    },
    getOne: function(req, res) {
        if (req.body._id && req.body._id !== "") {
            req.model.getOne(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "User id Invalid"
            });
        }
    },

};
