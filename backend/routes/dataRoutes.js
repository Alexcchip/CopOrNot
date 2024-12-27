const express = require('express');
const { getStations, getData, postData, clearSet } = require('../controllers/dataController');

const router = express.Router();

router.get('/data', getData);
router.post('/post', postData);
router.post('/clear', clearSet)
router.get('/stations', getStations)
module.exports = router;
