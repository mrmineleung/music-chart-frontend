// import { usePlaylist } from "@/provider/PlaylistProvider"
import { Trash2 } from "lucide-react"
import { RankingItemData } from "./RankingItem"
import { Button } from "./ui/button"

interface PlaylistItemProps {
    item: RankingItemData,
    handleDeleteItem : (item: RankingItemData) => void
}



const PlaylistItem = ({item, handleDeleteItem} : PlaylistItemProps) => {

  return (
    <div className="flex flex-row space-x-4 border-b justify-between">
        <div className="flex flex-col">
            <div className="">{item.song_title}</div>
            <div className="">{item.song_artists}</div>
        </div>
        <div className="">
            <Button variant="outline"
                      size="icon" onClick={() => handleDeleteItem(item)}>
              <Trash2 className="h-4 w-4"></Trash2></Button></div>
    </div>
  )
}

export default PlaylistItem