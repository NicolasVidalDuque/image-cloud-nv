import React, {useState} from 'react';
import {link} from '../../link.jsx';
import axios from 'axios';
function ImageCard(props) {

  const deleteImage = async (id) =>{
    await axios.delete(link + 'deletePhoto/' + id).then((response) => {
      switch (response.status) {
        case 200:
          break;
        case 404:
          console.log('Image not found');
          break;
        default:
          alert('Error deleting image with status-error: ' + respose.status);
          break;
      };
      props.get_set();
    }).catch((e) => {
      console.log(e);
    })
  } 

  const handleDeleteClick = async (e) => {
    const image = e.target.closest('.img-card');
    const imgId = image.getAttribute('imgid');
    await deleteImage(imgId);
  }
  return (
    <div  imgid={props.data._id} className="img-card">
      <div className="circular-delete-icon" onClick={handleDeleteClick}>
        <i className="fa-solid fa-trash" aria-hidden='true'></i>  
      </div>
      <img src={props.data.myFile} />
    </div>
  );
}
export default ImageCard;
