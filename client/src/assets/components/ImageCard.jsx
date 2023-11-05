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
      <div className="circular-container-icon circular-delete-icon" onClick={handleDeleteClick}>
        <i className="fa-solid fa-trash" aria-hidden='true'></i>
      </div>
      <img src={props.data.myFile} />
      <a className='circular-container-icon circular-download-icon' href={props.data.myFile} download>
        <i className="fa-solid fa-cloud-arrow-down" aria-hidden='true'></i>
      </a>

    </div>
  );
}
export default ImageCard;
