const Task = require('../models/Tasks');
const createResponse = require('./Controllers.Helpers').createResponse;

function GetAllPlaces(req, res) {
    Task.find({}).then(tasks => {
        let responseGetAllPlaces = createResponse(false, 302, "Tasks finded", tasks);
        res.json(responseGetAllPlaces);
    }).catch(err => {
        let responseGetAllPlaces = createResponse(true, 500, "Error in get all tasks", err);
        res.json(responseGetAllPlaces);
    })
}


module.exports = {
    GetAllPlaces
}