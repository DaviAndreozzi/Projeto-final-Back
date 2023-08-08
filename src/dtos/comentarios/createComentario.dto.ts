import z from 'zod'

export interface CreateComentariosInputDTO {
  name: string,
  token: string
}

export type CreateComentariosOutputDTO = undefined

export const createComentariosSchema = z.object({
  name: z.string().min(2),
  token: z.string().min(1)
}).transform(data => data as CreateComentariosInputDTO)