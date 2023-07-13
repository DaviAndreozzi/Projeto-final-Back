import { PostagemDatabase } from "../database/PostagemDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { CreatePostagemInputDTO, CreatePostagemOutputDTO } from "../dtos/postagens/createPostagem.dto";
import { DeletePostagemInputDTO, DeletePostagemOutputDTO } from "../dtos/postagens/deletePostagem.dto";
import { EditPostagemInputDTO, EditPostagemOutputDTO } from "../dtos/postagens/editpostagem.dto";
import { GetPostagemInputDTO, GetPostagemOutputDTO } from "../dtos/postagens/getPostagem.dto";
import { LikeOrDislikePostagemInputDTO, LikeOrDislikePostagemOutputDTO } from "../dtos/postagens/likeOrDislike.dto";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { LikeDislikeDB, Postagem, Postagem_Like } from "../models/Postagem";
import { USER_ROLES } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class PostagemBusiness {
  constructor(
    private postagemDatabase: PostagemDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) { }

  public createPostagem = async (input: CreatePostagemInputDTO): Promise<CreatePostagemOutputDTO> => {
    const { apelido, token } = input

    const payload = this.tokenManager.getPayload(token)

    if (!payload) {
      throw new UnauthorizedError()
    }

    const id = this.idGenerator.generate()

    const postagem = new Postagem(
      id,
      apelido,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString(),
      payload.id,
      payload.apelido
    )
    const PostagemDB = postagem.toDBModel()
    await this.postagemDatabase.insertPostagem(PostagemDB)

    const output: CreatePostagemOutputDTO = undefined

    return output
  }

  public getPostagem = async (input: GetPostagemInputDTO): Promise<GetPostagemOutputDTO> => {
    const { token } = input

    const payload = this.tokenManager.getPayload(token)

    if (!payload) {
      throw new UnauthorizedError()
    }

    const PostagemCreatorConteudoPostagem = await this.postagemDatabase.getCreatorConteudoDaPostagem()

    const postagem = PostagemCreatorConteudoPostagem.map((ConteudoDaPostagem) => {
      const postagem = new Postagem(
        ConteudoDaPostagem.id,
        ConteudoDaPostagem.conteudoDaPostagem,
        ConteudoDaPostagem.likes,
        ConteudoDaPostagem.dislikes,
        ConteudoDaPostagem.created_at,
        ConteudoDaPostagem.updated_at,
        ConteudoDaPostagem.creator_id,
        ConteudoDaPostagem.creator_conteudoDaPostagem
      )
      return postagem.toBusinessModel()
    })

    const output: GetPostagemOutputDTO = postagem

    return output

  }

  public editpostagem = async (input: EditPostagemInputDTO): Promise<EditPostagemOutputDTO> => {
    const { conteudoDaPostagem, token, idToEdit } = input

    const payload = this.tokenManager.getPayload(token)

    if (!payload) {
      throw new UnauthorizedError()
    }

    const PostagemDB = await this.postagemDatabase.findPostagemById(idToEdit)

    if (!PostagemDB) {
      throw new NotFoundError("Postagem com essa id não existe ")
    }

    if (payload.id !== PostagemDB.creator_id) {
      throw new ForbiddenError("somente quem criou a postagem pode editá-la")
    }

    const postegem = new Postagem(
      PostagemDB.id,
      PostagemDB.conteudoDaPostagem,
      PostagemDB.likes,
      PostagemDB.dislikes,
      PostagemDB.created_at,
      PostagemDB.updated_at,
      PostagemDB.creator_id,
      payload.apelido
    )

    postegem.setConteudoDaPostagem(conteudoDaPostagem)

    const PostagensDB = postegem.toDBModel()

    await this.postagemDatabase.updatePostagem(PostagensDB)


    const output: EditPostagemOutputDTO = undefined

    return output
  }

  public likeOrDislikePostagem = async (input: LikeOrDislikePostagemInputDTO): Promise<LikeOrDislikePostagemOutputDTO> => {
    const { token, like, postagemId } = input

    const payload = this.tokenManager.getPayload(token)

    if (!payload) {
      throw new UnauthorizedError()
    }

    const PostagemDBCreator = await this.postagemDatabase.findPostagemCreatorDBById(postagemId)

    if (!PostagemDBCreator) {
      throw new NotFoundError("postagem com essa id não existe")
    }

    const postagem = new Postagem(
      PostagemDBCreator.id,
      PostagemDBCreator.conteudoDaPostagem,
      PostagemDBCreator.likes,
      PostagemDBCreator.dislikes,
      PostagemDBCreator.created_at,
      PostagemDBCreator.updated_at,
      PostagemDBCreator.creator_id,
      PostagemDBCreator.creator_conteudoDaPostagem
    )

    const likeSQlite = like ? 1 : 0

    const likeDislikeDB: LikeDislikeDB = {
      user_id: payload.id,
      postagens_id: postagemId,
      like: likeSQlite
    }

    const likeDislikeExists = await this.postagemDatabase.findLikeDislike(likeDislikeDB)

    if (likeDislikeExists == Postagem_Like.ALREADY_LIKED) {
      if (like) {
        await this.postagemDatabase.removeLIkeDislike(likeDislikeDB)
        postagem.removeLike()
      } else {
        await this.postagemDatabase.updateLikeDislike(likeDislikeDB)
        postagem.removeLike()
        postagem.addDislike()
      }
    } else if (likeDislikeExists === Postagem_Like.ALREADY_DISLIKE) {
      if (like === false) {
        await this.postagemDatabase.removeLIkeDislike(likeDislikeDB)
        postagem.removeDislike()
      } else {
        await this.postagemDatabase.updateLikeDislike(likeDislikeDB)
        postagem.removeDislike()
        postagem.addDislike()
      }
    } else {
      await this.postagemDatabase.insertLikeDislike(likeDislikeDB)
      like ? postagem.addLike() : postagem.addDislike()
    }
    const updatepostagemDB = postagem.toDBModel()
    await this.postagemDatabase.updatePostagem(updatepostagemDB)

    const output: LikeOrDislikePostagemOutputDTO = undefined

    return output
  }

  public deletePostagem = async (input: DeletePostagemInputDTO): Promise<DeletePostagemOutputDTO> => {
    const { token, idToDelete } = input

    const payload = this.tokenManager.getPayload(token)

    if (!payload) {
      throw new UnauthorizedError()
    }

    const playlistDB = await this.postagemDatabase.findPostagemById(idToDelete)

    if (!playlistDB) {
      throw new NotFoundError("Playlist com essa id não existe ")
    }

    if (payload.role !== USER_ROLES.ADMIN) {
      if (payload.id !== playlistDB.creator_id) {
        throw new ForbiddenError("somente quem criou a playlist pode editá-la")
      }
    }

    await this.postagemDatabase.deletePlaylistById(idToDelete)


    const output: DeletePostagemOutputDTO = undefined

    return output
  }

}
