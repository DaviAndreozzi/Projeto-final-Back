import express from 'express'
import { PostagemController } from '../controller/PostagemController'

import { UserBusiness } from '../business/Userbusiness'
import { IdGenerator } from '../services/IdGenerator'
import { TokenManager } from '../services/TokenManager'
import { PostagemBusiness } from '../business/PostagemBusiness'
import { PostagemDatabase } from '../database/PostagemDatabase'

export const postagemRouter = express.Router()

const postagemController = new PostagemController(
  new PostagemBusiness(
    new PostagemDatabase,
    new IdGenerator,
    new TokenManager,
  )
)
// Cria Postagem
postagemRouter.post("/",postagemController.createPostagem)

// Verificando todos os usuarios
postagemRouter.get("/",postagemController.getPostagem)

// Alterar informações do Usuario
postagemRouter.put("/:id",postagemController.editpostagem)

// Likes e deslikes Do Usuario
postagemRouter.put("/:id/like",postagemController.LikeOrDislikePostagem)

// Deletar usuario(excluir conta)
postagemRouter.delete("/:id",postagemController.deletePostagem)