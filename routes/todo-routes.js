import { Router } from "express";
import { isAutenticated } from "../middleware/auth.js";
import { deleteTodo, myTodos, newTodo, updateTodo } from "../controllers/todoAPI.js";

const router = Router()

router.get('/api/myTodos', isAutenticated, myTodos)

router.post('/api/newTodo', isAutenticated, newTodo)

router.put('/api/updateTodo/:id', isAutenticated, updateTodo)


router.delete('/api/deleteTodo/:id', isAutenticated, deleteTodo)



export default router;


