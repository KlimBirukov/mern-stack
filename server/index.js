import express from 'express';
import mongoose from "mongoose";
import multer from 'multer'

import {registerValidation, loginValidation} from "./validators/auth.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";
import {postCreateValidation} from "./validators/post.js";
import handleValidationErrors from "./utils/handleValidationErrors";


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


const storage = multer.diskStorage({
    destination: (_, __, callback) => {
        callback(null, 'uploads')
    },
    filename: (_, file, callback) => {
        callback(null, file.originalname)
    },
})
const upload = multer({storage})


app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create)
app.get('/posts', checkAuth, PostController.getAll)
app.get('/posts/:id', checkAuth, PostController.getOne)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})
app.use('/uploads', express.static('uploads'))

