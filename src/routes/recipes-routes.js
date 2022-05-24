const { Router } = require ('express');
const router = Router();
const recipeController = require ('../controllers/recipes-controller');

router.get('/recipes/:id', recipeController.getRecipeById);
router.get('/recipes', recipeController.getRecipes);

module.exports = router;
