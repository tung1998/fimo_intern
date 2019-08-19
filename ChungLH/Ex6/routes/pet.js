var express = require("express");
var path = require("path");
var router = express.Router();
//upload file
var multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './client');
    },
    filename: function(req, file, cb){
        now = new Date().getTime().toString() + '.jpg';
        cb(null, now);
    }
});
var upload = multer({storage: storage});
//mongoose
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/petshop", {
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connet to MD successfully");
});
// Schema
var petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 0,
        max: 40,
        default: 0
    },
    category: {
        required: true,
        type: String,
        enum: ["Dog", "Cat", "Hamster", "Other"]
    },
    description: {
        default: "Have no description, please add some",
        type: String
    },
    cost: {
        type: Number,
        min: 0,
        required: true
    },
    productImage:{
        type: String
    }
})
var Pet = mongoose.model("Pet", petSchema);
//Create
// var storage =   multer.diskStorage({
//     destination: function (req, file, callback) {
//       callback(null, './uploads');
//     },
//     filename: function (req, file, callback) {
//       callback(null, file.fieldname + '-' + Date.now());
//     }
//   });
  
// var upload = multer({ storage : storage}).single('userPhoto');

router.post("/product", upload.single('productImage'), function (req, res) {
    // res.send("Student API");
    // console.log(req.body);
    //console.log(req.file, "file");
    var pet = new Pet(req.body);
    if(req.file){
        pet.productImage = req.file.path.slice(7);
    }
    //console.log(req.file);
    //pet.productImage = req.file.path;
    console.log(req.body, "body");
    // console.log(pet.productImage, 123);
    // console.log(pet);
    pet.save()
        .then(item => {
            res.send("Successed")
        })
        .catch(err => {
            console.log(err);
            
            res.send("Please check your info on the form below");
        });
});
//Read
router.get("/load", function(req, res){
    Pet.find(function (err, pet) {
        if (err) return handleError(err);
        // console.log(`${client.fullName} co password: ${client.password} ----------- ${login.username}  +  ${login.password}` );
        // res.send(`${client[0].fullName} co password: ${client[0].password}`);
        if(pet.length == 0 ){
           res.send("hong co");
        }
        else{
            //console.log(pet);
            res.send(pet)
        }
    })
    //console.log(db.collection("pets"));
})
//Update
router.put('/update/:id', upload.single('productImage'),(req, res) => {
    if(req.file){
        //pet.productImage = req.file.path.slice(7);
        var img = req.file.path.slice(7);
    };
    console.log(req.body, 222222);
    Pet.findByIdAndUpdate({_id: req.params.id}, req.body).then(() => {
        Pet.findOne({_id: req.params.id}).then((pet) => {
            res.send(pet);
        })
    })
})
//Delete
router.delete('/delete/:id', (req, res) => {
    //console.log(req.params.id);
    Pet.findByIdAndRemove({_id: req.params.id})
    .then(() => {
        res.json({success: true});
    })
});

module.exports = router;
