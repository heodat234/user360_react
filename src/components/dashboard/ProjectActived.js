import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../../store/userSlice'
import { selectUserItem } from '../../store/userItemSlice'
import { setVisibleLoading } from '../../store/modalSlice'
import { getChannels } from 'src/api/axios'

import { CCard, CCol, CRow } from '@coreui/react'
import ProjectItem from './ProjectItem'

const ProjectActived = () => {
  const [listChannel, setListChannel] = useState([])
  const dispatch = useDispatch()
  const userLogin = useSelector(selectUser)
  const userItem = parseInt(useSelector(selectUserItem))

  useEffect(() => {
    if (userItem) {
      dispatch(setVisibleLoading(true))
      getChannels(userLogin.accessToken, userItem)
        .then((json) => {
          if (json.status) {
            setListChannel(json.data)
          }
          dispatch(setVisibleLoading(false))
        })
        .catch((e) => {
          dispatch(setVisibleLoading(false))
        })
    }
  }, [userLogin, userItem, dispatch])

  const results = listChannel.length
    ? listChannel.map((item, idx) => <ProjectItem key={idx} item={item}></ProjectItem>)
    : []

  const content = results?.length ? results : ''

  return (
    <>
      <div className="w-full">
        <div className="justify-content_space">
          <p className="w-full block_title">Dự án đã kích hoạt nghiệp vụ</p>
        </div>

        <CRow className="row mt-4 block_ocr">
          <CCol xs>
            <CCard className="dark_bg_card mb-1 ">
              <div className="row p-3">
                <div className="list-overflow h-64 overflow-auto">{content}</div>
              </div>
            </CCard>
          </CCol>
        </CRow>
      </div>
    </>
  )
}

export default ProjectActived
