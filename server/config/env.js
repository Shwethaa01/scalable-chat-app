// config/env.js
import dotenv from 'dotenv';

dotenv.config();

export const {
    PORT,
    MONGO_URI,
    REDIS_URL,
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER,
} = process.env;


// if (!process.env.MONGO_URI || !process.env.REDIS_URL || !process.env.TWILIO_AUTH_TOKEN) {
//     console.error('❌ Missing critical .env variables');
//     process.exit(1);
// }
