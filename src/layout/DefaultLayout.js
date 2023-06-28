import React from 'react'
import AppSidebar from '../components/AppSidebar'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectUser } from '../store/userSlice'
import Dashboard from 'src/views/dashboard/Dashboard'

const DefaultLayout = () => {
  const user = useSelector(selectUser)
  // const navigate = useNavigate()
  // useScript('https://my.webcall.vn/js/load.call?key=4e86eaf2685a67b743a475f86c7c0086&v=999')

  if (!user) {
    // navigate('/login')
    return <Navigate to="/login" replace />
  }

  return (
    <>
      <div className="flex items-stretch">
        <AppSidebar />
        <div className="user-content h-screen overflow-auto dark_bg_content lg:w-3/4 md:w-3/4 sm:w-full">
          <div className="body flex-grow-1 px-3">
            <Dashboard />
          </div>
        </div>
      </div>
    </>
  )
}

export default DefaultLayout
