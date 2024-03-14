const mongoose = require("mongoose");

const regFormSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
    },
    password : {
        type : String,
    },

});

const Registration = mongoose.model("Registration", regFormSchema);
module.exports = Registration;