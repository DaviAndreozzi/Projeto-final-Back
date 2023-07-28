import { PostagemBusiness } from "../business/PostagemBusiness";
import { Request, Response } from "express";
import { createPostagemSchema } from "../dtos/postagens/createPostagem.dto";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { GetPostagemSchema } from "../dtos/postagens/getPostagem.dto";
import { EditPostagemSchema } from "../dtos/postagens/editpostagem.dto";
import { LikeOrDislikePostagemSchema } from "../dtos/postagens/likeOrDislike.dto";
import { DeletePostagemSchema } from "../dtos/postagens/deletePostagem.dto";

export class PostagemController {
  constructor(
    private postagembusiness: PostagemBusiness
  ) { }

  public createPostagem = async (req: Request, res: Response) => {
    try {
      const input = createPostagemSchema.parse({
        apelido: req.body.apelido,
        token: req.headers.authorization
      })

      const output = await this.postagembusiness.createPostagem(input)

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

  public getPostagem = async (req: Request, res: Response) => {
    try {
      const input = GetPostagemSchema.parse({
        token: req.headers.authorization
      })

      const output = await this.postagembusiness.getPostagem(input)

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

  public editpostagem = async (req: Request, res: Response) => {
    try {
      const input = EditPostagemSchema.parse({
        token: req.headers.authorization,
        conteudo: req.body.conteudo,
        idToEdit: req.params.id
      })

      const output = await this.postagembusiness.editpostagem(input)

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

  public LikeOrDislikePostagem = async (req: Request, res: Response) => {
    try {
      const input = LikeOrDislikePostagemSchema.parse({
        token:req.headers.authorization,
        postagemId:req.params.id,
        like:req.body.like
      })
      
      const output = await this.postagembusiness.likeOrDislikePostagem(input)

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

  public deletePostagem = async (req: Request, res: Response) => {
    try {
      const input = DeletePostagemSchema.parse({
        token: req.headers.authorization,
        idToDelete: req.params.id
      })

      const output = await this.postagembusiness.deletePostagem(input)

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