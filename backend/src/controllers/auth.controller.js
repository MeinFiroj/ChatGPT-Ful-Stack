const userModel = require("../models/user.model")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


async function register(req, res) {
    const { email, password, fullName: { firstName, lastName } } = req.body

    // console.log(req.body)

    const userExists = await userModel.findOne({ email })

    if (userExists) {
        return res.status(400).json({
            message: 'User already exists'
        })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        email, password: hashPassword, fullName: { firstName, lastName }
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' })
    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user : {
            id : user._id,
            email : user.email,
            fullName : user.fullName
        }
    })
}

async function login(req, res) {
    const {email, password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({message : "Invalid email or password"})
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword){
        return res.status(400).json({message : 'Invalid email or password'})
    }

    const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn : '2h'})
    res.cookie("token", token)

    res.status(200).json({
        message : "User logged in successfully",
        user : {
            id : user._id,
            email : user.email,
            fullName : user.fullName
        }
    })
}

async function verifyUser(req, res) {
    const {_id, email, fullName : {firstName, lastName}} = req.user
    res.status(200).json({
        message : "user fetched successfully",
        user : {
           id : _id,
           email,
           fullName: {firstName, lastName}
        }
    })
}

module.exports = {
    register, login, verifyUser
}