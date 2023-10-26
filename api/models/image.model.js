const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  myFile: String,
  author: String,
},{
  timestamps: true
});

const imageModel = mongoose.models.images || mongoose.model('image', imageSchema);

module.exports = imageModel;
