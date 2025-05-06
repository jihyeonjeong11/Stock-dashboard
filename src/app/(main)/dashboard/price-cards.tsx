"use client";

import { getGroupImageUrl } from "@/app/(main)/dashboard/groups/[groupId]/settings/util";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Group } from "@/db/schema";
import { env } from "@/env";
import { cn } from "@/lib/utils";
import { cardStyles } from "@/styles/common";
import { UsersIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
  dp: "percent change",
  h: "Highest of the day",
  l: "Lowest of the day",
  o: "Open of the day",
  pc: "Previous close price",
  t: "TimeStamp",
} as const;
type Keys = keyof typeof keyToData;

type Values = (typeof keyToData)[Keys];

export default function PriceCard() {
  const searchParams = useSearchParams();
  const symbol = searchParams.get("symbol")!;

  const [message, setMessage] = useState<Record<Values, AnyJson>>(
    {} as Record<Values, AnyJson>
  );
  const [timeStamp, setTimeStamp] = useState("");
  useEffect(() => {
    const json: Record<Keys, AnyJson> = JSON.parse(sample);
    if (json) {
      const processedData: Record<Values, AnyJson> = {} as Record<
        Values,
        AnyJson
      >;

      let key: keyof typeof json;
      for (key in json) {
        processedData[keyToData[key]] = json[key];
      }
      setMessage(processedData);
    }
    // todo: advanced websocket logic needed Abort, reconnect and stuff..

    // const socket = new WebSocket(env.NEXT_PUBLIC_SOCKET_URL);
    // socket.addEventListener("open", (e) => {
    //   socket.send(symbol);
    //   setInterval(() => {
    //     socket.send(symbol);
    //   }, 10000);
    // });
    // socket.addEventListener("message", (event) => {
    //   const json: Record<string, AnyJson> = JSON.parse(event.data);
    //   if (json) {
    //     const processedData: Record<string, AnyJson> = {};
    //     const keys = Object.keys(json).filter((e) => e !== "t");
    //     keys.forEach((e) => {
    //       processedData[e] = json[e];
    //     });
    //     setMessage(processedData);
    //   }

    //   setTimeStamp(`${new Date()}`);
    // });
  }, []);

  return (
    <>
      {Object.entries(message).map(([key, value]) => {
        return (
          <div key={key} className="bg-[#EDEEF2] rounded-lg">
            <div className="flex flex-col break-words ">
              <h6 className="">{key}</h6>
              {typeof value === "number" && <div className="mb-6">{value}</div>}
            </div>
          </div>
        );
      })}
    </>
    // <Card className={cn(cardStyles)}>
    //   <CardHeader>
    //     <Image
    //       src={getGroupImageUrl(group)}
    //       width={200}
    //       height={200}
    //       alt="image of the group"
    //       className="rounded-lg w-full h-[100px] object-cover mb-2"
    //     />
    //     <CardTitle className="mb-2">{group.name}</CardTitle>
    //     <CardDescription className="line-clamp-4 h-20">
    //       {group.description}
    //     </CardDescription>
    //   </CardHeader>
    //   <CardContent>
    //     <div className="flex gap-2 justify-center items-center">
    //       <UsersIcon /> {memberCount} members
    //     </div>
    //   </CardContent>
    //   <CardFooter>
    //     <Button className="w-full mt-auto" variant="secondary" asChild>
    //       <Link href={`/dashboard/groups/${group.id}/info`}>{buttonText}</Link>
    //     </Button>
    //   </CardFooter>
    // </Card>
  );
}
