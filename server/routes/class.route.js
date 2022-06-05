const router = require('express').Router();
const actions = require('../controllers/class.controller');

router.route('/get-all').get(actions.ViewAllClasses);
router.route('/create-class').post(actions.createClass);

module.exports = router;