import { RankingItemData } from "@/components/RankingItem";
import { createContext, useContext, useState } from "react";

interface PlaylistProviderProps {
  children: React.ReactNode;
}

interface PlaylistContextType {
  playlist: RankingItemData[];
  // setPlaylist: React.Dispatch<React.SetStateAction<RankingItem[]>>;
  updatePlaylist: (playlist: RankingItemData[]) => void;
  nowPlaying: RankingItemData | null;
  // setCurrentPlaying: React.Dispatch<React.SetStateAction<RankingItem | null>>;
  updateNowPlaying: (song: RankingItemData | null) => void;
  pendingPlaylist: RankingItemData[];
  // setPendingPlay: React.Dispatch<React.SetStateAction<RankingItem[]>>;
  updatePendingPlaylist: (playlist: RankingItemData[]) => void;
  isOpenPlaylist: boolean;
  setIsOpenPlaylist: React.Dispatch<React.SetStateAction<boolean>>;
  shuffle: <T,>(list:T[]) => T[]
}

const initial_playlist_item = {
  album_image: "",
  album_name: "",
  rank: "",
  rank_changes_flow: "",
  rank_changes_position: "",
  song_artists: "",
  song_title: "",
  youtube_video_id: "",
};

const playlistContextState = {
  playlist: [initial_playlist_item as RankingItemData],
  // setPlaylist: () => {},
  updatePlaylist: () => {},
  nowPlaying: null,
  // setCurrentPlaying: () => {},
  updateNowPlaying: () => {},
  pendingPlaylist: [],
  // setPendingPlay: () => {},
  updatePendingPlaylist: () => {},
  isOpenPlaylist: false,
  setIsOpenPlaylist: () => {},
  shuffle: <T,>(list: T[]) => list
};

const PlaylistProviderContext =
  createContext<PlaylistContextType>(playlistContextState);

const PlaylistProvider = ({ children }: PlaylistProviderProps) => {
  const [playlist, setPlaylist] = useState<RankingItemData[]>(
    JSON.parse(localStorage.getItem('playlist') as string) == null? [] : JSON.parse(localStorage.getItem('playlist') as string)
  );

  const [nowPlaying, setNowPlaying] = useState<RankingItemData | null>(
    JSON.parse(localStorage.getItem('nowPlaying') as string)
  );
  const [pendingPlaylist, setPendingPlaylist] = useState<RankingItemData[]>(
    JSON.parse(localStorage.getItem('pendingPlaylist') as string) == null? [] : JSON.parse(localStorage.getItem('pendingPlaylist') as string)
    );

  const [isOpenPlaylist, setIsOpenPlaylist] = useState<boolean>(false);

  const shuffle = <T,>(array: T[]):T[] => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array; 
  }; 

  const updateNowPlaying = (song: RankingItemData | null) => {
    localStorage.setItem('nowPlaying', JSON.stringify(song))
    setNowPlaying(song)
  }

  const updatePendingPlaylist = (playlist: RankingItemData[]) => {
    localStorage.setItem('pendingPlaylist', JSON.stringify(playlist))
    setPendingPlaylist(playlist)
  }

  const updatePlaylist = (playlist: RankingItemData[]) => {
    localStorage.setItem('playlist', JSON.stringify(playlist))
    setPlaylist(playlist)
  }

  return (
    <PlaylistProviderContext.Provider
      value={{
        playlist,
        updatePlaylist,
        nowPlaying,
        updateNowPlaying,
        pendingPlaylist,
        updatePendingPlaylist,
        isOpenPlaylist,
        setIsOpenPlaylist,
        shuffle
      }}
    >
      {children}
    </PlaylistProviderContext.Provider>
  );
};

export const usePlaylist = () => {
  const context = useContext(PlaylistProviderContext);

  if (context === undefined)
    throw new Error("usePlaylist must be used within a PlaylistProvider");

  return context;
};

export default PlaylistProvider;
