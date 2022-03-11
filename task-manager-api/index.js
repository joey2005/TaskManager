const express = require('express');
const app = express();
const taskRoutes = require('./routes/tasks');
const cors = require('cors');
require('dotenv').config(); // load .env variables

const { PORT } = process.env;

/*
 * Middleware
 */
app.use(express.json()); // adds req.body
app.use(express.static('public')); // adds public folder for serving images
app.use(cors()); // allow cross origin resource sharing

// home route
app.get('/', (requset, response) => {
  response.send('Welcome to my API');
});

// tasks route
app.use('/tasks', taskRoutes);

// start server and listen on port
app.listen(PORT, () => {
  console.log(`express app listening on port ${PORT}`);
});
