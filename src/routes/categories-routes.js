const { Router } = require ('express');
const router = Router();
const categoryController = require ('../controllers/categories-controller');

router.get('/categories/:id', categoryController.getCategorieById);
router.get('/categories', categoryController.getCategories);

module.exports = router;
