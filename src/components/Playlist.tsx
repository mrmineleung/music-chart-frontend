import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import PlaylistItem from "./PlaylistItem";
import { Button } from "./ui/button";
import { usePlaylist } from "@/provider/PlaylistProvider";
import { RankingItemData } from "./RankingItem";
import { ListMusic, X } from "lucide-react";

const Playlist = () => {
  const {
    playlist,
    updatePlaylist,
    nowPlaying,
    pendingPlaylist,
    updatePendingPlaylist,
    isOpenPlaylist,
    setIsOpenPlaylist,
  } = usePlaylist();

  const handleRemovePlaylistItem = (deleted_item: RankingItemData) => {
    updatePlaylist(
      playlist
        .filter((item) => item.song_artists !== deleted_item.song_artists)
        .filter((item) => item.song_title !== deleted_item.song_title)
    );
  };

  const handleRemoveAllPlaylistItem = () => {
    updatePlaylist([]);
  };

  const handleRemovePendingPlaylistItem = (deleted_item: RankingItemData) => {
    updatePendingPlaylist(
      pendingPlaylist
        .filter((item) => item.song_artists !== deleted_item.song_artists)
        .filter((item) => item.song_title !== deleted_item.song_title)
    );
  };

  const handleRemoveAllPendingPlaylistItem = () => {
    updatePendingPlaylist([])
  };

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
        <SheetDescription asChild
          className={`${pendingPlaylist.length == 0 ? "hidden" : ""}`}
        >
          <div className="flex flex-row justify-between items-center">
          Up next:
          <Button variant="link" onClick={handleRemoveAllPendingPlaylistItem}>
            <X className="w-4 h-4"></X>
            Remove All</Button></div>
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

        <SheetDescription asChild>
        <div className="flex flex-row justify-between items-center">
          {playlist.length > 0
            ? "You have added into to your playlist."
            : "Your playlist is empty."}

            <Button variant="link" className={playlist.length > 0? 'flex': 'hidden'} onClick={handleRemoveAllPlaylistItem}>
            <X className="w-4 h-4"></X>
            Remove All</Button>
            </div>
        </SheetDescription>

        <div
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
        </div>
        {playlist.length > 0 ? (
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Generate playlist</Button>
            </SheetClose>
          </SheetFooter>
        ) : (
          <></>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Playlist;
