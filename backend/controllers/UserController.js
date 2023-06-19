import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import UserModel from '../models/User.js'
import {handleErrorResponse} from "../utils/handleErrorResponce.js";

const successAuthResponse = (res, user) => {
  const {passwordHash, ...userData} = user._doc
  const token = jwt.sign({
    _id: user._id,
    role: user.role
  }, 'secret', {
    expiresIn: '30d'
  })

  res.status(200).json({
    user: userData,
    token
  })
}

export const register = async (req, res) => {
  try {
    const {password, ...bodyData} = req.body
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const doc = new UserModel({
      ...bodyData,
      passwordHash
    })

    const user = await doc.save()

    successAuthResponse(res, user)
  } catch (error) {
    handleErrorResponse(res, error, 'Неизвестная ошибка при регистрации')
  }
}

export const login = async (req, res) => {
  try {
    const {email, password} = req.body

    const user = await UserModel.findOne({email})
    if (user === null) return handleErrorResponse(res, null, 'user not found', 404)

    const isValidPass = await bcrypt.compare(password, user._doc.passwordHash)
    if (!isValidPass) return handleErrorResponse(res, null, 'login/password not valid', 400)

    successAuthResponse(res, user)
  } catch (error) {
    handleErrorResponse(res, error, 'Неизвестная ошибка при авторизации')
  }
}

