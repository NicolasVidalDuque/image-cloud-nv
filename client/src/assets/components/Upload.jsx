import upload_png from '../upload.png'
function Upload(props){
    return (
       <div className='upload-div'>
          <form onSubmit={props.handleSubmit} className='form-basic form-upload'>
            <label htmlFor='file-upload' className='custom-file-upload'>
              <img style={{width: '200px'}} src={props.postImage.myFile || upload_png} className='upload-image'/>
            </label>
            <input
               type='file'
               label='Image'
               name='myFile'
               id='file-upload'
               accept='.jpeg, .png, .jpg'
               className='not-visible'
               onChange={(e) => {props.handleFileUpload(e)}}
             />
              <h3>Upload your photo</h3>
              <button type='submit'>Submit Photo</button>
          </form>
        </div>
    )
}

export default Upload;
