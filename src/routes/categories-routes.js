const { Router } = require ('express');
const router = Router();
const categoryController = require ('../controllers/categories-controller');
const auth = require('../auth');

//AUTH
router.get('/authorized',auth, function (req, res) {
    res.send('Secured Resource');
});

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     description: Usar para solicitar una categoría.
 *     tags: 
 *       - Categorías
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la categoría
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
 *               example: Desayuno
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
router.get('/categories/:id', categoryController.getCategorieById);

/**
 * @swagger
 * /categories:
 *   get:
 *     description: Usar para obtener todas las categorías.
 *     tags: 
 *       - Categorías
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
 *                 example: Desayuno    
 *       '404':
 *         description: No se encontró.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: No se encontró.
 */
router.get('/categories', categoryController.getCategories);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     description: Usar para eliminar una categoria.
 *     security: 
 *       - bearerAuth: []
 *     tags: 
 *       - Categorías
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *             type: integer
 *         required: true
 *         description: ID de la categoría a eliminar.
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: string
 *               example: Categoría eliminada satisfactoriamente.
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
 *               example: No se encontró la categoría.
 */
 router.delete('/categories/:id',auth, categoryController.deleteCategory);

 /**
 * @swagger
 * /categories:
 *   put:
 *     description: Usar para modificar una categoría.
 *     security: 
 *       - bearerAuth: []
 *     tags: 
 *       - Categorías
 *     parameters:
 *       - in: body
 *         name: category
 *         description: Datos a modificar.
 *         schema:
 *           type: object
 *           required: 
 *             - id_category
 *             - name
 *           properties:
 *             id_category:
 *               type: integer
 *             name:
 *               type: string
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: string
 *               example: Categoría modificada satisfactoriamente.
 *       '400':
 *         description: Parámetro inválido.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: Algo salió mal.
 *       '404':
 *         description: No se encontró.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: No se encontró la categoría.
 */
router.put('/categories',auth, categoryController.updateCategory);

module.exports = router;
