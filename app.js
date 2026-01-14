const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const Listing = require("./models/listing");
const path = require("path");
const MONGO_URL = process.env.MONGO_URL;
const methoOverride = require("method-override");
const ejsMate = require("ejs-mate");
const listingsRoutes = require("./routes/listingsRoutes");

//Middlewares
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methoOverride("_method"));
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

//ROUTES
app.use("/listings", listingsRoutes);
app.get("/", (req, res) => {
  res.redirect("/listings");
});

//LISTEN
function listen() {
  try {
    app.listen(PORT, () => {
      console.log("listening to the server");
    });
  } catch (err) {
    console.log(err);
  }
}
listen();

//DB Connection
async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("connected to db");
  } catch (error) {
    console.log("connection to db failed");
  }
}
main();
