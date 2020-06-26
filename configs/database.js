const mongoose = require('mongoose');

const dbName = 'express-tasks-auth';

module.exports = {
    connect: () => mongoose.connect('mongodb://localhost/' + dbName, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then(db => {
        console.log(`Db ${db.connection.name} is connected, on bug branch`);
    }).catch(err => {
        console.log(`Error: ${err}`);
    }),
    dbName,
    connection: () => {
        if (mongoose.connection)
            return mongoose.connection;
        return this.connect();
    }
}