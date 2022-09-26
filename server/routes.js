const router = require('express').Router();
const auth = require('./middleware/auth');

// initialized express router
router.get('/', (req, res) => {
  res.json({
    status: 'Api working',
    message: 'Test',
  });
});

// Auth
const { register, login } = require('./controllers/user-controller');

router.post('/auth/register', register);
router.post('/auth/login', login);

// Booking
const booking = require('./controllers/booking-controller');

router.get('/booking', auth, booking.list);
router.get('/booking/:slug', auth, booking.detail);
router.post('/booking', booking.create);
router.post('/booking/start', booking.start);
router.patch('/booking/change-status', auth, booking.changeStatus);
router.delete('/booking/:slug', auth, booking.delete);

module.exports = router;
