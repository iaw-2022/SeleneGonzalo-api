var { expressjwt: jwt } = require("express-jwt");
var jwks = require('jwks-rsa');

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-c0-abgh2.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://localhost:3000',
  issuer: 'https://dev-c0-abgh2.us.auth0.com/',
  algorithms: ['RS256']
});

module.exports = jwtCheck