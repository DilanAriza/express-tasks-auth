var express = require('express');
const ControllersTasks = require('../controllers/Controllers.Tasks');
var router = express.Router();


router.route('/')
    .get(ControllersTasks.GetAllPlaces)




module.exports = router;