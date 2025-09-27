const jwt = require('jsonwebtoken');


function generateTokens(type, user) {

    //Generating Refresh Token
    if (type === 'refresh') {
        const refreshToken = jwt.sign({ _id: user._id, organisationId: user.organisationId, role: user.role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
        return { refreshToken };
    };

    //Generating Access Token
    if (type === 'access') {
        const accessToken = jwt.sign({ _id: user._id, organisationId: user.organisationId, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        return { accessToken };
    }
    
}

module.exports = { generateTokens };