import express, { urlencoded } from 'express'
import prisma from './config/prisma.js'
import clientsRouter from './routes/userRouter.js'
const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use('/user', clientsRouter)


app.listen(3000, ()=> console.log('servidor rodando...'))