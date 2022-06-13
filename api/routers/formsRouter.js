const express = require('express');

// Controllers
const formsCtrl = require('$controllers/formsController');

// App
const router = express.Router();

// => POST /forms/help
// Send help form
router.post('/help', formsCtrl.sendHelpForm);

module.exports = router;
