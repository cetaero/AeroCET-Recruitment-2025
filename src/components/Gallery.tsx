import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Gallery: React.FC = ()=>{
  const [images,setImages]=useState<string[]>([])
  useEffect(()=>{
    const fetchImages=async ()=>{
      try{
        const res=await fetch('https://picsum.photos/v2/list?page=2&limit=6')
        const data: any[]=await res.json()
        setImages(data.map((image)=>image.download_url))
      }
      catch(error){
        console.log(error)
      }
    }
    fetchImages()
  },[])
  return(
    <>
    <div className="bigcontainer">
      <h1 className="titlegallery">Image Gallery</h1>
      <div className="imagecontainer">
       {images.map((image, index) => (
  <img src={image} alt="image" className="image" key={index}  />
))}
       
      </div>
      
      </div>
    </>

  )
}
export default Gallery
