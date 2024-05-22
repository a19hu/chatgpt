const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: [true, 'Username is required'],
  },
  email:{
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password:{
    type: String,
    required: [true, 'Password is required'],
  },
  subscribtion:{
    type: String,
    enum: ['free', 'standard', 'premium'],
    default: 'free'
  },
  customerId:{
    type: String,
    default:""
  }

})

// hashed password

userSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})
// match password

userSchema.methods.matchPassword = async function(password){
  return await bcrypt.compare(password, this.password);
}

// Sign token

userSchema.methods.getSignedJwtToken = function(res){
 
  const accessToken = jwt.sign({id: this._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
  const refreshToken = jwt.sign({id: this._id}, process.env.JWT_REFRESH, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE
  })
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true
  })
//   return accessToken
}

const User = mongoose.model('User', userSchema);

module.exports = User;