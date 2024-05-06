import PersonalPlaylist from "@/components/PersonalPlaylist";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/provider/AuthProvider";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


export interface Playlist {
  id: string,
  name: string,
  description: string,
  is_public: boolean,
  items: Song[]
}

export interface Song {
  song_id: string,
  album_image: string,
  song_title: string,
  song_artists: string,
  album_name: string,
  youtube_video_id: string,
  youtube_video_title: string,
  youtube_video_author: string
}

const API_URL = process.env.BACKEND_API;
const GET_MY_PLAYLIST_API = `${API_URL}playlists`;

const UserPlaylist = () => {

  const [allPlaylist, setAllPlaylist] = useState<Playlist[] | null>(null)
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null)
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null)
  const [itemCount, setItemCount] = useState<number>(0)
  const {accessToken} = useAuth()
  const navigate = useNavigate()

  const handlePlaylistMenuItem = (value: string) => {
    setSelectedPlaylistId(value)
  }

    useEffect(() => {
        const fetchMyPlaylist = async() => {
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
            setSelectedPlaylistId(data? data[0].id: null)


          } catch (e) {
            console.error(e);
          }
        }

        fetchMyPlaylist()
    }, [accessToken])

    useEffect(() => {
      const fetchSelectedPlaylist = async() => {
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
        }
      }

      if (selectedPlaylistId) {
      fetchSelectedPlaylist()
      }
  }, [accessToken, selectedPlaylistId, itemCount])

  return (
    <div className="grid gap-6">
      <DropdownMenu>
  <DropdownMenuTrigger asChild><Button variant="outline">{selectedPlaylist?.name}</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    {allPlaylist?.map(item => <DropdownMenuItem onClick={() => handlePlaylistMenuItem(item.id)}>{item.name}</DropdownMenuItem>)}
  </DropdownMenuContent>
</DropdownMenu>

<div>
  {/* {selectedPlaylist?.items?.map(item => <span>{item.song_artists} - {item.song_title}</span>)} */}
  {selectedPlaylist && <PersonalPlaylist playlist={selectedPlaylist} updatePlaylist={setItemCount}/>}
</div>
    </div>
  )
}

export default UserPlaylist