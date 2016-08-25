module.exports = {
    index: function(req, res) {
        res.view("homepage", {
            title: "Abolute Business Manager",
            description: "Abolute Business Manager",
            keywords: "Abolute,Business,Manager",
            image: "http://www.wohlig.com/img/logo.png",
        });
    }
};
