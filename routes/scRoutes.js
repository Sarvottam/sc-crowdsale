const express = require('express');
const controller = require('../controllers');

const router = express.Router();

router.post('/purchaseToken', controller.sc.purchaseToken);
router.post('/transferToken', controller.sc.transferToken);
router.get('/tokenDecimal', controller.sc.getDecimal);

module.exports = router;