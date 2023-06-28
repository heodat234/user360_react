import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  // CSpinner
} from '@coreui/react'

import SearchBar from './SearchBar'
import ListUsers from './ListUsers'
import { useSelector } from 'react-redux'
import { selectListUserSearch } from '../../store/userItemSlice'

const SearchUser = () => {
  // const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  const [searchResults, setSearchResults] = useState()

  const lastListUserSearch = useSelector(selectListUserSearch)

  return (
    <CRow>
      <CCol xs={12} style={{ marginRight: 0 }}>
        <CCard
          className="dark_bg_card mb-4"
          style={{ borderRadius: 'none', border: 'none', height: '80vh' }}
        >
          <CCardBody>
            <SearchBar setSearchResults={setSearchResults} setLoading={setLoading}></SearchBar>
            {searchResults?.length ? (
              <ListUsers
                searchResults={searchResults}
                title="Kết quả tìm kiếm"
                loading={loading}
              ></ListUsers>
            ) : (
              ''
            )}
            {lastListUserSearch?.length ? (
              <ListUsers
                searchResults={lastListUserSearch}
                title="Tìm kiếm gần đây"
                loading={false}
              ></ListUsers>
            ) : (
              ''
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default SearchUser
