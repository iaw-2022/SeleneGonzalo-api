const config = require('../config');
const axios = require('axios').default;

getUserInfoFromToken = async (req) => {
    const token = req.headers.authorization.split(' ')[1];
        
    const header = {
        headers: {
            authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get("https://dev-c0-abgh2.us.auth0.com/userinfo", header);
    
    return response.data;
}

module.exports = {
    getUserInfoFromToken
}