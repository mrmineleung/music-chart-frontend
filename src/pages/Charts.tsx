import { Suspense, lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CaretSortIcon } from "@radix-ui/react-icons";
// import ScrollToTopButton from "@/components/ScrollToTopButton";
// import Ranking from "@/components/Ranking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePlaylist } from "@/provider/PlaylistProvider";
import { Loader2, Play } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Ranking = lazy(() => import("@/components/Ranking"));

interface ChartsProps {
  charts?: string;
  types?: string;
}

interface RankingResponse {
  chart: string;
  type: string;
  hour?: string;
  year?: string;
  date?: string;
  ranking: RankingItemResponse[];
}

interface RankingItemResponse {
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

type ChartsParams = {
  charts: string;
  types: string;
};

const initialResponse = {
  chart: "",
  type: "",
  ranking: [],
};

const Charts = ({ ...props }: ChartsProps) => {
  const [response, setResponse] = useState<RankingResponse>(initialResponse);
  const [rankingList, setRankingList] = useState<RankingItemResponse[]>([]);
  const [filteredRankingList, setFilteredRankingList] = useState<
    RankingItemResponse[]
  >([]);
  const [isAscOrder, setIsAscOrder] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    // updatePlaylist,
    updateNowPlaying,
    updatePendingPlaylist,
    // isOpenPlaylist,
    // setIsOpenPlaylist,
  } = usePlaylist();

  // const handleSaveAllToPlaylist = (playlist: RankingItemResponse[]) => {
  //   updatePlaylist(playlist);
  //   setIsOpenPlaylist(!isOpenPlaylist);
  // };

  const params = useParams<ChartsParams>();

  let charts: string;
  let types: string;

  if (!props.charts && !props.types) {
    charts = params.charts as string;
    types = params.types as string;
  } else {
    charts = props.charts as string;
    types = props.types as string;
  }

  const handlePlayAll = (playlist: RankingItemResponse[]) => {
    const [head, ...tail] = playlist;
    updateNowPlaying(head);
    updatePendingPlaylist(tail);
  };

  const handleSort = (isAscOrder: boolean) => {
    if (isAscOrder) {
      filteredRankingList.sort((a, b) => parseInt(a.rank) - parseInt(b.rank));
    } else {
      filteredRankingList.sort((a, b) => parseInt(b.rank) - parseInt(a.rank));
    }
    setIsAscOrder(isAscOrder);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const value = e.target.value;

    if (value) {
      const filtered = rankingList.filter(
        (item) =>
          item.song_title.toLowerCase().includes(value.toLowerCase()) ||
          item.song_artists.toLowerCase().includes(value.toLowerCase()) ||
          item.youtube_video_title
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          item.youtube_video_author.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRankingList(filtered);
    } else {
      setFilteredRankingList(response.ranking);
    }
  };

  useEffect(() => {
    const API_URL = process.env.BACKEND_API;

    const fetchData = async () => {
      const GET_CHART_API = `${API_URL}charts/${charts}/types/${types}`;
      try {
        setIsLoading(true);
        const response = await fetch(GET_CHART_API, {
          keepalive: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setResponse(data);
        setRankingList(data.ranking);
        setFilteredRankingList(data.ranking);
      } catch (e) {
        console.error(e);
        throw e;
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [charts, types]);

  return (
    <>
      {isLoading ? (
        <div>
          <Skeleton className="h-[50px] w-[200px] my-1" />
          <Skeleton className="h-[30px] w-[100px] my-1" />
        </div>
      ) : (
        <div>
          <h1 className="scroll-m-20 border-b text-3xl font-extrabold tracking-tight lg:text-5xl">
            {response?.chart} - {response?.type}
          </h1>

          {response?.year ? (
            <h2 className="scroll-m-20  pb-2 text-lg font-semibold tracking-tight first:mt-0">
              {response?.year} - {response?.hour}
            </h2>
          ) : (
            <></>
          )}
          {response?.date ? (
            <h2 className="scroll-m-20  pb-2 text-lg font-semibold tracking-tight first:mt-0">
              {response?.date}
            </h2>
          ) : (
            <></>
          )}
        </div>
      )}
      {/* <Input
        className="my-4"
        type="text"
        placeholder="Search"
        onChange={(e) => handleSearch(e)}
      /> */}
      {isLoading ? (
        <></>
      ) : (
        <div className="flex flex-row pb-1">
          <div className="flex flex-col md:flex-row md:space-x-2">
            <Button
              onClick={() => handlePlayAll(rankingList)}
              variant="outline"
            >
              <Play className="mr-2 h-4 w-4" /> Play all
            </Button>
            {/* <Button
            onClick={() => handleSaveAllToPlaylist(rankingList)}
            variant="outline"
          >
            <ListPlus className="mr-2 h-4 w-4" /> Save all to playlist
          </Button> */}
            <Input
              type="text"
              placeholder="Search"
              onChange={(e) => handleSearch(e)}
            />
          </div>
          <div className="flex flex-1 justify-end items-end">
            <Button onClick={() => handleSort(!isAscOrder)} variant="outline">
              <CaretSortIcon className="mr-2 h-4 w-4" /> Sort
            </Button>
          </div>
        </div>
      )}
      <Suspense fallback={<div className="flex justify-center items-center">
      <Loader2 className="h-16 w-16 animate-spin" />
        </div>}>
        <Ranking chart={charts} result={filteredRankingList} />
      </Suspense>
    </>
  );
};

export default Charts;
