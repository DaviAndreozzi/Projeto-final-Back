import { LikeDislikeDB, PostagemDB, PostagemDBCreatorConteudo, Postagem_Like } from "../models/Postagem";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class PostagemDatabase extends BaseDatabase {
  public static TABLE_POSTAGENS = "postagens"
  public static TABLE_LIKES_DISLIKES = "likes_dislikes"

  public insertPostagem = async (postagemDB: PostagemDB): Promise<void> => {
    await BaseDatabase.connection(PostagemDatabase.TABLE_POSTAGENS)
      .insert(postagemDB)
  }

  public getCreatorConteudoDaPostagem = async (): Promise<PostagemDBCreatorConteudo[]> => {
    const result = await BaseDatabase.connection(PostagemDatabase.TABLE_POSTAGENS)
      .select(
        `${PostagemDatabase.TABLE_POSTAGENS}.id`,
        `${PostagemDatabase.TABLE_POSTAGENS}.creator_id`,
        `${PostagemDatabase.TABLE_POSTAGENS}.conteudo`,
        `${PostagemDatabase.TABLE_POSTAGENS}.likes`,
        `${PostagemDatabase.TABLE_POSTAGENS}.dislikes`,
        `${PostagemDatabase.TABLE_POSTAGENS}.created_at`,
        `${PostagemDatabase.TABLE_POSTAGENS}.updated_at`,
        `${UserDatabase.TABLE_USERS}.apelido`
      )
      .join(`${UserDatabase.TABLE_USERS}`, `${PostagemDatabase.TABLE_POSTAGENS}.creator_id`, "=", `${UserDatabase.TABLE_USERS}.id`)
    return result as PostagemDBCreatorConteudo[]
  }

  public findPostagemById = async (id: string): Promise<PostagemDB | undefined> => {
    const [result] = await BaseDatabase.connection(PostagemDatabase.TABLE_POSTAGENS)
      .select()
      .where({ id })
    return result as PostagemDB | undefined
  }

  public updatePostagem = async (PostagensDB: PostagemDB): Promise<void> => {
    await BaseDatabase.connection(PostagemDatabase.TABLE_POSTAGENS)
      .update(PostagensDB)
      .where({ id: PostagensDB.id })
  }

  public findPostagemCreatorDBById = async (id: string): Promise<PostagemDBCreatorConteudo | undefined> => {
    const [result] = await BaseDatabase.connection(PostagemDatabase.TABLE_POSTAGENS)
      .select(
        `${PostagemDatabase.TABLE_POSTAGENS}.id`,
        `${PostagemDatabase.TABLE_POSTAGENS}.creator_id`,
        `${PostagemDatabase.TABLE_POSTAGENS}.conteudo`,
        `${PostagemDatabase.TABLE_POSTAGENS}.likes`,
        `${PostagemDatabase.TABLE_POSTAGENS}.dislikes`,
        `${PostagemDatabase.TABLE_POSTAGENS}.created_at`,
        `${PostagemDatabase.TABLE_POSTAGENS}.updated_at`,
        `${UserDatabase.TABLE_USERS}.apelido`
      )
      .join(`${UserDatabase.TABLE_USERS}`, `${PostagemDatabase.TABLE_POSTAGENS}.creator_id`, "=", `${UserDatabase.TABLE_USERS}.id`)
      .where({ [`${PostagemDatabase.TABLE_POSTAGENS}.id`]: id })
    return result as PostagemDBCreatorConteudo | undefined
  }

  public findLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<Postagem_Like | undefined> => {
    const [result]: Array<LikeDislikeDB | undefined> = await BaseDatabase.connection(PostagemDatabase.TABLE_LIKES_DISLIKES)
      .select()
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id
      })
    if (result === undefined) {
      return undefined
    } else if (result.like === 1) {
      return Postagem_Like.ALREADY_LIKED
    } else {
      return Postagem_Like.ALREADY_DISLIKE
    }
  }

  public removeLIkeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
    await BaseDatabase.connection(PostagemDatabase.TABLE_LIKES_DISLIKES)
      .delete()
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id
      })
  }

  public updateLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
    await BaseDatabase.connection(PostagemDatabase.TABLE_LIKES_DISLIKES)
      .update(likeDislikeDB)
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id
      })
  }

  public insertLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
    await BaseDatabase.connection(PostagemDatabase.TABLE_LIKES_DISLIKES)
      .insert(likeDislikeDB)
  }

  public deletePostagemById = async (id: string): Promise<void> => {
    await BaseDatabase.connection(PostagemDatabase.TABLE_POSTAGENS)
      .delete()
      .where({ id })
  }
}