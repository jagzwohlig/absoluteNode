module.exports = {
    index: function(req, res) {
        res.callback(null, {
            title: "This is FrontEnd"
        });
    }
};
