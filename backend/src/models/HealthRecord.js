
const mongoose = require("mongoose");

const HealthRecordSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    inputData : Object,
    result : Object,
    createdAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("HealthCard", HealthRecordSchema);