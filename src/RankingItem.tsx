import React, { Suspense, lazy, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowUpIcon, ArrowDownIcon, DashIcon } from "@radix-ui/react-icons";
// import YoutubeVideo from "./YoutubeVideo";

const YoutubeVideo = lazy(() => import('./YoutubeVideo'));

interface RankingItemProps {
  item: RankingItem
}

interface RankingItem {
  album_image: string,
  album_name: string,
  rank: string,
  rank_changes_flow?: string,
  rank_changes_position?: string,
  song_artists: string,
  song_title: string,
  youtube_video_id: string
}

const RankingItem = ({ item : props }: RankingItemProps) => {

  const [showVideo, setShowVideo] = useState<boolean>(false)

  return (
    <Card className="m-4">
      <CardContent className="flex flex-row items-center p-4">
        <div className="basis-1/6">
          <div className="m-4">
            <p className="text-4xl text-center font-medium leading-none">{props.rank}</p>
          </div>
        </div>
        <div className="basis-1/8">
          <div className="flex items-center p-4 rounded-md border size-16">
            {!props.rank_changes_flow? (<DashIcon className="h-6 w-12"/>) : (<></>)}
            {props.rank_changes_flow == '+'? (<><ArrowUpIcon className="h-6 w-4" /><p className="text-2xl font-medium leading-none text-left">{props.rank_changes_position}</p></>) : (<></>)}
            {props.rank_changes_flow == '-'? (<><ArrowDownIcon className="h-6 w-4" /><p className="text-2xl font-medium leading-none text-left">{props.rank_changes_position}</p></>) : (<></>)}
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
      {/* {showVideo && (
          <Suspense fallback={<Skeleton className="h-4 w-[250px]" />}>
          <YoutubeVideo videoId={props.youtube_video_id} />
          </Suspense>
)} */}
        </div>
      </CardContent>
      {showVideo && (
          <Suspense fallback={<p className="text-left text-sm m-2 text-muted-foreground">Loading...</p>}>
            <CardFooter>
              <div className="m-auto">
          <YoutubeVideo videoId={props.youtube_video_id} width={500} height={300} />
          </div>
          </CardFooter>
          </Suspense>
)}
    </Card>
  );
};

export default RankingItem;
