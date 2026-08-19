import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { fetchTasks, addTask, editTask, removeTask } from '../store/taskSlice'
import Layout from '../components/Layout'
import TaskModal from '../components/TaskModal'
import ConfirmDialog from '../components/ConfirmDialog'

function Tasks() {
  const dispatch = useDispatch()
  const { items: tasks, status, error } = useSelector((state) => state.tasks)

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all') // all | completed | pending

  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState(null)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks())
    }
  }, [status, dispatch])

  // Derived, filtered list — recalculated on every render from source state,
  // avoids storing a second copy of "filteredTasks" in state (avoids unnecessary state)
  const filteredTasks = tasks
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => {
      if (filter === 'completed') return t.completed
      if (filter === 'pending') return !t.completed
      return true
    })

  const openAddModal = () => {
    setEditingTask(null)
    setModalOpen(true)
  }

  const openEditModal = (task) => {
    setEditingTask(task)
    setModalOpen(true)
  }

  const handleModalSubmit = async (formData) => {
    if (editingTask) {
      const promise = dispatch(editTask({ id: editingTask.id, data: formData })).unwrap()
      toast.promise(promise, {
        loading: 'Updating task...',
        success: 'Task updated successfully',
        error: 'Failed to update task',
      })
    } else {
      const promise = dispatch(addTask(formData)).unwrap()
      toast.promise(promise, {
        loading: 'Adding task...',
        success: 'Task added successfully',
        error: 'Failed to add task',
      })
    }
    setModalOpen(false)
  }

  const askDelete = (task) => {
    setTaskToDelete(task)
    setConfirmOpen(true)
  }

  const confirmDelete = async () => {
    const promise = dispatch(removeTask(taskToDelete.id)).unwrap()
    toast.promise(promise, {
      loading: 'Deleting task...',
      success: 'Task deleted',
      error: 'Failed to delete task',
    })
    setConfirmOpen(false)
    setTaskToDelete(null)
  }

  return (
    <Layout title="Tasks" subtitle="Manage and track all tasks">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-5">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-full sm:w-64 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 whitespace-nowrap"
        >
          + Add Task
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {status === 'loading' && (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        )}

        {status === 'failed' && (
          <div className="text-center py-16">
            <p className="text-red-500 mb-3">{error || 'Something went wrong.'}</p>
            <button
              onClick={() => dispatch(fetchTasks())}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        )}

        {status === 'succeeded' && filteredTasks.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            No tasks match your search/filter.
          </div>
        )}

        {status === 'succeeded' && filteredTasks.length > 0 && (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="py-3 px-5 font-medium">Task</th>
                <th className="py-3 px-5 font-medium">Assigned To</th>
                <th className="py-3 px-5 font-medium">Status</th>
                <th className="py-3 px-5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                  <td className="py-3 px-5 text-gray-700">{task.title}</td>
                  <td className="py-3 px-5 text-gray-500">{task.assignedTo || '—'}</td>
                  <td className="py-3 px-5">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.completed
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {task.completed ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(task)}
                      className="text-blue-600 hover:underline text-xs font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => askDelete(task)}
                      className="text-red-500 hover:underline text-xs font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
              </table>
  </div>
)}
      </div>

      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingTask}
      />

      <ConfirmDialog
        isOpen={confirmOpen}
        title="Delete Task"
        message={`Are you sure you want to delete "${taskToDelete?.title}"? This cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </Layout>
  )
}

export default Tasks