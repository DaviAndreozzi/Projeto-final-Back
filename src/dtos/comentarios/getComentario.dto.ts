import z from "zod"
import { ComentariosModel } from "../../models/Comentarios"

export  interface GetComentariosInputDTO{
  token:string
}

export type GetComentariosOutputDTO = ComentariosModel[]

export const GetComentariosSchema = z.object({
  token:z.string().min(2)
}).transform(data => data as GetComentariosInputDTO)