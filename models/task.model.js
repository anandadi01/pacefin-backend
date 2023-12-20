const mongoose = require("../config/mongodb.config")

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    status: {
        type: String,           
        enum: ["CREATED", "ACTIVE", "INACTIVE", "CLOSED"]
    },
}, {timestamps: {createdAt: "created_at", updatedAt:"updated_at"}});

const TaskModel = mongoose.model("task", TaskSchema);

module.exports = TaskModel;
