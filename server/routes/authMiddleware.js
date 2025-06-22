import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization; // Bearer <token>
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
};
