import CreatePlaylistDialog from "@/components/CreatePlaylistDialog";
import DeletePlaylistDialog from "@/components/DeletePlaylistDialog";
import PersonalPlaylist from "@/components/PersonalPlaylist";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Playlist } from "@/lib/types";
import { useAuth } from "@/provider/AuthProvider";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


// export interface Playlist {
//   id: string,
//   name: string,
//   description: string,
//   is_public: boolean,
//   items: Song[]
// }

// export interface Song {
//   song_id: string,
//   album_image: string,
//   song_title: string,
//   song_artists: string,
//   album_name: string,
//   youtube_video_id: string,
//   youtube_video_title: string,
//   youtube_video_author: string
// }

const API_URL = process.env.BACKEND_API;
const GET_MY_PLAYLIST_API = `${API_URL}playlists`;

const UserPlaylist = () => {

  const [allPlaylist, setAllPlaylist] = useState<Playlist[] | null>(null)
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null)
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null)
  const [itemCount, setItemCount] = useState<number>(0)
  const [isMyPlaylistsLoading, setIsMyPlaylistsLoading] = useState<boolean>(false)
  const [isSelectedPlaylistLoading, setIsSelectedPlaylistLoading] = useState<boolean>(false)
  const [isRefreshMyPlaylist, setIsRefreshMyPlaylist] = useState<boolean>(false)
  const {accessToken} = useAuth()
  const navigate = useNavigate()

  const handleRefreshMyPlaylist = () => {
    setIsRefreshMyPlaylist(!isRefreshMyPlaylist)
  }

  const handlePlaylistMenuItem = (value: string) => {
    setSelectedPlaylistId(value)
  }

  const handlePlaylistItemCount = (itemCount: number) => {
    setItemCount(itemCount);
  };

    useEffect(() => {
        const fetchMyPlaylist = async() => {
          setIsMyPlaylistsLoading(true)
          try {
            const response = await fetch(GET_MY_PLAYLIST_API, {
              keepalive: true,
              headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${accessToken}`
              },
            });

            if (response.status == 401) {
              navigate("/")
            }
            
            const data = await response.json();

            setAllPlaylist(data)
            setSelectedPlaylistId(data && data.length > 0? data[0].id: null)


          } catch (e) {
            console.error(e);
          } finally {
            setIsMyPlaylistsLoading(false)
          }
        }

        fetchMyPlaylist()
    }, [accessToken, navigate, isRefreshMyPlaylist])

    useEffect(() => {
      const fetchSelectedPlaylist = async() => {
        setIsSelectedPlaylistLoading(true)
        try {
          const response = await fetch(`${GET_MY_PLAYLIST_API}/${selectedPlaylistId}`, {
            keepalive: true,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `bearer ${accessToken}`
            },
          });
          if (response.status == 401) {
            navigate("/")
          }
          const data = await response.json();
          setSelectedPlaylist(data)
        } catch (e) {
          console.error(e);
        } finally {
          setIsSelectedPlaylistLoading(false)
        }
      }

      if (selectedPlaylistId) {
      fetchSelectedPlaylist()
      }
  }, [accessToken, selectedPlaylistId, itemCount, navigate])

  return (
    <div className="grid gap-6">
      <div className="flex justify-between">
        <CreatePlaylistDialog handleRefreshMyPlaylist={handleRefreshMyPlaylist}/>
        <DeletePlaylistDialog handleRefreshMyPlaylist={handleRefreshMyPlaylist} playlist={selectedPlaylist}/>
      </div>
      {isMyPlaylistsLoading && allPlaylist && allPlaylist.length > 0? <></> :
      <DropdownMenu>
  <DropdownMenuTrigger asChild><Button variant="outline">{isSelectedPlaylistLoading? <Loader2Icon className="animate-spin" /> : selectedPlaylist?.name}</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    {allPlaylist?.map(item => <DropdownMenuItem key={item.id} onClick={() => handlePlaylistMenuItem(item.id)}>{item.name}</DropdownMenuItem>)}
  </DropdownMenuContent>
</DropdownMenu>}

<div>
  {/* {selectedPlaylist?.items?.map(item => <span>{item.song_artists} - {item.song_title}</span>)} */}
  {selectedPlaylist && <PersonalPlaylist playlist={selectedPlaylist} updatePlaylistItemCount={handlePlaylistItemCount}/>}
</div>
    </div>
  )
}

export default UserPlaylist