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

var clientSchema = new mongoose.Schema({
   fullName: String,
   email: {
      type: String,
      required: true
   },
   phoneNumber:{
      type: String,
      required: true
   },
   job: String,
   password: {
      type: String,
      required: true
   },
});

var Client = mongoose.model("Client", clientSchema);

app.get("/", (req, res) => {
   res.sendFile(__dirname + "/login.html");
});

app.get("/register", (req, res) => {
   res.sendFile(__dirname + "/register.html");
});

app.get("/welcome", (req, res) => {
   res.sendFile(__dirname + "/welcome.html");
});

app.post("/home", (req, res) => {
   var login = new Object();
   // console.log(req.body);
   login.username = req.body.email;
   login.password = req.body.password;

   Client.find({ 'email': `${login.username}` }, 'password fullName', function (err, client) {
      if (err) return handleError(err);
      // console.log(`${client.fullName} co password: ${client.password} ----------- ${login.username}  +  ${login.password}` );
      // res.send(`${client[0].fullName} co password: ${client[0].password}`);
      if(client.length == 0 ){
         res.send("Please check your account");
      }
      else if (client[0].password == login.password) {
         res.send("OKOK");
      }
      else {
         res.send("The password is incorrect");
      }
      // console.log(client);
      
      // res.send("123");
   })
   // console.log(`${login.username}         ${login.password}`);
});

app.post("/createclient", (req, res) => {
   // console.log(req.body.password);
   // console.log(req.body.repeatPassword);
   var myData = new Client(req.body);
   // console.log(req.body);
   // res.send("Successed");
   Client.find({ 'email': `${myData.email}` }, function (err, client) {
      if (client.length > 0) {
         res.send("Your account has been registered before");
      }
      else {
         // console.log(myData.email, myData.fullName, myData.job, myData.phoneNumber, myData.password[0]);
         myData.save()
            .then(item => {
               res.send("Successed")
            })
            .catch(err => {
               res.send("Please check your info on the form below");
            });
      }
   });
});


app.listen(port, () => {
   console.log("Server listening on port " + port);
});