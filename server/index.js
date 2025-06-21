import dotenv from 'dotenv'
dotenv.config();

import cors from "cors"
import express from "express"
import http from 'http';
import { connectDB } from "./config/mongoose.js"
import { connectRedis } from "./config/redis.js"
import { twilioClient } from './config/twilio.js';
import authRoutes from './routes/authRoutes.js';
import { initSocket } from './socketHandler.js';

const app = express();
const server = http.createServer(app);
initSocket(server);

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

await connectDB();
await connectRedis();

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`✅ Server with Socket.IO started on port ${PORT}`));
