import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../store/userSlice'

import { CSidebarBrand, CImage } from '@coreui/react'

import logoMfast from 'src/assets/images/logo_mfast_dark.png'
import iconLogout from 'src/assets/images/icon_logout.png'

// import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
// import navigation from '../_nav'
import SearchUser from './search/searchUser'

const AppSidebar = () => {
  // const dispatch = useDispatch()
  // const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  // const sidebarShow = useSelector((state) => state.sidebarShow)

  const dispatch = useDispatch()

  const handleLogout = () => {
    // eslint-disable-next-line no-undef
    sessionStorage.removeItem('user')
    dispatch(logout())
  }

  return (
    <div className="lg:sticky lg:w-1/4 md:w-1/4 md:sticky sm:w-full dark_bg_card">
      <CSidebarBrand className="d-none d-md-flex mt-3 dark_bg_sidebar" to="/">
        <CImage className="sidebar-brand-full" fluid src={logoMfast} height={20} width={110} />
        <CImage className="sidebar-brand-narrow" fluid src={logoMfast} height={20} width={110} />
      </CSidebarBrand>
      <SearchUser></SearchUser>
      <div className="line-gray"></div>
      <div className="footer-sidebar">
        <Link to="#" onClick={handleLogout}>
          <button className="btn-logout flex dark_bg_card">
            <img src={iconLogout} alt="icon" width={22}></img> Đăng xuất
          </button>
        </Link>
      </div>
    </div>
  )
}

export default React.memo(AppSidebar)
