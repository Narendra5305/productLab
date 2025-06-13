

const express = require('express');
const {registeration , signIn } = require("../controllers/userController")


const UserRouter = express.Router()

UserRouter.post('/register' , registeration)
UserRouter.post('/signin' , signIn )


module.exports ={UserRouter}