import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios.ts";

type Status = "loading" | 'success' | 'error'

export interface Author {
  name: string,
  surname: string
}

export interface News {
  _id: string,
  title: string,
  text: string,
  viewsCount: number,
  author: Author,
  createdAt: string
  imageUrl?: string
}

export const getAllNewsQuery = createAsyncThunk('GET:/news', async () => {
  const {data} = await axios.get('/news')
  return data
})

export const removeNewsQuery = createAsyncThunk('DELETE:/news', async (id: string) => await axios.delete(`/news/${id}`))

const initialState: { news: News[], status: Status } = {
  news: [],
  status: 'loading'
}

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllNewsQuery.pending, (state) => {
      state.news = []
      state.status = 'loading'
    }).addCase(getAllNewsQuery.fulfilled, (state, action) => {
      state.news = action.payload
      state.status = 'success'
    }).addCase(getAllNewsQuery.rejected, (state) => {
      state.news = []
      state.status = 'error'
    })

    builder.addCase(removeNewsQuery.fulfilled, (state, action) => {
      state.news = state.news.filter(news => news._id !== action.meta.arg)
    })
  }
})

export const newsReducer = newsSlice.reducer
