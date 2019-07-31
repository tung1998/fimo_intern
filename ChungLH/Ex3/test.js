// var express = require('express');
// var app = express();

// // Phuong thuc get() phan hoi mot GET Request
// app.get('/', function (req, res) {
//    console.log("GET Request");
//    res.send('Hello GET');
// });


// // Phuong thuc post() phan hoi mot POST Request
// app.post('/', function (req, res) {
//    console.log("POST Request");
//    res.send('Hello POST');
// });

// // Phuong thuc delete() phan hoi mot DELETE Request.
// app.delete('/delete', function (req, res) {
//    console.log("DELETE Request");
//    res.send('Hello DELETE');
// });


// // Phuong thuc nay phan hoi mot GET Request có dạng abcd, abxcd, ab123cd, ...
// app.get('/ab*cd', function (req, res) {
//    console.log("GET request /ab*cd");
//    res.send('Page Pattern Match');
// });

// var server = app.listen(3000, function () {
//    var host = server.address().address
//    var port = server.address().port
//    console.log("Ung dung Node.js dang hoat dong tai dia chi: http://%s:%s", host, port);
// });

var express = require("express");
var app = express();
app.use(express.static(__dirname + '/public'));
var port = 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect to the database
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/accountManager", {
   useNewUrlParser: true
});

var nameSchema = new mongoose.Schema({
   firstName: String,
   lastName: String
});

var clientSchema = new mongoose.Schema({
   fullName: String,
   email: String,
   phoneNumber: String,
   job: String,
   password: String
});

var User = mongoose.model("User", nameSchema);
var Client = mongoose.model("Client", clientSchema);

app.get("/", (req, res) => {
   // res.sendFile(`${__dirname}/less.less`);
   res.sendFile(__dirname + "/login.html");
});

app.get("/register", (req, res) => {
   res.sendFile(__dirname + "/register.html");
});

app.post("/home", (req, res) => {
   var login = new Object();
   login.username = req.body.email;
   login.password = req.body.password;

   // Client.findOne({ 'email': `${login.username}` }, function (err, user) {
   //    if (err) return handleError(err);
   //    // Prints "Space Ghost is a talk show host".
   //    if(user.password == login.password){
   //       res.sendFile(__dirname + "/welcome.html")
   //    }
   //    else{
   //       res.sendFile(__dirname + "/login");
   //    }
   //  });

   Client.find({ 'email': `${login.username}` }, 'password fullName', function (err, client) {
      if (err) return handleError(err);
      // 'athletes' chứa danh sách các vận động viên phù hợp với tiêu chí đã đề ra.

      // console.log(`${client.fullName} co password: ${client.password} ----------- ${login.username}  +  ${login.password}` );
      // console.log(client);
      // res.send(`${client[0].fullName} co password: ${client[0].password}`);
      if(client.length == 0 ){
         res.sendFile(`${__dirname}/login2.html`)
      }
      else if (client[0].password == login.password) {
         res.sendFile(`${__dirname}/welcome.html`);
      }
      else {
         res.sendFile(`${__dirname}/login2.html`)
      }
   })
});

app.post("/createclient", (req, res) => {

   // res.send("asfjeaoiwfj");
   // console.log(req.body.password);
   // console.log(req.body.repeatPassword);
   var myData = new Client(req.body);
   // console.log(req.body);
   // res.send("Successed");
   Client.find({ 'email': `${myData.email}` }, function (err, client) {
      if (client.length > 0) {
         res.sendFile(`${__dirname}/register2.html`);
      }
      else {
         myData.save()
            .then(item => {
               res.sendFile(`${__dirname}/login.html`);
            })
            .catch(err => {
               res.status(400).send("Please check your info on the form below");
            });
      }
   });
});

// app.post("/addname", (req, res) => {

//    // res.send("asfjeaoiwfj");
//    var myData = new User(req.body);
//    console.log(req.body);
//    res.send("Successed");
//    myData.save()
//        .then(item => {
//            res.sendFile("Name saved to database");
//        })
//        .catch(err => {
//            res.status(400).send("Unable to save to database");
//        });

// });

app.listen(port, () => {
   console.log("Server listening on port " + port);
});