import React from 'react'


interface YoutubeVideoProps {
    videoId: string,
    width?: number,
    height?: number
}

const YoutubeVideo = ({videoId, width, height} : YoutubeVideoProps) => {
  return (
    <>
    <iframe 
  width={width? width : 200}
  height={height? height : 100}
  src={`https://www.youtube.com/embed/${videoId}`}
  title="YouTube video player"
  allow="accelerometer; 
  autoplay; 
  clipboard-write; 
  encrypted-media; 
  gyroscope; 
  picture-in-picture; 
  web-share" allowFullScreen></iframe></>
  )
}

export default YoutubeVideo