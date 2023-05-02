const express = require('express');
const router = express.Router();
let User = require('../models/user.model');

const serverless = require("serverless-http");
const app = express();

//Test route to make sure server is running
router.get('/', (req, res) => {
    res.send('App is running!...');
  });

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error:'+err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: '+ err));
});

app.use(express.json());
app.use('/.netlify/functions/users', router);
module.exports.handler = serverless(app);