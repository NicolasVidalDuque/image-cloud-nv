const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    required: true,
    type: String,
    min: 6,
    unique: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
    min: 8
  },
  profilePicture: {
    type: String
  }
});

const userModel = mongoose.models.users || mongoose.model('user', userSchema);

module.exports = userModel;
