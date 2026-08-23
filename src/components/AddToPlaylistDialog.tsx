
import { useAuth } from "@/provider/AuthProvider"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ListPlus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useToast } from "./ui/use-toast";
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import CreatePlaylistForm from "./CreatePlaylistForm"
import { Playlist, RankingItemData } from "@/lib/types";

interface AddToPlaylistDialogProps {
    item: RankingItemData
}


const AddToPlaylistDialog = ({ item } : AddToPlaylistDialogProps) => {

  const [myPlaylists, setMyPlaylists] = useState<Playlist[]>([]);
  const [isPlaylistCreated, setIsPlaylistCreated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);

    const { toast } = useToast();

    const API_URL = process.env.BACKEND_API;
  
    const { accessToken, currentUser } = useAuth();
  
    const fetchMyPlaylist = async () => {
            
      if (!currentUser) {
        return
      }
        setIsLoading(true)
      const GET_MY_PLAYLIST_API = `${API_URL}playlists`;
      try {
        const response = await fetch(GET_MY_PLAYLIST_API, {
          keepalive: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${accessToken}`,
          },
        });
  
        const data = await response.json();
  
        if (response.status !== 200) {
          console.log("error");
          return null;
        }

        setMyPlaylists(data);

        // return data;
      } catch (e) {
        console.error(e);
        // return null;
        setMyPlaylists([]);
      } finally {
        setIsLoading(false)
      }
    };
  
    const addToMyPlaylist = async (id: string, items: RankingItemData[]) => {
      const ADD_TO_PLAYLIST = `${API_URL}playlists/${id}`;
      try {
        const response = await fetch(ADD_TO_PLAYLIST, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${accessToken}`,
          },
          body: JSON.stringify(items),
        });
        const statusCode = response.status;
  
        if (statusCode !== 200) {
          console.log("error");
          toast({
          title: `Saved failed.`,
        });
        }

        toast({
          title: `${items[0].song_title} saved to your playlist.`,
        });
      } catch (e) {
        console.error(e);
        toast({
          title: `Unexpected error.`,
        });
      }
    };
  
  
    const createMyPlaylist = async (name: string, description: string) => {
      const CREATE_PLAYLIST = `${API_URL}playlists`;
      try {
        const response = await fetch(CREATE_PLAYLIST, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${accessToken}`,
          },
          body: JSON.stringify({name: name, description: description}),
        });
        const statusCode = response.status;
  
        if (statusCode !== 201) {
          console.log("error");
          toast({
          title: `Create playlist failed.`,
        });
        }

        setIsPlaylistCreated(true);
        toast({
          title: `Playlist ${name} created.`,
        });
      } catch (e) {
        console.error(e);
        toast({
          title: `Unexpected error.`,
        });
      }
    };
    
  
    // const handleSaveToPlaylist = async (items: RankingItemData[]) => {
  
      // if (!currentUser) {
      //   toast({
      //     title: `Login to unlock this function.`,
      //   });
      //   return;
      // }
  
    //   const myPlaylist = await fetchMyPlaylist();
      
    //   if (!myPlaylist || myPlaylist.length == 0) {
    //     // create playlist
    //     return;
    //   }
  
    //   if (items.length == 1) {
    //     addToMyPlaylist(myPlaylist[0].id, items);
    //     toast({
    //       title: `${items[0].song_title} saved to your playlist.`,
    //     });
    //   } else {
    //     toast({
    //       title: `${items.length} songs saved.`,
    //     });
    //   }
    // };

  return (
    <Dialog>
      <DialogTrigger asChild>
      {/* <Button variant="link" onClick={fetchMyPlaylist}> */}
      <Button variant="link" onClick={fetchMyPlaylist} className="!px-0 !py-0 !text-accent-foreground">
        <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                asChild
              >
                <div className="flex items-center justify-center space-x-4 p-2 w-auto rounded hover:bg-accent hover:text-accent-foreground">
                  <div className="flex w-4 h-4 items-center justify-center">
                    <ListPlus className="absolute h-[1.2rem] w-[1.2rem]" />
                  </div>
                </div>
                
              </TooltipTrigger>
              <TooltipContent>
                <p>Save to playlist</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          </Button>
          {/* </Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save <span className="underline">{item.song_title}</span> to ...</DialogTitle>
          {/* <DialogDescription>
            Select a playlist
          </DialogDescription> */}
        </DialogHeader>
        {!currentUser? <div>Login to unlock.</div> : isLoading? <div className="">
      {/* <Loader2 className="h-16 w-16 animate-spin" /> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full"></Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
      
        </div>:
        myPlaylists && myPlaylists.length > 0 || isPlaylistCreated? 
        <div className="space-y-2">
            <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full">{selectedPlaylist? selectedPlaylist.name : 'Select a playlist'}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        
        {myPlaylists.map(playlist => 

            <DropdownMenuItem key={playlist?.id} onSelect={() => setSelectedPlaylist(playlist)}>{playlist?.name}</DropdownMenuItem>

          )}
      </DropdownMenuContent>
    </DropdownMenu>

    {selectedPlaylist && <DialogClose asChild><Button className="w-full" onClick={() => {
              addToMyPlaylist(selectedPlaylist?.id, [item])
              }}>Save</Button></DialogClose>}
        </div> :

        <CreatePlaylistForm handleCreateMyPlaylist={createMyPlaylist} handleFetchMyPlaylist={fetchMyPlaylist}/>

        }

            
        
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddToPlaylistDialog
