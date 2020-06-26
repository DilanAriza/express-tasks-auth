const User = require('../models/Users');
const createResponse = require('./Controllers.Helpers').createResponse;
const paramsBuilder = require('./Controllers.Helpers').paramsBuilder;
const validParams = ['email', 'name', 'password'];

function FindUserInfo(req, res, next) {
    console.time();
    User.findOne({
        '_id': req.params.id
    }).then(user => {

        console.timeEnd();
        req.user = user;
        next()
    }).catch(err => {

        console.timeEnd();
        next(err);
    })
}

function GetAllUsers(req, res) {
    console.time();
    User.find({}).then(docs => {
        console.timeEnd();
        let responseGetAllUsers = createResponse(false, 302, "Users Finded", docs);
        res.json(responseGetAllUsers);
    }).catch(err => {
        console.timeEnd();
        let responseGetAllUsers = createResponse(true, 500, "Error in the get all users", err.errors);
        res.json(responseGetAllUsers);
    });

}

function CreateUser(req, res, next) {
    console.time()
    let params = paramsBuilder(validParams, req.body);
    User.create(params).then(doc => {
        console.log('usuario creado');
        console.timeEnd();
        req.user = doc;
        next();
    }).catch(err => {
        console.timeEnd();
        console.log(err)
        let responseCreateUser = createResponse(true, 500, "Error in 'create user'", err)
        res.json(responseCreateUser);
    })
}

function DeleteUser(req, res) {
    console.time()
    User.remove({ '_id': req.user._id }).then(doc => {
        console.timeEnd();
        let responseDeleteUser = createResponse(false, 205, "Users deleted", { expiredData: doc });
        res.json(responseDeleteUser);
    }).catch(err => {
        console.timeEnd();
        console.log(err)
        let responseCreateUser = createResponse(true, 500, "Error in the 'delete user'", err)
        res.json(responseCreateUser);
    })
}


module.exports = {
    GetAllUsers,
    CreateUser,
    DeleteUser,
    FindUserInfo
}