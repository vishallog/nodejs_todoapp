//userSchema
import mongoose from 'mongoose'

const todoDataSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isComplete:{
        type:Boolean,
        default:false,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"UserData"
    },
    
    createdAt:{
        type:Date,
        defualt:Date.now()
    }

})

export const todoData = mongoose.model('Todos',todoDataSchema)