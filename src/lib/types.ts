export interface RankingItemData {
  album_image: string;
  album_name: string;
  rank: string;
  rank_changes_flow?: string;
  rank_changes_position?: string;
  song_artists: string;
  song_title: string;
  youtube_video_id: string;
  song_id: string;
}

export interface Playlist {
  id: string,
  name: string,
  description: string,
  is_public: boolean,
  items: Song[]
}

export interface Song {
  song_id: string,
  album_image: string,
  song_title: string,
  song_artists: string,
  album_name: string,
  youtube_video_id: string,
  youtube_video_title: string,
  youtube_video_author: string
}

export interface RankingResponse {
  chart: string;
  type: string;
  hour?: string;
  year?: string;
  date?: string;
  ranking: RankingItemResponse[];
}

export interface RankingItemResponse {
  album_image: string;
  album_name: string;
  rank: string;
  rank_changes_flow?: string;
  rank_changes_position?: string;
  song_artists: string;
  song_title: string;
  youtube_video_id: string;
  youtube_video_title: string;
  youtube_video_author: string;
  song_id: string;
}