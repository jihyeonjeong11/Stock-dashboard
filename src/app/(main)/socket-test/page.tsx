"use client";

import { env } from "@/env";
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
    //http://127.0.0.1:8787/
    //env.NEXT_PUBLIC_SOCKET_URL
    const socket = new WebSocket(env.NEXT_PUBLIC_SOCKET_URL);
    socket.addEventListener("open", (e) => {
      setInterval(() => {
        socket.send("MSFT");
      }, 5000);
    });
    socket.addEventListener("message", (event) => {
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
