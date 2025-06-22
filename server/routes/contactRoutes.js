import { Router } from 'express';
import { addContact, getAllContacts } from '../controllers/contactsController.js';
import { authenticate } from './authMiddleware.js';

const router = Router();

router.get('/', authenticate, getAllContacts);
router.post('/add-contact', authenticate, addContact);

export default router;
