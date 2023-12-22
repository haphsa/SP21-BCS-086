// models/Gallery.js
const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  
  name: String,
  imageUrl: String,
  
});

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;
