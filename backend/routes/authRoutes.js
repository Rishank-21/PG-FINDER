import express from 'express';
const router = express.Router();
import { body } from 'express-validator';
import { registerUser, loginUser, getUserProfile, logoutUser } from '../controllers/authController.js';
import { isAuth } from '../middlewares/authMiddleware.js';

//register user
router.post('/register', [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
], registerUser);

//login user
router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
], loginUser);

//get user profile agar role user ho to user pe aur owner ho to owner pe
router.get('/profile', isAuth, getUserProfile);

//logout user
router.get('/logout', isAuth, logoutUser)

export default router;