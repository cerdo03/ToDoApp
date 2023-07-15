const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type,Authorization',
}));

const url = 'mongodb://localhost:27017/toDoAppTasks';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

const taskSchema = new mongoose.Schema({
  taskTitle: String,
  taskDesc:String,
  taskDeadline:Date,
  taskPending:Boolean
})

const task =  mongoose.model('task', taskSchema);


app.post('/api/addtask',(req,res)=>{
  const {taskTitle,taskDesc,taskDeadline,taskPending} = req.body;
  const newTask = new task({
    taskTitle,
    taskDesc,
    taskDeadline,
    taskPending
  });
  if(taskTitle=="" || taskDesc=="" || taskDeadline==""){
    return res.status(400).json({ error: 'Empty request body' });
  }
  console.log(newTask);
  newTask.save()
  .then(()=>{
    console.log('New task added:', newTask);
    res.status(200).json({ message: 'Task added successfully' });
  })
  .catch((error)=>{
    console.error('Failed to add task:', error);
    res.status(500).json({ error: 'Failed to add task' });
  });
});

app.get('/api/getTasks',(req,res)=>{
  task.find()
  .then((tasks)=>{
    res.status(200).json(tasks);
  })
  .catch((error)=>{
    console.error('Failed to fetch tasks:',error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  })
  // res.send("Hello mf");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});