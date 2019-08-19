var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next){
    //res.send("INDEX page");
    res.render("index", {title: "Express Mongo"});
});

module.exports = router;