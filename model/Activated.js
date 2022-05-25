const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Activated = new Schema({
    id: {
        type: String,
        require: true
    },
    activateString: {
        type: String,
        require: true
    },
    activate: {
        type: Boolean,
        require: true
    },
    
})

module.exports = mongoose.model("Activated", Activated)