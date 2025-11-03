import express from 'express';
const router = express.Router();
import { findAllPgs, findAllHotels, findAllRooms, findPgsByCity, findHotelsByCity, findRoomsByCity, findHotelByLocation, findRoomByLocation, findPgByLocation, userBookings, findInCity, findInState } from '../controllers/userController.js';
import { param } from 'express-validator';
import { isAuth } from '../middlewares/authMiddleware.js';
import { feedBackMail } from '../config/mail.js';

router.use(isAuth);
//public route to get all PGs
router.get('/pgs', findAllPgs);

// public route to get all hotels
router.get('/hotels', findAllHotels);

// public route to get all rooms
router.get('/rooms', findAllRooms);

// public route to get PGs by city
router.get('/pgs/city/:city', param('city').notEmpty().withMessage('City is required'), findPgsByCity);

// public route to get hotels by city
router.get('/hotels/city/:city', param('city').notEmpty().withMessage('City is required'), findHotelsByCity);

// public route to get rooms by city
router.get('/rooms/city/:city', param('city').notEmpty().withMessage('City is required'), findRoomsByCity);

// public route to get hotels by location
router.get('/hotels/location/:location', param('location').notEmpty().withMessage('Location is required'), findHotelByLocation);

// public route to get PGs by location
router.get('/pgs/location/:location', param('location').notEmpty().withMessage('Location is required'), findPgByLocation);

// public route to get rooms by location
router.get('/rooms/location/:location', param('location').notEmpty().withMessage('Location is required'), findRoomByLocation);

// summary route to get counts in a city
router.get('/city/:city/summary', param('city').notEmpty().withMessage('City is required'), findInCity);

// summary route to get counts in a state
router.get('/state/:state/summary', param('state').notEmpty().withMessage('State is required'), findInState);

// route to get all bookings of the logged-in user
router.get('/rooms/bookings', userBookings);


router.post('/feedback-mail', feedBackMail);


export default router;