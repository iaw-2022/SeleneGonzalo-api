const { Router } = require ('express');
const router = Router();
const qualifiesController = require ('../controllers/qualifies-controller');

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
router.post('/qualifies', qualifiesController.createQualification);

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
router.delete('/qualifies', qualifiesController.deleteQualification);

module.exports = router;
