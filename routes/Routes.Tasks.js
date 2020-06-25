var express = require('express');
const ControllersTasks = require('../controllers/Controllers.Tasks');
var router = express.Router();


router.route('/')
    .get(ControllersTasks.GetAllPlaces)
    .post(ControllersTasks.CreateTasks)

router.route('/:id')
    .get(
        ControllersTasks.FindIdParamTask,
        ControllersTasks.GetOneTask
    )


module.exports = router;