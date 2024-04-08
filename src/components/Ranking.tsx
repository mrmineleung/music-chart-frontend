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
        <Virtuoso
          className="!h-[600px]"
          data={result}
          itemContent={(key, item) => <RankingItem key={key} item={item} />}
        />
      </>
    );
  }

  if (chart == "billboard") {
    return (
      <>
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
