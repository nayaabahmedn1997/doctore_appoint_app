import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
export const registerUser = async (req, res) => {
    try {

        const { email, password,  name } = req.body;
        //Check is user exists
        if (await userModel.findOne({ email })) {
            return res.status(401).json({
                "message": "User already exists please login",
                "success": false
            });
        }

        const newUser = new userModel({ name, email, password });
        await newUser.save();

        return res.status(201).json({
            "message": "User registered successfully",
            "success": true
        })

    } catch (error) {
        return res.status(500).json({ "message": `${error.message}` })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Check is user exists
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(401).json({
                "message": "User doesn't exists",
                "success": false
            });
        }


        //Login the user
        const isPasswordCorrect = await user.comparePassword(password);;
        if (!isPasswordCorrect) {
            {
                return res.status(401).json({
                    "message": "Invalid email or password",
                    "success": false
                });
            }
        }

        if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        console.log(token)
        return res.status(200).json({
            "message": "User login successful",
            "success": true,
            token
        })



    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ "message": `${error.message}` })
    }
}

export const getUserData = async(req, res)=>{
    try {
        const {userId} = req.body;
        const user = await userModel.findById(userId).select('-password -__v');

        if(!user)
        {
            return res.status(401).json(
                {
                    "message":"User doesn't exists",
                    success:false
                }
            )
        }
        return res.status(200).json({
            "message":"User found successfully",
            user,
            "success":true
        })

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ "message": `${error.message}` })
    }
}