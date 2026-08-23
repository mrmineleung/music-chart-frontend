import { Virtuoso } from "react-virtuoso"
import PersonalPlaylistItem from "./PersonalPlaylistItem"
import { useAuth } from "@/provider/AuthProvider"
import { Playlist, Song } from "@/lib/types";

interface PersonalPlaylistProps {
    playlist: Playlist,
    updatePlaylistItemCount: (value: number) => void
}
const API_URL = process.env.BACKEND_API;

const PersonalPlaylist = ({playlist, updatePlaylistItemCount}: PersonalPlaylistProps) => {
    const {accessToken} = useAuth()

  const deletePlaylistItem = async (id: string, item: Song) => {
    const DELETE_PLAYLIST_ITEM = `${API_URL}playlists/${id}/item/${item.song_id}`;
    try {
      const response = await fetch(DELETE_PLAYLIST_ITEM, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${accessToken}`,
        },
      });
      const statusCode = response.status;
      
      if (statusCode !== 200) {
        console.log('error')
      }

      const new_playlist = playlist?.items.filter(playlist_item => playlist_item.song_id !== item.song_id)

      const itemCount = new_playlist.length || 0

      console.log(itemCount)
      console.log(playlist?.items)
      updatePlaylistItemCount(itemCount)
    } catch (e) {
      console.error(e);
    }
    
    // navigate(0)
      
  };

  return (
    <Virtuoso
          className="!h-[600px]"
          data={playlist?.items}
          itemContent={(key, item) => <PersonalPlaylistItem key={key} item={item} handleDeleteItem={()=> deletePlaylistItem(playlist?.id || "", item)} />}
        />
  )
}

export default PersonalPlaylist