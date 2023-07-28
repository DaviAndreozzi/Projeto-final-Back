import z from 'zod'

export interface CreateComentariosInputDTO {
  apelido: string,
  token: string
}

export type CreateComentariosOutputDTO = undefined

export const createComentariosSchema = z.object({
  apelido: z.string().min(2),
  token: z.string().min(1)
}).transform(data => data as CreateComentariosInputDTO)