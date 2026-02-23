const Task = require("../models/Task");

//POST api/tasks
exports.createTask = async (req, res) =>{
    const task = await Task.create({...req.body, owner: req.user.id});
    res.json(task);
};

//GET /api/tasks/me
exports.getMyTasks = async (req, res) =>{
    const task = await Task.find({ owner: req.user.id });
    res.json(tasks);
};

// GET /api/tasks/all
exports.getAllTasks = async(req, res) => {
    const tasks = await Task.find().populate("owner", "email");
    res.json(tasks);
}