const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const path = require("path");
const MONGO_URL = process.env.MONGO_URL;
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const listingsRoutes = require("./routes/listingsRoutes");

//SETTINGS
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));

//GLOBAL MIDDLEWARES
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

//ROUTES
app.use("/listings", listingsRoutes);
app.get("/", (req, res) => {
  res.redirect("/listings");
});

//ERROR MIDDLEWARE
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    msg: `${err.message || "There was an error in the system"}`,
    status: `${err.status || 500}`,
  });
  console.log(err);
});

//START
async function start() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("connected to db");

    app.listen(PORT, () => {
      console.log("listening to the server");
    });
  } catch (err) {
    console.log(`connection to db failed ${err}`);
  }
}
start();
