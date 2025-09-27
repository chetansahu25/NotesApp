const { generateTokens } = require("../utils/generateToken");
const { registerUser, loginUser } = require("../services/auth.service");
const cookieOptions = require("../utils/cookieOptions");

async function handleRegisterUser(req, res) {
    let { name, email, password, role, organisationId } = req.body;
    // Registration logic here
    try {
        const newUser = await registerUser(name, email, password, role, organisationId);

        //Generating Refresh Token & Access Token
        const { refreshToken } = generateTokens("refresh", newUser);
        const { accessToken } = generateTokens("access", newUser);

        res.cookie("refreshToken", refreshToken, 
            {...cookieOptions,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.cookie("accessToken", accessToken, {
            ...cookieOptions,
            maxAge: 15 * 60 * 1000,
        });
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: { ...newUser._doc },
            accessToken,
        });
    } catch (error) {
        console.log(error);
        // generating error message for different types of errors
        if (error.keyPattern.userId === 1) {
            res.status(409).json({ error: "User ID already exists" });
        } else if (error.keyPattern.email === 1) {
            res.status(409).json({ error: "Email already exists" });
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

async function handleLoginUser(req, res) {
    console.log("login hit");
    // Login logic here
    try {
        const user = await loginUser(req.body.email, req.body.password);
        // If login is successful, generate tokens
        const { refreshToken } = generateTokens("refresh", user);
        const { accessToken } = generateTokens("access", user);

        res.cookie("refreshToken", refreshToken, 
            {...cookieOptions,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.cookie("accessToken", accessToken, {
           ...cookieOptions,
            maxAge: 15 * 60 * 1000,
        });

        res.status(200).json({
            user,
            accessToken,
        });
    } catch (error) {
        if (
            error.message === "User not found" ||
            error.message === "Incorrect Email or password"
        ) {
            res.status(401).json({ error: "Incorrect Email or password" });
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
        console.error("Error logging in user:", error);
    }
}

function handleLogoutUser(req, res) {
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.status(200).send({ message: "Logged out successfully" });
}

module.exports = { handleRegisterUser, handleLoginUser, handleLogoutUser };
