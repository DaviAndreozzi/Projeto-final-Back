import z from "zod"

export interface LikeOrDislikePostagemInputDTO{
  postagemId:string,
  token:string,
  like:boolean
}

export type LikeOrDislikePostagemOutputDTO = undefined

export const LikeOrDislikePostagemSchema = z.object({
  postagemId:z.string().min(1),
  token:z.string().min(1),
  like:z.boolean()
}).transform(data => data as LikeOrDislikePostagemInputDTO)