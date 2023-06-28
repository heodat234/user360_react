import React, { useState, useEffect } from 'react'
import {
  CForm,
  CFormSelect,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CButton,
} from '@coreui/react'

import PropTypes from 'prop-types'
import iconSearch from 'src/assets/images/icon_search.png'
import iconFilter from 'src/assets/images/icon_filter.png'
import { useForm } from 'react-hook-form'

import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../../store/userSlice'
import { selectUserItem } from '../../store/userItemSlice'
import { setVisibleModal } from '../../store/projectSlice'
import { getProjectsByCategory, getListProjectInfo } from 'src/api/axios'
import LoadingSpinner from '../LoadingSpinner'
import EmptyData from '../EmptyData'
import ProjectItem from './ProjectItem'
import InfiniteScroll from '../InfiniteScroll'
import { DialogContent, DialogTitle } from '../DialogModal'

const ProjectFilter = () => {
  // const user = useSelector(selectUser)
  const [category, setCategory] = useState(0)
  const [listProjectCategory, setListProjectCategory] = useState([])
  const [projectID, setProjectID] = useState(0)
  const [keyword, setKeyword] = useState('')
  const [listProject, setListProject] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingCategory, setIsLoadingCategory] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [actionLoadMore, setActionLoadMore] = useState(false)

  const dispatch = useDispatch()
  const userLogin = useSelector(selectUser)
  const userItem = parseInt(useSelector(selectUserItem))
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm()

  const handleClose = () => {
    dispatch(setVisibleModal(false))
  }

  var colorBtn = '#b7b8bd'

  const handleChangeSelect = (e) => {
    if (e.target.name === 'category') {
      setCategory(e.target.value)
    }
    if (e.target.name === 'projectID') {
      setProjectID(e.target.value)
    }
  }
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value)
  }

  useEffect(() => {
    if (userItem) {
      setListProject([])
      setPage(1)
      setHasMore(false)
      setIsLoadingCategory(true)
      getProjectsByCategory(userLogin.accessToken, userItem, category)
        .then((json) => {
          if (json.status) {
            setListProjectCategory(json.data)
          }
          setIsLoadingCategory(false)
        })
        .catch((e) => {
          setIsLoadingCategory(false)
        })
    }
  }, [userLogin, userItem, category, dispatch])

  const optionProjects =
    listProjectCategory.length > 0
      ? listProjectCategory.map((pro, idx) => (
          <option key={idx} value={pro.ID}>
            {pro.projectName}
          </option>
        ))
      : []

  if (isValid) {
    colorBtn = '#146cff'
  } else {
    colorBtn = '#b7b8bd'
  }

  const onSubmit = (data) => {
    setListProject([])
    setPage(1)
    setHasMore(false)
    setIsLoading(true)
    getListProjectInfo(
      data.accessToken,
      data.userID,
      data.category,
      data.projectID,
      data.keyword,
      data.page,
    )
      .then((json) => {
        if (json.status) {
          setListProject(json.data)
          setHasMore(json.hasMore)
        }
        setIsLoading(false)
      })
      .catch((e) => {
        setIsLoading(false)
      })
  }

  const onHandleLoadMore = () => {
    setPage((prev) => parseInt(prev) + 1)
    setActionLoadMore(true)
  }

  useEffect(() => {
    if (userItem && projectID && keyword.trim() !== '' && actionLoadMore) {
      setIsLoading(true)
      getListProjectInfo(userLogin.accessToken, userItem, category, projectID, keyword, page)
        .then((json) => {
          if (json.status) {
            setListProject((prev) => [...prev, ...json.data])
            setHasMore(json.hasMore)
          }
          setIsLoading(false)
          setActionLoadMore(false)
        })
        .catch((e) => {
          setIsLoading(false)
          setActionLoadMore(false)
        })
    }
  }, [userLogin, userItem, category, projectID, keyword, page, actionLoadMore])

  const result = listProject.length
    ? listProject.map((item, idx) => (
        <ProjectItem
          onHandleOpenDetail={(id) => {}}
          item={item}
          key={idx}
          category={parseInt(category)}
        ></ProjectItem>
      ))
    : {}
  const content =
    isLoading && !result.length && page === 1 ? (
      <LoadingSpinner></LoadingSpinner>
    ) : result.length ? (
      result
    ) : (
      <EmptyData></EmptyData>
    )

  return (
    <>
      <DialogTitle id="customized-dialog-title" className="dark_bg_card" onClose={handleClose}>
        Danh sách hồ sơ
      </DialogTitle>
      <div
        className="absolute w-full h-screen bg-white opacity-20 items-center justify-center"
        style={{ display: isLoadingCategory ? 'flex' : 'none' }}
      >
        <LoadingSpinner></LoadingSpinner>
      </div>
      <DialogContent dividers className="dark_bg_content">
        <CForm onSubmit={handleSubmit(onSubmit)}>
          <CFormInput type="hidden" value={userLogin.accessToken} {...register('accessToken')} />
          <CFormInput type="hidden" value={userItem} {...register('userID')} />
          <CFormInput type="hidden" value={page} {...register('page')} />
          <div className="flex w-[800px]">
            <CInputGroup className="w-1/3 mb-3 mr-2 input-search">
              <CInputGroupText id="basic-addon1" style={{ backgroundColor: '#212145' }}>
                <img src={iconFilter} alt="icon" width={22}></img>
              </CInputGroupText>
              <CFormSelect
                className="border-0"
                value={category}
                name="category"
                {...register('category', {
                  required: true,
                  onChange: handleChangeSelect,
                })}
              >
                <option value="0">Tài chính</option>
                <option value="4">Bán hàng trả chậm</option>
                <option value="1">Tài khoản ngân hàng, ví điện tử</option>
                <option value="2">Bảo hiểm</option>
                <option value="3">Dự án khác</option>
              </CFormSelect>
            </CInputGroup>
            <CInputGroup className="w-1/3 mb-3 mr-2 ml-2 input-search">
              <CInputGroupText id="basic-addon2" style={{ backgroundColor: '#212145' }}>
                <img src={iconFilter} alt="icon" width={22}></img>
              </CInputGroupText>
              <CFormSelect
                className="border-0"
                value={projectID}
                name="projectID"
                {...register('projectID', {
                  required: true,
                  onChange: handleChangeSelect,
                })}
              >
                <option value="">Chọn sản phẩm</option>
                {optionProjects}
              </CFormSelect>
            </CInputGroup>
            <CInputGroup className="w-1/3 mb-3 ml-2 input-search">
              <CInputGroupText id="basic-addon3" style={{ backgroundColor: '#212145' }}>
                <img src={iconSearch} alt="icon" width={22}></img>
              </CInputGroupText>
              <CFormInput
                className=""
                placeholder="Tìm theo tên, sđt, appID, orderID, loanID"
                aria-label="Tìm theo tên, sđt, appID, orderID, loanID"
                aria-describedby="basic-addon1"
                style={{ backgroundColor: '#212145', color: '#e0e0e0' }}
                {...register('keyword', {
                  required: true,
                  onChange: handleKeywordChange,
                })}
              />
            </CInputGroup>
          </div>
          <div className="flex justify-center">
            <CButton
              type="submit"
              className="w-36 h-12"
              style={{ backgroundColor: `${colorBtn}`, color: '#fff', borderRadius: '26px' }}
              disabled={!isValid}
            >
              Tìm kiếm
            </CButton>
          </div>
        </CForm>
        <div className="line-gray"></div>
        <div className="mt-3">
          <div className="flex">
            <div className="w-full">
              <p className="mb-2 color-gray">Kết quả xử lý</p>
              <InfiniteScroll
                loader={<LoadingSpinner></LoadingSpinner>}
                className="overflow-auto list-overflow mt-2"
                style={{ maxHeight: 'calc(100vh - 250px)' }}
                fetchMore={onHandleLoadMore}
                hasMore={hasMore}
                endMessage={' '}
              >
                {content}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </DialogContent>
    </>
  )
}

ProjectFilter.propTypes = {
  setSearchResults: PropTypes.func,
  setLoading: PropTypes.func,
}

export default ProjectFilter
