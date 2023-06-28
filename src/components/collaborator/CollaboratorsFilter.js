import React, { useState, useEffect } from 'react'
import { CForm, CFormSelect, CFormInput, CInputGroup, CInputGroupText } from '@coreui/react'
import iconSearch from 'src/assets/images/icon_search.png'
import iconFilter from 'src/assets/images/icon_filter.png'
import CollaboratorItem from './CollaboratorItem'
import { useSelector } from 'react-redux'
import { selectUser } from '../../store/userSlice'
import { selectUserItem } from '../../store/userItemSlice'
import { getCollaboratorFilter } from 'src/api/axios'
import LoadingSpinner from '../LoadingSpinner'
import EmptyData from '../EmptyData'
import InfiniteScroll from '../InfiniteScroll'

const CollaboratorsFilter = () => {
  const [level, setLevel] = useState(0)
  const [rank, setRank] = useState('all')
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [collaboratorList, setCollaboratorList] = useState([])
  const userLogin = useSelector(selectUser)
  const userItem = parseInt(useSelector(selectUserItem))

  const handleChangeSelect = (e) => {
    if (e.target.name === 'level') {
      setLevel(e.target.value)
    }
    if (e.target.name === 'rank') {
      setRank(e.target.value)
    }
    setPage(1)
  }

  const handleSearchChange = (e) => {
    setKeyword(e.target.value)
    setPage(1)
  }

  const onHandleLoadMore = () => {
    if (!hasMore) {
      return
    }
    setPage((prev) => parseInt(prev) + 1)
  }

  useEffect(() => {
    if (userItem) {
      setIsLoading(true)
      if (page === 1) {
        setCollaboratorList([])
      }
      getCollaboratorFilter(userLogin.accessToken, userItem, level, rank, keyword, page)
        .then((json) => {
          if (json.status) {
            const response = json.data
            setCollaboratorList((prev) => [...prev, ...response.list])
            setHasMore(response.hasMore)
          }
          setIsLoading(false)
        })
        .catch((e) => {
          setIsLoading(false)
        })
    }
  }, [userLogin, userItem, level, rank, keyword, page])

  const result = collaboratorList.length ? (
    collaboratorList.map((item, idx) => <CollaboratorItem item={item} key={idx}></CollaboratorItem>)
  ) : (
    <EmptyData></EmptyData>
  )

  const loadMore = !isLoading ? hasMore : false

  const content =
    isLoading && !result?.length && page === 1 ? (
      <LoadingSpinner></LoadingSpinner>
    ) : result?.length ? (
      result
    ) : (
      <EmptyData></EmptyData>
    )

  return (
    <>
      <CForm>
        <CInputGroup className="w-full mb-3 input-search">
          <CInputGroupText id="basic-addon3" style={{ backgroundColor: '#212145' }}>
            <img src={iconSearch} alt="icon" width={22}></img>
          </CInputGroupText>
          <CFormInput
            className=""
            placeholder="Tìm theo Nickname, sdt hoặc mã MFast"
            aria-label="Tìm theo Nickname, sdt hoặc mã MFast"
            aria-describedby="basic-addon1"
            style={{ backgroundColor: '#212145', color: '#e0e0e0' }}
            onChange={handleSearchChange}
          />
        </CInputGroup>
        <div className="flex">
          <CInputGroup className="w-1/2 mb-3 mr-2 input-search">
            <CInputGroupText id="basic-addon1" style={{ backgroundColor: '#212145' }}>
              <img src={iconFilter} alt="icon" width={22}></img>
            </CInputGroupText>
            <CFormSelect
              className="border-0"
              value={level}
              name="level"
              onChange={handleChangeSelect}
            >
              <option value="0">Tất cả tầng CTV</option>
              <option value="1">Tầng 1</option>
              <option value="2">Tầng 2</option>
              <option value="3">Tầng 3</option>
              <option value="4">Tầng 4</option>
              <option value="5">Tầng 5</option>
              <option value="6">Tầng 6</option>
            </CFormSelect>
          </CInputGroup>
          <CInputGroup className="w-1/2 mb-3 ml-2 input-search">
            <CInputGroupText id="basic-addon2" style={{ backgroundColor: '#212145' }}>
              <img src={iconFilter} alt="icon" width={22}></img>
            </CInputGroupText>
            <CFormSelect
              className="border-0"
              value={rank}
              name="rank"
              onChange={handleChangeSelect}
            >
              <option value="all">Tất cả danh hiệu</option>
              <option value="user">Ẩn sĩ</option>
              <option value="earning_user">Tân Thủ</option>
              <option value="RSA">Cao Thủ</option>
              <option value="KPI_RSA">Cao Thủ 2</option>
              <option value="FIX_RSA">Cao Thủ 3</option>
              <option value="RSM">Bá Chủ 1</option>
              <option value="KPI_RSM">Bá Chủ 2</option>
              <option value="FIX_RSM">Bá Chủ 3</option>
              <option value="head">Huyền Thoại</option>
            </CFormSelect>
          </CInputGroup>
        </div>
      </CForm>
      <div className="mt-3">
        <InfiniteScroll
          loader={<LoadingSpinner></LoadingSpinner>}
          className="overflow-auto list-overflow mt-2 p-3"
          style={{ maxHeight: 'calc(100vh - 250px)' }}
          fetchMore={onHandleLoadMore}
          hasMore={loadMore}
          endMessage={' '}
        >
          {content}
        </InfiniteScroll>
      </div>
    </>
  )
}

export default CollaboratorsFilter
