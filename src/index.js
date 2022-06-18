const express = require ('express');
const res = require('express/lib/response');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swagger');
const swaggerDocs = swaggerJsDoc(swaggerOptions);
const app = express();
const cors = require('cors');

//CORS
app.use(cors());

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req,res) => {
    res.json({
        message : 'Bienvenido a la API de RECETACCS',
    })
});

//ROUTES
app.use(require('./routes/recipes-routes'));
app.use(require('./routes/categories-routes'));
app.use(require('./routes/ingredients-routes'));
app.use(require('./routes/users-routes'));
app.use(require('./routes/qualifies-routes'));
app.use(require('./routes/has-routes'));
app.use(require('./routes/belongs-routes'));

//AUTH
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({error: "Invalid token"});
    }
});

//DOCUMENTATION
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//PORT
app.listen(process.env.PORT);
console.log('Server on port '+process.env.PORT);
