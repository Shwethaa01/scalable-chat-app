import { Contact } from "../models/Contacts.js"
import User from "../models/User.js"
export const getAllContacts = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        console.log("inside get all contacts, userid: " + userId)
        const contacts = await Contact.find({ userId }).populate("contactId", "username avatarImage");
        res.status(200).json(contacts)
    } catch (e) {
        console.error("Failed to fetch contacts : " + e)
        res.status(500).json({ error: "Failed to fetch contacts" });
    }
}

export const addContact = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { contactId } = req.body;

        // Prevent adding yourself
        if (userId === contactId) {
            return res.status(400).json({ error: "You cannot add yourself as a contact." });
        }

        // Check if contact exists in the User collection
        const contactUser = await User.findById(contactId);
        if (!contactUser) {
            return res.status(404).json({ error: "User to be added as contact does not exist." });
        }

        // Check for duplicate contact
        const existing = await Contact.findOne({ userId, contactId });
        if (existing) {
            return res.status(409).json({ error: "Contact already exists." });
        }

        // Create the contact
        const newContact = new Contact({ userId, contactId });
        await newContact.save();

        res.status(201).json({ message: "Contact added successfully", contact: newContact });
    } catch (err) {
        console.error("Error adding contact:", err);
        res.status(500).json({ error: "Failed to add contact." });
    }
}