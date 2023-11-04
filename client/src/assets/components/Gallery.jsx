import ImageCard from '../components/ImageCard.jsx'
function Gallery(props) {
  return (
        <div className='library-div'> 
           <div className='photo-galery'>
              {props.pics.data?.length > 0 ? 
                props.pics.data.map(x => {
                  return (
                    <ImageCard data={x} key={x._id} get_set={props.get_set}/>
                  )
              }) :
                <h1>Upload your first image</h1>
              }
          </div>
           <form onSubmit={props.h2} className='form-basic'>
             <button style={{margin: '2rem 0'}} type='submit'>Fetch Photos</button>
           </form>
        </div>
  )
}
export default Gallery;
