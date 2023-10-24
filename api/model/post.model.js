import mongoose from 'mongoose';

const postScheema = mongoose.Schema({
  myFile: String
})

export default mongoose.models.posts ||  mongoose.model('post', postScheema)
