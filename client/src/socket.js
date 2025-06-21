// useSocket.js
import { useRef, useEffect } from "react";
import { io } from "socket.io-client";

export const useSocket = () => {
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = io("http://localhost:5000", {
            autoConnect: false,
            auth: { token: localStorage.getItem("token") }
        });
        console.log("frontend socket started")
        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    return socketRef;
};
