import z from "zod"

export interface EditComentariosInputDTO{
  comentarios:string,
  token:string,
  idToEdit:string
}

export type EditComentariosOutputDTO= undefined

export const EditComentariosSchema = z.object({
  comentarios:z.string().min(4),
  token:z.string().min(1),
  idToEdit:z.string().min(1)
}).transform(data => data as EditComentariosInputDTO)