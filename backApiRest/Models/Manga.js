const mongoose = require('mongoose');

const MangaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const Manga = mongoose.model('Manga', MangaSchema);
module.exports = Manga;