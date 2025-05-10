"use client";

import { env } from "@/env";

import { useEffect } from "react";
import { PriceCardSkeleton } from "./_sections/skeletons";
import { StockCard } from "@/components/ui/stock-card";
import useWebsocket from "@/hooks/use-websocket";

// https://github.com/microsoft/TypeScript/issues/1897
type AnyJson = boolean | number | string | null | JsonArray | JsonMap;
interface JsonMap {
  [key: string]: AnyJson;
}
interface JsonArray extends Array<AnyJson> {}

const keyToData = {
  c: "Current price",
  d: "Change",
  dp: "Percent change",
  h: "Highest of the day",
  l: "Lowest of the day",
  o: "Open of the day",
  pc: "Previous close price",
  t: "TimeStamp",
} as const;
type Keys = keyof typeof keyToData;

type Values = (typeof keyToData)[Keys];

export default function PriceCard({ symbol }: { symbol: string }) {
  // todo: readyState handler
  const { lastMessage, sendMessage } = useWebsocket(
    env.NEXT_PUBLIC_SOCKET_URL,
    {}
  );

  useEffect(() => {
    if (!symbol) return;
    setInterval(() => {
      sendMessage(symbol);
    }, 5000);
  }, [symbol]);

  if (!lastMessage) {
    return <PriceCardSkeleton />;
  }

  return (
    <>
      {Object.entries(lastMessage).map(([key, value]) => {
        return (
          <StockCard key={key}>
            <div className="break-words py-4 px-2">
              <div className="text-sm text-muted-foreground mb-2 ">{key}</div>
              {typeof value === "number" && (
                <h6 className="text-lg font-semibold leading-none tracking-tight mt-1 mb-2">
                  {value}
                </h6>
              )}
            </div>
          </StockCard>
        );
      })}
    </>
  );
}
