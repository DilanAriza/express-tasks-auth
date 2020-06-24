const User = require('../models/Users');
const createResponse = require('./Controllers.Helpers').createResponse;
const paramsBuilder = require('./Controllers.Helpers').paramsBuilder;
const validParams = ['email', 'name', 'password'];

function FindUserInfo(req, res, next) {
    console.log('de')
    User.findOne({
        '_id': req.params.id
    }).then(user => {
        req.user = user;
        next()
    }).catch(err => {
        next(err);
    })
}

function GetAllUsers(req, res) {

    User.find({}).then(docs => {
        let responseGetAllUsers = createResponse(false, 302, "Users Finded", docs);
        res.json(responseGetAllUsers);
    }).catch(err => {
        let responseGetAllUsers = createResponse(true, 500, "Error in the get all users", err.errors);
        res.json(responseGetAllUsers);
    });

}

function CreateUser(req, res, next) {
    let params = paramsBuilder(validParams, req.body);
    console.log(params)
    User.create(params).then(doc => {
        console.log('usuario creado');
        req.user = doc;
        next();
    }).catch(err => {
        console.log(err)
        let responseCreateUser = createResponse(true, 500, "Error in 'create user'", err)
        res.json(responseCreateUser);
    })
}

function DeleteUser(req, res) {
    User.remove({ '_id': req.user._id }).then(doc => {
        let responseDeleteUser = createResponse(false, 205, "Users deleted", { expiredData: doc });
        res.json(responseDeleteUser);
    }).catch(err => {
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