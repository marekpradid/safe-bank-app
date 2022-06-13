const express = require('express');

// Controllers
const usersCtrl = require('$controllers/usersController');

// App
const router = express.Router();

// => GET /users/:id
// Get myself
router.get('/me', usersCtrl.getUser);

// => PUT /users/:id
// Update myself
router.put('/me', usersCtrl.updateUser);

module.exports = router;
