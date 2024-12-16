const express = require('express');
const { getData, postData, clearSet } = require('../controllers/dataController');

const router = express.Router();

router.get('/data', getData);
router.post('/post', postData);
router.post('/clear', clearSet)
    module.exports = router;
