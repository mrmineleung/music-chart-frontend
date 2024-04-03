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
      {/* <CardContent className="flex flex-row items-center p-4">
        <div className="basis-1/6">
          <div className="m-4">
            <p className="text-4xl text-center font-medium leading-none">{props.rank}</p>
          </div>
        </div>
        <div className="basis-1/8">
          <div className="flex items-center p-4 rounded-md border size-18 space-x-2">
            {!props.rank_changes_flow? (<DashIcon className="h-6 w-12"/>) : (<></>)}
            {props.rank_changes_flow == '+'? (<><ArrowUpIcon className="h-6 w-4" /><p className="text-2xl font-medium leading-none text-left">{props.rank_changes_position}</p></>) : (<></>)}
            {props.rank_changes_flow == '-'? (<><ArrowDownIcon className="h-6 w-4" /><p className="text-2xl font-medium leading-none text-left">{props.rank_changes_position}</p></>) : (<></>)}
          </div>
          <div className="grid grid-cols-2 gap-2 rounded-md border">
            <div><ArrowUpIcon className="h-6 w-4" /></div>
            <div>{props.rank_changes_position}</div>
          </div>
        </div>
        <div className="basis-1/8">
          <div className="ml-8 mr-8">
            <img
              src={props.album_image}
              width={80}
              height={80}
            />
          </div>
        </div>
        <div className="basis-1/4">
          <div className=" flex items-center space-x-4 p-4">
            <div className="flex-1 space-y-1">
              <p className="text-left text-lg m-2 leading-none">
                {props.song_title}
              </p>
              <p className="text-left text-sm m-2 text-muted-foreground">
                {props.song_artists}
              </p>
            </div>
          </div>
        </div>
        <div className="basis-1/4">
          <p className="text-center">{props.album_name}</p>
        </div>
        <div className="basis-1/6">
        <div className="flex items-center space-x-2 my-1">
        <Switch id="showVideo" onCheckedChange={e => setShowVideo(e)}/>
        <Label htmlFor="showVideo">Play M/V</Label>
        </div>
        </div>
      </CardContent> */}

      <div className="hidden md:grid md:grid-cols-10 md:justify-items-center md:place-items-center md:m-2">
        <div className="">
          <p className="text-lg md:text-4xl">{props.rank}</p>
        </div>
        <div className="rounded-md border">
          <div className="flex items-center justify-center min-w-8 min-h-8 md:min-w-14 md:min-h-14">
            {!props.rank_changes_flow ? (
              <p>
                {/* <DashIcon className="h-6 w-4" /> */}
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
                {/* <ArrowUpIcon className="h-6 w-4" /> */}
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
                {/* <ArrowDownIcon className="h-6 w-4" /> */}
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
          </div>
        </div>

        <div className="ml-2 mr-2">
          <img
            className="hover:scale-125 rounded-lg transition ease-in-out delay-50"
            src={props.album_image}
            width={80}
            height={80}
          />
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
        {/* <div className="col-span-10">
        <div className="flex justify-start">
          <div>
      <Button variant="outline" size="icon" onClick={() => updateNowPlaying(props)}>
        <Play className="absolute h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Play</span>
      </Button></div>
      <div>
      <Button variant="outline" size="icon" onClick={() => updatePendingPlaylist([...pendingPlaylist, props])}>
      <ListEnd className="absolute h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Add to current playlist</span>
        
        </Button></div>
        <div>
      <Button variant="outline" size="icon" onClick={() => updatePlaylist([...playlist, props])}>
      <ListPlus className="absolute h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Save to playlist</span>
        </Button></div>
    </div>
        </div> */}
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
              <TooltipTrigger asChild onClick={() => updatePendingPlaylist([...pendingPlaylist, props])}>
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
              <TooltipTrigger asChild onClick={() => handleSaveToPlaylist([...playlist, props])}>
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
          {/* <div
            className="flex items-center justify-center space-x-4 py-2 w-auto hover:bg-accent hover:text-accent-foreground"
            onClick={() => updateNowPlaying(props)}
          >
            <div className="flex w-4 h-4 items-center justify-center">
              <Play className="absolute h-[1.2rem] w-[1.2rem]" />
            </div>
            <p className="text-center">Play Now</p>
          </div> */}
          {/* <div
            className="flex items-center justify-center space-x-4 py-2 w-auto hover:bg-accent hover:text-accent-foreground"
            onClick={() => updatePendingPlaylist([...pendingPlaylist, props])}
          >
            <div className="flex w-4 h-4 items-center justify-center">
              <ListEnd className="absolute h-[1.2rem] w-[1.2rem]" />
            </div>
            <p className="text-center">Add to current playlist</p>
          </div> */}
          {/* <div
            className="flex items-center justify-center space-x-4 py-2 w-auto hover:bg-accent hover:text-accent-foreground"
            onClick={() => handleSaveToPlaylist([...playlist, props])}
          >
            <div className="flex w-4 h-4 items-center justify-center">
              <ListPlus className="absolute h-[1.2rem] w-[1.2rem]" />
            </div>
            <p className="text-center">Save to playlist</p>
          </div> */}
          {/* <div>
      <Button variant="outline" size="icon" onClick={() => updatePendingPlaylist([...pendingPlaylist, props])}>
      <ListEnd className="absolute h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Add to current playlist</span>
        
        </Button></div> */}
          {/* <div>
      <Button variant="outline" size="icon" onClick={() => updatePlaylist([...playlist, props])}>
      <ListPlus className="absolute h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Save to playlist</span>
        </Button></div> */}
        </div>
      </div>
      {/*  */}
      <div className="absolute -left-2 -top-2 h-4 bg-white dark:bg-black">
        <div className="flex items-center space-x-2 ">
          {/* <Checkbox id={props.youtube_video_id} className="w-5 h-5" onCheckedChange={(e: boolean) => addToPlaylist(e, props)} />
      <label
      htmlFor={props.youtube_video_id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Add to playlist
      </label> */}
          {/* <Checkbox id={props.rank} className="w-5 h-5" /> */}
          {/* <Button variant="outline" size="icon" onClick={() => updateNowPlaying(props)}>
        <Play className="absolute h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Play</span>
      </Button>
      <Button variant="outline" size="icon" onClick={() => updatePendingPlaylist([...pendingPlaylist, props])}>
      <ListEnd className="absolute h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Add to current playlist</span>
        
        </Button>
      <Button variant="outline" size="icon" onClick={() => updatePlaylist([...playlist, props])}>
      <ListPlus className="absolute h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Save to playlist</span>
        </Button> */}
        </div>
      </div>
      <div className="grid grid-cols-10 justify-items-center place-items-center md:hidden">
        <div className="col-span-2">
          <p className="text-3xl md:text-4xl">{props.rank}</p>
        </div>
        <div className="rounded-md border">
          <div className="flex items-center justify-center min-w-10 min-h-10 md:min-w-14 md:min-h-14">
            {!props.rank_changes_flow ? (
              <p>
                {/* <DashIcon className="h-6 w-4" /> */}
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
                {/* <ArrowUpIcon className="h-6 w-4" /> */}
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
                {/* <ArrowDownIcon className="h-6 w-4" /> */}
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
        {/* <div className="col-span-3">
          <p className="text-center">{props.album_name}</p>
        </div> */}
        {/* <div className="">
          <div className="flex items-center space-x-2 my-1">
            <Switch id="showVideo" onCheckedChange={(e) => setShowVideo(e)} />
            <Label htmlFor="showVideo">Play M/V</Label>
          </div>
        </div> */}
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
      {/* <CardContent className="p-2">
      <div className="grid grid-cols-3 justify-items-center bg-slate-100 p-8">
  <div className="p-4 border">
        <p className="text-4xl">{props.rank}</p>
        </div>
  <div className="border">
    <p className="p-2 text-center">123</p>
        {!props.rank_changes_flow? (<DashIcon className="h-6 w-12"/>) : (<></>)}
            {props.rank_changes_flow == '+'? (<><ArrowUpIcon className="h-6 w-4" /><p className="text-2xl">{props.rank_changes_position}</p></>) : (<></>)}
            {props.rank_changes_flow == '-'? (<><ArrowDownIcon className="h-6 w-4" /><p className="text-2xl">{props.rank_changes_position}</p></>) : (<></>)}
                         </div>
  <div className="">
        <img
              src={props.album_image}
              width={80}
              height={80}
            />
        </div>
 </div></CardContent> */}
      {/* <CardContent className="p-2 grid grid-cols-6 justify-items-center bg-slate-100">
        <div className="p-4 border">
        <p className="text-4xl">{props.rank}</p>
        </div>
        <div className="">
        {!props.rank_changes_flow? (<DashIcon className="h-6 w-12"/>) : (<></>)}
            {props.rank_changes_flow == '+'? (<><ArrowUpIcon className="h-6 w-4" /><p className="text-2xl font-medium leading-none text-left">{props.rank_changes_position}</p></>) : (<></>)}
            {props.rank_changes_flow == '-'? (<><ArrowDownIcon className="h-6 w-4" /><p className="text-2xl font-medium leading-none text-left">{props.rank_changes_position}</p></>) : (<></>)}
        </div>
        <div className="">
        <img
              src={props.album_image}
              width={80}
              height={80}
            />
        </div>
        <div className="">
        <div className=" flex items-center space-x-4 p-4">
            <div className="flex-1 space-y-1">
              <p className="text-left text-lg m-2 leading-none">
                {props.song_title}
              </p>
              <p className="text-left text-sm m-2 text-muted-foreground">
                {props.song_artists}
              </p>
            </div>
          </div>
        </div>
        <div className=""><p className="text-center">{props.album_name}</p></div>
        <div className="">
        <div className="flex items-center space-x-2 my-1">
        <Switch id="showVideo" onCheckedChange={e => setShowVideo(e)}/>
        <Label htmlFor="showVideo">Play M/V</Label>
        </div>
        </div>
      </CardContent> */}
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
