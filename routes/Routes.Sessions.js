var express = require('express');
const ControllersSessions = require('../controllers/Controllers.Sessions');
var router = express.Router();

router.route('/')
    .post(
        ControllersSessions.Authenticate,
        ControllersSessions.GenerateToken,
        ControllersSessions.SendTokenAndUserDoc
    )

module.exports = router;