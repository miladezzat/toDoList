const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const cors = require('cors')

require('./config/db.conf')

const PORT = process.env.PORT || 3000;


const userPublickRouter = require('./routes/userPublickRouter');
const toDoItemRouter = require('./routes/toDoItemRouter');


const app = express();

app.use(cors());
// app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '/dist')));
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    }

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

    //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Pass to next layer of middleware
    next();
})


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.use('/', userPublickRouter);
//todoitem
app.use('/todoitem', toDoItemRouter);


app.listen(PORT, () => {
    console.log("Server Running on localhost: " + PORT);
})