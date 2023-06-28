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
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../../store/userSlice'
import { selectUserItem } from '../../store/userItemSlice'
import { getProjectsByCategory, getInfoProjectFraud } from 'src/api/axios'
import LoadingSpinner from '../LoadingSpinner'
import { setDetailID, setVisibleModal } from 'src/store/fraudSlice'
import ProjectInfo from './ProjectInfo'
import FormFraudInfo from './FormFraudInfo'
import EmptyData from '../EmptyData'
import { DialogContent, DialogTitle } from '../DialogModal'
import { useForm } from 'react-hook-form'

const FraudFilter = (props) => {
  const [category, setCategory] = useState(0)
  const [listProjectCategory, setListProjectCategory] = useState([])
  const [projectInfo, setProjectInfo] = useState([])
  const [resources, setResources] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isClick, setIsClick] = useState(false)
  const [isLoadingModal, setIsLoadingModal] = useState(false)

  const dispatch = useDispatch()
  const userLogin = useSelector(selectUser)
  const userItem = parseInt(useSelector(selectUserItem))

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm()

  var colorBtn = '#b7b8bd'

  const handleClose = () => {
    dispatch(setVisibleModal(false))
    dispatch(setDetailID(0))
  }

  const handleChangeSelect = (e) => {
    if (e.target.name === 'category') {
      setCategory(e.target.value)
    }
  }

  useEffect(() => {
    if (userItem) {
      setProjectInfo([])
      setIsLoadingModal(true)
      getProjectsByCategory(userLogin.accessToken, userItem, category)
        .then((json) => {
          if (json.status) {
            setListProjectCategory(json.data)
          }
          setIsLoadingModal(false)
        })
        .catch((e) => {
          setIsLoadingModal(false)
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

  const onSubmit = (data) => {
    setIsClick(true)
    setProjectInfo([])
    setIsLoading(true)
    getInfoProjectFraud(data)
      .then((json) => {
        if (json.status) {
          setProjectInfo(json.data.projectInfo)
          setResources(json.data.resources)
        }
        setIsLoading(false)
      })
      .catch((e) => {
        setIsLoading(false)
      })
  }

  const onHandleLoadingModal = (value) => {
    setIsLoadingModal(value)
  }

  if (isValid) {
    colorBtn = '#146cff'
  } else {
    colorBtn = '#b7b8bd'
  }

  return (
    <>
      <DialogTitle id="customized-dialog-title" className="dark_bg_card" onClose={handleClose}>
        Thêm mới Fraud
      </DialogTitle>
      <div
        className="absolute w-full h-screen bg-white opacity-20 items-center justify-center"
        style={{ display: isLoadingModal ? 'flex' : 'none' }}
      >
        <LoadingSpinner></LoadingSpinner>
      </div>
      <DialogContent dividers className="dark_bg_content list-overflow">
        <CForm onSubmit={handleSubmit(onSubmit)}>
          <CFormInput type="hidden" value={userLogin.accessToken} {...register('accessToken')} />
          <CFormInput type="hidden" value={userItem} {...register('userID')} />
          <div className="flex w-[800px]">
            <CInputGroup className="w-1/3 mb-3 mr-2 input-search">
              <CInputGroupText id="basic-addon1" style={{ backgroundColor: '#212145' }}>
                <img src={iconFilter} alt="icon" width={22}></img>
              </CInputGroupText>
              <CFormSelect
                className="border-0"
                value={category}
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
            {/* {errors?.category?.type === 'required' && <p>Bạn chưa chọn loại dự án</p>} */}
            <CInputGroup className="w-1/3 mb-3 mr-2 ml-2 input-search">
              <CInputGroupText id="basic-addon2" style={{ backgroundColor: '#212145' }}>
                <img src={iconFilter} alt="icon" width={22}></img>
              </CInputGroupText>
              <CFormSelect
                className="border-0"
                {...register('projectID', {
                  required: true,
                })}
              >
                <option value="">Chọn sản phẩm</option>
                {optionProjects}
              </CFormSelect>
            </CInputGroup>
            {/* {errors?.projectID?.type === 'required' && <p>Bạn chưa chọn sản phẩm</p>} */}
            <CInputGroup className="w-1/3 mb-3 ml-2 input-search">
              <CInputGroupText id="basic-addon3" style={{ backgroundColor: '#212145' }}>
                <img src={iconSearch} alt="icon" width={22}></img>
              </CInputGroupText>
              <CFormInput
                className="w-full"
                placeholder="Tìm chính xác theo appUID"
                aria-label="Tìm chính xác theo appUID"
                aria-describedby="basic-addon1"
                style={{ backgroundColor: '#212145', color: '#e0e0e0' }}
                {...register('caseID', {
                  required: true,
                })}
              />
              {/* {errors?.keyword?.type === 'required' && <p>Bạn chưa chọn mã sản phẩm</p>} */}
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
        {isLoading ? (
          <LoadingSpinner></LoadingSpinner>
        ) : isClick ? (
          <div className="mt-3 w-[800px]">
            {projectInfo?.ID ? (
              <>
                <ProjectInfo item={projectInfo} category={parseInt(category)}></ProjectInfo>
                <FormFraudInfo
                  resources={{ ...resources }}
                  category={parseInt(category)}
                  projectInfo={projectInfo}
                  onHandleLoadingModal={onHandleLoadingModal}
                ></FormFraudInfo>
              </>
            ) : (
              <EmptyData></EmptyData>
            )}
          </div>
        ) : (
          ''
        )}
      </DialogContent>
    </>
  )
}

FraudFilter.propTypes = {
  setSearchResults: PropTypes.func,
  setLoading: PropTypes.func,
}

export default FraudFilter
