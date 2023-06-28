import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import './css/style-tailwind.css'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/" name="Dashboard Page" element={<DefaultLayout />} />
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/dashboard" name="Dashboard Page" element={<DefaultLayout />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*" name="Home" element={<Page404 />} />
          {/* <Route path="*" element={<Navigate replace to="/login" />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
