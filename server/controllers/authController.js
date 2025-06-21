import dotenv from 'dotenv'
dotenv.config()

import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { sendOTP, verifyOTP } from '../services/otpService.js';

export const sendOtp = async (req, res) => {
  const { phoneNo } = req.body;
  if (!phoneNo) return res.status(400).json({ error: 'Phone number required' });

  try {
    await sendOTP(phoneNo);
    res.status(200).json({ message: 'OTP sent' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

export const verifyOtp = async (req, res) => {
  const { phoneNo, otp } = req.body;

  const valid = await verifyOTP(phoneNo, otp);

  if (!valid) return res.status(401).json({ error: 'Invalid or expired OTP' });

  let user = await User.findOne({ phoneNo });
  if (!user) return res.status(200).json({ newUser: true, phoneNo });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.status(200).json({ token, user });
};

export const signup = async (req, res) => {
  const { phoneNo, username } = req.body;
  const user = new User({ phoneNo, username });
  await user.save();

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.status(201).json({ token, user });
};
