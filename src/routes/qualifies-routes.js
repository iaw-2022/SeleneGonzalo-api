const { Router } = require ('express');
const router = Router();
const qualifiesController = require ('../controllers/qualifies-controller');
const auth = require('../auth');

//AUTH
router.get('/authorized',auth, function (req, res) {
    res.send('Secured Resource');
});

/**
 * @swagger
 * /qualifies/{id}:
 *   get:
 *     description: Usar para obtener una calificación.
 *     tags: 
 *       - Calificaciones
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la calificación
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 */
router.get('/qualifies/:id', qualifiesController.getQualificationById);

/**
 * @swagger
 * /qualifies:
 *   post:
 *     description: Usar para cargar una calificación.
 *     security: 
 *       - bearerAuth: []
 *     tags: 
 *       - Calificaciones
 *     parameters:
 *       - in: body
 *         name: qualification
 *         description: Calificación a cargar.
 *         schema:
 *           type: object
 *           required: 
 *             - id_user
 *             - id_recipe
 *             - commentary
 *             - qualification
 *           properties:
 *             id_user:
 *               type: integer
 *             id_recipe:
 *               type: integer
 *             commentary:
 *               type: string
 *             qualification:   
 *               type: string
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 */
router.post('/qualifies',auth, qualifiesController.createQualification);

/**
 * @swagger
 * /qualifies:
 *   delete:
 *     description: Usar para eliminar una calificación.
 *     tags: 
 *       - Calificaciones
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró.
 */
router.delete('/qualifies',auth, qualifiesController.deleteQualification);

module.exports = router;
