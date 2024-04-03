import { Suspense, lazy, memo, useState } from "react";
import { Card, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { YouTubePlayerType } from "./YouTubePlayer";
import { usePlaylist } from "@/provider/PlaylistProvider";
import { ListEnd, ListPlus, Play } from "lucide-react";
// import { Checkbox } from "./ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const YouTubePlayer = lazy(() => import("./YouTubePlayer"));

interface RankingItemProps {
  item: RankingItemData;
}

export interface RankingItemData {
  album_image: string;
  album_name: string;
  rank: string;
  rank_changes_flow?: string;
  rank_changes_position?: string;
  song_artists: string;
  song_title: string;
  youtube_video_id: string;
}

const RankingItem = ({ item: props }: RankingItemProps) => {
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const {
    playlist,
    updatePlaylist,
    updateNowPlaying,
    pendingPlaylist,
    updatePendingPlaylist,
    isOpenPlaylist,
    setIsOpenPlaylist,
  } = usePlaylist();

  const handleSaveToPlaylist = (playlist: RankingItemData[]) => {
    updatePlaylist(playlist);
    setIsOpenPlaylist(!isOpenPlaylist);
  };

  return (
    <Card className="relative m-4">
      <div className="hidden md:grid md:grid-cols-10 md:justify-items-center md:place-items-center md:m-2">
        <div className="">
          <p className="text-lg md:text-4xl">{props.rank}</p>
        </div>
        <div className="rounded-md border">
          <div className="flex items-center justify-center w-8 h-8 md:w-14 md:h-14">
            {!props.rank_changes_flow ? (
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14"
                  />
                </svg>
              </p>
            ) : (
              <></>
            )}
            {props.rank_changes_flow == "+" ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="fill-green-600 stroke-green-600 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 15.75 7.5-7.5 7.5 7.5"
                  />
                </svg>

                <p className="text-2xl">{props.rank_changes_position}</p>
              </>
            ) : (
              <></>
            )}
            {props.rank_changes_flow == "-" ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="fill-amber-600 stroke-amber-600 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>

                <p className="text-2xl">{props.rank_changes_position}</p>
              </>
            ) : (
              <></>
            )}
            {props.rank_changes_flow == "NEW" ||
            props.rank_changes_flow == "RE-ENTRY" ? (
              <>
                <p className="text-md text-center ">
                  {props.rank_changes_flow}
                </p>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="ml-2 mr-2">
          {props.album_image ? (
            <img
              className="hover:scale-125 rounded-lg transition ease-in-out delay-50"
              src={props.album_image}
              width={80}
              height={80}
            />
          ) : (
            <div className="bg-white/80 w-[70px] h-[70px] hover:scale-125 rounded-lg transition ease-in-out delay-50"></div>
          )}
        </div>

        <div className="flex justify-self-start items-center justify-center space-x-4 p-4 col-span-3">
          <div className="flex-1 space-y-1 ">
            <p className="text-left text-lg m-2 leading-none">
              {props.song_title}
            </p>
            <p className="text-left text-sm m-2 text-muted-foreground">
              {props.song_artists}
            </p>
          </div>
        </div>
        <div className="col-span-2">
          <p className="text-center">{props.album_name}</p>
        </div>
        <div className="col-span-2">
          <div className="flex items-center space-x-2 my-1">
            <Switch
              id={`showVideo-${props.rank}`}
              onCheckedChange={(e) => setShowVideo(e)}
            />
            <Label htmlFor={`showVideo-${props.rank}`}>Play M/V</Label>
          </div>
        </div>
      </div>

      <Separator />
      <div className="hidden md:grid">
        <div className="grid grid-flow-col justify-stretch">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild onClick={() => updateNowPlaying(props)}>
                <div className="flex items-center justify-center space-x-4 py-2 w-auto hover:bg-accent hover:text-accent-foreground">
                  <div className="flex w-4 h-4 items-center justify-center">
                    <Play className="absolute h-[1.2rem] w-[1.2rem]" />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Play now</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                asChild
                onClick={() =>
                  updatePendingPlaylist([...pendingPlaylist, props])
                }
              >
                <div className="flex items-center justify-center space-x-4 py-2 w-auto hover:bg-accent hover:text-accent-foreground">
                  <div className="flex w-4 h-4 items-center justify-center">
                    <ListEnd className="absolute h-[1.2rem] w-[1.2rem]" />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to current playlist</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                asChild
                onClick={() => handleSaveToPlaylist([...playlist, props])}
              >
                <div className="flex items-center justify-center space-x-4 py-2 w-auto hover:bg-accent hover:text-accent-foreground">
                  <div className="flex w-4 h-4 items-center justify-center">
                    <ListPlus className="absolute h-[1.2rem] w-[1.2rem]" />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save to playlist</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      {/*  */}
      <div className="absolute -left-2 -top-2 h-4 bg-white dark:bg-black">
        <div className="flex items-center space-x-2 "></div>
      </div>
      <div className="grid grid-cols-10 justify-items-center place-items-center md:hidden">
        <div className="col-span-2">
          <p className="text-3xl md:text-4xl">{props.rank}</p>
        </div>
        <div className="rounded-md border">
          <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14">
            {!props.rank_changes_flow ? (
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14"
                  />
                </svg>
              </p>
            ) : (
              <></>
            )}
            {props.rank_changes_flow == "+" ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="fill-green-600 stroke-green-600 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 15.75 7.5-7.5 7.5 7.5"
                  />
                </svg>

                <p className="text-lg">{props.rank_changes_position}</p>
              </>
            ) : (
              <></>
            )}
            {props.rank_changes_flow == "-" ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="fill-amber-600 stroke-amber-600 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>

                <p className="text-lg">{props.rank_changes_position}</p>
              </>
            ) : (
              <></>
            )}
            {props.rank_changes_flow == "NEW" ||
            props.rank_changes_flow == "RE-ENTRY" ? (
              <>
                <p className="text-sm text-center ">
                  {props.rank_changes_flow}
                </p>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="ml-4 col-span-2">
          <img src={props.album_image} width={80} height={80} />
        </div>

        <div className="flex justify-self-start items-center justify-center space-x-4 p-4 col-span-5">
          <div className="flex-1 space-y-1 ">
            <p className="text-left text-lg m-2 leading-none text-wrap text-ellipsis">
              {props.song_title}
            </p>
            <p className="text-left text-sm m-2 text-muted-foreground text-wrap">
              {props.song_artists}
            </p>
          </div>
        </div>
        <Separator className="col-span-10"></Separator>
        <div className="col-span-8">
          <p className="text-left text-sm m-2 text-muted-foreground text-wrap text-ellipsis">
            {props.album_name}
          </p>
        </div>
        <div className="col-span-2">
          <div className="flex items-center my-1 mr-4">
            <Switch id="showVideo" onCheckedChange={(e) => setShowVideo(e)} />
            <Label htmlFor="showVideo" className="text-wrap">
              Play M/V
            </Label>
          </div>
        </div>
      </div>
      <Separator />
      <div className="gird md:hidden">
        <div className="grid grid-flow-col justify-stretch">
          <div
            className="flex items-center justify-center space-x-4 py-2 w-auto hover:bg-accent hover:text-accent-foreground"
            onClick={() => updateNowPlaying(props)}
          >
            <div className="flex w-4 h-4 items-center justify-center w-auto">
              <Play className="absolute h-[1.2rem] w-[1.2rem]" />
            </div>
          </div>
          <div
            className="flex items-center justify-center space-x-4 py-2 w-auto hover:bg-accent hover:text-accent-foreground"
            onClick={() => updatePendingPlaylist([...pendingPlaylist, props])}
          >
            <div className="flex w-4 h-4 items-center justify-center w-auto">
              <ListEnd className="absolute h-[1.2rem] w-[1.2rem]" />
            </div>
          </div>
          <div
            className="flex items-center justify-center space-x-4 py-2 w-auto hover:bg-accent hover:text-accent-foreground"
            onClick={() => handleSaveToPlaylist([...playlist, props])}
          >
            <div className="flex w-4 h-4 items-center justify-center w-auto">
              <ListPlus className="absolute h-[1.2rem] w-[1.2rem]" />
            </div>
          </div>
        </div>
      </div>
      {showVideo && (
        <Suspense
          fallback={
            <p className="text-left text-sm m-2 text-muted-foreground">
              Loading...
            </p>
          }
        >
          <CardFooter className="flex items-center justify-center">
            <div className="hidden md:flex md:m-auto">
              <YouTubePlayer
                id={props.youtube_video_id}
                type={YouTubePlayerType.VIDEO}
                width={500}
                height={300}
              />
            </div>
            <div className="md:hidden flex items-center justify-center">
              <YouTubePlayer
                id={props.youtube_video_id}
                type={YouTubePlayerType.VIDEO}
                width={300}
                height={200}
              />
            </div>
          </CardFooter>
        </Suspense>
      )}
    </Card>
  );
};

export default memo(RankingItem);
