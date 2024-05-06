import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@radix-ui/react-separator";
import { Suspense, useEffect, useState } from "react";
import { Playlist } from "./UserPlaylist";
import { PlaylistArtwork } from "@/components/PlaylistArtwork";
import { Skeleton } from "@/components/ui/skeleton";

const API_URL = process.env.BACKEND_API;
const GET_MY_PLAYLIST_API = `${API_URL}playlists`;

const Explore = () => {
  const [newCreatePlaylist, setNewCreatePlaylist] = useState<Playlist[]>([]);
  const [latestUpdatedPlaylist, setLatestUpdatedPlaylist] = useState<Playlist[]>([]);
  const [melonPlaylist, setMelonPlaylist] = useState<Playlist[]>([]);
  const [billboardPlaylist, setBillboardPlaylist] = useState<Playlist[]>([]);

  useEffect(() => {
    const fetchNewCreatedPlaylist = async () => {
      try {
        const response = await fetch(
          `${GET_MY_PLAYLIST_API}/category/new-created`,
          {
            keepalive: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.status == 200) {
          setNewCreatePlaylist(data);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchNewCreatedPlaylist();

    const fetchLatestUpdatedPlaylist = async () => {
      try {
        const response = await fetch(
          `${GET_MY_PLAYLIST_API}/category/new-updated`,
          {
            keepalive: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.status == 200) {
          setLatestUpdatedPlaylist(data);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchLatestUpdatedPlaylist();

    const fetchMelonPlaylist = async () => {
      try {
        const response = await fetch(
          `${GET_MY_PLAYLIST_API}/category/melon`,
          {
            keepalive: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.status == 200) {
          setMelonPlaylist(data);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchMelonPlaylist();

    const fetchBillboardPlaylist = async () => {
      try {
        const response = await fetch(
          `${GET_MY_PLAYLIST_API}/category/billboard`,
          {
            keepalive: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.status == 200) {
          setBillboardPlaylist(data);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchBillboardPlaylist();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Listen Now</h2>
          <p className="text-sm text-muted-foreground">
            Top picks for you. Updated daily.
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
          <Suspense fallback={<Skeleton className="h-[300px] w-[240px] rounded-md" />}>
            {newCreatePlaylist?.map((playlist) => (
              <PlaylistArtwork
                key={playlist.name}
                playlist={playlist}
                className="w-[240px]"
                aspectRatio="portrait"
                width={240}
                height={300}
              />
            ))}
            </Suspense>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="mt-6 space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Trending</h2>
        <p className="text-sm text-muted-foreground">
          Latest playlists. Latest updates.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {latestUpdatedPlaylist.map((playlist) => (
              <PlaylistArtwork
                key={playlist.name}
                playlist={playlist}
                className="w-[200px]"
                aspectRatio="portrait"
                width={200}
                height={300}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="mt-6 space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Melon</h2>
        <p className="text-sm text-muted-foreground">
          Melon playlists.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {melonPlaylist.map((playlist) => (
              <PlaylistArtwork
                key={playlist.name}
                playlist={playlist}
                className="w-[200px]"
                aspectRatio="square"
                width={200}
                height={200}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="mt-6 space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Billboard</h2>
        <p className="text-sm text-muted-foreground">
          Billboard playlists.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {billboardPlaylist.map((playlist) => (
              <PlaylistArtwork
                key={playlist.name}
                playlist={playlist}
                className="w-[200px]"
                aspectRatio="square"
                width={200}
                height={200}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};

export default Explore;
