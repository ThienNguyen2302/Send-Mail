const mongoose = require("mongoose")
const Schema = mongoose.Schema

const User = new Schema({
    email: {
        type: String,
        unique: true,
        require: true
    },
    fullname: {
        type: String,
        require: true
    },
    id: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("User", User)