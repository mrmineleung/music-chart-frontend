
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { Button } from "./ui/button";
import RollingLyrics, { LyricLine } from "./RollingLyrics";
import { usePlaylist } from "@/provider/PlaylistProvider";

interface FullScreenPlayerProps {
  lyrics: LyricLine[];
  currentTime: number;
}

const FullScreenPlayer = ({ lyrics, currentTime }: FullScreenPlayerProps) => {
  const { nowPlaying } = usePlaylist();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center justify-center space-x-4 p-2 w-auto rounded hover:bg-accent hover:text-accent-foreground"
        >
          Full Screen
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-w-none !p-0 !gap-0">
        <DialogHeader className="ml-8 mt-8 h-fit space-y-1">
          <DialogTitle>{nowPlaying?.song_title}</DialogTitle>
          <DialogDescription>{nowPlaying?.song_artists}</DialogDescription>
        </DialogHeader>
        <div className="flex-col items-center justify-center w-full h-full">
          <RollingLyrics
            lyrics={lyrics}
            currentTime={currentTime}
            height={300}
            largeSize={true}
          />
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FullScreenPlayer;
