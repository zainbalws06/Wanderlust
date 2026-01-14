const Listing = require("../models/listing");
const MyError = require("../utils/myError");

module.exports.routeGet = async (req, res, next) => {
  try {
    let allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings });
  } catch (err) {
    next(new MyError("There was an error", 500));
  }
};

module.exports.newGet = (req, res) => {
  res.render("listings/new.ejs");
};
module.exports.idGet = async (req, res, next) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/listing.ejs", { listing });
  } catch (err) {
    next(new MyError("There was an error", 500));
  }
};
module.exports.routePost = async (req, res, next) => {
  try {
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
    res.status(201).redirect("/listings");
  } catch (err) {
    next(new MyError("There was an error", 500));
  }
};
module.exports.editGet = async (req, res, next) => {
  try {
    let { id } = req.params;
    console.log(id);
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
    console.log(listing);
  } catch (err) {
    next(new MyError("There was an error", 500));
  }
};
module.exports.idPut = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(new MyError("There was an error", 500));
  }
};
module.exports.idDel = async (req, res, next) => {
  try {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(`${deletedListing} deleted`);
    res.redirect("/listings");
  } catch (err) {
    next(new MyError("There was an error", 500));
  }
};
