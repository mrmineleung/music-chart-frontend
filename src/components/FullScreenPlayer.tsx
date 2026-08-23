import ReactPlayer from "react-player";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { Button } from "./ui/button";
import RollingLyrics, { LyricLine } from "./RollingLyrics";
import { usePlaylist } from "@/provider/PlaylistProvider";
import { useRef } from "react";

interface FullScreenPlayerProps {
  lyrics: LyricLine[];
  currentTime: number;
  isPlaying: boolean;
}

const FullScreenPlayer = ({ lyrics, currentTime, isPlaying }: FullScreenPlayerProps) => {
    const player = useRef<HTMLVideoElement>(null);
    // console.log(currentTime)
  const { nowPlaying } = usePlaylist();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center justify-center space-x-4 p-2 w-auto rounded hover:bg-accent hover:text-accent-foreground"
        >
          Full Screen
        </Button>
      </DialogTrigger>
      {/* <DialogContent className="w-screen h-screen max-w-none !p-0 !gap-0 flex flex-col">
        <DialogHeader className="md:ml-8 md:mt-8 h-fit space-y-1">
          <DialogTitle>{nowPlaying?.song_title}</DialogTitle>
          <DialogDescription>{nowPlaying?.song_artists}</DialogDescription>
        </DialogHeader>
        <div className="items-center justify-center flex-1 overflow-y-auto">
          <RollingLyrics
            lyrics={lyrics}
            currentTime={currentTime}
            // height={300}
            largeSize={true}
          />
        </div>
        <DialogFooter className="sm:justify-start ml-8 mt-8 ">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent> */}

      <DialogContent className="w-screen h-screen max-w-none !p-0 !gap-0 overflow-hidden">
  {/* Background Video */}
  {/* <div className="absolute inset-0 z-0">
    <iframe
      className="w-full h-full"
      src="https://www.youtube.com/embed/6Ycn9qZK09I?autoplay=1&controls=0&loop=1&playlist=6Ycn9qZK09I"
      title="YouTube video player"
      allow="autoplay; encrypted-media"
      allowFullScreen
    />
  </div> */}

  {/* <div className="absolute inset-0 overflow-hidden">
  <iframe
    className="
      absolute
      top-1/2
      left-1/2
      min-w-full
      min-h-full
      -translate-x-1/2
      -translate-y-1/2
      pointer-events-none
    "
    src={`https://www.youtube.com/embed/6Ycn9qZK09I?autoplay=1&mute=1&controls=0&loop=1&playlist=6Ycn9qZK09I`}
    allow="autoplay"
  />
</div> */}

<ReactPlayer
            ref={player}
            className={`react-player absolute inset-0 overflow-hidden`}
            width="100%"
            height="100%"
            src={
              nowPlaying
                ? "https://www.youtube.com/watch?v=" +
                  nowPlaying.youtube_video_id
                : ""
            }
            muted={true}
            playing={isPlaying}
            // volume={volume}
            // muted={isMuted}
            // onReady={handleReady}
            // onReady={() => player!.current!.currentTime = currentTime}
            // onStart={(e) => console.log("onStart", e)}
            onPlay={() => player!.current!.currentTime = currentTime + 1}
            // onPause={handlePause}
            // onEnded={handleEnded}
            // onBuffer={() => console.log("onBuffer")}
            //   onPlaybackRateChange={this.handleOnPlaybackRateChange}
            // onSeek={(e) => console.log("onSeek", e)}
            // onError={(e) => console.log("onError", e)}
            // onError={(e) => handleError(e)}
            // onProgress={handleProgress}
            // onTimeUpdate={handleTimeUpdate}
            //   onDuration={this.handleDuration}
            //   onPlaybackQualityChange={e => console.log('onPlaybackQualityChange', e)}
          />

  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/60" />

  {/* Header */}
  <DialogHeader className="relative z-20 md:ml-8 md:mt-8 text-white">
    <DialogTitle>{nowPlaying?.song_title}</DialogTitle>
    <DialogDescription className="text-white/80">
      {nowPlaying?.song_artists}
    </DialogDescription>
  </DialogHeader>

  {/* Lyrics Overlay */}
  {/* <div className="absolute inset-0 z-20 flex items-center justify-center">
    <RollingLyrics
      lyrics={lyrics}
      currentTime={currentTime}
      largeSize={true}
    />
  </div> */}

  <div className="absolute inset-0 z-10 flex justify-center">
  <div className="w-full overflow-y-auto py-32 no-scrollbar">
    <RollingLyrics
      lyrics={lyrics}
      currentTime={currentTime}
      largeSize={true}
    />
  </div>
</div>

  {/* Footer */}
  <DialogFooter className="absolute bottom-8 left-8 z-20">
    <DialogClose asChild>
      <Button type="button" variant="secondary">
        Close
      </Button>
    </DialogClose>
  </DialogFooter>
</DialogContent>
    </Dialog>
  );
};

export default FullScreenPlayer;
