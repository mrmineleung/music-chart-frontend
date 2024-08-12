import { cn } from "@/lib/utils";
import { Playlist } from "@/pages/UserPlaylist";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Skeleton } from "./ui/skeleton";
import "react-lazy-load-image-component/src/effects/blur.css";

interface PlaylistArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  playlist: Playlist;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
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
          <LazyLoadImage
            alt={playlist.name}
            height={height}
            width={width}
            effect="blur"
            wrapperProps={{
              style: { transitionDelay: "1s" },
            }}
            placeholder={
              <Skeleton
                className={`h-[${height}px] w-[${width}px] rounded-md`}
              />
            }
            src={`${API_URL}playlists/thumbnail/${playlist.id}`}
            className={cn(
              "object-cover transition-all hover:scale-105",
              aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
            )}
          />
          {/* <img
              src={`${API_URL}playlists/thumbnail/${playlist.id}`}
              alt={playlist.name}
              width={width}
              height={height}
              className={cn(
                "object-cover transition-all hover:scale-105",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            /> */}
        </div>
        <div className="space-y-1 text-sm">
          <h3 className="font-medium leading-none">{playlist.name}</h3>
          <p className="text-xs text-muted-foreground">
            {playlist.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
