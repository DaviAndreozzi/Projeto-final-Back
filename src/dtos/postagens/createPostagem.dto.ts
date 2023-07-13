import z from 'zod'

export interface CreatePostagemInputDTO {
  apelido: string,
  token: string
}

export type CreatePostagemOutputDTO = undefined

export const createPostagemSchema = z.object({
  apelido: z.string().min(2),
  token: z.string().min(1)
}).transform(data => data as CreatePostagemInputDTO)