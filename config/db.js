const mongoose = require('mongoose');

let connect = async ()=>{
    try {
        console.log("running");
        await mongoose.connect('mongodb+srv://yagnikgoti26:yagnik@cluster0.vsxrwfm.mongodb.net/?retryWrites=true&w=majority');
        console.log("connected");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connect;