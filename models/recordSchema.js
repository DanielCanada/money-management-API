const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// record Schema
const recordSchema = new mongoose.Schema({
  title: String,
  body: String,
  amount: Number,
  date: {
    type: Date, 
    default: Date.now
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

// Hashing Password to Secure (in case needed)
/*
userSchema.pre('save', async function(next){
  if(this.isModified('password)){
    this.password = bcryptjs.hashSync(this.password, 10);
  }
  next();
})
*/

// Generate Tokens to Verify User
recordSchema.methods.generateToken = async function(){
  try {
    let generatedToken = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({token : generatedToken});
    await this.save();
    return generatedToken;
  } catch (error) {
    console.log(error)
  }
}

// Create Model
const Records = new mongoose.model("RECORDS", recordSchema);

module.exports = Records;