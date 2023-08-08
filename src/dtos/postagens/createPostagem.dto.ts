import z from 'zod'

export interface CreatePostagemInputDTO {
  name: string,
  token: string
}

export type CreatePostagemOutputDTO = undefined

export const createPostagemSchema = z.object({
  name: z.string().min(2),
  token: z.string().min(1)
}).transform(data => data as CreatePostagemInputDTO)