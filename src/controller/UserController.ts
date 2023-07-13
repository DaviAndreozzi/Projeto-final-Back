import { ZodError } from 'zod'
import { Request, Response } from "express";
import { UserBusiness } from "../business/Userbusiness";
import { BaseError } from '../errors/BaseError';
import { SignupSchema } from '../dtos/users/signup.dto';
import { LoginSchema } from '../dtos/users/login.dto';

export class UserController {
  constructor(
    private userBusiness: UserBusiness
  ) { }
  // Criação de usuario
  public signup = async (req: Request, res: Response) => {
    try {
      const input = SignupSchema.parse({
        apelido: req.body.apelido,
        email: req.body.email,
        password: req.body.password
      })
      // console.log("Caso precise aqui")

      const result = await this.userBusiness.signup(input);

      res.status(201).send(result)

    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado!");
      }
    }
  }

  // Fazendo login na conta do usuario Existente

  public Login = async (req: Request, res: Response) => {
    try {
      const input = LoginSchema.parse({
        email: req.body.email,
        password: req.body.password
      })

      const output = await this.userBusiness.login(input)

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
}