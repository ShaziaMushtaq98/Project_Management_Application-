import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getProjects } from '../services/projectService'

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (_, thunkAPI) => {
  try {
    const response = await getProjects()
    return response.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.friendlyMessage || 'Failed to load projects')
  }
})

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export default projectSlice.reducer