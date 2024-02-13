import { Router } from "express";
import { getUsers, login, logout, register } from "../controllers/userAPI.js";
import { isAutenticated } from "../middleware/auth.js";

const router = Router()

router.get('/api/getuser', isAutenticated, getUsers)

router.post('/api/login',login)

router.post('/api/register',register)


router.get('/api/logout',logout)



export default router;


