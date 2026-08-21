import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProjects } from '../store/projectSlice'
import Layout from '../components/Layout'
function Projects() {
  const dispatch = useDispatch()
  const { items: projects, status, error } = useSelector((state) => state.projects)
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProjects())
    }
  }, [status, dispatch])
  return (
    <Layout title="Projects" subtitle="All active projects">
      {status === 'loading' && (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}
      {status === 'failed' && (
        <div className="text-center py-20">
          <p className="text-red-500 mb-3">{error || 'Something went wrong.'}</p>
          <button
            onClick={() => dispatch(fetchProjects())}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      )}
      {status === 'succeeded' && projects.length === 0 && (
        <div className="text-center py-20 text-gray-400">No projects found.</div>
      )}
      {status === 'succeeded' && projects.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                  {project.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{project.name}</h3>
                  <p className="text-xs text-gray-400">Owned by {project.owner}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
                <span>📋 {project.tasksCount} tasks</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                  {project.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  )
}

export default Projects