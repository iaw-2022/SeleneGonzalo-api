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
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
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
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 */
router.get('/categories', categoryController.getCategories);

/**
 * @swagger
 * /categories:
 *   post:
 *     description: Usar para eliminar una categoría.
 *     security: 
 *       - bearerAuth: []
 *     tags: 
 *       - Categorías
 *     parameters:
 *       - in: body
 *         name: category
 *         description: Categoria a eliminar.
 *         schema:
 *           type: integer
 *           required: 
 *             - id_category
 *           properties:
 *             id_category:
 *               type: integer
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 */
 router.post('/categories',auth, categoryController.createCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     description: Usar para eliminar una categoría.
 *     security: 
 *       - bearerAuth: []
 *     tags: 
 *       - Categorías
 *     parameters:
 *       - in: body
 *         name: category
 *         description: Categoria a eliminar.
 *         schema:
 *           type: integer
 *           required: 
 *             - id_category
 *           properties:
 *             id_category:
 *               type: integer
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
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
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 */
router.put('/categories',auth, categoryController.updateCategory);

module.exports = router;
