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

const keyToData = {
  c: "Current price",
  d: "Change",
  dp: "percent change",
  h: "Highest of the day",
  l: "Lowest of the day",
  o: "Open of the day",
  pc: "Previous close price",
};

export default function PriceCard() {
  const searchParams = useSearchParams();
  const symbol = searchParams.get("symbol");

  const [message, setMessage] = useState({});
  const [timeStamp, setTimeStamp] = useState("");
  useEffect(() => {
    setMessage(JSON.parse(sample));

    // console.log(socket);
    // if (socket.connected) {
    //   console.log("hello");
    // }
    // try 1: use vanilla Websocket
    //http://127.0.0.1:8787/websocket
    //env.NEXT_PUBLIC_SOCKET_URL
    // // todo: advanced logic needed
    // const socket = new WebSocket(env.NEXT_PUBLIC_SOCKET_URL);
    // socket.addEventListener("open", (e) => {
    //   setInterval(() => {
    //     socket.send("MSFT");
    //   }, 5000);
    // });
    // socket.addEventListener("message", (event) => {
    //   setMessage(event.data);
    //   setTimeStamp(`${new Date()}`);
    // });
  }, []);

  return (
    <div>
      {Object.keys(message).map((e) => {
        return (
          <article>
            <div className="p-1 border flex flex-col">
              <div>{keyToData[e]}</div>
              <h6 className="mb-6">{message[e]}</h6>
            </div>
          </article>
        );
      })}
    </div>
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
