
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
import CreatePlaylistForm from "./CreatePlaylistForm"

interface CreatePlaylistDialogProps {
  handleRefreshMyPlaylist: () => void;
}


const CreatePlaylistDialog = ({handleRefreshMyPlaylist} : CreatePlaylistDialogProps) => {

  const [open, setOpen] = useState(false);

      const handleClose = () => {
        setOpen(false);
      };

    const { toast } = useToast();

    const API_URL = process.env.BACKEND_API;
  
    const { accessToken } = useAuth();

    const fetchMyPlaylist = async () => {
            
      // if (!currentUser) {
      //   return
      // }
      //   setIsLoading(true)
      // const GET_MY_PLAYLIST_API = `${API_URL}playlists`;
      // try {
      //   const response = await fetch(GET_MY_PLAYLIST_API, {
      //     keepalive: true,
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `bearer ${accessToken}`,
      //     },
      //   });
  
      //   const data = await response.json();
      //   console.log(data)
  
      //   if (response.status !== 200) {
      //     console.log("error");
      //     return null;
      //   }

      //   // setMyPlaylists(data);

      //   // return data;
      // } catch (e) {
      //   console.error(e);
      //   // return null;
      //   // setMyPlaylists([]);
      // } finally {
      //   // setIsLoading(false)
      // }
      return null;
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
          toast({
          title: `Create playlist failed.`,
        });
        } else {

        toast({
          title: `Playlist ${name} created.`,
        });
        handleRefreshMyPlaylist()
        handleClose()
      }
      } catch (e) {
        console.error(e);
        toast({
          title: `Unexpected error.`,
        });
      }
    };
    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Button variant="link" className="!px-0 !py-0 !text-accent-foreground">
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
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create</DialogTitle>
        </DialogHeader>
        
        <CreatePlaylistForm handleCreateMyPlaylist={createMyPlaylist} handleFetchMyPlaylist={fetchMyPlaylist}/>
        
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

export default CreatePlaylistDialog
