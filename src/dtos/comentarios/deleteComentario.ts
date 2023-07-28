import z from "zod"

export interface DeleteComentariosInputDTO{
  token:string
  idToDelete:string
}

export type DeleteComentariosOutputDTO = undefined

export const DeleteComentariosSchema = z.object({
  token:z.string().min(1),
  idToDelete:z.string().min(1)
}).transform(data=>data as DeleteComentariosInputDTO)