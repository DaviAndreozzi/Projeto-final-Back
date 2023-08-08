import { ZodError } from "zod";
import { ComentariosBusiness } from "../business/ComentarioBusiness";
import { createComentariosSchema } from "../dtos/comentarios/createComentario.dto";
import { BaseError } from "../errors/BaseError";
import { Request, Response } from "express";
import { GetComentariosSchema } from "../dtos/comentarios/getComentario.dto";
import { EditComentariosSchema } from "../dtos/comentarios/editComentario.dto";
import { LikeOrDislikeComentariosSchema } from "../dtos/comentarios/likeOrDislike.dtos";
import { DeleteComentariosSchema } from "../dtos/comentarios/deleteComentario";


export class ComentariosController {
  constructor(
    private comentariosbusiness: ComentariosBusiness
  ) { }
  public createComentarios = async (req: Request, res: Response) => {
    try {
      const input = createComentariosSchema.parse({
        name: req.body.name,
        token: req.headers.authorization
      })

      const output = await this.comentariosbusiness.createComentarios(input)

      res.status(201).send(output)

    } catch (error) {
      console.log(error)
      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public getComentarios = async (req: Request, res: Response) => {
    try {
      const input = GetComentariosSchema.parse({
        token: req.headers.authorization
      })

      const output = await this.comentariosbusiness.getComentarios(input)

      res.status(200).send(output)
    } catch (error) {
      console.log(error)
      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public editComentarios = async (req: Request, res: Response) => {
    try {
      const input = EditComentariosSchema.parse({
        token: req.headers.authorization,
        conteudo: req.body.conteudo,
        idToEdit: req.params.id
      })

      const output = await this.comentariosbusiness.editcomentarios(input)

      res.status(200).send(output)
    } catch (error) {
      console.log(error)
      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public LikeOrDislikeComentarios = async (req: Request, res: Response) => {
    try {
      const input = LikeOrDislikeComentariosSchema.parse({
        token: req.headers.authorization,
        postagemId: req.params.id,
        like: req.body.like
      })

      const output = await this.comentariosbusiness.likeOrDislikecomentarios(input)

      res.status(200).send(output)

    } catch (error) {
      console.log(error)
      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public deleteComentarios = async (req: Request, res: Response) => {
    try {
      const input = DeleteComentariosSchema.parse({
        token: req.headers.authorization,
        idToDelete: req.params.id
      })

      const output = await this.comentariosbusiness.deleteComentarios(input)

      res.status(200).send(output)

    } catch (error) {
      console.log(error)
      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

}