import express from 'express'
import { UserController } from '../controller/UserController'
import { UserBusiness } from '../business/Userbusiness'
import { IdGenerator } from '../services/IdGenerator'
import { TokenManager } from '../services/TokenManager'
import { HashManager } from '../services/HashManager'
import { UserDatabase } from '../database/UserDatabase'

export const userRouter = express.Router()

const userController = new UserController(
  new UserBusiness(
    new UserDatabase,
    new IdGenerator,
    new TokenManager,
    new HashManager
  )
)


// Criação de usuario
userRouter.post("/signup",userController.signup)

// Efetuando o login no usuario existente
userRouter.post("/login",userController.Login)

