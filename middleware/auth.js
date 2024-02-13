import jwt from 'jsonwebtoken'
import { userData } from "../models/userData.js";
export const isAutenticated = async(req,res,next)=>{
    try {
        const {token} = req.cookies;
        if(!token){
            res.status(404).json({
                success:false,
                message:"Login First"
            })
        }
        else
        {
            const user_ID = jwt.verify(token,process.env.JWT_SECRET);
    
            const user = await userData.findOne({_id:user_ID.id})
            if(!user){
                res.status(404).json({
                    success:false,
                    message:"Invalid credentials"
                })
            }
            else{
               req.userID = user_ID.id
                next();
            }
    
        }
    } catch (error) {
        res.status(404).json({
            success:false,
            error:error
        })
    }
}