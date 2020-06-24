const mongoose = require('mongoose');
const slugify = require('../plugins/slugify');

let taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    description: {
        type: String,
        required: false
    },
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

taskSchema.pre('save', function(next) {
    generateSlugAndContinue.call(this, 0, next);
    next();
})

function NumeroAleatorio() {
    var a1 = Math.round(Math.random() * 10)
    var aa1 = a1.toString();
    var a2 = Math.round(Math.random() * 10)
    var aa2 = a2.toString();
    var a3 = Math.round(Math.random() * 10)
    var aa3 = a3.toString();
    var a4 = Math.round(Math.random() * 10)
    var aa4 = a4.toString();
    var a5 = Math.round(Math.random() * 10)
    var aa5 = a5.toString();
    var a6 = Math.round(Math.random() * 10)
    var aa6 = a6.toString();
    var a7 = Math.round(Math.random() * 10)
    var aa7 = a7.toString();
    var a8 = Math.round(Math.random() * 10)
    var aa8 = a8.toString();
    var a9 = Math.round(Math.random() * 10)
    var aa9 = a9.toString();
    const aleatorio = aa1 + aa2 + aa3 + aa4 + aa5 + aa6 + aa7 + aa8 + aa9
    return aleatorio
}

function generateSlugAndContinue(count, next) {
    this.slug = slugify(this.title) + '-' + NumeroAleatorio();
    console.log(this.slug);
    next();
}

let Task = mongoose.model('Task', taskSchema);

module.exports = Task;