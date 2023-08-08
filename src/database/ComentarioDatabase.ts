import { ComentariosDB, ComentariosDBCreatorcomentarios, Comentarios_Like, LikeDislikeDB } from "../models/Comentarios";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class ComentariosDatabase extends BaseDatabase {
  public static TABLE_Comentarios = "comentarios"
  public static TABLE_LIKES_DISLIKES = "likes_dislikes"

  public insertComentarios = async (comentariosDB: ComentariosDB): Promise<void> => {
    await BaseDatabase.connection(ComentariosDatabase.TABLE_Comentarios)
      .insert(comentariosDB)
  }

  public getCreatorComentarios = async (): Promise<ComentariosDBCreatorcomentarios[]> => {
    const result = await BaseDatabase.connection(ComentariosDatabase.TABLE_Comentarios)
      .select(
        `${ComentariosDatabase.TABLE_Comentarios}.id`,
        `${ComentariosDatabase.TABLE_Comentarios}.creator_id`,
        `${ComentariosDatabase.TABLE_Comentarios}.comentarios`,
        `${ComentariosDatabase.TABLE_Comentarios}.likes`,
        `${ComentariosDatabase.TABLE_Comentarios}.dislikes`,
        `${ComentariosDatabase.TABLE_Comentarios}.created_at`,
        `${ComentariosDatabase.TABLE_Comentarios}.updated_at`,
        `${UserDatabase.TABLE_USERS}.name`
      )
      .join(`${UserDatabase.TABLE_USERS}`, `${ComentariosDatabase.TABLE_Comentarios}.creator_id`, "=", `${UserDatabase.TABLE_USERS}.id`)
    return result as ComentariosDBCreatorcomentarios[]
  }

  public findComentariosById = async (id: string): Promise<ComentariosDB | undefined> => {
    const [result] = await BaseDatabase.connection(ComentariosDatabase.TABLE_Comentarios)
      .select()
      .where({ id })
    return result as ComentariosDB | undefined
  }

  public updateComentarios = async (comentariosDB: ComentariosDB): Promise<void> => {
    await BaseDatabase.connection(ComentariosDatabase.TABLE_Comentarios)
      .update(comentariosDB)
      .where({ id: comentariosDB.id })
  }

  public findComentariosCreatorDBById = async (id: string): Promise<ComentariosDBCreatorcomentarios | undefined> => {
    const [result] = await BaseDatabase.connection(ComentariosDatabase.TABLE_Comentarios)
      .select(
        `${ComentariosDatabase.TABLE_Comentarios}.id`,
        `${ComentariosDatabase.TABLE_Comentarios}.creator_id`,
        `${ComentariosDatabase.TABLE_Comentarios}.comentarios`,
        `${ComentariosDatabase.TABLE_Comentarios}.likes`,
        `${ComentariosDatabase.TABLE_Comentarios}.dislikes`,
        `${ComentariosDatabase.TABLE_Comentarios}.created_at`,
        `${ComentariosDatabase.TABLE_Comentarios}.updated_at`,
        `${UserDatabase.TABLE_USERS}.name`
      )
      .join(`${UserDatabase.TABLE_USERS}`, `${ComentariosDatabase.TABLE_Comentarios}.creator_id`, "=", `${UserDatabase.TABLE_USERS}.id`)
      .where({ [`${ComentariosDatabase.TABLE_Comentarios}.id`]: id })
    return result as ComentariosDBCreatorcomentarios | undefined
  }

  public findLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<Comentarios_Like | undefined> => {
    const [result]: Array<LikeDislikeDB | undefined> = await BaseDatabase.connection(ComentariosDatabase.TABLE_LIKES_DISLIKES)
      .select()
      .where({
        user_id: likeDislikeDB.user_id,
        comentarios_id: likeDislikeDB.comentarios_id
      })
    if (result === undefined) {
      return undefined
    } else if (result.like === 1) {
      return Comentarios_Like.ALREADY_LIKED
    } else {
      return Comentarios_Like.ALREADY_DISLIKE
    }
  }

  public removeLIkeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
    await BaseDatabase.connection(ComentariosDatabase.TABLE_LIKES_DISLIKES)
      .delete()
      .where({
        user_id: likeDislikeDB.user_id,
        comentarios_id: likeDislikeDB.comentarios_id
      })
  }

  public updateLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
    await BaseDatabase.connection(ComentariosDatabase.TABLE_LIKES_DISLIKES)
      .update(likeDislikeDB)
      .where({
        user_id: likeDislikeDB.user_id,
        comentarios_id: likeDislikeDB.comentarios_id
      })
  }

  public insertLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
    await BaseDatabase.connection(ComentariosDatabase.TABLE_LIKES_DISLIKES)
      .insert(likeDislikeDB)
  }

  public deleteComentariosById = async (id: string): Promise<void> => {
    await BaseDatabase.connection(ComentariosDatabase.TABLE_Comentarios)
      .delete()
      .where({ id })
  }
}