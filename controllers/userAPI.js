import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { userData } from "../models/userData.js";
import jwt from 'jsonwebtoken'

export const getUsers = async (req, res) => {
    try {
        const id = req.userID;
        const user = await userData.findOne({ _id: id })
        res.status(200).json({
            success: true,
            user: user
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            error: error
        })
    }
}


export const register = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        let user = await userData.findOne({ email })
        if (user) {
            res.status(400).json({
                success: false,
                message: "User already exits"
            })

        }
        else {
            const encryptPassword = await bcrypt.hash(password, 10);
            user = await userData.create({
                name,
                email,
                password: encryptPassword
            })
            const jwttoken = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.status(201).cookie("token", jwttoken,{
                httpOnly:true,
                maxAge:60 * 60  * 1000,
                sameSite:process.env.NODE_ENV === "Development"?"lax":"none",
                secure:process.env.NODE_ENV === "Development"?"false":"true",
            }).json({
                success: true,
                user: user
            })
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            error: error
        })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await userData.findOne({ email })
        if (!user) {
            res.status(400).json({
                success: false,
                message: "Register First"
            })

        }
        else {
            const encryptPassword = await bcrypt.compare(password, user.password);

            if (!encryptPassword) {
                res.status(400).json({
                    success: false,
                    message: "Invalid Credentials"
                })

            }
            else {
                const jwttoken = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
                res.status(200).cookie("token", jwttoken,{
                    httpOnly:true,
                    maxAge:60 * 60  * 1000,
                    sameSite:process.env.NODE_ENV === "Development"?"lax":"none",
                    secure:process.env.NODE_ENV === "Development"?"false":"true",
                }).json({
                    success: true,
                    message: `Welcome back ${user.name}`
                })
            }
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            error: error
        })
    }
}


export const logout = (req, res) => {
  try {
    res.cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite:process.env.NODE_ENV === "Development"?"lax":"none",
        secure:process.env.NODE_ENV === "Development"?"false":"true",
    }).json({
        success: true,
        message: "Your are Logged out"
    })
  } catch (error) {
    res.status(404).json({
        success: false,
        error: error
    })
  }
}