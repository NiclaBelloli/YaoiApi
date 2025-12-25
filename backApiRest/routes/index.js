var express = require('express');
var router = express.Router();
const Manga = require('../Models/Manga');
const mongoose = require('mongoose');
const manga_controller = require('../Controllers/MangaController');
require('../database.js');

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('index', { title: 'Express' });
  try {
    console.log(Manga.collection)
    const mangas = await Manga.find({});
    console.log('mangas:', mangas);
  } catch (err) {
    console.error('Error loading DB or querying collection:', err);
  }
});

router.post('/add-manga', manga_controller.manga_insert);
router.get('/manga-query', manga_controller.manga_search);

module.exports = router;
