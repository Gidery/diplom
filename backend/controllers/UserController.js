import bcrypt from 'bcrypt'
import UserModel from '../models/User.js'
import jwt from 'jsonwebtoken'

const handleErrorResponse = (res, error, message = 'some error') => {
    console.log(error)
    res.status(500).json({
        message,
        error
    })
}

const successAuthResponse = ( res, user ) => {
  const token = jwt.sign({
      id: user._id
  }, 'secretKey', {
      expiresIn: '30d'
  })

    res.status(200).json({
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
      if (user === null) return res.status(404).json('user not found')

      const isValidPass = await bcrypt.compare(password, user._doc.passwordHash)
      if (!isValidPass) return res.status(400).json('login/password not valid')

      successAuthResponse(res, user)
  } catch (error) {
      handleErrorResponse(res, error, 'Неизвестная ошибка при авторизации')
  }
}

