
const User = require("../model/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password ) {
            return res.status(400).json({
                errorMessage: "complete all filled",
                success: false
            });
        }
        console.log(req);
        const isExistingUser = await User.findOne({ username: username });
        if (isExistingUser) {
            return res
                .status(409)
                .json({success: false, errorMessage: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = new User({
            username,
            
            password: hashedPassword,
          
        });

        await userData.save();
        res.json({success: true, message: "User registered successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, errorMessage: "Something went wrong!" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                errorMessage: "Bad Request! Invalid credentials",
            });
        }
        console.log(req);
        const userDetails = await User.findOne({ username });

        if (!userDetails) {
            return res
                .status(401)
                .json({success: false, errorMessage: "User doesn't exists" });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            userDetails.password
        );

        if (!passwordMatch) {
            return res
                .status(401)
                .json({success: false, errorMessage: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: userDetails._id, name: userDetails.name },
            process.env.SECRET_CODE,
            { expiresIn: "60h" }
        );

        res.json({
            success: true,
            message: "User logged in",
            token: token,
            name: userDetails.name,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, errorMessage: "Something went wrong!" });
    }
};

module.exports = { registerUser, loginUser };