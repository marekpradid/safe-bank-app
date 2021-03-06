const express = require('express');

// Controllers
const commonCtrl = require('$controllers/commonController');

// App
const router = express.Router();

// => GET /common/countUsers
// Get users count
router.get('/countUsers', commonCtrl.countUsers);

module.exports = router;
