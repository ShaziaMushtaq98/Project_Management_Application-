import { useState, useEffect } from 'react'

const USERS = ['Ali Raza', 'Sara Khan', 'Hamza Tariq', 'Ayesha Noor']

function TaskModal({ isOpen, onClose, onSubmit, initialData }) {
  const [title, setTitle] = useState('')
  const [assignedTo, setAssignedTo] = useState(USERS[0])
  const [completed, setCompleted] = useState(false)
  const [errors, setErrors] = useState({})

  // Sync form fields whenever a different task is opened for editing
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '')
      setAssignedTo(initialData.assignedTo || USERS[0])
      setCompleted(initialData.completed || false)
    } else {
      setTitle('')
      setAssignedTo(USERS[0])
      setCompleted(false)
    }
    setErrors({})
  }, [initialData, isOpen])

  if (!isOpen) return null

  const validate = () => {
    const newErrors = {}
    if (!title.trim()) newErrors.title = 'Task title is required'
    else if (title.trim().length < 3) newErrors.title = 'Title must be at least 3 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({ title: title.trim(), assignedTo, completed })
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {initialData ? 'Edit Task' : 'Add New Task'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Design landing page"
              className={`w-full px-3 py-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Assign To
            </label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
            >
              {USERS.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                className="rounded border-gray-300"
              />
              Mark as completed
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
            >
              {initialData ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskModal