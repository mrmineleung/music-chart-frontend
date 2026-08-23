import { Virtuoso } from "react-virtuoso";

import RankingItem from "./RankingItem";
import VirtuosoScrollToTopButton from "./VirtuosoScrollToTopButton";
import { useRef } from "react";
import { RankingItemData } from "@/lib/types";

interface RankingProps {
  result: RankingItemData[];
}

const Ranking = ({ result }: RankingProps) => {
  const virtuosoRef = useRef(null);

  return (
    <>
      <Virtuoso
        ref={virtuosoRef}
        useWindowScroll
        data={result}
        itemContent={(key, item) => <RankingItem key={key} item={item} />}
      />
      <div className="sticky mt-auto ml-auto max-w-12 bottom-32 right-5 flex flex-row justify-end space-x-2">
        <VirtuosoScrollToTopButton virtuosoRef={virtuosoRef} />
      </div>
    </>
  );
};

export default Ranking;
