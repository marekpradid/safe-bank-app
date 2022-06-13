const express = require('express');

// Controllers
const accountsCtrl = require('$controllers/accountsController');

// App
const router = express.Router();

// => GET /accounts/my
// Get my accounts list
router.get('/my', accountsCtrl.getUserAccounts);

// => GET /accounts/:id
// Get single account
router.get('/:id', accountsCtrl.getAccountDetails);

module.exports = router;
