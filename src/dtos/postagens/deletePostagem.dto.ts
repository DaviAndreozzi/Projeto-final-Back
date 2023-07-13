import z from "zod"

export interface DeletePostagemInputDTO{
  token:string
  idToDelete:string
}

export type DeletePostagemOutputDTO = undefined

export const DeletePostagemSchema = z.object({
  token:z.string().min(1),
  idToDelete:z.string().min(1)
}).transform(data=>data as DeletePostagemInputDTO)