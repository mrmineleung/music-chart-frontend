import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import PlaylistItem from "./PlaylistItem";
import { Button } from "./ui/button";
import { usePlaylist } from "@/provider/PlaylistProvider";
import { RankingItemData } from "./RankingItem";
import { DiscAlbum, ListMusic, Play, X } from "lucide-react";
import { useAuth } from "@/provider/AuthProvider";
import { json } from "react-router-dom";
import { useEffect, useState } from "react";
import { Playlist, Song } from "@/pages/UserPlaylist";

const PlaylistSheet = () => {
  const API_URL = process.env.BACKEND_API;
  const GET_MY_PLAYLIST_API = `${API_URL}playlists`;

  const { accessToken } = useAuth();

  const {
    nowPlaying,
    pendingPlaylist,
    updatePendingPlaylist,
    isOpenPlaylist,
    setIsOpenPlaylist,
  } = usePlaylist();

  const [currentPlaylist, setCurrentPlaylist] = useState<[] | null>(null);

  const handlePlayCurrentPlaylist = async (playlist_id: string) => {
    try {
      const response = await fetch(`${GET_MY_PLAYLIST_API}/${playlist_id}`, {
        keepalive: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (response.status == 401) {
        throw json({ status: 401 });
      }

      updatePendingPlaylist(data.items);
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  // const handleRemovePlaylistItem = (deleted_item: RankingItemData) => {
  //   updatePlaylist(
  //     playlist
  //       .filter((item) => item.song_artists !== deleted_item.song_artists)
  //       .filter((item) => item.song_title !== deleted_item.song_title)
  //   );
  // };

  // const handleRemoveAllPlaylistItem = () => {
  //   updatePlaylist([]);
  // };

  const handleRemovePendingPlaylistItem = (
    deleted_item: RankingItemData | Song
  ) => {
    updatePendingPlaylist(
      pendingPlaylist
        .filter((item) => item.song_artists !== deleted_item.song_artists)
        .filter((item) => item.song_title !== deleted_item.song_title)
    );
  };

  const handleRemoveAllPendingPlaylistItem = () => {
    updatePendingPlaylist([]);
  };
  useEffect(() => {
    const fetchMyPlaylist = async () => {
      try {
        const response = await fetch(GET_MY_PLAYLIST_API, {
          keepalive: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${accessToken}`,
          },
        });

        const data = await response.json();

        if (response.status == 401) {
          throw json({ status: 401 });
        }

        setCurrentPlaylist(data);
      } catch (e) {
        console.error(e);
        throw e;
      }
    };
    fetchMyPlaylist();
  }, []);

  return (
    <Sheet open={isOpenPlaylist} onOpenChange={setIsOpenPlaylist}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <ListMusic className="mr-2 h-4 w-4" />
          Playlist
          {/* <span className="sr-only">Playlist</span> */}
        </Button>
      </SheetTrigger>
      <SheetContent side={"right"} className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Your playlist</SheetTitle>
          {/* <SheetDescription>
        {playlist.length > 0? 'You have added these song into to your playlist.' : 'Your playlist is empty.'}
      </SheetDescription> */}
        </SheetHeader>

        {nowPlaying ? (
          <>
            <p></p>
            <SheetDescription>Now playing:</SheetDescription>
            <div className="flex flex-col">
              <p>
                {nowPlaying?.song_title} - {nowPlaying?.song_artists}
              </p>
            </div>
            <p></p>
            <p></p>
          </>
        ) : (
          <></>
        )}
        <SheetDescription
          asChild
          className={`${pendingPlaylist.length == 0 ? "hidden" : ""}`}
        >
          <div className="flex flex-row justify-between items-center">
            Up next:
            <Button variant="link" onClick={handleRemoveAllPendingPlaylistItem}>
              <X className="w-4 h-4"></X>
              Remove All
            </Button>
          </div>
        </SheetDescription>
        <div
          className={`flex flex-col overflow-y-auto min-h-48 ${
            pendingPlaylist.length == 0 ? "hidden" : ""
          }`}
        >
          {pendingPlaylist?.map((pendingItem) => (
            <PlaylistItem
              key={`${pendingItem.song_title}-${pendingItem.song_artists}`}
              item={pendingItem}
              handleDeleteItem={handleRemovePendingPlaylistItem}
            ></PlaylistItem>
          ))}
          <p></p>
        </div>

        {/* <SheetDescription asChild>
        <div className="flex flex-row justify-between items-center">
          {playlist.length > 0
            ? "You have added into to your playlist."
            : "Your saved playlist is empty."}

            <Button variant="link" className={playlist.length > 0? 'flex': 'hidden'} onClick={handleRemoveAllPlaylistItem}>
            <X className="w-4 h-4"></X>
            Remove All</Button>
            </div>
        </SheetDescription> */}

        <SheetDescription asChild>
          <div className="flex flex-row justify-between items-center">
            Saved playlist
          </div>
        </SheetDescription>

        {/* <div
          className={`flex flex-col overflow-y-auto min-h-48 ${
            playlist.length == 0 ? "hidden" : ""
          }`}
        >
          {playlist.map((item) => (
            <PlaylistItem
              key={`${item.song_title}-${item.song_artists}`}
              item={item}
              handleDeleteItem={handleRemovePlaylistItem}
            ></PlaylistItem>
          ))}
          <p></p>
        </div> */}

        <div
          className={`flex flex-col overflow-y-auto min-h-48 ${
            currentPlaylist?.length == 0 ? "hidden" : ""
          }`}
        >
          {currentPlaylist?.map((item: Playlist) => (
            // <PlaylistItem
            //   key={`${item.song_title}-${item.song_artists}`}
            //   item={item}
            //   handleDeleteItem={handleRemovePlaylistItem}
            // ></PlaylistItem>
            <div className="flex flex-row space-x-4 border-b justify-between">
              <div className="flex flex-row items-center">
                <DiscAlbum className="w-6 h-6 mr-2" />
                <div className="flex flex-col">
                  <div className="">{item?.name}</div>
                  <div className="text-left text-sm text-muted-foreground">
                    {item?.is_public ? "Public" : "Private"} -{" "}
                    {item?.items.length} songs
                  </div>
                </div>
              </div>
              <div className="">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handlePlayCurrentPlaylist(item?.id)}
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <p></p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PlaylistSheet;
