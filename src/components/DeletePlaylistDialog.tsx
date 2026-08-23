
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
import { Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useToast } from "./ui/use-toast";
import { useState } from "react"
import { Playlist } from "@/lib/types";

interface DeletePlaylistDialogProps {
  handleRefreshMyPlaylist: () => void;
  playlist: Playlist | null;
}


const DeletePlaylistDialog = ({handleRefreshMyPlaylist, playlist} : DeletePlaylistDialogProps) => {

  const [open, setOpen] = useState(false);

      const handleClose = () => {
        setOpen(false);
      };

    const { toast } = useToast();

    const API_URL = process.env.BACKEND_API;
  
    const { accessToken } = useAuth();

  
    const deleteMyPlaylist = async (playlist: Playlist) => {

      console.log(playlist.name.toLowerCase());
      if (playlist.name.toLowerCase() == 'default') {
        toast({
          title: `Default playlist cannot be deleted.`,
        });
        return;
      }

      const DELETE_PLAYLIST = `${API_URL}playlists/${playlist?.id}`;
      try {
        const response = await fetch(DELETE_PLAYLIST, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${accessToken}`,
          },
        });
        const statusCode = response.status;
  
        if (statusCode !== 200) {
          console.log("error");
          toast({
          title: `Delete playlist ${playlist?.name} failed.`,
        });
        } else {

        toast({
          title: `Playlist ${playlist?.name} deleted.`,
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
                    <Trash2 className="absolute h-[1.2rem] w-[1.2rem]" />
                  </div>
                </div>
                
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete playlist {playlist?.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete playlist</DialogTitle>
        </DialogHeader>
        <br/>
<p>Sure to delete playlist <u>{playlist?.name}</u>?</p>
<br />
        <DialogClose asChild>
          <Button type="button" variant="destructive" onClick={() => deleteMyPlaylist(playlist!)}>
              Delete
            </Button>
            </DialogClose>
        
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

export default DeletePlaylistDialog
