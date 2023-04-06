const mongoose = require('mongoose');

let book = new mongoose.Schema({
    name : {type : String ,required : true},
    description : String,
    category : {type : String ,required : true},
    price : {type : Number ,required : true},
    image : String,
    quantity : {type : Number ,required : true}, 
    rating : Number
})

let bookData = mongoose.model('stud',book);

module.exports = bookData;