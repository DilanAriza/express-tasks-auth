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
    .delete(
        ControllersTasks.FindIdParamTask,
        ControllersTasks.DeleteTask
    )
    .put(
        ControllersTasks.FindIdParamTask,
        ControllersTasks.UpdateTask
    )

module.exports = router;