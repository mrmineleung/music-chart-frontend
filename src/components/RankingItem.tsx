import { memo } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { usePlaylist } from "@/provider/PlaylistProvider";
import { ListEnd, ListPlus, Play } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useAuth } from "@/provider/AuthProvider";
import { useToast } from "./ui/use-toast";


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
  song_id: string;
}

const RankingItem = ({ item: props }: RankingItemProps) => {
  const {
    updateNowPlaying,
    pendingPlaylist,
    updatePendingPlaylist,
  } = usePlaylist();

  const { toast } = useToast();

  const API_URL = process.env.BACKEND_API;

  const { accessToken, currentUser } = useAuth();

  const fetchMyPlaylist = async () => {
    const GET_MY_PLAYLIST_API = `${API_URL}playlists`;
    try {
      const response = await fetch(GET_MY_PLAYLIST_API, {
        keepalive: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (response.status !== 200) {
        console.log("error");
        return null;
      }
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const addToPlaylist = async (id: string, items: RankingItemData[]) => {
    const ADD_TO_PLAYLIST = `${API_URL}playlists/${id}`;
    try {
      const response = await fetch(ADD_TO_PLAYLIST, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${accessToken}`,
        },
        body: JSON.stringify(items),
      });
      const statusCode = response.status;

      if (statusCode !== 200) {
        console.log("error");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveToPlaylist = async (items: RankingItemData[]) => {

    if (!currentUser) {
      toast({
        title: `Login to unlock this function.`,
      });
      return;
    }

    const myPlaylist = await fetchMyPlaylist();
    if (items.length == 1) {
      addToPlaylist(myPlaylist[0].id, items);
      toast({
        title: `${items[0].song_title} saved to your playlist.`,
      });
    } else {
      toast({
        title: `${items.length} songs saved.`,
      });
    }
  };

  const handleAddToCurrentPlaylist = async (items: RankingItemData[]) => {

    if (!currentUser) {
      toast({
        title: `Login to unlock this function.`,
      });
      return;
    }

    updatePendingPlaylist(items);
    toast({
      title: `${props.song_title} added to current playlist.`,
    });
  };

  return (
    <Card className="relative mx-4 my-2 md:my-4">

      <div className="hidden md:grid md:grid-cols-10 md:justify-items-center md:place-items-center md:m-2">
        <div className="">
          <p className="text-lg md:text-4xl">{props.rank}</p>
        </div>
        <div className="">
          <div className="flex items-center justify-center min-w-8 min-h-8 md:min-w-14 md:min-h-14">
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
          </div>
        </div>

        <div className="ml-2 mr-2">
          <img
            className="hover:scale-125 rounded-lg shadow-lg transition ease-in-out delay-50"
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
            <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild onClick={() => updateNowPlaying(props)}>
                <div className="flex items-center justify-center space-x-4 p-2 w-auto rounded hover:bg-accent hover:text-accent-foreground">
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
                  handleAddToCurrentPlaylist([...pendingPlaylist as RankingItemData[], props])
                }
              >
                <div className="flex items-center justify-center space-x-4 p-2 w-auto rounded hover:bg-accent hover:text-accent-foreground">
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
                onClick={() => handleSaveToPlaylist([props])}
              >
                <div className="flex items-center justify-center space-x-4 p-2 w-auto rounded hover:bg-accent hover:text-accent-foreground">
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
        
      </div>

      <div className="hidden md:grid">
        <div className="grid grid-flow-col justify-stretch">
        </div>
      </div>
      {/*  */}
      <div className="absolute -left-2 -top-2 h-4 bg-white dark:bg-black">
        <div className="flex items-center space-x-2 ">
        </div>
      </div>
      <div className="grid grid-cols-10 justify-items-center place-items-center md:hidden">
        <div className="col-span-2">
          <div className="flex flex-col">
          <p className="text-3xl md:text-4xl text-center">{props.rank}</p>
          {props.rank_changes_flow == '+'? <p className="text-sm min-w-8 text-center rounded-sm bg-green-500">
          {props.rank_changes_flow}{props.rank_changes_position}</p> : <></>}
          {props.rank_changes_flow == '-'? <p className="text-sm min-w-8 text-center rounded-sm bg-red-500">
          {props.rank_changes_flow}{props.rank_changes_position}</p> : <></>}
          </div>
        </div>
        <div className="ml-2 col-span-2">
          <img src={props.album_image} className="rounded-md shadow-md" width={60} height={60} />
        </div>

        <div className="flex justify-self-start items-center justify-center space-x-4 p-4 col-span-6">
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
        <div className="col-span-10">
          <p className="text-center text-sm m-2 text-muted-foreground text-wrap text-ellipsis">
            {props.album_name}
          </p>
        </div>
      </div>
      <div className="grid md:hidden">
        <div className="grid grid-flow-col justify-stretch">
          <div
            className="flex items-center justify-center space-x-4 py-2 w-auto hover:bg-accent hover:text-accent-foreground"
            onClick={() => updateNowPlaying(props)}
          >
            <div className="flex w-4 h-4 items-center justify-center">
              <Play className="absolute h-[1.2rem] w-[1.2rem]" />
            </div>
          </div>
          <div
            className="flex items-center justify-center space-x-4 py-2 w-auto hover:bg-accent hover:text-accent-foreground"
            onClick={() =>
              handleAddToCurrentPlaylist([...pendingPlaylist as RankingItemData[], props])
            }
          >
            <div className="flex w-4 h-4 items-center justify-center">
              <ListEnd className="absolute h-[1.2rem] w-[1.2rem]" />
            </div>
          </div>
          <div
            className="flex items-center justify-center space-x-4 py-2 w-auto hover:bg-accent hover:text-accent-foreground"
            onClick={() => handleSaveToPlaylist([props])}
          >
            <div className="flex w-4 h-4 items-center justify-center">
              <ListPlus className="absolute h-[1.2rem] w-[1.2rem]" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default memo(RankingItem);
