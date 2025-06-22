import dotenv from 'dotenv';
dotenv.config();

import twilio from 'twilio';
import { redisClient } from '../config/redis.js'


const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendOTP = async (phoneNo) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        // store OTP in Redis with 10-sec expiry
        await redisClient.set(`otp:${phoneNo}`, otp, { EX: 7200 });

        // Send SMS using Twilio
        const formattedPhone = String(phoneNo).startsWith("+") ? String(phoneNo) : `+91${phoneNo}`;
        console.log("formattedPhone : " + formattedPhone)
        const message = await client.messages.create({
            body: `Your OTP code is ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: formattedPhone,
        });

        console.log("Twilio message sent:", message.sid);
        return { success: true, sid: message.sid };

    } catch (error) {
        console.error("Twilio error:", error?.message || error);
        return { success: false, error: error?.message || "Failed to send OTP" };
    }

    return otp;
};

export const verifyOTP = async (phoneNo, otp) => {
    const storedOtp = await redisClient.get(`otp:${phoneNo}`);
    return String(storedOtp) === String(otp);
};
