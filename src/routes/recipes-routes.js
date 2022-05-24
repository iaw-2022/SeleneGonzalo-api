const { Router } = require ('express');
const router = Router();
const recipeController = require ('../controllers/recipes-controller');

router.get('/recipes/:id', recipeController.getRecipeById);
router.get('/recipes', recipeController.getRecipes);
router.post('/recipes', recipeController.createRecipe);

module.exports = router;
