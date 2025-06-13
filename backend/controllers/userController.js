
const {UserModel} = require('../models/userModel'); 

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// for User registration
const registeration = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        const existUser = await UserModel.findOne({ email });
        if (existUser) {
            return res.status(409).json({ msg: 'User with this email already exists.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword 
        });

        await newUser.save();
        res.status(201).json({ msg: 'User registered successfully'});

    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' });
    }
};



// for User sign-in
const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'credentials not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'not found' });
        }

        // for generatew token
        const token = jwt.sign({ userId: user._id, role: user.role }  , process.env.JWT_SECRET , { expiresIn: '24h' });

        res.status(200).json({ message: 'Sign in successful'  , token , role:user.role});

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {registeration , signIn };