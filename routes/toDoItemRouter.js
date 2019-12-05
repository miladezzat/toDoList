const express = require('express');
const router = express.Router();

const { user_logged } = require("../middleware/auth");
const Item = require('../models/toDoItemModel');
const { addTask, allTasks, removeTask } = require('../controllers/toDoItemController');


router.post('/', user_logged, addTask);

router.get('/', user_logged, allTasks);

router.delete('/', user_logged, removeTask)

module.exports = router;