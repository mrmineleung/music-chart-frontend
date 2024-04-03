import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { Pause, Play, Shuffle, SkipForward, Square, Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
// import { Checkbox } from "./components/ui/checkbox"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { OnProgressProps } from "react-player/base";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import { usePlaylist } from "@/provider/PlaylistProvider";

const Footer = () => {
  const [isHide, setIsHide] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.2);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const [played, setPlayed] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const { nowPlaying, updateNowPlaying, pendingPlaylist, updatePendingPlaylist, shuffle, setIsOpenPlaylist } =
    usePlaylist();

  const player = useRef<ReactPlayer>(null);

  useEffect(() => {
    const fetchNextSong = () => {

      if (!nowPlaying && pendingPlaylist.length > 0) {
        const [head, ...tail] = pendingPlaylist;
        updateNowPlaying(head);
        updatePendingPlaylist(tail);
      }
    };

    fetchNextSong();
  }, [nowPlaying, pendingPlaylist, updateNowPlaying, updatePendingPlaylist]);

  momentDurationFormatSetup(moment);

  const convertSecondsToMinutes = (seconds: number) => {
    return moment.duration(seconds, "seconds").format("mm:ss", { trim: false });
  };


  const handleNextSong = () => {
    if (pendingPlaylist.length > 0) {
    const [head, ...tail] = pendingPlaylist;
    updateNowPlaying(head);
    updatePendingPlaylist(tail);
    }
  }

  const handleStopPlaying = () => {
    updateNowPlaying(null)
    updatePendingPlaylist([])
  }

  const handleShuffle = () => {
    updatePendingPlaylist(shuffle(pendingPlaylist))
    setIsOpenPlaylist(true)
  }

  const handleReady = () => {
    console.log("onReady");
    setIsPlaying(false);
  };

  const handleEnded = () => {
    console.log("onEnded");
    updateNowPlaying(null);
  };

  const handlePlay = () => {
    console.log("onPlay");
    setIsPlaying(true);
    setDuration(player.current?.getDuration || 0);
  };

  const handlePause = () => {
    console.log("onPause");
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };


  const handleVolumeValueChange = (value: unknown) => {
    // console.log(value);
    setVolume(parseFloat(value as string));
  };

  const handleToggleMuted = () => {
    setIsMuted(!isMuted);
  };
  const handleSeekMouseDown = () => {
    setIsSeeking(true);
  };


  const handleSeekValueChange = (value: unknown) => {
    setPlayed(parseFloat(value as string));
  };

  const handleSeekMouseUp = () => {
    setIsSeeking(false);
    player?.current?.seekTo(played);
  };
  const handleProgress = (state: OnProgressProps) => {
    setCurrentTime(player.current?.getCurrentTime || 0);
    if (!isSeeking) {
      setIsSeeking(true);
    }
    setPlayed(parseFloat(state.played.toString()));
  };

  return (
    <div className={`relative ${!nowPlaying ? "hidden" : ""}`}>
      <div className="fixed inset-x-0 bottom-32 md:bottom-24 left-0 right-0 w-72 md:w-[500px]">
        <button onClick={() => setIsHide(!isHide)}>
          {isHide ? "Show" : "Hide"}
        </button>
        <div
          className={`${
            isHide ? "hidden" : ""
          } md:h-[500px] md:w-[500px] max-h-72 w-72`}
        >
          <ReactPlayer
            ref={player}
            className={`react-player`}
            width="100%"
            height="100%"
            url={
              nowPlaying
                ? "https://www.youtube.com/watch?v=" +
                  nowPlaying.youtube_video_id
                : ""
            }
            playing={isPlaying}
            volume={volume}
            muted={isMuted}
            onReady={handleReady}
            // onStart={() => console.log("onStart")}
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={handleEnded}
            // onBuffer={() => console.log("onBuffer")}
            //   onPlaybackRateChange={this.handleOnPlaybackRateChange}
            // onSeek={(e) => console.log("onSeek", e)}
            onError={(e) => console.log("onError", e)}
            onProgress={handleProgress}
            //   onDuration={this.handleDuration}
            //   onPlaybackQualityChange={e => console.log('onPlaybackQualityChange', e)}
          />
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 left-0 right-0 overflow-visible bg-white dark:bg-black border">
        <div className="flex flex-col">
          <div className="flex items-center justify-center overflow-hidden">
            <p
              key={`${nowPlaying?.song_title}-${nowPlaying?.song_artists}`}
              className="md:hidden text-left whitespace-nowrap text-clip scroll-text"
            >
              {nowPlaying?.song_title} - {nowPlaying?.song_artists}
            </p>
            <p className="hidden md:flex text-center text-balance text-wrap">
              {nowPlaying?.song_title} - {nowPlaying?.song_artists}
            </p>
          </div>
          <div className="flex flex-row min-h-12 justify-start space-x-2 md:space-x-4 p-2 md:p-4 border items-center">
            <div className="">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    asChild
                    className="flex items-center justify-center"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handlePlayPause}
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="mb-2">
                    {isPlaying ? "Pause" : "Play"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    asChild
                    className="flex items-center justify-center"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleNextSong}
                    >
                        <SkipForward className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="mb-2">
                    Next
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    asChild
                    className="flex items-center justify-center"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleStopPlaying}
                    >
                        <Square className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="mb-2">
                    Stop
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    asChild
                    className="flex items-center justify-center"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleShuffle}
                    >
                      <Shuffle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="mb-2">
                    Shuffle
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    asChild
                    className="flex items-center justify-center"
                  >
                    {isMuted ? (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleToggleMuted}
                      >
                        <VolumeX className="absolute h-4 w-4" />
                        <span className="sr-only">Mute</span>
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleToggleMuted}
                      >
                        <Volume2 className="absolute h-4 w-4" />
                        <span className="sr-only">Mute</span>
                      </Button>
                    )}
                  </TooltipTrigger>
                  <TooltipContent className="mb-2">
                    {isMuted ? "Unmute" : "Mute"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex flex-auto md:flex-none md:w-32 ">
              <Slider
                defaultValue={[20]}
                value={[volume]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={handleVolumeValueChange}
              />
            </div>
            <div className="hidden md:flex md:flex-none md:w-28 ">
              {convertSecondsToMinutes(currentTime)} /{" "}
              {convertSecondsToMinutes(duration)}
            </div>
            <div className="hidden md:flex md:flex-auto">
              <Slider
                defaultValue={[0]}
                value={[played]}
                max={0.999999}
                step={0.000001}
                onPointerDown={handleSeekMouseDown}
                onValueChange={handleSeekValueChange}
                onPointerUp={handleSeekMouseUp}
              />
            </div>
          </div>
          <div className="flex items-center m-2 space-x-2 md:hidden">
          <span>{convertSecondsToMinutes(currentTime)}</span>
            <div className="flex-auto">
              <Slider
                defaultValue={[0]}
                value={[played]}
                max={0.999999}
                step={0.000001}
                onPointerDown={handleSeekMouseDown}
                onValueChange={handleSeekValueChange}
                onPointerUp={handleSeekMouseUp}
              />
            </div>
            <span>{convertSecondsToMinutes(duration)}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
