const { Router } = require ('express');
const router = Router();
const userController = require ('../controllers/users-controller');

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     description: Usar para solicitar un usuario.
 *     tags: 
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 */
router.get('/users/:id', userController.getUserById);

/**
 * @swagger
 * /users:
 *   get:
 *     description: Usar para obtener todos los usuarios.
 *     tags: 
 *       - Usuarios
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 */
router.get('/users', userController.getUsers);

module.exports = router;
