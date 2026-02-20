const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Signup Endpoint Logic
exports.signup = async (req, res) => {
    const { email, password } = req.body;
    
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message:"User already exists"});

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });

    const token = jwt.sign({ id: user._id, role: user.role}, process.env.JWT_SECRET);
    res.json(token);
};