import mongoose from "mongoose";
import express from "express";
import multer from "multer";
import cors from 'cors'

import * as UserController from './controllers/UserController.js'
import * as NewsController from './controllers/NewsController.js'
import * as VotesController from './controllers/VotesController.js'

import {loginValidation, registerValidation} from './validations/auth.js'
import {newsCreateValidation, voteCreateValidation} from './validations/news.js'

import checkAuth from './utils/checkAuth.js'
import handleValidationErrors from './utils/handleValidationsErrors.js'
import {vote} from "./controllers/VotesController.js";

mongoose.connect('mongodb+srv://admin:12345@backend-course.c72ojwk.mongodb.net/diplom?retryWrites=true&w=majority').then(() => {
  console.log('baza na svuazy')
}).catch(err => {
  console.log('baze p1zd@', err)
})

const fileStorage = multer.diskStorage({
  destination: (_,__,cb) => cb(null, 'uploads'),
  filename: (_, file, cb) => cb(null, file.originalname)
})
const upload = multer({
  storage: fileStorage
})

const app = express()
app.use('/uploads', express.static('uploads'))
app.use(express.json())
app.use(cors())


app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)

app.get('/news', NewsController.getAll)
app.get('/news/:id', NewsController.getById)
app.get('/popular-news', NewsController.getPopular)
app.post('/news', checkAuth, newsCreateValidation, handleValidationErrors, NewsController.create)
app.delete('/news/:id', checkAuth, NewsController.removeById)
app.patch('/news/:id', checkAuth, handleValidationErrors, NewsController.update)

app.get('/votes', VotesController.getAll)
app.get('/votes/:id', VotesController.getById)
app.post('/votes', checkAuth, voteCreateValidation, VotesController.create)
app.delete('/votes/:id', checkAuth, VotesController.removeById)
app.patch('/votes/:id',checkAuth, handleValidationErrors, VotesController.update)
app.patch('/votes/:id/vote', checkAuth, VotesController.vote)

app.post('/upload', checkAuth, upload.single('image'), (req,res) => {
  res.status(201).json({
    url: `http://localhost:5000/uploads/${req.file.originalname}`
  })
})

app.listen(5000, (err) => {
  err ? console.log('servery p1zd@', err) :
    console.log('Server spok')
})