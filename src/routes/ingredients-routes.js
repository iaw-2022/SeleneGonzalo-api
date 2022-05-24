const { Router } = require ('express');
const router = Router();
const ingredientController = require ('../controllers/ingredients-controller');

router.get('/ingredients/:id', ingredientController.getIngredientById);
router.get('/ingredients', ingredientController.getIngredients);

module.exports = router;
