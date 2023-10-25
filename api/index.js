const express = require('express');
const Image = require('./models/image.model.js');
const mongoose = require('mongoose');
const cors = require('cors');
const {v4:uuidv4} = require('uuid');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;
const uri = process.env.DB; 

app.use(express.json());
app.use(cors({
  origin:'http://localhost:3333'
}));

app.post('/uploads', async (req, res) => {
  const body = req.body;
  try {
    const newImage = await Image.create({
      myFile: body.myFile, 
      id: uuidv4(),
      author:'test'
    });
    newImage.save();
    res.status(201).json({msg: "new image uploaded"});
  }catch(error){
    res.status(409).json({message: error.message});
  }
})

app.get('/photos', (req, res) =>{
  try{
    Image.find({}).then(data => {
      res.json(data);
    }).catch(error => {
      res.json({error});
    });
  }catch(error){
    res.json({error});
  }
})

app.delete('/photos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    // Find the post by ID and remove it from the database
    const deletedImage = await Image.findOneAndRemove({ _id: id });
    if (deletedImage) {
      res.status(200).json({ message: "Image deleted successfully" });
    } else {
      res.status(404).json({ message: "Image not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

mongoose.connect(uri, {  useNewUrlParser: true,  useUnifiedTopology: true}).then(() => {
  try{
    console.log("Connected to mongodb!")
    app.listen(port ,() => {
      console.log(`Server connected to http://localhost:${port}`);
    })
  }catch(error){
    console.log("Cant connect do db");
  }
}).catch((error) => {
  console.log("Invalid Database Connection...");
})
