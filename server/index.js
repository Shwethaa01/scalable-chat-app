import dotenv from 'dotenv'
dotenv.config();

import cors from "cors"
import express from "express"
import { connectDB } from "./config/mongoose.js"
import { connectRedis } from "./config/redis.js"
import { twilioClient } from './config/twilio.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

await connectDB();
await connectRedis();

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
