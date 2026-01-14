const Listing = require("../models/listing");

module.exports.routeGet = async (req, res) => {
  let allListings = await Listing.find();
  res.render("listings/index.ejs", { allListings });
};

module.exports.newGet = async (req, res) => {
  res.render("listings/new.ejs");
};
module.exports.idGet = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/listing.ejs", { listing });
};
module.exports.routePost = async (req, res) => {
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
};
module.exports.editGet = async (req, res) => {
  let { id } = req.params;
  console.log(id);
  let listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
  console.log(listing);
};
module.exports.idPut = async (req, res) => {
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
};
module.exports.idDel = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(`${deletedListing} deleted`);
  res.redirect("/listings");
};
