import ScrollToTopButton from "@/components/ScrollToTopButton";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

type ChartsLandingParams = {
  charts: string;
};

interface ChartTypeResponse {
  chart: string;
  types: string[]
}



const ChartsType = () => {
  const [response, setResponse] = useState<ChartTypeResponse>()

  const params = useParams<ChartsLandingParams>();
  const navigate = useNavigate()

  const bgColorMapping = new Map<string, string>([['melon','bg-gradient-to-r from-sky-500 to-emerald-500'], ['billboard','bg-gradient-to-r from-stone-500 to-neutral-500']])


  useEffect(() => {
    const API_URL = process.env.BACKEND_API;
    const GET_CHART_TYPE_API = `${API_URL}charts/${params.charts}`;

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
        if (!data.charts.map((name: string) => name.toLowerCase()).includes(params.charts)) {
          // console.log(data.charts)
          // console.log(params.charts)
          navigate('/not-found')
        }
      } catch (e) {
        console.error(e);
      }
    };

    const fetchData = async () => {
      try {
        const response = await fetch(GET_CHART_TYPE_API, {
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
    fetchData();
  },[navigate, params.charts])

  
  return (
    <>
      <h1 className="scroll-m-20 border-b text-4xl font-extrabold tracking-tight lg:text-5xl text-center mb-8">
        {response?.chart}
      </h1>
      <div key={response?.chart} className="grid grid-cols-2 gap-2 content-stretch m-2">
        {response?.types.map(type => 
          <Link key={type} to={`/charts/${response.chart.toLowerCase()}/types/${type.toLowerCase().replace(' ', '_')}`}>
          <div key={type} className={`border rounded-lg ${bgColorMapping.get(response.chart.toLowerCase())}`}>
            <div key={type} className="flex justify-center place-items-center rounded-lg h-32 transition-all hover:bg-accent/50 hover:text-accent-foreground duration-500">
              <span key={type} className="text-2xl md:text-3xl font-extrabold">{type}</span>
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

export default ChartsType;
