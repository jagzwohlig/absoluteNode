/**
 * CountryController
 *
 * @description :: Server-side logic for managing countries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var mongoose = require("mongoose");
module.exports = {
    save: function(req, res) {
        req.model.saveData(req.body, res.callback);
    },
    delete: function(req, res) {
        if (mongoose.Types.ObjectId.isValid(req.body._id)) {
            req.model.deleteData(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "ObjectId Invalid"
            });
        }

    },
    getOne: function(req, res) {
        if (mongoose.Types.ObjectId.isValid(req.body._id)) {
            req.model.getOne(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "ObjectId Invalid"
            });
        }
    },
    search: function(req, res) {
        req.model.search(req.body, res.callback);
    }

};
