import z from "zod"
import { PostagemModel } from "../../models/Postagem"

export  interface GetPostagemInputDTO{
  token:string
}

export type GetPostagemOutputDTO = PostagemModel[]

export const GetPostagemSchema = z.object({
  token:z.string().min(2)
}).transform(data => data as GetPostagemInputDTO)