import React,{useEffect,useState} from 'react'
import './RowPost.css'
import Youtube from 'react-youtube'
import axios from '../../axios';
import { API_KEY , imageURL} from '../../constans/constans';
function Rowpost(props) {
  const [urlId,setId]=useState([''])
  const [Movie,setMovie]=useState([])
  useEffect(() => {
    axios.get(props.url).then((response)=>{
    console.log("J");
    console.log(response.data.results);
      setMovie(response.data.results)
    }).catch(err=>{
        alert("Sorry Your Nextwork Is Not Responding....")
       
      
     

    })
  console.log("1 mount ");
 
  }, []);
  const randomList = [...Movie];///spread opreation
  

  // Use a for loop to iterate through the array and randomly select a position for each movie
  for (let i = 0; i < randomList.length; i++) {
    const randomIndex = Math.floor(Math.random() * randomList.length);
    [randomList[i], randomList[randomIndex]] = [randomList[randomIndex], randomList[i]]
   console.log('hre',randomList[1]);
  } 

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }

  
  const handlemovieclick=(id)=>{
    console.log(id);
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`) .then((response)=>{
      console.log(response.data.results[0]);
      if(response.data.results.length!==0){
         setId(response.data.results[0])
      }else{
        alert("Sorry This Trilar Is Not Available Now") 
       
      
       
      }
   
    })
  }
  
  return (
    
    
    
    <div className='row'>
        <h1>{props.title}</h1>
        

        <div className='posters'>  
     
        {randomList.map((obj,index)=>
        
       
        


       
        

        

        
 <div className='movie-container'>   
  <h1 className='textstyle'>{obj.name? obj.name: obj.original_title}</h1>
 
              <img onClick={()=>handlemovieclick(obj.id)} className={ props.issmall?'smallposter': 'poster'} alt='posters is loading' src={`${imageURL+obj.backdrop_path}`}/></div>
             
          
        )} 

        
        

        </div>
        {  urlId ?<  Youtube  opts={opts} videoId={urlId.key}/>:''}
       
    </div>
  )
}

export default Rowpost
