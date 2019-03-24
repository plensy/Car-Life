var express = require("express");
var app = express();
var UserController = require("./User/UserController");
var AuthController = require("./User/AuthController");
var mockController = require("./Mock-server/api-mock");
var CarController = require("./Car/CarController");
var passport = require('passport');
var AnnnonceController = require("./Annonces/AnnoncesController");
var bodyParser = require("body-parser");
var path = require("path");
var cors = require("cors");
const multer = require("multer");
var fs = require("fs");
var mkdirp = require("mkdirp");
var cookieParser = require("cookie-parser");
var  DIR = '/uploads/carte_grise';
var DIR2 = '/uploads/photo';
var DIR3 = '/uploads/intervention';

app.use('/', express.static(__dirname + '/'));
app.use(express.static(path.join(__dirname, "/dist/Frontend")));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(passport.initialize());
app.use("/api/user", UserController);
app.use("/auth", AuthController);
app.use("/api-mock", mockController);
app.use("/api-car", CarController);
app.use("/api-annonces", AnnnonceController);
app.get("/uploads/:folder/:file", function(req,res){
  path = '/uploads' + '/' + req.params.folder + '/' + req.params.file ;
    res.sendFile(path, function(err){
      if(err){
        res.status(404).json(err);
      } else {
        console.log ('file '+ req.params.file + ' sent ');
      }
    })
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/Frontend/index.html"));
});

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

let url;
let url2;
let url3;

try {
  fs.statSync("./uploads/carte_grise");
  console.log("Directory exists");
} catch (err) {
  if (err.code === "ENOENT") {
    mkdirp("./uploads/carte_grise", function(err) {});
  }
}

try {
  fs.statSync("./uploads/intervention");
  console.log("Directory exists");
} catch (err) {
  if (err.code === "ENOENT") {
    mkdirp("./uploads/intervention", function(err) {});
  }
}

try {
  fs.statSync("./uploads/photo");
  console.log("Directory exists");
} catch (err) {
  if (err.code === "ENOENT") {
    mkdirp("./uploads/photo", function(err) {});
  }
}

var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, DIR);
  },
  filename: function(req, file, callback) {
    console.log(file);
    
    
    const name = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
     url='./uploads/carte_grise/'+name
    console.log(url)
    callback(null,name )
    }
  });

  var storagephoto = multer.diskStorage({
    destination: function(req, file, callback) {
    callback(null,DIR2 )
    },
    filename: function(req, file, callback) {
    console.log(file);
    
   
    const namephoto= file.fieldname + '-' + Date.now() + path.extname(file.originalname);
     url2='./uploads/photo/'+namephoto
    console.log(url2)
    callback(null,namephoto )
    }
  });

let upload = multer({ storage: storage });
let uploadphoto =multer({storage: storagephoto});

app.post('/api/upload/justificatif',upload.single('photo'), function (req, res) {
  if (!req.file) {
      console.log("No file received");
      return res.send({
        success: false
      });

    } else {
      console.log('file received');
      return res.json({
       url
      })
    }
});

// root pour upload de photo
app.post('/api/upload/photo',uploadphoto.single('photo'), function (req, res) {
  if (!req.file) {
      console.log("No file received");
      return res.send({
        success: false
      });

    } else {
      console.log('file received');
      return res.json({
       url2
      })
    }
});

module.exports = app;
