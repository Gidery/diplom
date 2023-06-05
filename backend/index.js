import mongoose from "mongoose";
import express from "express";
import cors from 'cors'

import * as UserController from './controllers/UserController.js'

import {loginValidation, registerValidation} from './validations/auth.js'

import handleValidationErrors from './utils/handleValidationsErrors.js'

mongoose.connect('mongodb+srv://admin:12345@backend-course.c72ojwk.mongodb.net/diplom?retryWrites=true&w=majority').then(() => {
    console.log('baza na svuazy')
}).catch(err => {
    console.log('baze pizda', err)
})

const app = express()
app.use(express.json())
app.use(cors())

app.get('/zalupa', (req,res) => res.status(200).json({ data: 'VJVjvJ'}))
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)


app.listen(5000, (err) => {
    err ? console.log('servery pizda', err) :
    console.log('Server spok')
})