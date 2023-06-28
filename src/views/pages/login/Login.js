import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { Navigate, useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { login, selectLoading, selectErrorMessage, selectUser } from '../../../store/userSlice'

import logoMfast from 'src/assets/images/logo_mfast.png'
import { setUserSearchDefault } from 'src/store/userItemSlice'

const Login = () => {
  // Khởi tạo state lưu giá trị người dùng nhập vào ô input username, password
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Sử dụng hook useNavigate() của react-router-dom để chuyển hướng người dùng sang trang khác
  const navigate = useNavigate()

  // Select data from store
  const isLoading = useSelector(selectLoading)
  const errorMessage = useSelector(selectErrorMessage)
  const user = useSelector(selectUser)

  const [errorMessageState, setErrorMessageState] = useState(errorMessage)

  const dispatch = useDispatch()

  const onUpdateField = (e) => {
    if (e.target.value.trim() === '') {
      setErrorMessageState('Bạn chưa nhập đủ thông tin')
    } else {
      setErrorMessageState('')
    }
    if (e.target.name === 'username') {
      setUsername(e.target.value)
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
  }

  // Hàm xử lý khi người dùng bấm nút login
  function handleLogin() {
    if (username.trim() === '' || password.trim() === '') {
      setErrorMessageState('Bạn chưa nhập đủ thông tin')
    }
    dispatch(login({ username, password }))
  }

  function handleKeypress(e) {
    //it triggers by pressing the enter key
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  useEffect(() => {
    if (user) {
      dispatch(setUserSearchDefault(JSON.parse(localStorage.getItem('listUserSearch_' + user.ID))))
      navigate('/dashboard', { replace: true })
    }
    if (errorMessage) {
      setErrorMessageState(errorMessage)
    }
  }, [user, errorMessage, navigate])

  if (user?.ID) {
    // navigate('/dashboard', { replace: false })
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="bg-login min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <div className="flex justify-center">
                      <img src={logoMfast} alt="icon logo" width={200} />
                    </div>
                    <h2 className="mt-3 font-semibold text-lg" style={{ color: '#6b6b81' }}>
                      Chào mừng đến với
                    </h2>
                    <h1 className="mb-3 text-2xl font-bold	" style={{ color: '#080821' }}>
                      Mfast User360 Portal
                    </h1>
                    {/* <p className="text-medium-emphasis">Đăng nhập với tài khoản của bạn</p> */}
                    {errorMessageState && <p style={{ color: 'red' }}>{errorMessageState}</p>}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        name="username"
                        onChange={onUpdateField}
                        onKeyPress={handleKeypress}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        name="password"
                        onChange={onUpdateField}
                        onKeyPress={handleKeypress}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol className="flex justify-center">
                        <button
                          className="px-4 w-36 rounded-3xl h-12 font-semibold text-lg"
                          onClick={handleLogin}
                          disabled={isLoading}
                          style={{ backgroundColor: '#005fff', color: '#fff' }}
                        >
                          Đăng nhập
                        </button>
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
