
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Playlist, Song } from "./UserPlaylist";
import { Virtuoso } from "react-virtuoso";
import PublicPlaylistItem from "@/components/PublicPlaylistItem";
import { usePlaylist } from "@/provider/PlaylistProvider";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

type PublicPlaylistParams = {
  playlist_id: string;
};


const PublicPlaylist = () => {
  const [response, setResponse] = useState<Playlist>()

  const {
    updateNowPlaying,
    updatePendingPlaylist,
  } = usePlaylist();

  const params = useParams<PublicPlaylistParams>();
  // const navigate = useNavigate()

  const handlePlayAll = (playlist: Song[]) => {
    const [head, ...tail] = playlist;
    updateNowPlaying(head);
    updatePendingPlaylist(tail);
  };

  useEffect(() => {
    const API_URL = process.env.BACKEND_API;
    const GET_PUBLIC_PLAYLIST_API = `${API_URL}playlists/public/${params.playlist_id}`;

    const fetchPublicPlaylistData = async () => {
      try {
        const response = await fetch(GET_PUBLIC_PLAYLIST_API, {
          keepalive: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.ok);
        console.log(response);
        const data = await response.json();

        if (response.status == 200) {
          setResponse(data)
        } 

      } catch (e) {
        console.error(e);
      }
    };

    fetchPublicPlaylistData()
    
  },[params.playlist_id])

  
  return (
    <>
      <h1 className="scroll-m-20 border-b text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        {response?.name}
      </h1>
      <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center">
          {response?.description}
        </h2>
      <div className="flex flex-row pb-1">
        <div className="flex flex-col md:flex-row md:space-x-2">
          <Button onClick={() => handlePlayAll(response?.items || [])} variant="outline">
            <Play className="mr-2 h-4 w-4" /> Play all
          </Button>
          {/* <Button
            onClick={() => handleSaveAllToPlaylist(rankingList)}
            variant="outline"
          >
            <ListPlus className="mr-2 h-4 w-4" /> Save all to playlist
          </Button> */}
          {/* <Input
        type="text"
        placeholder="Search"
        onChange={(e) => handleSearch(e)}
      /> */}
        </div>
        {/* <div className="flex flex-1 justify-end items-end">
          <Button onClick={() => handleSort(!isAscOrder)} variant="outline">
            <CaretSortIcon className="mr-2 h-4 w-4" /> Sort
          </Button>
        </div> */}
      </div>
      {/* <div key={response?.chart} className="grid grid-cols-2 gap-2 content-stretch m-2">
        {response?.types.map(type => 
          <Link key={type} to={`/charts/${response.chart.toLowerCase()}/types/${type.toLowerCase().replace(' ', '_')}`}>
          <div key={type} className={`border rounded-lg ${bgColorMapping.get(response.chart.toLowerCase())}`}>
            <div key={type} className="flex justify-center place-items-center rounded-lg h-32 transition-all hover:bg-accent/50 hover:text-accent-foreground duration-500">
              <span key={type} className="text-2xl md:text-3xl font-extrabold">{type}</span>
            </div>
          </div></Link>
        )}
      </div> */}

{/* <div className="grid grid-cols-2 gap-2 content-stretch m-2">
      {response?.items.map(item => 
      <>
        <div key={item.song_id + item.song_title}>{item.song_title}</div>
        <div key={item.song_id + item.song_artists}>{item.song_artists}</div></>
      )}
</div> */}
<br/>
<Virtuoso
          className="!h-[600px]"
          data={response?.items}
          itemContent={(key, item) => <PublicPlaylistItem key={key} item={item} />}
        />
  
      {/* <div className="sticky mt-auto ml-auto max-w-12 bottom-28 right-5 flex flex-row justify-end space-x-2">
        <ScrollToTopButton></ScrollToTopButton>
      </div> */}
    </>
  );
};

export default PublicPlaylist;
