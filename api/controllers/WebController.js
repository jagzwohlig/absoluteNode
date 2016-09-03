module.exports = {
    index: function(req, res) {
        var jsFiles = require("../../frontend/files.js");
        res.view(sails.config.environment, {
            jsFiles: jsFiles,
            title: "Abolute Business Manager",
            description: "Abolute Business Manager",
            keywords: "Abolute,Business,Manager",
            image: "http://www.wohlig.com/img/logo.png",
        });
    },
    download: function(req, res) {
        Config.readUploaded(req.param("filename"), null, null, null, res);
    }
};
