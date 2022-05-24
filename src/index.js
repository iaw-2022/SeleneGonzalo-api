const express = require ('express');
const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//ROUTES
app.use(require('./routes/recipes-routes'));
app.use(require('./routes/categories-routes'));

//PORT
app.listen(3000);
console.log('Server on port 3000');
