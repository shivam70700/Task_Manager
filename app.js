require('dotenv').config();
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require('./middleware/notfound')
// middleware
app.use(express.json());

// routes

// app.get('/api/v1/tasks') - to get all the tasks
// app.post('api/v1/tasks') - to add new task
// app.get('api/v1/tasks/:id') - get single task
// app.patch('api/v1/tasks/:id') - update task
// app.delete('api/v1/tasks/:id') - delete task

/* app.get("/hello", (req, res) => {
  res.write("Task Manager App");
  res.end();
}); */

app.use(express.static('./public'))

app.use("/api/v1/tasks", tasks);
app.use(notFound);
const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is listening on PORT ${port}`);
    });
    
  } catch (error) {
    console.log(error);   
  }
}

start()