module.exports = {
    index: function(req, res) {
        res.callback(null, {
            title: "This is FrontEnd"
        });
    },
    index2: function(req, res) {
        res.callback(null, {
            Demo: "This is Generated"
        });
    }
};
