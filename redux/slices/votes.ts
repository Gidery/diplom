import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {News} from "./news";
import axios from "../../axios";

type Status = "loading" | 'success' | 'error'

export interface Option {
  _id: string
  label: string,
  votesNumber: number
}

export interface Vote extends News{
  options: Option[]
  voterIds: string[]
}

export const getAllVotesQuery = createAsyncThunk('GET:/votes', async () => {
  const {data} = await axios.get('/votes')
  return data
})

export const removeVoteQuery = createAsyncThunk('DELETE:/votes', async (id: string) => await axios.delete(`/votes/${id}`))

const initialState: { votes: Vote[], status: Status } = {
  votes: [],
  status: 'loading'
}

const votesSlice = createSlice({
  name: 'votes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllVotesQuery.pending, (state) => {
      state.votes = []
      state.status = 'loading'
    }).addCase(getAllVotesQuery.fulfilled, (state, action) => {
      state.votes = action.payload
      state.status = 'success'
    }).addCase(getAllVotesQuery.rejected, (state) => {
      state.votes = []
      state.status = 'error'
    })

    builder.addCase(removeVoteQuery.fulfilled, (state, action) => {
      state.votes = state.votes.filter(vote => vote._id !== action.meta.arg)
    })
  }
})

export const votesReducer = votesSlice.reducer
