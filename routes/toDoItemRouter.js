const express = require('express');
const router = express.Router();

const { user_logged } = require("../middleware/auth");
const { addTask, allTasks, removeTask, startTask, endTask } = require('../controllers/toDoItemController');


router.post('/', user_logged, addTask);

router.get('/', user_logged, allTasks);

router.delete('/', user_logged, removeTask)

router.put('/start', user_logged, startTask);
router.put('/end', user_logged, endTask);

module.exports = router;