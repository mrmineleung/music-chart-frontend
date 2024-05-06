import { RankingItemData } from "@/components/RankingItem";
import { createContext, useContext, useState } from "react";
import CryptoJS from 'crypto-js';
import { Song } from "@/pages/UserPlaylist";

interface PlaylistProviderProps {
  children: React.ReactNode;
}

interface PlaylistContextType {
  playlist: RankingItemData[] | Song[];
  // setPlaylist: React.Dispatch<React.SetStateAction<RankingItem[]>>;
  updatePlaylist: (playlist: RankingItemData[] | Song[]) => void;
  nowPlaying: RankingItemData | Song | null;
  // setCurrentPlaying: React.Dispatch<React.SetStateAction<RankingItem | null>>;
  updateNowPlaying: (song: RankingItemData | Song | null) => void;
  pendingPlaylist: (RankingItemData| Song)[];
  // setPendingPlay: React.Dispatch<React.SetStateAction<RankingItem[]>>;
  updatePendingPlaylist: (playlist: (RankingItemData | Song)[]) => void;
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
  const SECRET_KEY = 'mysecretkey'; 

  const encryptData =(name: string,data: unknown)=> {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    localStorage.setItem(name, encrypted);
    return encrypted
  }

  const decryptData = (name: string) => {
    const encrypted = localStorage.getItem(name) || "";
    const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    if (decrypted) {
      return JSON.parse(decrypted);
    } else {
      return null
    }
  }

  const [playlist, setPlaylist] = useState<RankingItemData[] | Song[]>(
    JSON.parse(localStorage.getItem('playlist') as string) == null? [] : JSON.parse(localStorage.getItem('playlist') as string)
  );

  // const [nowPlaying, setNowPlaying] = useState<RankingItemData | null>(
  //   JSON.parse(localStorage.getItem('nowPlaying') as string)
  // );

  const [nowPlaying, setNowPlaying] = useState<RankingItemData | Song | null>(
    decryptData('nowPlaying') || null
  );

  // const [pendingPlaylist, setPendingPlaylist] = useState<RankingItemData[]>(
  //   JSON.parse(localStorage.getItem('pendingPlaylist') as string) == null? [] : JSON.parse(localStorage.getItem('pendingPlaylist') as string)
  //   );

    const [pendingPlaylist, setPendingPlaylist] = useState<(RankingItemData | Song)[]>(
      decryptData('pendingPlaylist') == null? [] : decryptData('pendingPlaylist')
      );

  const [isOpenPlaylist, setIsOpenPlaylist] = useState<boolean>(false);

  const shuffle = <T,>(array: T[]):T[] => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array; 
  }; 

  const updateNowPlaying = (song: RankingItemData | Song | null) => {
    // localStorage.setItem('nowPlaying', JSON.stringify(song))
    // setNowPlaying(song)
    encryptData("nowPlaying", song)
    setNowPlaying(song)
  }

  const updatePendingPlaylist = (playlist: (RankingItemData| Song)[]) => {
    // localStorage.setItem('pendingPlaylist', JSON.stringify(playlist))
    // setPendingPlaylist(playlist)
    encryptData("pendingPlaylist", playlist)
    setPendingPlaylist(playlist)
  }

  const updatePlaylist = (playlist: RankingItemData[] | Song[]) => {
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
