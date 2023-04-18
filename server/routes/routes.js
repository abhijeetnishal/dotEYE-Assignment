const express = require('express');

const router = express.Router();

const { quotesFunction, averageFunction, slippageFunction } = require('../controller/controller')

router.get('/quotes', quotesFunction);

router.get('/average', averageFunction);

router.get('/slippage', slippageFunction);

module.exports = router;

