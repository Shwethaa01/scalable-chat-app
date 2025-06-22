import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        contactId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        addedAt: {
            type: Date,
            default: Date.now,
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
        isFavorite: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// To prevent duplicate contacts
contactSchema.index({ userId: 1, contactId: 1 }, { unique: true });

export const Contact = mongoose.model("Contact", contactSchema);
