const express = require ('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swagger');
const swaggerDocs = swaggerJsDoc(swaggerOptions);
const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//ROUTES
app.use(require('./routes/recipes-routes'));
app.use(require('./routes/categories-routes'));
app.use(require('./routes/ingredients-routes'));
app.use(require('./routes/users-routes'));
app.use(require('./routes/qualifies-routes'));

//DOCUMENTATION
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//PORT
app.listen(3000);
console.log('Server on port 3000');
