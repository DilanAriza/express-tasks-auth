const Task = require('../models/Tasks');
const createResponse = require('./Controllers.Helpers').createResponse;
const paramsBuilder = require('./Controllers.Helpers').paramsBuilder

const validParams = ['title', 'description'];

function FindIdParamTask(req, res, next) {
    Task.findOne({ slug: req.params.id })
        .then(place => {
            req.task = place;
            req.mainObj = place;
            next();
        }).catch(err => {
            next(err);
        })
}

function GetOneTask(req, res) {
    let responseGetOneTask = createResponse(false, 302, "Tasks finded", req.task);
    res.json(responseGetOneTask);
}

function GetAllPlaces(req, res) {
    Task.find({}).then(tasks => {
        let responseGetAllPlaces = createResponse(false, 302, "Tasks finded", tasks);
        res.json(responseGetAllPlaces);
    }).catch(err => {
        let responseGetAllPlaces = createResponse(true, 500, "Error in get all tasks", err);
        res.json(responseGetAllPlaces);
    })
}


function CreateTasks(req, res) {
    const params = paramsBuilder(validParams, req.body);
    console.log(req.user);
    params['_user'] = req.user.id;
    Task.create(params)
        .then(task => {
            let responseCreateTasks = createResponse(false, 201, "Tasks created", task);
            res.json(responseCreateTasks);
        }).catch(err => {
            let responseCreateTasksError = createResponse(true, 500, "Error in create task", err);
            res.json(responseCreateTasksError);
        })
}

function DeleteTask(req, res) {
    Task.remove({ 'slug': req.params.id }).then(docDeleted => {
        let responseDeleteTask = createResponse(false, 205, "Task deleted", { expiredData: docDeleted });
        res.json(responseDeleteTask);
    }).catch(err => {
        let responseDeleteTask = createResponse(true, 500, "Error in delete task", err);
        res.json(responseDeleteTask);
    })
}

function UpdateTask(req, res) {
    const params = paramsBuilder(validParams, req.body);
    req.task = Object.assign(req.task, params);

    req.task.save().then(doc => {
        let responseUpdateTask = createResponse(false, 205, "Task updated", { updateData: doc });
        res.json(responseUpdateTask);
    }).catch(err => {
        let responseUpdateTask = createResponse(true, 500, "Error in update task", err);
        res.json(responseUpdateTask);
    })
}

module.exports = {
    GetAllPlaces,
    CreateTasks,
    FindIdParamTask,
    GetOneTask,
    DeleteTask,
    UpdateTask
}