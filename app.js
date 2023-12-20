require("dotenv").config();
const express = require("express");
const TaskRouter = require("./routes/task.route")
const mockdata = require("./mockdata")
const TaskModel = require("./models/task.model")

const app = express();

//middlwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", TaskRouter);

app.get("/", (req, res) => {
  res.status(200).send({ success: true, message: "Hello World" });
});
  
app.get("/populatedata", async (req, res) => {
  try {
    for(let i=0; i < mockdata.length; i++){
      const newTask = new TaskModel({
        title: mockdata[i].title,
        description: mockdata[i].description,
        status: mockdata[i].status,
      });
      await newTask.save();
    }
    res.send("Saved!")
  } catch (error) {
    console.log(error);
    res.status(400).send({error: true, message: error.message})
  }
})
app.listen(8080, () => {
  console.log("Server started successfully!");
});
