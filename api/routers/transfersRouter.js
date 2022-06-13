const express = require('express');

// Controllers
const transfersCtrl = require('$controllers/transfersController');

// App
const router = express.Router();

// => GET /transfers/my
// Get my transfers list
router.get('/my', transfersCtrl.getUserTransfers);

// => GET /transfers/:id
// Get single transfer
router.get('/:id', transfersCtrl.getTransferDetails);

// => POST /transfers
// Make a transfer
router.post('/', transfersCtrl.create);

module.exports = router;
