const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index');



router.get('', indexController.get);
router.post('', indexController.post);



module.exports = router;