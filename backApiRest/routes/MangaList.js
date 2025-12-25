var express = require('express');
var router = express.Router();
const Manga = require('../Models/Manga');
const manga_controller = require('../Controllers/MangaController');
require('../database.js');

/**
 * @swagger
 * /mangalist:
 *   get:
 *     summary: Obtiene todos los mangas de la base de datos
 *     tags: [Mangas]
 *     responses:
 *       200:
 *         description: Lista de mangas
 */

/* GET users listing. */
router.get('/', async function (req, res, next) {
    try {
        console.log(Manga.collection)
        const mangas = await Manga.find({});
        console.log('mangas:', mangas);
        res.send(mangas);
    } catch (err) {
        console.error('Error loading DB or querying collection:', err);
    }
});

/**
 * @swagger
 * /mangalist/add-manga:
 *   post:
 *     summary: Inserta un manga nuevo dentro de la base de datos
 *     tags: [Mangas]
 *     parameters:
 *       - in: body
 *         name: manga
 *         description: El manga a insertar
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - title
 *             - description
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *     responses:
 *       200:
 *         description: Insert de manga exitoso
 */


router.post('/add-manga', manga_controller.manga_insert);

/**
 * @swagger
 * /mangalist/manga-query:
 *   get:
 *     summary: Obtiene todos los mangas de la base de datos segun el criterio de busqueda
 *     tags: [Mangas]
 *     parameters:
 *       - in: query
 *         name: q
 *         description: Filtro opcional de búsqueda
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de mangas
 */


router.get('/manga-query', manga_controller.manga_search);

/**
 * @swagger
 * /mangalist/manga-request:
 *   get:
 *     summary: Obtiene todos los mangas desde la consulta a la API externa segun el criterio de busqueda
 *     tags: [Mangas]
 *     parameters:
 *       - in: query
 *         name: q
 *         description: Filtro opcional de búsqueda
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de mangas
 */

router.get('/manga-request', manga_controller.manga_request);

//router.post('/add-image', manga_controller.add_image);

module.exports = router;