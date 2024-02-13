import {app} from './app.js'
import { connectDB } from './Database/config.js'


//database connection itialize
connectDB()


app.listen(process.env.PORT,()=>{
    console.log(`Server is Listening on port:${process.env.PORT} in ${process.env.NODE_ENV}`)
})