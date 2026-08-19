import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTasks } from '../store/taskSlice'
import Layout from '../components/Layout'
import StatCard from '../components/StatCard'

function Dashboard() {
  const dispatch = useDispatch()
  const { items: tasks, status, error } = useSelector((state) => state.tasks)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks())
    }
  }, [status, dispatch])

  const completedCount = tasks.filter((t) => t.completed).length
  const pendingCount = tasks.length - completedCount

  return (
    <Layout title="Dashboard" subtitle="Welcome back 👋">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Tasks" value={tasks.length} icon="📋" color="#dbeafe" />
        <StatCard label="Completed" value={completedCount} icon="✅" color="#dcfce7" />
        <StatCard label="Pending" value={pendingCount} icon="⏳" color="#fef9c3" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Recent Tasks</h3>
        </div>

        <div className="p-5">
          {status === 'loading' && (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          )}

          {status === 'failed' && (
            <div className="text-center py-10">
              <p className="text-red-500 mb-3">{error || 'Something went wrong.'}</p>
              <button
                onClick={() => dispatch(fetchTasks())}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          )}

          {status === 'succeeded' && tasks.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              No tasks found. Create your first task to get started.
            </div>
          )}

          {status === 'succeeded' && tasks.length > 0 && (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-100">
                  <th className="py-2 font-medium">Task</th>
                  <th className="py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.slice(0, 8).map((task) => (
                  <tr key={task.id} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 text-gray-700">{task.title}</td>
                    <td className="py-3">
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
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard