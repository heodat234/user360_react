import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../../store/userSlice'
import { selectUserItem } from '../../store/userItemSlice'
import { setTemplateModalRight, setVisibleLoading, setVisibleRight } from '../../store/modalSlice'
import { getEvents } from 'src/api/axios'
import { CCard, CCol, CRow } from '@coreui/react'
import iconArrowRight from 'src/assets/images/arrow_right.png'
import EventItem from '../appEvent/EventItem'
import PropTypes from 'prop-types'

const RecentEvent = ({ pageDefault }) => {
  // const [page, setPage] = useState(pageDefault) //lấy trang đầu tiên
  const [listEvent, setListEvent] = useState([])
  const dispatch = useDispatch()
  const userLogin = useSelector(selectUser)
  const userItem = parseInt(useSelector(selectUserItem))

  // const onHandleLoadMore = () => {
  //   setPage((prev) => parseInt(prev) + 1)
  // }

  const onHandleShowHistory = () => {
    dispatch(setVisibleRight(true))
    dispatch(setTemplateModalRight('eventHistory'))
  }

  useEffect(() => {
    if (userItem) {
      // dispatch(setVisibleLoading(true))
      // setListEvent([])
      getEvents(userLogin.accessToken, userItem, 1, '', '', '', '')
        .then((json) => {
          if (json.status) {
            setListEvent(json.data)
            // setHasMore(json.load_more)
          }
          dispatch(setVisibleLoading(false))
        })
        .catch((e) => {
          dispatch(setVisibleLoading(false))
        })
    }
  }, [userLogin, userItem, dispatch])

  const results = listEvent.length
    ? listEvent.map((item, idx) => <EventItem key={idx} item={item}></EventItem>)
    : []

  const content = results?.length ? results : ''

  return (
    <>
      <div className="w-full mt-3">
        <div className="justify-content_space">
          <p className="w-full block_title">Sự kiện ghi nhận gần đây</p>
          <div className="w-2/5 mt-2">
            <button
              className="btn_history flex float-right font-size-16"
              onClick={onHandleShowHistory}
            >
              <span className="mr-1">Tất cả</span>
              <img src={iconArrowRight} alt="icon plus" width={22}></img>
            </button>
          </div>
        </div>

        <CRow className="row mt-4 block_ocr">
          <CCol xs>
            <CCard className="dark_bg_card mb-2 ">
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

RecentEvent.propTypes = {
  pageDefault: PropTypes.number,
}

export default RecentEvent
