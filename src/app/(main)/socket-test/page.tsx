"use client";

import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { pageTitleStyles } from "@/styles/common";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SocketTestPage() {
  const [message, setMessage] = useState("");
  const [timeStamp, setTimeStamp] = useState("");
  useEffect(() => {
    // console.log(socket);
    // if (socket.connected) {
    //   console.log("hello");
    // }
    // try 1: use vanilla Websocket
    const socket = new WebSocket(env.NEXT_PUBLIC_SOCKET_URL);
    socket.addEventListener("open", (e) => {
      setInterval(() => {
        socket.send("stock");
      }, 5000);
    });
    socket.addEventListener("message", (event) => {
      console.log("Message received from server");
      console.log(event.data);
      setMessage(event.data);
      setTimeStamp(`${new Date()}`);
    });
  }, []);

  return (
    <div className="py-24 mx-auto max-w-[400px] space-y-6">
      {/* <h1 className={pageTitleStyles}>Successfully Signed Out</h1> */}
      <p className="text-xl">This is socket test page.</p>
      <p>{message}</p>
      <p>{timeStamp}</p>

      {/* <Button asChild>
        <Link href="/sign-in">Sign In</Link>
      </Button> */}
    </div>
  );
}
