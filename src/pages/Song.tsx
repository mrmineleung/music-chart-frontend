import { Suspense, lazy, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { CaretSortIcon } from "@radix-ui/react-icons";
// import ScrollToTopButton from "@/components/ScrollToTopButton";
// import Ranking from "@/components/Ranking";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { usePlaylist } from "@/provider/PlaylistProvider";
import { ChevronLeft, DiscAlbum, Loader2, Mic2, Play } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { YouTubePlayerType } from "@/components/YouTubePlayer";

const YouTubePlayer = lazy(() => import("@/components/YouTubePlayer"));

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartsProps {
  song_id?: string;
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
  song_id: string;
};

const initialResponse = {
  album_image: "",
  album_name: "",
  rank: "",
  rank_changes_flow: "",
  rank_changes_position: "",
  song_artists: "",
  song_title: "",
  youtube_video_id: "",
  youtube_video_title: "",
  youtube_video_author: "",
  song_id: "",
};

export const options = {
  // responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Melon DAY Chart",
    },
  },
  interaction: {
    intersect: false,
  },
  scales: {
    y: {
      min: 1,
      reverse: true,
      ticks: {
        // forces step size to be 50 units
        stepSize: 1,
      },
    },
  },
};

interface ChartDataSet {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  hoverBorderColor?: string;
  hoverBackgroundColor?: string;
  cubicInterpolationMode?: "default" | "monotone";
  tension?: number;
}

interface ChartData {
  labels: string[];
  datasets: ChartDataSet[];
}

// const initialChartData = {
//   labels: [],
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: [],
//       borderColor: "rgb(255, 99, 132)",
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//     },
//   ],
// };

const Song = ({ ...props }: ChartsProps) => {
  const navigate = useNavigate();
  const [response, setResponse] =
    useState<RankingItemResponse>(initialResponse);

  const [lineChartData, setLineChartData] = useState<ChartData | null>(null);

  const {
    // updatePlaylist,
    updateNowPlaying,
    // updatePendingPlaylist,
    // isOpenPlaylist,
    // setIsOpenPlaylist,
  } = usePlaylist();

  // const handleSaveAllToPlaylist = (playlist: RankingItemResponse[]) => {
  //   updatePlaylist(playlist);
  //   setIsOpenPlaylist(!isOpenPlaylist);
  // };

  const params = useParams<ChartsParams>();

  let song_id: string;

  if (!props.song_id) {
    song_id = params.song_id as string;
  } else {
    song_id = props.song_id as string;
  }

  const handlePlay = (song: RankingItemResponse) => {
    updateNowPlaying(song);
  };

  useEffect(() => {
    const API_URL = process.env.BACKEND_API;

    const fetchData = async () => {
      const GET_SONG_API = `${API_URL}songs/${song_id}`;
      try {
        const response = await fetch(GET_SONG_API, {
          keepalive: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setResponse(data);
      } catch (e) {
        console.error(e);
        throw e;
      }
    };

    fetchData();
  }, [song_id]);

  useEffect(() => {
    const API_URL = process.env.BACKEND_API;

    const fetchData = async () => {
      const GET_SONG_STATS_API = `${API_URL}songs/${song_id}/stats?chart_name=Melon&chart_type=DAY`;
      try {
        const response = await fetch(GET_SONG_STATS_API, {
          keepalive: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        const dataList = await response.json();
        const labels: string[] = [];
        const datas: number[] = [];

        dataList.map((data: RankingResponse) => {
          labels.push(data.date as string);
          datas.push(parseInt(data.ranking[0].rank) as number);
        });

        const lineChartData = {
          labels: labels,
          datasets: [
            {
              label: dataList[0].ranking[0].song_title,
              data: datas,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              // cubicInterpolationMode: "monotone",
              tension: 0.4,
            },
          ],
        };

        setLineChartData(lineChartData);
      } catch (e) {
        console.error(e);
        throw e;
      }
    };

    fetchData();
  }, [song_id]);

  return (
    <>
      <Button
        variant="link"
        className="m-0 p-0 place-self-start mb-4"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="w-6 h-6" />
        Back
      </Button>
      <div className="flex flex-row space-x-8">
        <div className="">
          <img
            className="rounded-lg shadow-lg"
            src={response.album_image}
            width={180}
            height={180}
          />
        </div>
        <div>
          <h1 className="scroll-m-20 border-b text-3xl font-extrabold tracking-tight lg:text-5xl">
            {response.song_title}
          </h1>

          <div className="my-4 space-y-2">
            <div className="flex flex-row items-center">
              <Mic2 className="mr-2" />
              {response.song_artists}
            </div>
            <div className="flex flex-row items-center">
              <DiscAlbum className="mr-2" /> {response.album_name}
            </div>
            <div className="flex flex-row items-center">
              <Button onClick={() => handlePlay(response)} variant="outline">
                <Play className="mr-2 h-4 w-4" /> Play Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Suspense
        fallback={
          <>
            <Loader2 className="ml-2 h-8 w-8 animate-spin" /> Loading...
          </>
        }
      >
        <YouTubePlayer
          id={response.youtube_video_id}
          type={YouTubePlayerType.VIDEO}
          // width={400}
          // height={300}
        />
      </Suspense>

      <Suspense
        fallback={
          <>
            <Loader2 className="ml-2 h-8 w-8 animate-spin" /> Loading...
          </>
        }
      >
        {lineChartData ? (
          <Line options={options} data={lineChartData} />
        ) : (
          <></>
        )}
      </Suspense>
    </>
  );
};

export default Song;
