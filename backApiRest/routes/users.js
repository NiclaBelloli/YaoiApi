var express = require('express');
var router = express.Router();
const user_controller = require('../Controllers/UserController');

/**
 * @swagger
 * /users/get-users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */

/* GET users listing. */
router.get('/get-users', user_controller.get_users);

/**
 * @swagger
 * /users/create-user:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */

router.post('/create-user', user_controller.create_user);

module.exports = router;
