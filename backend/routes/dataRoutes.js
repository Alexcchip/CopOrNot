const express = require('express');
const { getStations, getRecentLogs, postData, clearSet, getPolyline } = require('../controllers/dataController');

const router = express.Router();

router.post('/post/:city', postData);
router.post('/clear', clearSet);
router.get('/city/:city', getStations);
router.get('/polyline/:city', getPolyline);
router.get('/reports/:city/:station', getRecentLogs);

module.exports = router;
