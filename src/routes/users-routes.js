const { Router } = require ('express');
const router = Router();
const userController = require ('../controllers/users-controller');

router.get('/users/:id', userController.getUserById);
router.get('/users', userController.getUsers);

module.exports = router;
