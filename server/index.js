import express from 'express';
import mongoose from "mongoose";

import {registerValidation, loginValidation} from "./validators/auth.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";
import {postCreateValidation} from "./validators/post.js";


mongoose
    .connect('mongodb+srv://Klim:qwerty123@cluster0.ulzfixj.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB is connected.'))
    .catch((err) => console.log('DB error: ', err))


const app = express()
app.use(express.json())

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server is working.')
})

app.post('/auth/register', registerValidation, UserController.register)
app.post('/auth/login', loginValidation, UserController.login)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/posts', checkAuth, postCreateValidation, PostController.create)
//app.get('/posts', PostController.getAll)
//app.get('/posts/:id', PostController.getOne)
//app.delete('/posts', PostController.remove)
//app.post('/posts', PostController.update)
