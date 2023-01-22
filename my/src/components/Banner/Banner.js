import React, { useState } from 'react'
import { useEffect } from 'react'
import './Banner.css'
import {API_KEY,imageURL} from '../../constans/constans'
import axios from '../../axios'
import YouTube from 'react-youtube'


function Banner() {
  const [movie, setMovie] = useState();
  const [showTrailer, setShowTrailer]=useState(false)


  
  useEffect(() => {
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
     
      
      const randomIndex = Math.floor(Math.random() * response.data.results.length);
      console.log("Random Index: ", randomIndex);
      console.log("Current Array Position: ", response.data.results[randomIndex]);
      setMovie(response.data.results[randomIndex]);
   

     
    
    })

    
   
   
  }, []);
  const bannertrailer=(movieId)=>{
    console.log(movieId);
    axios.get(`/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
      console.log(response.data.results[0]);
      setShowTrailer(response.data.results[0])

    })


  }
  const closetrl = () => {
    setShowTrailer(false);
}

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }


  return (

    <div 
    
    style={{backgroundImage:`url(${movie ? imageURL+movie.backdrop_path :"" } )` }}
    
   

     className='Banner'>
        <div className='content'> 
            <h1 className='title'>{movie ? movie.title ||movie.name :''}</h1>
            <div className='banner-buttons'> 

                <button className='button' onClick={()=>{bannertrailer(movie.id); setShowTrailer(!showTrailer)}}>Play</button>
                <button className='button'>My List</button>
                

            </div>
            <h1 className='description'>{movie ? movie.overview :''}</h1>
          
        </div>
        <div className="fade_buttom"></div>

        
        
    {showTrailer?<YouTube className='youtube-player' opts={opts}videoId={showTrailer.key} />:''}

    {showTrailer? <button className='close-button' onClick={closetrl}>Close It</button>:''}
    </div>
    
  )
}

export default Banner
