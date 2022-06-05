const router = require('express').Router();
const actions = require('../controllers/attendance.controller');

router.route('/create-record').post(actions.createAttendanceRecord);

module.exports = router;