require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user_routes.js");
const adminRouter = require('./routes/admin_routes.js')
const path = require("path");
const session = require('express-session');

const app = express();

const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//session config

app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: false
}))

//view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//data base connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Mongodb connected succesfully");

    app.use("/user", router);
    app.use('/admin',adminRouter);

    app.listen(PORT, () => {
      console.log("Server started at port: ", PORT);
    });
  } catch (error) {
    console.log("Mongodb connection failed", error);
  }
};

connectDB();
