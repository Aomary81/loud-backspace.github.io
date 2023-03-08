const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const https = require('https');
const fs = require('fs');
const ip = '10.0.0.186'

require('dotenv').config();

// Route imports

//Imports userRoutes from ./routes/users.js
const usersRouter = require('./routes/users');
//Imports authRouter from ./routes/auth.js
const authRouter = require('./routes/auth');

const updateRouter = require('./routes/updateUser')

const app = express ();
const port = process.env.PORT || 3000;

/*const httpsOptions = {
    key: fs.readFileSync('path to key.pem'),
    cert: fs.readFileSync('path to cert.pem')
};*/

//Middleware
app.use (express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
var corsOptions = {
  origin: ['http://localhost:19006', 'http://'+ip+':19006'],
  credentials: true
}
app.use (cors(corsOptions));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

//Routes
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/update', updateRouter);

app.listen (port, () => {
    console. log (`Server is running on port: ${port}`);
});

/*https.createServer(options, app).listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});*/
