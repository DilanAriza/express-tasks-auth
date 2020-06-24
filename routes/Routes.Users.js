var express = require('express');
const ControllerUsers = require('../controllers/Controllers.Users');
const ControllersSessions = require('../controllers/Controllers.Sessions');
const AuthenticateOwer = require('../middlewares/AuthenticateOwer.UsersRouters');
var router = express.Router();

router.route('/')
    .get(ControllerUsers.GetAllUsers)
    .post(
        ControllerUsers.CreateUser,
        ControllersSessions.GenerateToken,
        ControllersSessions.SendTokenAndUserDoc
    )

router.route('/:id')
    .delete(ControllerUsers.FindUserInfo, ControllerUsers.DeleteUser)
module.exports = router;