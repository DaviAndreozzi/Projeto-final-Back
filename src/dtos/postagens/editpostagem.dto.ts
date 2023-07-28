import z from "zod"

export interface EditPostagemInputDTO{
  conteudo:string,
  token:string,
  idToEdit:string
}

export type EditPostagemOutputDTO= undefined

export const EditPostagemSchema = z.object({
  conteudo:z.string().min(4),
  token:z.string().min(1),
  idToEdit:z.string().min(1)
}).transform(data => data as EditPostagemInputDTO)