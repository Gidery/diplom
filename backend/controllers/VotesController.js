import {handleErrorResponse} from "../utils/handleErrorResponce.js";
import VoteModel from '../models/Vote.js'
import mongoose from "mongoose";

export const create = async (req, res) => {
  try {
    if (req.role !== 'admin') return handleErrorResponse(res, null, 'Доступ запрещен', 403)

    const {title, text, imageUrl, options} = req.body
    const doc = new VoteModel({
      title, text, imageUrl, author: req.userId, options
    })

    const vote = await doc.save()
    res.status(201).json(vote)
  } catch (error) {
    handleErrorResponse(res, error, 'Неизвестная ошибка при создании голосования')
  }
}

export const getById = async (req, res) => {
  try {
    const voteId = req.params.id

    await VoteModel.findOneAndUpdate({
      _id: voteId
    }, {
      $inc: {viewsCount: 1}
    }, {
      returnDocument: 'after'
    }).populate('author').then(vote => {
      if (vote === null) return handleErrorResponse(res, null, 'vote not found', 404)

      return res.status(200).json(vote)
    })
  } catch (error) {
    handleErrorResponse(res, error, `Неизвестная ошибка при получении голосования #${req.params.id}`)
  }
}

export  const getAll = async (req, res) => {
  try {
    const votes = await VoteModel.find().populate('author').exec()
    res.status(200).json(votes)
  } catch (error) {
    handleErrorResponse(res, error, 'Неизвестная ошибка при получении всех голосований')
  }
}

export const removeById = (req, res) => {
  try {
    if (req.role !== 'admin') return handleErrorResponse(res, null, 'Доступ запрещен', 403)

    const voteId = req.params.id
    VoteModel.findOneAndDelete({_id: voteId}).then(vote => {
      if (vote === null) return handleErrorResponse(res, null, 'vote not found', 404)

      return res.status(200).json(vote)
    })
  } catch (error) {
    handleErrorResponse(res, error, `Неизвестная ошибка при удалении голосования #${req.params.id}`)
  }
}

export const update = () => {

}

export const vote = async (req, res) => {
  try {
    const voterId = req.userId
    if (voterId === null) return handleErrorResponse(res, null, 'Доступ запрещен', 403)
    const voteId = req.params.id
    const {optionId} = req.body

    const findingVote = await VoteModel.findOne({_id: voteId})
    if (findingVote === null) return handleErrorResponse(res, null, 'Голосование не найдено', 404)
    const {voterIds, options} = findingVote

    const updateData = {
      ...findingVote._doc,
      voterIds: [...voterIds, voterId],
      options: options.map(item => {
        if (String(item._id) !== optionId) return item
        return {
          ...item._doc,
          votesNumber: item.votesNumber+1
        }
      })
    }

    const updatingVote = await VoteModel.updateOne({_id: voteId}, {...updateData})
    res.json(updatingVote)
  } catch (error) {
    handleErrorResponse(res, error, `Неизвестная ошибка при попытке проголосвать на голосовании #${req.params.id}`)
  }
}