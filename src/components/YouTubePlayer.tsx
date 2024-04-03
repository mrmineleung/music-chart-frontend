import { memo } from "react"

export enum YouTubePlayerType {
  VIDEO = 'https://www.youtube.com/embed/',
  PLAYLIST = 'https://www.youtube.com/embed?listType=playlist&list='
}


interface YouTubePlayerProps {
    id: string,
    type: YouTubePlayerType
    width?: number,
    height?: number,
    autoplay?: boolean
}

const YouTubePlayer = memo(({id, type, width, height, autoplay} : YouTubePlayerProps) => {
  return (
    <>
    <iframe 
  width={width? width : 200}
  height={height? height : 100}
  src={`${type}${id}${autoplay? '?autoplay=1&mute=0' : ''}`}
  title="YouTube video player"
  allow="accelerometer; 
  autoplay; 
  clipboard-write; 
  encrypted-media; 
  gyroscope; 
  picture-in-picture; 
  web-share" allowFullScreen></iframe></>
  )
})

export default YouTubePlayer