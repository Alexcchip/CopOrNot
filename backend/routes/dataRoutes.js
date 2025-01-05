const express = require('express');
const { getStations, getData, postData, clearSet, getBosStations, getReports, getPolyline, getBosReports, getBosPolyline } = require('../controllers/dataController');

const router = express.Router();

router.get('/data', getData);
router.post('/post', postData);
router.post('/clear', clearSet);
router.get('/stations', getStations);
router.get('/reports', getReports);
router.get('/polyline', getPolyline);
router.get('/bos_station', getBosStations);
router.get('/reports', getReports);
router.get('/polyline', getPolyline);
module.exports = router;
