import dotenv from 'dotenv'
dotenv.config()

import { createClient } from 'redis';
const REDIS_URI = process.env.REDIS_URI

export const redisClient = createClient({
    url: REDIS_URI,
});

redisClient.on('error', (err) => console.error('❌ Redis error:', err));
redisClient.on('connect', () => console.log('✅ Redis connected'));

export const connectRedis = async () => {
    await redisClient.connect();
};
