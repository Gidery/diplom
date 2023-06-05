import { body } from 'express-validator'

export const registerValidation = [
    body('email').isEmail(),
    body('password').isLength({min: 5}),
    body('name').isLength({min: 2}),
    body('surname').isLength({min: 2}),
    body('passportData.series').isLength({min: 4, max: 4}),
    body('passportData.number').isLength({min: 6, max: 6}),
    body('actualAddress').optional(),
]

export const loginValidation = [
    body('email').isEmail(),
    body('password').isLength({min: 5}),
]