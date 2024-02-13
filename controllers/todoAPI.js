import { todoData } from "../models/todoData.js"

export const newTodo = async(req,res)=>{
    try {
    const {title, description} = req.body
    await todoData.create({
        title,
        description,
        user:req.userID,
    })
    
    res.status(201).json({
        success:true,
        message:"Todo is created"
    })
        
    } catch (error) {
        res.status(403).json({
            success:false,
            error:error
        })
        
    } 
}


export const myTodos = async(req,res)=>{
  try {
    const myTodos = await todoData.find({user:req.userID})
    
    res.status(201).json({
        success:true,
        myTodos
    }) 
  } catch (error) {
    res.status(404).json({
        success:false,
        error:error
    })
  }
}

export const updateTodo = async(req,res)=>{
  try {
    const {title, description} = req.body
     await todoData.findOneAndUpdate({_id:req.params.id},{
         title,
         description,
         user:req.userID,
     })
     
     res.status(201).json({
         success:true,
         message:"Todo is updated"
     }) 
  } catch (error) {
    res.status(404).json({
        success:false,
        error:error
    })
  }
}


export const deleteTodo = async(req,res)=>{
   try {
  
    await todoData.findOneAndDelete({_id:req.params.id})
    
    res.status(200).json({
        success:true,
        message:"Todo is Deleted"
    }) 
   } catch (error) {
    res.status(404).json({
        success:false,
        error:error
    })
   }
 }
 
