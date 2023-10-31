const express = require('express');
const Image = require('./models/image.model.js');
const User = require('./models/user.model.js');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express(); 
const port = process.env.PORT || 8080;
const uri = process.env.DB; 
const salt = bcrypt.genSaltSync();
const secret = process.env.SECRET;


app.use(express.json());
app.use(cors({
  origin:'http://localhost:3333',
  credentials: true
}));
app.use(cookieParser());

const fieldUserExists = async (fieldToCheck, valueToCheck) => {
  // Sends a request to db to cofirm if the dinamic fieldToCheck has a duplicated value of valueToCheck.
  // It returns an arry of promisses of false [P, P, f, P]
  try{
    const query = {};
    query[fieldToCheck] = valueToCheck;
    const user = await User.findOne(query);
    if(user){
      return {fieldToCheck, valueToCheck};
    }
    return false;
  }catch (err){
    console.log(err);
    return err;
  }
}

const validateForm = async ({profilePicture, password, ...form}) => {
  // Recieves the form and takes away the profilePicture (not unique) and password.
  // for each field it sends a request to the db with the function (fieldUserExists)
  // at last it returns an array of fulfilled array of promises. If the user is found (duplecated when it has to be unique) then the fieldToCheck and valueToCheck are returned; when the user is not found (it is unique) it returns false. The return statement filters all false elements, therefore only the non-unique values (that must be changed) are returned.
  const requests = Object.keys(form).map( async (field) => {
    return await fieldUserExists(field, form[field]);
  });
  const fulfilled = await Promise.all(requests);
  return fulfilled.filter(item => item !== false);
}

app.post('/uploads', async (req, res) => {
  const body = req.body;
  try {
    const newImage = await Image.create({
      myFile: body.myFile, 
      author: body.author
    });
    newImage.save();
    res.status(201).json({msg: "new image uploaded"});
  }catch(error){
    console.log(`[ERROR] index.js/uploads - ${Date.now()}: ${error}`);
    res.status(409).json({message: error.message});
  }
})

app.post('/register', async (req, res) => {
  const {username, password, email, profilePicture } = req.body;
  try{
    const formValidation = await validateForm(req.body);

    if (formValidation.length > 0){
      const errors = {}
      formValidation.forEach(item => errors[item.fieldToCheck] = item.valueToCheck)
      res.status(409).json(errors);
    }else{
      const newUser = await User.create({
        username,
        email,
        password: bcrypt.hashSync(password, salt),
        profilePicture
      });
      console.log(newUser)
      res.status(200).json(newUser);
    }
  }catch(error){
    console.log(`[ERROR] index.js/register - ${Date.now()}: ${error}`);
    res.status(error.status).json({message: error.message});
  }
})

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const userDoc = await User.findOne({email});
    if(userDoc === null){
        return res.status(400).json('User does not exist');
    }
    console.log(userDoc);
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if(passOk){
        // .sign generates a json web token based on the secret key.
        // This token has the username and the user_id
        // Then is placed into the response cookie
        // This cookie will be stored in the browser session indicating a current valid login
        jwt.sign({username: userDoc.username, id:userDoc._id, profilePicture: userDoc.profilePicture}, secret, {}, (err, token) =>{
            if (err) throw err;
            res.cookie("token", token, {
				      expires: new Date(Date.now() + 1 * 3600 * 1000),
			      }).json({
				      id: userDoc._id,
				      username: userDoc.username,
              profilePicture: userDoc.profilePicture
			      });
        });
    }else{
        res.status(400).json('wrong credentials');
    }
});

// Check if the current session is active&&valid
app.get('/profile', (req, res) =>{
    const {token} = req.cookies;
    // Verifies a bunch of authentication and authorization stuff...
    // Decrypts the token into its contents: user_id, user_name
    // Appends the decrypted (with the secret key only in backend) content to the response
    if(token !== '' && typeof token !== 'undefined' && token !== null){
        jwt.verify(token, secret, {}, (err, info) => {
            if (err) throw err;
            res.json(info);
        });
    }else{
        res.json({}).status(200);
    }
});

app.post('/logout', (req, res) =>{
    res.clearCookie("token").json('ok');
});

app.get('/photos', (req, res) =>{
  const {author} = req.query;
  if (!author){
    res.status(404).json("Author = Null, please login");
  }
  try{
    Image.find({author}).then(data => {
      res.json(data);
    }).catch(error => {
      res.json({error});
    });
  }catch(error){
    console.log(`[ERROR] index.js/photos - ${Date.now()}: ${error}`);
    res.json({error});
  }
})

app.delete('/deletePhoto/:id', async (req, res) => {
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
    console.log(`[ERROR] index.js/photos - ${Date.now()}: ${error}`);
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
  console.log(`[ERROR] index.js/mongoose.connect - ${Date.now()}: ${error}`);
})
