var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jwt-simple');

const formidable = require('formidable');
const form = new formidable.IncomingForm
var secret = 'xxxx';




exports.getUserDetails = (req,res,next)=>{
  console.log(req.body);
  User.find({"email":req.body.email, "pwd":req.body.pwd}).then(data=>{
    console.log(data);
    res.status(200).send(data);
  }).catch(err=>{
    res.status(500).send(err);
  })
}

exports.getUserDetailsById = (req,res,next)=>{
  User.find({"email":req.params.email}).then(data=>{
    console.log(data);
    res.status(200).send(data);
  }).catch(err=>{
    res.status(500).send(err);
  })
}

exports.postNewUserDetails = (req,res,next) => {
  var body = req.body;
  var token = jwt.encode(body, secret);
  console.log(token);
  var user = new User(body);
  user.save().then(dat=>{
    console.log(dat);
    dat['token'] = token;
    res.status(200).send(dat);
  }).catch(err=>{
    console.log(err);
    res.status(500).send(err);
  })
}

exports.updateUserDetails = (req,res,next) => {
  var body = req.body;
  var email = req.body.email
  console.log(email);
  User.updateMany({"email": email}, {$set: {"email": body.email,
   "first_name":body.first_name, "last_name":body.last_name, "update_dt":body.update_dt} },{many : true}).then(data=>{
    res.status(200).send(data);
  }).catch(err=>{
    res.status(500).send(err);
  });
}


exports.deleteUser = (req,res,next) => {
  User.remove({"email":req.params.email}).then(data=>{
    res.status(200).send(data);
  }).catch(err=>{
    res.status(500).send(err);
  })
}
exports.upload = (req,res,next) => {
  var data = [];
  form.parse(req);


  form.on('fileBegin',(name,file) =>
  {
    file.name='file1.jpeg'
    file.path=`C:/workspace/Angular-App-master/license 1/${file.name}`;
  })
  res.status(200).send(data);
}

exports.upload1 = (req,res,next) => {
  var data = [];
  form.parse(req);
  form.on('fileBegin',(name,file) =>
  {
    file.name='file1.jpeg'
    file.path=`C:/workspace/Angular-App-master/license 2/${file.name}`;
  })
  res.status(200).send(data);
}
