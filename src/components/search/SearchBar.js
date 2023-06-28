import React from 'react'
import { CForm, CFormInput, CInputGroup, CInputGroupText } from '@coreui/react'
import { findUsers } from 'src/api/axios'
import PropTypes from 'prop-types'
import iconSearch from 'src/assets/images/icon_search.png'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { selectUser } from '../../store/userSlice'

const SearchBar = (props) => {
  const { setSearchResults, setLoading } = props
  const user = useSelector(selectUser)
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    setLoading(true)
    findUsers(user.accessToken, data.keySearch).then((json) => {
      if (json.status) {
        setSearchResults(json.data)
      }
      setLoading(false)
    })
  }

  return (
    <CForm onSubmit={handleSubmit(onSubmit)}>
      <span className="font-medium color-gray">Tìm kiếm người dùng</span>
      <CInputGroup className="mt-2 mb-3 input-search">
        <CInputGroupText id="basic-addon1">
          <img src={iconSearch} alt="icon" width={22}></img>
        </CInputGroupText>
        <CFormInput
          className="dark_color_text"
          placeholder="Tìm nickname, sđt, CCCD, cod..."
          aria-label="Tìm nickname, sđt, CCCD, cod..."
          aria-describedby="basic-addon1"
          {...register('keySearch')}
        />
      </CInputGroup>
    </CForm>
  )
}

SearchBar.propTypes = {
  setSearchResults: PropTypes.func,
  setLoading: PropTypes.func,
}

export default SearchBar
