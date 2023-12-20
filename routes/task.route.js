const express = require("express");
const TaskModel = require("../models/task.model");

const router = express.Router();

router.get("/tasks", async (req, res) => {
  try {
    //pagination
    const page = req.query.page;
    const limit = 5;
    const offset = (page-1) * limit;

    // data query
    const documentCount = await TaskModel.countDocuments();
    const tasks = await TaskModel.find({}).skip(offset).limit(5).lean().exec();
    res.status(200).send({
      page: page,
      data: tasks,
      total_items: documentCount,
      per_page: limit,
      total_pages: Math.ceil(documentCount/limit)
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: true, message: error.message });
  }
});

router.get("/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const tasks = await TaskModel.findById(id).lean().exec();
    res.status(200).send(tasks);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: true, message: error.message });
  }
});

router.post("/tasks", async (req, res) => {
  try {
    const data = req.body;
    const newTask = new TaskModel({
      title: data.title,
      description: data.description,
      status: data.status,
    });
    const savedData = await newTask.save();
    res.status(200).send(savedData);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: true, message: error.message });
  }
});

router.put("/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedData = await TaskModel.updateOne(
      { _id: id },
      {
        $set: {
          title: data.title,
          description: data.description,
          status: data.status,
        },
      }
    );
    res.status(200).send(updatedData);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: true, message: error.message });
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTask = await TaskModel.deleteOne({ _id: id }).lean().exec();
    res.status(200).send(deletedTask);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: true, message: error.message });
  }
});

module.exports = router;
