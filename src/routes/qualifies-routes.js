const { Router } = require ('express');
const router = Router();
const qualifiesController = require ('../controllers/qualifies-controller');
const auth = require('../auth');

/**
 * @swagger
 * definitions:
 *   Calificaciones:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         description: "El id de la calificación"
 *       id_user:
 *         type: string
 *         description: "El id del usuario que realizó la calificación"
 *       id_recipe:
 *         type: string
 *         description: "El id de la receta que calificó el usuario"
 *       commentary:
 *         type: string
 *         description: "Comentario del usuario"
 *       qualification:
 *         type: string
 *         description: "Puntaje final del usuario a la receta"   
 *     example:
 *       id: "3"
 *       id_user: "1"
 *       id_recipe: "2"
 *       commentary: "Muy buena"
 *       qualification: "10/10"  
 */

/**
 * @swagger
 * /qualifies/{id}:
 *   get:
 *     description: Usar para obtener una calificación.
 *     tags: 
 *       - Calificaciones
 *     parameters:
 *       - in: path
 *         name: id_recipe
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la receta de la calificación
 *     responses:
 *       '200':
 *         description: Exito en la consulta.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#definitions/Calificaciones'
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: Calificacion no encontrada.
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
 *               type: string
 *             id_recipe:
 *               type: string
 *             commentary:
 *               type: string
 *             qualification:   
 *               type: string
 *     responses:
 *       '200':
 *         description: Calificación enviada satisfactoriamente. 
 *       '400':
 *         description: Parámetro inválido.
 */
router.post('/qualifies',auth, qualifiesController.createQualification);

/**
 * @swagger
 * /qualifies:
 *   delete:
 *     description: Usar para eliminar una calificación.
 *     security: 
 *       - bearerAuth: []
 *     tags: 
 *       - Calificaciones
 *     parameters:
 *       - in: body
 *         name: qualification
 *         description: Calificación a eliminar.
 *         schema:
 *           type: object
 *           required: 
 *             - id
 *             - id_user
 *             - id_recipe
 *           properties:
 *             id:
 *               type: string
 *             id_user:
 *               type: string
 *             id_recipe:
 *               type: string
 *     responses:
 *       '200':
 *         description: Calificación removida satisfactoriamente. 
 *       '400':
 *         description: Parámetro inválido.
 *       '404':
 *         description: No se encontró la calificación.
 */
router.delete('/qualifies',auth, qualifiesController.deleteQualification);

module.exports = router;
