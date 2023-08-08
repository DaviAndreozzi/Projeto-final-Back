import { ComentariosDatabase } from "../database/ComentarioDatabase";
import { CreateComentariosInputDTO, CreateComentariosOutputDTO } from "../dtos/comentarios/createComentario.dto";
import { DeleteComentariosInputDTO, DeleteComentariosOutputDTO } from "../dtos/comentarios/deleteComentario";
import { EditComentariosInputDTO, EditComentariosOutputDTO } from "../dtos/comentarios/editComentario.dto";
import { GetComentariosInputDTO, GetComentariosOutputDTO } from "../dtos/comentarios/getComentario.dto";
import { LikeOrDislikeComentariosInputDTO, LikeOrDislikeComentariosOutputDTO } from "../dtos/comentarios/likeOrDislike.dtos";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { Comentarios, Comentarios_Like, LikeDislikeDB } from "../models/Comentarios";
import { USER_ROLES } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class ComentariosBusiness {
  constructor(
    private comentariosDatabase: ComentariosDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) { }

  public createComentarios = async (input: CreateComentariosInputDTO): Promise<CreateComentariosOutputDTO> => {
    const { name, token } = input

    const payload = this.tokenManager.getPayload(token)

    if (!payload) {
      throw new UnauthorizedError()
    }

    const id = this.idGenerator.generate()

    const comentarios = new Comentarios(
      id,
      name,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString(),
      payload.id,
      payload.name
    )
    const ComentariosDB = comentarios.toDBModel()
    await this.comentariosDatabase.insertComentarios(ComentariosDB)

    const output: CreateComentariosOutputDTO = undefined

    return output
  }
  
  public getComentarios = async (input: GetComentariosInputDTO): Promise<GetComentariosOutputDTO> => {
    const { token } = input

    const payload = this.tokenManager.getPayload(token)

    if (!payload) {
      throw new UnauthorizedError()
    }

    const CreatorComentarios = await this.comentariosDatabase.getCreatorComentarios()

    const comentarios = CreatorComentarios.map((Conteudocomentarios) => {
      const comentarios = new Comentarios(
        Conteudocomentarios.id,
        Conteudocomentarios.comentarios,
        Conteudocomentarios.likes,
        Conteudocomentarios.dislikes,
        Conteudocomentarios.created_at,
        Conteudocomentarios.updated_at,
        Conteudocomentarios.creator_id,
        Conteudocomentarios.comentarios 
      )
      return comentarios.toBusinessModel()
    })

    const output: GetComentariosOutputDTO = comentarios

    return output

  }

  public editcomentarios = async (input: EditComentariosInputDTO): Promise<EditComentariosOutputDTO> => {
    const { comentarios, token, idToEdit } = input

    const payload = this.tokenManager.getPayload(token)

    if (!payload) {
      throw new UnauthorizedError()
    }

    const comentarioDB = await this.comentariosDatabase.findComentariosById(idToEdit)

    if (!comentarioDB) {
      throw new NotFoundError("Postagem com essa id não existe ")
    }

    if (payload.id !== comentarioDB.creator_id) {
      throw new ForbiddenError("somente quem criou a postagem pode editá-la")
    }

    const comentaros = new Comentarios(
      comentarioDB.id,
      comentarioDB.comentarios,
      comentarioDB.likes,
      comentarioDB.dislikes,
      comentarioDB.created_at,
      comentarioDB.updated_at,
      comentarioDB.creator_id,
      payload.name
    )

    comentaros.setComentarios(comentarios)

    const comentariosDB = comentaros.toDBModel()

    await this.comentariosDatabase.updateComentarios(comentariosDB)


    const output: EditComentariosOutputDTO = undefined

    return output
  }

  public likeOrDislikecomentarios = async (input: LikeOrDislikeComentariosInputDTO): Promise<LikeOrDislikeComentariosOutputDTO> => {
    const { token, like, ComentariosId } = input

    const payload = this.tokenManager.getPayload(token)

    if (!payload) {
      throw new UnauthorizedError()
    }

    const ComentariosDBCreator = await this.comentariosDatabase.findComentariosCreatorDBById(ComentariosId)

    if (!ComentariosDBCreator) {
      throw new NotFoundError("postagem com essa id não existe")
    }

    const comentario = new Comentarios(
      ComentariosDBCreator.id,
      ComentariosDBCreator.comentarios,
      ComentariosDBCreator.likes,
      ComentariosDBCreator.dislikes,
      ComentariosDBCreator.created_at,
      ComentariosDBCreator.updated_at,
      ComentariosDBCreator.creator_id,
      ComentariosDBCreator.creator_comentarios
    )

    const likeSQlite = like ? 1 : 0

    const likeDislikeDB: LikeDislikeDB = {
      user_id: payload.id,
      comentarios_id: ComentariosId,
      like: likeSQlite
    }

    const likeDislikeExists = await this.comentariosDatabase.findLikeDislike(likeDislikeDB)

    if (likeDislikeExists == Comentarios_Like.ALREADY_LIKED) {
      if (like) {
        await this.comentariosDatabase.removeLIkeDislike(likeDislikeDB)
        comentario.removeLike()
      } else {
        await this.comentariosDatabase.updateLikeDislike(likeDislikeDB)
        comentario.removeLike()
        comentario.addDislike()
      }
    } else if (likeDislikeExists == Comentarios_Like.ALREADY_DISLIKE) {
      if (like === false) {
        await this.comentariosDatabase.removeLIkeDislike(likeDislikeDB)
        comentario.removeDislike()
      } else {
        await this.comentariosDatabase.updateLikeDislike(likeDislikeDB)
        comentario.removeDislike()
        comentario.addDislike()
      }
    } else {
      await this.comentariosDatabase.insertLikeDislike(likeDislikeDB)
      like ? comentario.addLike() : comentario.addDislike()
    }
    const updatecomentarioDB = comentario.toDBModel()
    await this.comentariosDatabase.updateComentarios(updatecomentarioDB)

    const output: LikeOrDislikeComentariosOutputDTO = undefined

    return output
  }

  public deleteComentarios = async (input: DeleteComentariosInputDTO): Promise<DeleteComentariosOutputDTO> => {
    const { token, idToDelete } = input

    const payload = this.tokenManager.getPayload(token)

    if (!payload) {
      throw new UnauthorizedError()
    }

    const playlistDB = await this.comentariosDatabase.findComentariosById(idToDelete)

    if (!playlistDB) {
      throw new NotFoundError("Playlist com essa id não existe ")
    }

    if (payload.role !== USER_ROLES.ADMIN) {
      if (payload.id !== playlistDB.creator_id) {
        throw new ForbiddenError("somente quem criou a playlist pode editá-la")
      }
    }

    await this.comentariosDatabase.deleteComentariosById(idToDelete)


    const output: DeleteComentariosOutputDTO = undefined

    return output
  }
  
}