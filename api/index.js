import express from 'express';
import connect from './database/conn.js';
import Post from './model/post.model.js';
import cors from 'cors'

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors({
  origin:'http://localhost:3333'
}));

app.post('/uploads', async (req, res) => {
  const body = req.body;
  try {
    const newImage = await Post.create(body);
    newImage.save();
    res.status(201).json({msg: "new image uploaded"});
  }catch(error){
    res.status(409).json({message: error.message});
  }
})

app.get('/photos', (req, res) =>{
  try{
    Post.find({}).then(data => {
      res.json(data);
    }).catch(error => {
      res.json({error});
    });
  }catch(error){
    res.json({error});
  }
})

connect().then(() => {
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
