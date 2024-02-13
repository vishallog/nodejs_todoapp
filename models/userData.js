//userSchema
import mongoose from 'mongoose'

const StudentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        defualt:Date.now()
    }

})

export const userData = mongoose.model('Student',StudentSchema)