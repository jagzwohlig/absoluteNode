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
        req.model.deleteData(req.body, res.callback);
    },
    getOne: function(req, res) {
        req.model.getOne(req.body, res.callback);
    }
};
