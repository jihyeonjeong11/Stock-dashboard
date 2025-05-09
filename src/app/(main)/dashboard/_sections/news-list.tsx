import { FinnhubNewsArray } from "@/api/finnhub/types";
import { StockCard } from "@/components/ui/stock-card";
import { use } from "react";

export default function NewsList({
  news,
}: {
  news: Promise<FinnhubNewsArray | []>;
}) {
  const n = use(news);
  if (!n || !n.length) return <></>;

  return (
    <StockCard>
      <ul className="w-full space-y-2">
        {n.slice(0, 10).map((n, i) => {
          return <li key={"news" + i}>- {n.headline}</li>;
        })}
      </ul>
    </StockCard>
  );
}
