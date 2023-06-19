import jwt from 'jsonwebtoken'
import {handleErrorResponse} from "./handleErrorResponce.js";

export default (req, res, next) => {
  try {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    if (token === '') {
      req.userId = null
      next()
    }

    const decoded = jwt.verify(token, 'secret')
    req.userId = decoded._id
    req.role = decoded.role
    next()
  } catch (error) {
    handleErrorResponse(res, error, 'Неизвестная ошибка при получении доступа')
  }
}