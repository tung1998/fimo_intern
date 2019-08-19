var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var index = require("./routes/index");
var pet = require("./routes/pet");

var config = require("./config");
var app = express();

// View engine
var ejsEngine = require("ejs-locals");
app.engine("ejs", ejsEngine);   // support master pages
app.set("view engine", "ejs");  // ejs view engine

//Set static folder
app.use(express.static(path.join(__dirname, "client")));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/", index);
app.use("/pet", pet);
// app.get("/product", function(req, res){
//     res.send("Alo alo");
// })
app.listen(config.port, function(){
    console.log("Sever started on port " + config.port);
})