// import { usePlaylist } from "@/provider/PlaylistProvider"
import { Play } from "lucide-react"
import { RankingItemData } from "./RankingItem"
// import { Button } from "./ui/button"
import { Song } from "@/pages/UserPlaylist"
import { usePlaylist } from "@/provider/PlaylistProvider"
import { Button } from "./ui/button"

interface PlaylistItemProps {
    item: Song,
    handleDeleteItem? : (item: RankingItemData) => void
}



const PublicPlaylistItem = ({item} : PlaylistItemProps) => {

  const {updateNowPlaying} = usePlaylist()

  return (
    <div className="flex flex-row space-x-4 border-b justify-between">
      <div className="flex space-x-6 items-center px-4">
      <Button
                      variant="ghost"
                      size="icon"
                      onClick={()=> updateNowPlaying(item)}
                    >
                        <Play className="h-4 w-4" />
                    </Button>

            <img
            className=""
            src={item.album_image}
            width={80}
            height={80}
          />
        <div className="flex flex-col space-y-2">
            <div className="text-lg leading-none">{item.song_title}</div>
            <div className="text-sm text-muted-foreground">{item.song_artists}</div>
        </div>

</div>
    </div>
  )
}

export default PublicPlaylistItem