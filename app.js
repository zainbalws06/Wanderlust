const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const port = 8080;
const Listing = require("./models/listing");
const path = require("path");
const MONGO_URL = process.env.MONGO_URL;
const methoOverride = require("method-override");
const ejsMate = require("ejs-mate");

//Middlewares
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methoOverride("_method"));
//ROUTES
app.get("/", (req, res) => {
  res.send("please visit /listings, this route not available anymore for now");
});
app.get("/listings", async (req, res) => {
  let allListings = await Listing.find();
  res.render("listings/index.ejs", { allListings });
});

app.get("/listings/new", async (req, res) => {
  res.render("listings/new.ejs");
});
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/listing.ejs", { listing });
});
app.post("/listings", async (req, res) => {
  console.log(req.body);
  let { title, description, image, price, location, country } = req.body;
  let newListing = await Listing.create({
    title: title,
    description: description,
    image: image,
    price: price,
    location: location,
    country: country,
  });
  await newListing.save();

  console.log("saved");
  res.redirect("/listings");
});
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  console.log(id);
  let listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
  console.log(listing);
});
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let { title, description, image, price, location, country } = req.body;
  let updatedListing = await Listing.findByIdAndUpdate(id, {
    title: title,
    description: description,
    image: image,
    price: price,
    location: location,
    country: country,
  });
  console.log(`${updatedListing} updated`);
  res.redirect(`/listings/${id}`);
});
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(`${deletedListing} deleted`);
  res.redirect("/listings");
});
async function main() {
  await mongoose.connect(MONGO_URL);
}
main()
  .then(() => {
    console.log("connection to db successful");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("server started");
});
