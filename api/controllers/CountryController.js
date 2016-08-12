/**
 * CountryController
 *
 * @description :: Server-side logic for managing countries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    findLimited: function(req, res) {
        Country.getPagination(req.body, res.callback);
    }
};
