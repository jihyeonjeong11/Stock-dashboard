// https://github.com/robtaussig/react-use-websocket/blob/master/src/lib/use-websocket.ts

import {
  useRef,
  useEffect,
  useState,
  MutableRefObject,
  useCallback,
} from "react";
// todo: UNPARSABLE_JSON_OBJECT seems useful

// constants
// todo: copy durableobjectstate
// todo: proxy maybe useful(to connect single socket accross more than one component more than price card)
// todo: get types

// todo: assert do i need it? maybe for typescript

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

export const createSocket = (
  webSocketRef: MutableRefObject<WebSocket | null>,
  url: string,
  setReadyState: (readyState: ReadyState) => void
) => {
  const socket = new WebSocket(url);
  webSocketRef.current = socket;
  setReadyState(ReadyState.CONNECTING);
  if (!webSocketRef.current) {
    throw new Error("WebSocket failed to be created");
  }

  const handleOpen = () => setReadyState(ReadyState.OPEN);
  const handleClose = () => setReadyState(ReadyState.CLOSED);
  const handleError = () => setReadyState(ReadyState.CLOSED);

  socket.addEventListener("open", handleOpen);
  socket.addEventListener("close", handleClose);
  socket.addEventListener("error", handleError);

  //cleanup
  return () => {
    socket.removeEventListener("open", handleOpen);
    socket.removeEventListener("close", handleClose);
    socket.removeEventListener("error", handleError);
    socket.close();
    webSocketRef.current = null;
  };
};

export default function useWebsocket(url: string, options: any) {
  const [readyState, setReadyState] = useState<ReadyStateState>({});
  const [lastMessage, setLastMessage] = useState<
    WebSocketEventMap["message"] | null
  >(null);
  const webSocketRef = useRef<WebSocket | null>(null);
  const reconnectCount = useRef<number>(0);
  const optionsCache = useRef<any>(options);

  const sendMessage: SendMessage = useCallback((message) => {
    if (webSocketRef.current?.readyState === ReadyState.OPEN) {
      //  assertIsWebSocket(webSocketRef.current, optionsCache.current.skipAssert);
      webSocketRef.current.send(message);
    }
  }, []);

  useEffect(() => {
    if (url !== null) {
      let removeListeners: () => void;
      let expectClose = false;

      const start = async () => {
        if (!url) {
          // url is not valid
          console.error("Invalid URL");
          setReadyState((prev) => ({
            ...prev,
            ABORTED: ReadyState.CLOSED,
          }));
          //   convertedUrl.current = 'ABORTED';
          //   flushSync(() => setReadyState(prev => ({
          //     ...prev,
          //     ABORTED: ReadyState.CLOSED,
          //   })));

          return;
        }

        start();

        // createSocket
        removeListeners = createSocket(webSocketRef, url, setReadyState);

        return () => {
          expectClose = true;
          removeListeners?.();
          setLastMessage(null);
        };
        //   webSocketRef,
        //   convertedUrl.current,
        //   protectedSetReadyState,
        //   optionsCache,
        //   protectedSetLastMessage,
        //   startRef,
        //   reconnectCount,
        //   lastMessageTime,
        //   sendMessage,
      };
    }
  }, []);

  return {
    readyState,
    sendMessage,
  };
}
