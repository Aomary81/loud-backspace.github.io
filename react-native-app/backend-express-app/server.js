const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const https = require("https");
const serverless = require("serverless-http");
const fs = require("fs");
const ip = "0.0.0.0";

require("dotenv").config();

// Route imports

//Imports userRoutes from ./routes/users.js
const usersRouter = require("./functions/users");

//Imports authRouter from ./routes/auth.js
const authRouter = require("./functions/auth");

const updateRouter = require("./functions/updateUser");

const getUserRouter = require("./functions/getUserData");

const listingsRouter = require("./functions/listings");
const householdRouter = require("./functions/household");
const reminderRouter = require("./functions/reminders");

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

/*const httpsOptions = {
    key: fs.readFileSync('path to key.pem'),
    cert: fs.readFileSync('path to cert.pem')
};*/

//Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
var corsOptions = {
  origin: ["http://localhost:19006", "http://" + ip + ":19006", "https://famous-melomakarona-5c9bc8.netlify.app"],
  credentials: true,
};
app.use(cors(corsOptions));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});


//Routes
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/update", updateRouter);
app.use("/get", getUserRouter);
app.use("/listings", listingsRouter);
app.use("/household", householdRouter);
app.use("/reminders", reminderRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


//app.use("/.netlify/routes/server", router);  // path must route to lambda
//module.exports.handler = serverless(app);

/*https.createServer(options, app).listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});*/
