import React, {useState} from 'react';
function ImageCard(props) {
  const [hovered, sethovered] = useState(false);
  const handleMouseEnter = () =>{
    sethovered(true);
  }
  const handleMouseLeave = () => {
    sethovered(false);
  }
  const handleDeleteClick = (e) => {
    console.log(e.target)
  }
  return (
    <div
      className="img-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {true && (
        <div className="circular-delete-icon" onClick={handleDeleteClick}>
          <i className="fa-solid fa-trash" aria-hidden='true'></i>  
        </div>
      )}
    <img src={props.data.myFile} />
    </div>
  );
}
export default ImageCard;
