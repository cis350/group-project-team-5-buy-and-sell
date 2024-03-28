// auth.controller.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from './userModel.js'; 

const secret = 'SecretKey'; 

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "you already registered before, try logining in" });

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashedPassword, firstName, lastName, role });
        
        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });
        
        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "general error?" });
        console.log(error);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "no such user with that email" });
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "wrong password/username" });
        
        const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: "1h" });
        
        res.status(200).json({ result: user, token });
    } catch (error) {
        res.status(500).json({ message: "general error?" });
        console.log(error);
    }
};

export { login, register };
