const errorResponce = require("../utilis/errorResponce");

// const UserModel = require('../models/UserModel');
exports.sentToken=async(user,statuscode,res)=>{
    const Token = user.getSignedJwtToken(res);
    res.status(statuscode).json({success: true, token: Token});
}


exports.registercontroller=async(req,res,next)=>{
    try{
     const {username,email,password}=req.body;
        const existingemail = await UserModel.findOne({email});
        if(existingemail){
            return next(new errorResponce('email already exist',400))
        }
        const user = await UserModel.create({
            username,
            email,
            password
        })
        this.sentToken(user,200,res)
    }catch(err){
          console.log(err)
          next(err)

    }
}
exports.logincontroller=async(req,res,next)=>{
    try{
     if(!req.body.email || !req.body.password){
        return next(new errorResponce('please provide email and password',400))
     }
     const user = await UserModel.findOne({email: req.body.email}).select('+password');
     if(!user){
        return next(new errorResponce('invalid email or password',401))
     }
     const isMatch = await user.matchPassword(req.body.password);
     if(!isMatch){
        return next(new errorResponce('invalid email or password',401))
     }
     this.sentToken(user,200,res)

    }catch(err){
        console.log(err)
        next(err)
    }
}
exports.logoutcontoller=async(req,res)=>{
    res.clearCookie('refreshToken');
    res.status(200).json({success: true, message: 'logged out successfully'})
}