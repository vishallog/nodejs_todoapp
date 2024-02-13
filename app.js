import express from 'express'
import router from './routes/user-routes.js'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'
import taskRouter from './routes/todo-routes.js'
import cors from 'cors'

//configure the process.env files
config({
    path:'./config.env',
})


export const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["POST","GET","PUT","DELETE"],
    credentials:true
}))



//adding routes
app.use(taskRouter)
app.use(router)








