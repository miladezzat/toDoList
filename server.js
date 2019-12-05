const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors')

require('./config/db.conf')

const PORT = 3000;


const userPublickRouter = require('./routes/userPublickRouter');
const toDoItemRouter = require('./routes/toDoItemRouter');


const app = express();

app.use(cors());
// app.use(morgan('dev'));

app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use('/', userPublickRouter);
//todoitem
app.use('/todoitem', toDoItemRouter);


app.listen(PORT, () => {
    console.log("Server Running on localhost: " + PORT);
})