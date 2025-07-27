import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";
import {
  Captions,
  ChevronDown,
  ChevronUp,
  Pause,
  Play,
  Shuffle,
  SkipForward,
  Square,
  Volume2,
  VolumeX,
} from "lucide-react";
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
import { toast } from "./ui/use-toast";
import RollingLyrics, { LyricLine } from "./RollingLyrics";
import FullScreenPlayer from "./FullScreenPlayer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface LyricsItem {
  code: string;
  name: string;
  value: LyricLine[];
}

const Footer = () => {
  const [isHide, setIsHide] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.2);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const [played, setPlayed] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [lyrics, setLyrics] = useState<LyricsItem[]>([]);
  const [currentLyrics, setCurrentLyrics] = useState<LyricsItem | null>(null);

  const {
    nowPlaying,
    updateNowPlaying,
    pendingPlaylist,
    updatePendingPlaylist,
    shuffle,
    setIsOpenPlaylist,
  } = usePlaylist();

  const player = useRef<ReactPlayer>(null);

  useEffect(() => {
    const fetchNextSong = () => {
      if (!nowPlaying && pendingPlaylist.length > 0) {
        const [head, ...tail] = pendingPlaylist;
        updateNowPlaying(head);
        updatePendingPlaylist(tail);
      }
      setIsPlaying(true);
    };

    fetchNextSong();
    setLyrics([]);
    setCurrentLyrics(null);
  }, [nowPlaying, pendingPlaylist]);

  useEffect(() => {
    const fetchSongLyrics = async () => {
      const API_URL = process.env.BACKEND_API;
      if (nowPlaying) {
        const GET_LYRICS_API = `${API_URL}songs/${nowPlaying?.song_id}/lyrics`;
        try {
          const response = await fetch(GET_LYRICS_API, {
            keepalive: true,
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data: LyricsItem[] = await response.json();
          console.log(data);
          setLyrics(data);

          if (data != null && data.length > 0) {
            const defaultCaption = data.find((lyric) => lyric.code === "en");
            if (defaultCaption) {
              setCurrentLyrics(defaultCaption);
            } else {
              setCurrentLyrics(data[0] || null);
            }
          } else {
            setCurrentLyrics(null);
          }
        } catch (e) {
          console.error(e);
          throw e;
        }
      }
    };

    fetchSongLyrics();
  }, [nowPlaying, pendingPlaylist]);

  momentDurationFormatSetup(moment);

  const convertSecondsToMinutes = (seconds: number) => {
    return moment.duration(seconds, "seconds").format("mm:ss", { trim: false });
  };

  const handleNextSong = () => {
    if (pendingPlaylist.length > 0) {
      const [head, ...tail] = pendingPlaylist;
      updateNowPlaying(head);
      updatePendingPlaylist(tail);
    } else {
      handleStopPlaying();
    }
  };

  const handleStopPlaying = () => {
    updateNowPlaying(null);
    updatePendingPlaylist([]);
    setCurrentLyrics(null);
    setLyrics([]);
  };

  const handleShuffle = () => {
    updatePendingPlaylist(shuffle(pendingPlaylist));
    setIsOpenPlaylist(true);
  };

  const handleReady = () => {
    console.log("onReady");
    setIsPlaying(false);
  };

  const handleError = (e: unknown) => {
    console.log("onError", e);
    setIsPlaying(false);
    handleNextSong();
    if (e == 150) {
      toast({
        title: "Video unavailable",
        description:
          "Playback on other websites has been disabled by the video owner",
      });
    }
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

  const handleCurrentLyricsChange = (value: string) => {
    const currentLyrics = lyrics.find((lyric) => value == lyric.code);
    console.log(currentLyrics);
    if (currentLyrics) {
      setCurrentLyrics(currentLyrics);
    }
  };

  return (
    <div className={`relative ${!nowPlaying ? "hidden" : ""}`}>
      <div className="fixed inset-x-0 bottom-32 left-0 right-0 w-fit">
        <div
          className={`${
            isHide ? "hidden" : ""
          } md:h-[500px] md:w-[500px] max-h-72 w-auto`}
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
            // onError={(e) => console.log("onError", e)}
            onError={(e) => handleError(e)}
            onProgress={handleProgress}
            //   onDuration={this.handleDuration}
            //   onPlaybackQualityChange={e => console.log('onPlaybackQualityChange', e)}
          />
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 overflow-visible bg-white dark:bg-black border z-20">
        <div className="flex flex-col">
          <div className="flex items-center justify-between overflow-hidden">
            <div className="flex justify-self-start">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsHide(!isHide)}
              >
                {isHide ? (
                  <ChevronUp className="h-6 w-6" />
                ) : (
                  <ChevronDown className="h-6 w-6" />
                )}
              </Button>
            </div>
            <p
              key={`${nowPlaying?.song_title}-${nowPlaying?.song_artists}`}
              className="md:hidden text-left whitespace-nowrap text-clip scroll-text"
            >
              {nowPlaying?.song_title} - {nowPlaying?.song_artists}
            </p>
            {/* <div className="hidden md:flex justify-between items-center text-center text-balance">
             */}
            <div className="hidden md:flex justify-center items-center">
              {!currentLyrics ? (
                `${nowPlaying?.song_title} - ${nowPlaying?.song_artists}`
              ) : (
                <RollingLyrics
                  lyrics={currentLyrics!.value}
                  currentTime={currentTime}
                  height={50}
                />
              )}
            </div>
            <div className="hidden md:flex justify-self-end-safe">
              {lyrics && lyrics.length > 0 ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon">
                      <Captions className="w-6 h-6" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {currentLyrics ? (
                      <FullScreenPlayer
                        lyrics={currentLyrics!.value}
                        currentTime={currentTime}
                      />
                    ) : (
                      <></>
                    )}
                    <DropdownMenuSeparator />
                    {lyrics &&
                      currentLyrics &&
                      lyrics!.map((lyric) => (
                        <DropdownMenuItem
                          onClick={() => handleCurrentLyricsChange(lyric.code)}
                        >
                          {currentLyrics.code == lyric.code
                            ? `> ${lyric.name}`
                            : `${lyric.name}`}
                        </DropdownMenuItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <></>
              )}
            </div>
            {/* </div> */}
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
                  <TooltipContent className="mb-2">Next</TooltipContent>
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
                  <TooltipContent className="mb-2">Stop</TooltipContent>
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
                  <TooltipContent className="mb-2">Shuffle</TooltipContent>
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
