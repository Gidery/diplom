import NewsModel from '../models/News.js'
import {handleErrorResponse} from "../utils/handleErrorResponce.js";
import dayjs from "dayjs";

export const create = async (req, res) => {
  try {
    if (req.role !== 'admin') return handleErrorResponse(res, null, 'Доступ запрещен', 403)

    const {title, text, imageUrl} = req.body
    const doc = new NewsModel({
      title, text, imageUrl, author: req.userId
    })

    const news = await doc.save()
    res.status(201).json(news)
  } catch (error) {
    handleErrorResponse(res, error, 'Неизвестная ошибка при создании новости')
  }
}

export const getById = async (req, res) => {
  try {
    const newsId = req.params.id

    await NewsModel.findOneAndUpdate({
      _id: newsId
    }, {
      $inc: {viewsCount: 1}
    }, {
      returnDocument: 'after'
    }).populate('author').then(news => {
      if (news === null) return handleErrorResponse(res, null, 'news not found', 404)

      return res.status(200).json(news)
    })
  } catch (error) {
    handleErrorResponse(res, error, `Неизвестная ошибка при получении новости #${req.params.id}`)
  }
}

export const getAll = async (req, res) => {
  try {
    const news = await NewsModel.find().populate('author').exec()
    res.status(200).json(news)

  } catch (error) {
    handleErrorResponse(res, error, 'Неизвестная ошибка при получении всех новостей')
  }
}

export const getPopular = async (req, res) => {
  try {
    const news = await NewsModel.find().sort({ viewsCount: "desc" }).populate('author').exec()
    res.status(200).json(news.slice(0, 2))
  } catch (error) {
    handleErrorResponse(res, error, 'Неизвестная ошибка при получении популярных новостей')
  }
}

export const removeById = async (req, res) => {
  try {
    if (req.role !== 'admin') return handleErrorResponse(res, null, 'Доступ запрещен', 403)

    const newsId = req.params.id
    NewsModel.findOneAndDelete({_id: newsId}).then(news => {
      if (news === null) return handleErrorResponse(res, null, 'news not found', 404)

      return res.status(200).json({message: 'news removed', news})
    })
  } catch (error) {
    handleErrorResponse(res, error, `Неизвестная ошибка при удалении новости #${req.params.id}`)
  }
}

export const update = (req, res) => {
  try {
    if (req.role !== 'admin') return handleErrorResponse(res, null, 'Доступ запрещен', 403)

    const newsId = req.params.id
    NewsModel.updateOne({_id: newsId}, {
      ...req.body
    }).then(answer => {
      if (answer.matchedCount === 0) return handleErrorResponse(res, null, 'news not found', 404)

      return res.status(200).json(answer)
    })
  } catch (error) {
    handleErrorResponse(res, error, `Неизвестная ошибка при редактировании новости #${req.params.id}`)
  }
}