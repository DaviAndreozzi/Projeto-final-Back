import z from "zod"

export interface LikeOrDislikeComentariosInputDTO{
  ComentariosId:string,
  token:string,
  like:boolean
}

export type LikeOrDislikeComentariosOutputDTO = undefined

export const LikeOrDislikeComentariosSchema = z.object({
  ComentariosId:z.string().min(1),
  token:z.string().min(1),
  like:z.boolean()
}).transform(data => data as LikeOrDislikeComentariosInputDTO)