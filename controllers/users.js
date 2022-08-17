const db = require("../models/index");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");


 const  error = (status, message) =>{
  let err = new Error();
  err.status = status;
  err.message = message;
  return err;
 };
 


const Register = async (req,res,next) => {
  try {
    const {name, email , password} = req.body;

    if(!name, !email , !password) {
      return next(error(401, "please input values"));
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password,salt);
   
   const checkEmail = await User.findOne({ where: {email : email}});
     if(checkEmail) {
       return next(error(404, "User already exist"));
     }
   
   const user = await User.create({
     name: name,
     email: email,
     password: hashpassword
   });
   const saveduser = user.save();
   res.status(200).json(saveduser);
  } catch (error) {
    next(error);
  }

};

const Login = async (req,res,next) => {

  try {
    //  const {name, password} = req.body;
const user = await User.findOne({where : {email: req.body.email}});
if(!user){
return next(error(401, "User not found"));
}
const ismatch = await bcrypt.compare(req.body.password,user.password);
if(!ismatch) {
return next(error(401, "invalid password"));
}
res.status(200).json("successfully logged in"); 
  } catch (error) {
   next(error); 
  }

};

module.exports = {Register,Login};