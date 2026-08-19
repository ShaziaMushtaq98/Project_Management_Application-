import api from './api'

// Clean, realistic task names for the demo.
// Swap this out for a real backend endpoint later — nothing else in the app needs to change.
const MOCK_TASKS = [
  { id: 1, title: 'Design homepage layout', assignedTo: 'Ali Raza', completed: true },
  { id: 2, title: 'Set up project repository', assignedTo: 'Sara Khan', completed: true },
  { id: 3, title: 'Create login page UI', assignedTo: 'Hamza Tariq', completed: true },
  { id: 4, title: 'Build API service layer', assignedTo: 'Ayesha Noor', completed: false },
  { id: 5, title: 'Connect Redux store', assignedTo: 'Ali Raza', completed: false },
  { id: 6, title: 'Add form validation', assignedTo: 'Sara Khan', completed: false },
  
]

let taskStore = [...MOCK_TASKS]
let nextId = taskStore.length + 1

export const getTasks = () => {
  // Wrapped in a real API call so loading/error states still behave like a genuine request
  return api.get('/todos?_limit=1').then((response) => {
    return { ...response, data: taskStore }
  })
}

export const getTaskById = (id) => api.get(`/todos/${id}`)

export const createTask = (data) => {
  return api.post('/todos', data).then((response) => {
    const newTask = { id: nextId++, ...data }
    taskStore = [newTask, ...taskStore]
    return { ...response, data: newTask }
  })
}

export const updateTask = (id, data) => {
  return api.patch(`/todos/${id}`, data).then((response) => {
    taskStore = taskStore.map((t) => (t.id === id ? { ...t, ...data } : t))
    const updated = taskStore.find((t) => t.id === id)
    return { ...response, data: updated }
  })
}

export const deleteTask = (id) => {
  return api.delete(`/todos/${id}`).then((response) => {
    taskStore = taskStore.filter((t) => t.id !== id)
    return response
  })
}