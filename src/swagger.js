const config = require('./config');
const path = require("path")

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: 'Recetaccs API',
            description: 'API Docs',
            servers: [config.SERVER],
            version: "1.0.0"
        },
        securityDefinitions: {
            apiKeyAuth: {
                type: 'apiKey',
                name: 'X-Api-Key',
                scheme: 'bearer',
                in: 'header',
            },
        },
    },
    apis: [`${path.join(__dirname, "./routes/*-routes.js")}`],
}

module.exports = swaggerOptions