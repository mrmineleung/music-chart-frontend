import { Virtuoso } from "react-virtuoso";

import RankingItem, { RankingItemData } from "./RankingItem";
import BillboardRankingItem from "./BillboardRankingItem";

interface RankingProps {
  chart: string;
  result: RankingItemData[];
}

const Ranking = ({ chart, result }: RankingProps) => {
  if (chart == "melon") {
    return (
      <>
        {/* {result.map((item) => {
          return <RankingItem key={item.rank} item={item} />;
        })} */}
        <Virtuoso
          className={`!h-[500px]`}
          data={result}
          itemContent={(key, item) => <RankingItem key={key} item={item} />}
        />
      </>
    );
  }

  if (chart == "billboard") {
    return (
      <>
        {/* {result.map((item) => {
          return <BillboardRankingItem key={item.rank} item={item} />;
        })} */}
        <Virtuoso
          className="!h-[600px]"
          data={result}
          itemContent={(key, item) => (
            <BillboardRankingItem key={key} item={item} />
          )}
        />
      </>
    );
  }
};

export default Ranking;
