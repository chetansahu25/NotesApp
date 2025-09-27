const jwt = require("jsonwebtoken");
const { generateTokens } = require("../utils/generateToken");
const cookieOptions = require("../utils/cookieOptions");


function authMiddleware(req, res, next) {
    const token = req.cookies.accessToken;
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(401).json({ message: "Unauthorized, Kindly Login" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            if (refreshToken) {
                jwt.verify( refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                        if (err) {
                            console.log("Refresh token invalid or expired");
                            return res
                                .status(403)
                                .json({
                                    message: "Not able to verify user",
                                });
                        }
                        const { accessToken } = generateTokens("access", decoded);

                        req.userId = decoded._id;
                        req.organisationId = decoded.organisationId;
                        req.role = decoded.role;   
                        res.cookie("accessToken", accessToken, {
                            ...cookieOptions,
                            maxAge: 15 * 60 * 1000,
                        }); // 15 minutes
                    }
                );
            } else {
                return res
                    .status(403)
                    .json({
                        message: "Not able to verify user, Login Again 1",
                    });
            }
        }

        req.userId = decoded._id;
        req.organisationId = decoded.organisationId;
        req.role = decoded.role;
        next();
    });
}

module.exports = authMiddleware;
