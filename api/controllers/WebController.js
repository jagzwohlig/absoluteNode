module.exports = {
    index: function (req, res) {
        res.metaView();
    },
    download: function (req, res) {
        Config.readUploaded(req.param("filename"), null, null, null, res);
    },
    downloadWithName: function (req, res) {
        Config.downloadWithName(req.param("filename"), req.query.name, res);
    }
};