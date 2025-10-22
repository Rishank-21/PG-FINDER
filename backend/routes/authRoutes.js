import express from 'express';
const router = express.Router();
import { body } from 'express-validator';
import { registerUser, loginUser, getUserProfile, logoutUser } from '../controllers/authController.js';
import { isAuth } from '../middlewares/authMiddleware.js';


router.post('/register', [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
], registerUser);


router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
], loginUser);

router.get('/profile', isAuth, getUserProfile);

router.get('/logout', isAuth, logoutUser)

export default router;