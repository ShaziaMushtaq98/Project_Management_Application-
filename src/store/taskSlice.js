import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService'

// Async thunks = Redux Toolkit's way of handling API calls
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, thunkAPI) => {
  try {
    const response = await getTasks()
    return response.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.friendlyMessage || 'Failed to load tasks')
  }
})

export const addTask = createAsyncThunk('tasks/addTask', async (taskData, thunkAPI) => {
  try {
    const response = await createTask(taskData)
    return response.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.friendlyMessage || 'Failed to add task')
  }
})

export const editTask = createAsyncThunk('tasks/editTask', async ({ id, data }, thunkAPI) => {
  try {
    const response = await updateTask(id, data)
    return response.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.friendlyMessage || 'Failed to update task')
  }
})

export const removeTask = createAsyncThunk('tasks/removeTask', async (id, thunkAPI) => {
  try {
    await deleteTask(id)
    return id
  } catch (err) {
    return thunkAPI.rejectWithValue(err.friendlyMessage || 'Failed to delete task')
  }
})

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      // Add
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
      })
      // Edit
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id)
        if (index !== -1) state.items[index] = action.payload
      })
      // Delete
      .addCase(removeTask.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload)
      })
  },
})

export default taskSlice.reducer