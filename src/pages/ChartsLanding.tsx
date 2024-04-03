import ScrollToTopButton from "@/components/ScrollToTopButton";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ChartsResponse {
  charts: string[];
}

const ChartsLanding = () => {
  const [response, setResponse] = useState<ChartsResponse>()

  // const navigate = useNavigate()
  const bgColorMapping = new Map<string, string>([['melon','bg-gradient-to-r from-sky-500 to-emerald-500'], ['billboard','bg-gradient-to-r from-stone-500 to-neutral-500']])

  useEffect(() => {
    const API_URL = process.env.BACKEND_API;

    const fetchAvailableChartData = async () => {
      const GET_CHART_API = `${API_URL}charts`;
      try {
        const response = await fetch(GET_CHART_API, {
          keepalive: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setResponse(data)
        
      } catch (e) {
        console.error(e);
      }
    };

    fetchAvailableChartData()

  },[])

  
  return (
    <>
      <h1 className="scroll-m-20 border-b text-4xl font-extrabold tracking-tight lg:text-5xl text-center mb-8">
        Charts
      </h1>
      <div key="charts" className="grid grid-cols-2 gap-2 content-stretch m-2">
        {response?.charts.map(chart => 
          <Link key={chart} to={`/charts/${chart.toLowerCase()}`}>
          <div key={chart} className={`border rounded-lg ${bgColorMapping.get(chart.toLowerCase())}`}>
            <div key={chart} className="flex justify-center place-items-center rounded-lg h-32 transition-all hover:bg-accent/50 hover:text-accent-foreground duration-500">
              <span key={chart} className="text-3xl font-extrabold">{chart}</span>
            </div>
          </div></Link>
        )}
      </div>

      <div className="sticky mt-auto ml-auto max-w-12 bottom-28 right-5 flex flex-row justify-end space-x-2">
        <ScrollToTopButton></ScrollToTopButton>
      </div>
    </>
  );
};

export default ChartsLanding;
