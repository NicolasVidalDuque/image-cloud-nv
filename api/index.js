const express = require('express');
const Image = require('./models/image.model.js');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080
const uri = process.env.HOST 

app.use(express.json());
app.use(cors({
  origin:'http://localhost:3333'
}));

app.post('/uploads', async (req, res) => {
  const body = req.body;
  try {
    const newImage = await Image.create(body);
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

mongoose.connect(uri, {  useNewUrlParser: true,  useUnifiedTopology: true}).then(() => {
  try{
    app.listen(port ,() => {
      console.log(`Server connected to http:localhost${port}`);
    })
  }catch(error){
    console.log("Cant connect do db");
  }
}).catch((error) => {
  console.log("Invalid Database Connection...");
})
