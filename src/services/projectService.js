import api from './api'

// Simple, clean project names for the demo.
// Swap this out for a real backend endpoint later — the rest of the app won't need to change.
const MOCK_PROJECTS = [
  { id: 1, name: 'Website Redesign', status: 'Active', owner: 'Ali Raza', tasksCount: 8 },
  { id: 2, name: 'Mobile App', status: 'Active', owner: 'Sara Khan', tasksCount: 12 },
  { id: 3, name: 'Marketing Campaign', status: 'Active', owner: 'Hamza Tariq', tasksCount: 5 },
  { id: 4, name: 'Bug Fixes', status: 'Active', owner: 'Ayesha Noor', tasksCount: 3 },
  { id: 5, name: 'API Integration', status: 'Active', owner: 'Ali Raza', tasksCount: 6 },
  { id: 6, name: 'Client Dashboard', status: 'Active', owner: 'Sara Khan', tasksCount: 9 },
]

export const getProjects = () => {
  // Wrapped in a fake API call so loading/error states still work exactly like a real request
  return api.get('/users').then((response) => {
    return { ...response, data: MOCK_PROJECTS }
  })
}

export const getProjectById = (id) => api.get(`/users/${id}`)

export const createProject = (data) => api.post('/users', data)

export const updateProject = (id, data) => api.put(`/users/${id}`, data)

export const deleteProject = (id) => api.delete(`/users/${id}`)