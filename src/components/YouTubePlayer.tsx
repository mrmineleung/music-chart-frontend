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
    <div className="player-wrapper">
    <iframe 
  width={width? width : '100%'}
  height={height? height : '100%'}
  // width="100%"
  // height="100%"
  className="youtube-player"
  src={`${type}${id}${autoplay? '?autoplay=1&mute=0' : ''}`}
  title="YouTube video player"
  allow="accelerometer; 
  autoplay; 
  clipboard-write; 
  encrypted-media; 
  gyroscope; 
  picture-in-picture; 
  web-share" allowFullScreen></iframe></div>
  </>
  )
})

export default YouTubePlayer