const { Router } = require ('express');
const router = Router();
const qualifiesController = require ('../controllers/qualifies-controller');

router.get('/qualifies/:id', qualifiesController.getQualificationById);
router.get('/qualifies', qualifiesController.createQualification);

module.exports = router;
