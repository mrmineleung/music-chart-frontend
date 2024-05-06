// import { usePlaylist } from "@/provider/PlaylistProvider"
import { Trash2 } from "lucide-react"
import { Button } from "./ui/button"
import { Song } from "@/pages/UserPlaylist"

interface PlaylistItemProps {
    item: Song,
    handleDeleteItem : (item: Song) => void
}



const PlaylistItem = ({item, handleDeleteItem} : PlaylistItemProps) => {

  return (
    <div className="flex flex-row space-x-4 border-b justify-between items-center">
        <div className="flex flex-col">
            <div className="">{item.song_title}</div>
            <div className="text-sm text-muted-foreground">{item.song_artists}</div>
        </div>
        <div className="">
            <Button variant="ghost"
                      size="icon" onClick={() => handleDeleteItem(item)}>
              <Trash2 className="h-4 w-4"></Trash2></Button></div>
    </div>
  )
}

export default PlaylistItem