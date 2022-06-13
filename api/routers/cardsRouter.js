const express = require('express');

// Controllers
const cardsCtrl = require('$controllers/cardsController');

// App
const router = express.Router();

// => GET /cards/my
// Get my cards list
router.get('/my', cardsCtrl.getUserCards);

// => GET /cards/:id
// Get single card
router.get('/:id', cardsCtrl.getCardDetails);

// => PUT /cards/:id/change-pin
// Change PIN
router.put('/:id/change-pin', cardsCtrl.changePin);

// => PUT /cards/:id/change-limits
// Change limits
router.put('/:id/change-limits', cardsCtrl.changeLimits);

module.exports = router;
