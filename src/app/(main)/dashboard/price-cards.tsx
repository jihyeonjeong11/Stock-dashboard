"use client";

// todo: use Card comp
// import { getGroupImageUrl } from "@/app/(main)/dashboard/groups/[groupId]/settings/util";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Group } from "@/db/schema";
// import { cn } from "@/lib/utils";
// import { cardStyles } from "@/styles/common";
// import { UsersIcon } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
import { env } from "@/env";

import { useEffect, useState } from "react";
import { PriceCardSkeleton } from "./_sections/skeletons";
import { StockCard } from "@/components/ui/stock-card";

const sample =
  '{"c":435.28,"d":9.88,"dp":2.3225,"h":439.44,"l":429.985,"o":431.74,"pc":425.4,"t":1746388800}';
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

// todo: add status handlers

export default function PriceCard({ symbol }: { symbol: string }) {
  const intervalRef = { current: undefined as undefined | NodeJS.Timeout };

  const [message, setMessage] = useState<Record<Values, AnyJson>>(
    {} as Record<Values, AnyJson>
  );
  const [timeStamp, setTimeStamp] = useState("");
  useEffect(() => {
    // const json: Record<Keys, AnyJson> = JSON.parse(sample);
    // if (json) {
    //   const processedData: Record<Values, AnyJson> = {} as Record<
    //     Values,
    //     AnyJson
    //   >;

    //   let key: keyof typeof json;
    //   for (key in json) {
    //     if (key === "t") continue;
    //     processedData[keyToData[key]] = json[key];
    //   }
    //   setMessage(processedData);
    // }

    const socket = new WebSocket(env.NEXT_PUBLIC_SOCKET_URL);
    socket.addEventListener("open", (e) => {
      socket.send(symbol);
      intervalRef.current = setInterval(() => {
        socket.send(symbol);
      }, 10000);
    });
    socket.addEventListener("message", (event) => {
      const json: Record<Keys, AnyJson> = JSON.parse(event.data);
      if (json) {
        const processedData: Record<Values, AnyJson> = {} as Record<
          Values,
          AnyJson
        >;

        let key: keyof typeof json;
        for (key in json) {
          if (key === "t") continue;
          processedData[keyToData[key]] = json[key];
        }
        setMessage(processedData);

        setTimeStamp(`${new Date()}`);
      }
    });

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      socket.close();
    };
  }, [symbol]);

  if (!message["Change"]) {
    return <PriceCardSkeleton />;
  }

  return (
    <>
      {Object.entries(message).map(([key, value]) => {
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
