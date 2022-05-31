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
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             name:
 *               type: string
 *               example: prueba
 *             email:
 *               type: string
 *               example: prueba@mail.com
 *       '400':
 *         description: Parámetro inválido.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: No se encontró.
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
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: prueba
 *               email:
 *                 type: string
 *                 example: prueba@mail.com  
 *       '400':
 *         description: Parámetro inválido.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: No se encontró el usuario.
 */
router.get('/users', userController.getUsers);

module.exports = router;
