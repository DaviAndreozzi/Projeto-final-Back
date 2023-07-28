import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "./router/userRouter";
import { postagemRouter } from "./router/postagemRouter";
import { comentariosRouter } from "./router/comentariosRouter";

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.listen(Number(process.env.PORT) || 3003, () => {
    console.log(`Servidor rodando na porta ${Number(process.env.PORT) || 3003}`)
})

app.get("/ping",(req,res)=>{
  res.send("Pong!")
})

app.use("/users",userRouter)

app.use("/postagens",postagemRouter)

app.use("/comentarios",comentariosRouter)


