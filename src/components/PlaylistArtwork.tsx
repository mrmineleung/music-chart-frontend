
import { cn } from "@/lib/utils"
import { Playlist } from "@/pages/UserPlaylist"
import { Link } from "react-router-dom"

interface PlaylistArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  playlist: Playlist
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

const API_URL = process.env.BACKEND_API;

export function PlaylistArtwork({
  playlist,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: PlaylistArtworkProps) {
  return (
    
    <Link to={`/playlists/${playlist.id}`}>
    <div className={cn("space-y-3", className)} {...props}>
          <div className="overflow-hidden rounded-md">
            <img
              src={`${API_URL}playlists/thumbnail/${playlist.id}`}
              alt={playlist.name}
              width={width}
              height={height}
              className={cn(
                "object-cover transition-all hover:scale-105",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{playlist.name}</h3>
        <p className="text-xs text-muted-foreground">{playlist.description}</p>
      </div>
    </div>
    </Link>
  )
}