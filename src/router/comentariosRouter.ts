import express from 'express'
import { ComentariosController } from '../controller/ComentarioController'
import { ComentariosBusiness } from '../business/ComentarioBusiness'
import { ComentariosDatabase } from '../database/ComentarioDatabase'
import { IdGenerator } from '../services/IdGenerator'
import { TokenManager } from '../services/TokenManager'

export const comentariosRouter = express.Router()

const comentariosController = new ComentariosController(
  new ComentariosBusiness(
    new ComentariosDatabase(),
    new IdGenerator(),
    new TokenManager(),
  )
)
// Cria Comentarios
comentariosRouter.post("/", comentariosController.createComentarios)

// Verificando todos os usuarios
comentariosRouter.get("/", comentariosController.getComentarios)

// Alterar informações do Usuario
comentariosRouter.put("/:id", comentariosController.editComentarios)

// Likes e deslikes Do Usuario
comentariosRouter.put("/:id/like", comentariosController.LikeOrDislikeComentarios)

// Deletar usuario(excluir conta)
comentariosRouter.delete("/:id", comentariosController.deleteComentarios)