import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../../store/userSlice'
import { selectUserItem } from '../../store/userItemSlice'
import { getRatingUser } from 'src/api/axios'
import LoadingSpinner from '../LoadingSpinner'
import iconStar from 'src/assets/images/icon_star.png'
import classNames from 'classnames'
import { CButton } from '@coreui/react'
import InfiniteScroll from '../InfiniteScroll'
import RatingItem from './RatingItem'
import EmptyData from '../EmptyData'
import PropTypes from 'prop-types'

const RatingFilter = ({ type }) => {
  const [tab, setTab] = useState('all')
  const [skill] = useState(type)
  const [page, setPage] = useState(1) //lấy trang đầu tiên
  const [listRating, setListRating] = useState([]) //danh sách lịch sử
  const [amountRating, setAmountRating] = useState(0)
  const [avgRating, setAvgRating] = useState(0)
  const [percent, setPercent] = useState({ 1: 50, 2: 20, 3: 15, 4: 10, 5: 5 })
  const [hasMore, setHasMore] = useState(false)
  const [isLoader, setIsLoader] = useState(false)

  const dispatch = useDispatch()
  const userLogin = useSelector(selectUser)
  const userItem = parseInt(useSelector(selectUserItem))

  const onHandleFilter = (value) => {
    setListRating([])
    setPage(1)
    setTab(value)
  }

  useEffect(() => {
    if (userItem) {
      setIsLoader(true)
      getRatingUser(userLogin.accessToken, userItem, tab, skill, page)
        .then((json) => {
          if (json.status) {
            setListRating((prev) => [...prev, ...json.data.listRating.list])
            setAmountRating(json.data.listRating.amountRating)
            setAvgRating(json.data.listRating.avgRating)
            setPercent(json.data.listRating.percent)
            setHasMore(json.data.listRating.amountRating > page * 8)
          }
          setIsLoader(false)
        })
        .catch((e) => {
          setIsLoader(false)
        })
    }
  }, [userLogin, userItem, tab, skill, page, dispatch])

  const result = listRating.length
    ? listRating.map((item, idx) => <RatingItem key={idx} item={item}></RatingItem>)
    : []
  const content =
    isLoader && !result.length && page === 1 ? (
      <LoadingSpinner></LoadingSpinner>
    ) : result.length ? (
      result
    ) : (
      <EmptyData></EmptyData>
    )

  return (
    <>
      <div className="w-[500px]">
        <div className="flex justify-center">
          <div className="w-1/6 pt-4 pl-4 text-center">
            <div className="text-4xl color-active">{avgRating}</div>
            <div className="mt-1 ml-1 color-gray">/5 sao</div>
          </div>
          <div className="w-full">
            <div className="flex items-center">
              <div className="flex w-1/4 justify-end">
                <img src={iconStar} alt="icon" width={15}></img>
                <img src={iconStar} alt="icon" width={15}></img>
                <img src={iconStar} alt="icon" width={15}></img>
                <img src={iconStar} alt="icon" width={15}></img>
                <img src={iconStar} alt="icon" width={15}></img>
              </div>
              <div className="w-3/4 main-liner-progress">
                <div className="child-liner-progress" style={{ width: `${percent[1]}%` }}>
                  <span> </span>
                </div>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <div className="flex w-1/4 justify-end">
                <img src={iconStar} alt="icon" width={13}></img>
                <img src={iconStar} alt="icon" width={13}></img>
                <img src={iconStar} alt="icon" width={13}></img>
                <img src={iconStar} alt="icon" width={13}></img>
              </div>
              <div className="w-3/4 main-liner-progress">
                <div className="child-liner-progress" style={{ width: `${percent[2]}%` }}>
                  <span> </span>
                </div>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <div className="flex w-1/4 justify-end">
                <img src={iconStar} alt="icon" width={13}></img>
                <img src={iconStar} alt="icon" width={13}></img>
                <img src={iconStar} alt="icon" width={13}></img>
              </div>
              <div className="w-3/4 main-liner-progress">
                <div className="child-liner-progress" style={{ width: `${percent[3]}%` }}>
                  <span> </span>
                </div>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <div className="flex w-1/4 justify-end">
                <img src={iconStar} alt="icon" width={13}></img>
                <img src={iconStar} alt="icon" width={13}></img>
              </div>
              <div className="w-3/4 main-liner-progress">
                <div className="child-liner-progress" style={{ width: `${percent[4]}%` }}>
                  <span> </span>
                </div>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <div className="flex w-1/4 justify-end">
                <img src={iconStar} alt="icon" width={13}></img>
              </div>
              <div className="w-3/4 main-liner-progress">
                <div className="child-liner-progress" style={{ width: `${percent[5]}%` }}>
                  <span> </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right mt-2 font-size-13 color-gray">
          <span>{amountRating} đánh giá</span>
        </div>
        <div className="line-gray mt-3 mb-3"></div>
        <div>
          <p className="text-sm mb-3	color-gray">Đánh giá gần đây</p>
          <div className="w-[450px] overflow-auto">
            <CButton
              className={classNames({
                'btn-filter-category': true,
                active: tab === 'all',
              })}
              onClick={() => onHandleFilter('all')}
            >
              Tất cả
            </CButton>
            <CButton
              className={classNames({
                'btn-filter-category': true,
                active: tab === 5,
              })}
              onClick={() => onHandleFilter(5)}
            >
              5 sao
            </CButton>
            <CButton
              className={classNames({
                'btn-filter-category': true,
                active: tab === 4,
              })}
              onClick={() => onHandleFilter(4)}
            >
              4 sao
            </CButton>
            <CButton
              className={classNames({
                'btn-filter-category': true,
                active: tab === 3,
              })}
              onClick={() => onHandleFilter(3)}
            >
              3 sao
            </CButton>
            <CButton
              className={classNames({
                'btn-filter-category': true,
                active: tab === 2,
              })}
              onClick={() => onHandleFilter(2)}
            >
              2 sao
            </CButton>
            <CButton
              className={classNames({
                'btn-filter-category': true,
                active: tab === 1,
              })}
              onClick={() => onHandleFilter(1)}
            >
              1 sao
            </CButton>
          </div>
        </div>
        <div className="mt-4">
          <InfiniteScroll
            loader={<LoadingSpinner></LoadingSpinner>}
            className="overflow-auto list-overflow mt-2"
            style={{ maxHeight: 'calc(100vh - 200px)' }}
            fetchMore={() => setPage((prev) => parseInt(prev) + 1)}
            hasMore={hasMore}
            endMessage={' '}
          >
            {content}
          </InfiniteScroll>
        </div>
      </div>
    </>
  )
}

RatingFilter.propTypes = {
  type: PropTypes.string,
}

export default RatingFilter
