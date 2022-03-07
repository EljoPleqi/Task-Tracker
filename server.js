const express = require('express');
const cors = require('cors');
const path = require('path');

const db = require('./models');

require('dotenv').config({ path: '/' });
const PORT = process.env.PORT || 3030;

const server = express();
server.use(express.json());
server.use(cors());

server.use('/img', express.static(path.join(__dirname, './img')));
// ROUTERS

const taskRouter = require('./routers/taskRouter');

// ROUTES

server.use('/tasks', taskRouter);

db.sequelize.sync().then(() => {
  server.listen(PORT, () => console.log(`Server is live on ${PORT}`));
});
