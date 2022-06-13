const { Router } = require ('express');
const router = Router();
const userController = require ('../controllers/users-controller');

/**
 * @swagger
 * definitions:
 *   Usuarios:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         description: "El id del usuario"
 *       name:
 *         type: string
 *         description: "Nombre del usuario"
 *       email:
 *         type: string
 *         description: "Email del usuario" 
 *     example:
 *       id: "1"
 *       name: "Selene"
 *       email: "selene@mail.com" 
 */

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
 *           $ref: '#definitions/Usuarios' 
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró el usuario.
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
 *             $ref: '#definitions/Usuarios'  
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró ningún usuario.
 */
router.get('/users', userController.getUsers);

module.exports = router;
