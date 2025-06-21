import dotenv from 'dotenv';
dotenv.config()
import { Server } from "socket.io";
import { redisClient } from "./config/redis.js";
import jwt from "jsonwebtoken";

export const initSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        },
    });
    console.log("Socket initiated")

    io.on("connection", async (socket) => {

        const token = socket.handshake.auth.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        if (!userId) return;

        // ✅ Store in Redis
        await redisClient.sAdd("online_users", userId);
        await redisClient.hSet("online_user_map", userId, socket.id);

        console.log(`🔌 User connected: ${userId} | Socket ID: ${socket.id}`);

        // ✅ Handle messaging, typing, etc. here
        socket.on("send_message", async (data) => {
            const receiverSocketId = await redisClient.hGet("online_user_map", data.to);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("receive_message", data);
            }
        });

        // ✅ Handle disconnect
        socket.on("disconnect", async () => {
            await redisClient.sRem("online_users", userId);
            await redisClient.hDel("online_user_map", userId);
            console.log(`❌ User disconnected: ${userId}`);
        });
    });

    return io;
};
