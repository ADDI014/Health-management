
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
   try { const {name , email , password} = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({message : "All fields required"});
    }

    const userExists = await User.findOne({email});

    if(userExists) {
        return res.status(400).json({message : "User ALready exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name, 
        email,
        password : hashedPassword
    });

    res.status(201).json({message : "User registered successfully"});
} catch(error) {
    res.status(500).json({message : "Registered failed"});
  }
};
