// https://github.com/robtaussig/react-use-websocket/blob/master/src/lib/use-websocket.ts

import { useRef, useEffect, useState, useCallback, RefObject } from "react";

export enum ReadyState {
  UNINSTANTIATED = -1,
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}

export type ReadyStateState = {
  [url: string]: ReadyState;
};

export type WebSocketMessage =
  | string
  | ArrayBuffer
  | SharedArrayBuffer
  | Blob
  | ArrayBufferView;

export type SendMessage = (message: WebSocketMessage, keep?: boolean) => void;

export const DEFAULT_RECONNECT_LIMIT = 2;
export const DEFAULT_RECONNECT_INTERVAL_MS = 5000;

export const createSocket = (
  webSocketRef: RefObject<WebSocket | null>,
  url: string,
  setReadyState: (readyState: ReadyState) => void,
  setLastMessage: (e: any) => void,
  reconnectCount: RefObject<number>,
  startRef: RefObject<() => void>
) => {
  const socket = new WebSocket(url);
  webSocketRef.current = socket;
  const reconnectTimeout = useRef<NodeJS.Timeout>(null);

  setReadyState(ReadyState.CONNECTING);
  if (!webSocketRef.current) {
    throw new Error("WebSocket failed to be created");
  }

  const handleOpen = () => setReadyState(ReadyState.OPEN);
  const handleMessage = (e: MessageEvent<any>) => {
    setLastMessage(JSON.parse(e.data));
  };
  const handleClose = () => {
    setReadyState(ReadyState.CLOSED);
    if (reconnectCount.current < DEFAULT_RECONNECT_LIMIT) {
      reconnectTimeout.current = setTimeout(() => {
        reconnectCount.current = reconnectCount.current++;
        startRef.current();
      }, DEFAULT_RECONNECT_INTERVAL_MS);
    } else {
      console.warn(
        `Max reconnect attempts of ${reconnectCount.current} exceeded`
      );
    }
  };
  const handleError = () => setReadyState(ReadyState.CLOSED);

  socket.addEventListener("open", handleOpen);
  socket.addEventListener("close", handleClose);
  socket.addEventListener("error", handleError);
  socket.addEventListener("message", handleMessage);

  //cleanup
  return () => {
    socket.removeEventListener("open", handleOpen);
    socket.removeEventListener("close", handleClose);
    socket.removeEventListener("error", handleError);
    socket.removeEventListener("message", handleMessage);
    socket.close();
    webSocketRef.current = null;
  };
};

export default function useWebsocket(url: string, options: any) {
  const [readyState, setReadyState] = useState<ReadyState>(
    ReadyState.UNINSTANTIATED
  );
  const [lastMessage, setLastMessage] = useState<
    WebSocketEventMap["message"] | null
  >(null);
  const webSocketRef = useRef<WebSocket | null>(null);
  const startRef = useRef<() => void>(() => void 0);
  const reconnectCount = useRef<number>(0);

  // Todo: can be more generic.
  //const optionsCache = useRef<any>(options);

  const sendMessage: SendMessage = useCallback((message) => {
    if (webSocketRef.current?.readyState === ReadyState.OPEN) {
      webSocketRef.current.send(message);
    }
  }, []);

  useEffect(() => {
    if (url !== null) {
      let removeListeners: () => void;
      let expectClose = false;

      const start = async () => {
        if (!url) {
          console.error("URL is not valid");
          setReadyState(ReadyState.CLOSED);
        }
        removeListeners = createSocket(
          webSocketRef,
          url,
          setReadyState,
          setLastMessage,
          reconnectCount,
          startRef
        );

        startRef.current = () => {
          if (!expectClose) {
            removeListeners?.();
            start();
          }
        };

        return () => {
          expectClose = true;
          removeListeners?.();
          setLastMessage(null);
        };
      };
      start();
    }
  }, [url]);

  return {
    lastMessage,
    readyState,
    sendMessage,
  };
}
