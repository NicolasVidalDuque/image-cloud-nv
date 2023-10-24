import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import upload_png from './assets/upload.png'
import axios from 'axios'
import Upload from './assets/components/Upload.jsx'
import Gallery from './assets/components/Gallery.jsx'
import './App.css'

function App() {
  // TODO: manage state from /home route (pre-user auth in nav). Make it a Component like cloud
  const [postImage, setPostImage] = useState({myFile: ''});
  const [pics, setPics] = useState([]);
  useEffect(() => {
    get_set_photos()
  },[])

  const link = 'http://localhost:8080/'

  const reset = () => {
    setPostImage({myFile: ''})
    document.getElementById('file-upload').value = '';
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (postImage.myFile !== '') {
      try{
        await createPost(postImage);
        await get_set_photos();
        reset();
      }catch (error){
        console.log(error);
      }
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file.size < 100000){
      const base64 = await convert_to_base64(file);
      setPostImage( (prev) => ({ ...prev, myFile: base64}));
    }else{
      alert("File too large, must be under 100kb");
    }
  }

  const createPost = async (newImage) => {
    return new Promise(async (resolve, reject) => {
      try{
        await axios.post(link + 'uploads', newImage);
        resolve()
      }catch(error){
        reject(error);
      }
    })
  }

  const h2 = async (e) => {
    e.preventDefault();
    try{
      await get_set_photos();
    }catch(error){
      console.log(error);
    }
  }

  const get_set_photos = async () => {
    axios.get(link + 'photos').then(res => {
      setPics(res)
    });
  }
  
  return (
    <>
      <div className='App'>
        <Upload 
          handleSubmit={handleSubmit}
          postImage={postImage}
          handleFileUpload={handleFileUpload}
        />
        <Gallery
          pics={pics}
          h2={h2}
        />
      </div>    
      
    </>
  )
}

export default App;

function convert_to_base64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  })
}
