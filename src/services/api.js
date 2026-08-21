import axios from 'axios'
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = 'Something went wrong. Please try again.'
    if (error.response) {
      // Server responded with a status code outside 2xx
      if (error.response.status === 404) message = 'Requested data was not found.'
      else if (error.response.status === 401) message = 'You are not authorized. Please log in again.'
      else if (error.response.status >= 500) message = 'Server error. Please try again later.'
    } else if (error.request) {
      // Request was made but no response received
      message = 'Network error. Check your internet connection.'
    }
    return Promise.reject({ ...error, friendlyMessage: message })
  }
)

export default api