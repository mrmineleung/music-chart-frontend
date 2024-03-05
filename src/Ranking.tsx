import React, { useEffect, useState } from "react";
import RankingItem from "./RankingItem";

interface RankingProps {
  chart: string;
  type: string;
}

interface RankingResponse {
  chart: string,
  type: string,
  hour?: string,
  year?: string,
  date?: string,
  ranking: [RankingItemResponse]
}

interface RankingItemResponse {
  album_image: string,
  album_name: string,
  rank: string,
  rank_changes_flow?: string,
  rank_changes_position?: string,
  song_artists: string,
  song_title: string,
  youtube_video_id: string
}

const Ranking = ({ ...props }: RankingProps) => {
  
  const [result, setResult] = useState<RankingResponse>();

  useEffect(() => {
    const API_URL = process.env.BACKEND_API;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_URL}charts/${props.chart}/types/${props.type}`,
          { keepalive: true }
        );
        const data = await response.json();
        setResult(data)
      } catch (e) {
        console.error(e);
      }
    };

    fetchData()
  }, [props.chart, props.type]);

  return <>

  <div className="max-w-4xl m-auto">

    <p className="text-center">{result?.chart} - {result?.type}</p>
    { result?.year ? (<p className="text-center">{result?.year} - {result?.hour}</p>) : (<></>)}
    { result?.date ? (<p className="text-center">{result?.date}</p>) : (<></>)}
  
  {result?.ranking.map(item => {
    return (<RankingItem item={item}/>)
  })}
  </div>
  </>
};

export default Ranking;
