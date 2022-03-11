const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const router = require('express').Router();

// get all tasks
router.get('/', (request, response) => {
  fs.readFile('./data/tasks.json', 'utf8', (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
  
    const taskData = JSON.parse(data);
    response.json(taskData);
  });
});

// post a new task
router.post('/', (request, response) => {
  fs.readFile('./data/tasks.json', 'utf8', (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    const newTask = {
      id: uuidv4(),
      category: request.body.category,
      content: request.body.content,
      priority: request.body.priority,
      due: Date.parse(request.body.due),
    };
  
    const taskData = JSON.parse(data);
    taskData.push(newTask);
  
    fs.writeFile('./data/tasks.json', JSON.stringify(taskData), (error) => {
      if (error) {
        console.log('error');
        return;
      }
      console.log('File write succeded.');
      response.json(taskData);
    });
  });
});

// delete a task by id
router.delete('/:taskId', (request, response) => {
  fs.readFile('./data/tasks.json', 'utf8', (error, data) => {
    if (error) { 
      console.log(error);
      return;
    }

    const taskData = JSON.parse(data).filter((task) => {
      return task.id !== request.params.taskId
    });
  
    fs.writeFile('./data/tasks.json', JSON.stringify(taskData), (error) => {
      if (error) {
        console.log('error');
        return;
      }
      console.log('File write succeded.');
      response.json(taskData);
    });
  });  
});

module.exports = router;
