import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    phoneNo: {
        type: String,
        unique: true,
        required: true
    },
    online: {
        type: Boolean,
    },
    socketId: {
        type: String,
    },
    lastSeen: {
        type: Date,
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },
    avatarImage: {
        type: String,
        default: "",
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;

