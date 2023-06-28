import React, { useState, useEffect } from 'react'
import { CCard, CCol, CRow } from '@coreui/react'
import iconPlus from 'src/assets/images/icon_plus.png'
import iconSticker from 'src/assets/images/icon_sticker.png'
import { getDetailID, setVisibleModal, getReload, setReload } from '../../store/fraudSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../store/userSlice'
import { selectUserItem } from '../../store/userItemSlice'
import { getFrauds } from 'src/api/axios'
import { setVisibleLoading } from 'src/store/modalSlice'
import LoadingSpinner from '../LoadingSpinner'
import InfiniteScroll from '../InfiniteScroll'
import FraudItem from '../fraud/FraudItem'

const DelFraudTickets = () => {
  const dispatch = useDispatch()
  const [fullName, setFullName] = useState()
  const [hasMore, setHasMore] = useState(false)
  const [page, setPage] = useState(1)
  const [listFraud, setlistFraud] = useState([])
  const userLogin = useSelector(selectUser)
  const userItem = parseInt(useSelector(selectUserItem))
  const reloadFraud = useSelector(getReload)

  const onHandleAddFraud = () => {
    dispatch(setVisibleModal(true))
  }

  const onHandleLoadMore = () => {
    setPage((prev) => parseInt(prev) + 1)
  }

  useEffect(() => {
    if (userItem) {
      dispatch(setVisibleLoading(true))
      getFrauds(userLogin.accessToken, userItem, page)
        .then((json) => {
          if (json.status) {
            if (page === 1) {
              setlistFraud(json.data)
            } else {
              setlistFraud((prev) => [...prev, ...json.data])
            }
            setHasMore(json.load_more)
          } else {
            setlistFraud([])
            setHasMore(false)
          }
          setFullName(json.fullName)
          dispatch(setVisibleLoading(false))
          dispatch(setReload(false))
        })
        .catch((e) => {
          dispatch(setVisibleLoading(false))
        })
    }
  }, [userLogin, userItem, page, reloadFraud, dispatch])

  const results = listFraud.length
    ? listFraud.map((item, idx) => <FraudItem key={idx} item={item}></FraudItem>)
    : []

  const content = results?.length ? results : ''

  return (
    <>
      <div className="w-full">
        <div className="justify-content_space">
          <p className="w-3/5 block_title">DEL / Fraud tickets</p>
          <div className="w-2/5 mt-2">
            <button
              className="btn_history flex float-right font-size-16"
              onClick={() => onHandleAddFraud()}
            >
              <span className="mr-1">Thêm mới</span>
              <img src={iconPlus} alt="icon plus" width={25}></img>
            </button>
          </div>
        </div>

        <CRow className="row mt-3 block_ocr">
          <CCol xs>
            <CCard className="dark_bg_card mb-4 ">
              {results?.length ? (
                <InfiniteScroll
                  loader={<LoadingSpinner></LoadingSpinner>}
                  className="max-h-96 overflow-auto list-overflow p-3"
                  fetchMore={onHandleLoadMore}
                  hasMore={hasMore}
                  endMessage={' '}
                >
                  {content}
                </InfiniteScroll>
              ) : (
                <div className="row p-3">
                  <div className="w-full mt-1">
                    <div className="flex flex-col justify-center items-center empty-data">
                      <img src={iconSticker} alt="icon sticker" width={100}></img>
                      <p className="text-sm mt-3 color-gray">
                        Hiện tại, không có Fraud liên quan đến <span>{fullName}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CCard>
          </CCol>
        </CRow>
      </div>
    </>
  )
}

export default DelFraudTickets
