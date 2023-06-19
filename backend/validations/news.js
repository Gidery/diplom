import { body } from 'express-validator'

export const newsCreateValidation = [
  body('title', 'enter post title').isLength({min: 3, max: 200}).isString(),
  body('text', 'enter post text').isLength({min: 10, max: 10000}).isString(),
]

export const voteCreateValidation = [
  body('title', 'enter post title').isLength({min: 3, max: 200}).isString(),
  body('text', 'enter post text').isLength({min: 10, max: 10000}).isString(),
  body('options').isLength({min: 1, max: 5}).isArray()
]