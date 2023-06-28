import React, { useState, useEffect } from 'react'
import EventItem from './EventItem'
import { useSelector } from 'react-redux'
import { selectUser } from '../../store/userSlice'
import { selectUserItem } from '../../store/userItemSlice'
import { getEventFilter, getEvents } from 'src/api/axios'
import LoadingSpinner from '../LoadingSpinner'
import EmptyData from '../EmptyData'
import { addMonths, startOfMonth, format } from 'date-fns'
import { CFormSelect } from '@coreui/react'
import { DateRangePicker } from 'rsuite'
import InfiniteScroll from '../InfiniteScroll'

const predefinedRanges = [
  {
    label: 'Tháng hiện tại',
    value: [startOfMonth(new Date()), new Date()],
  },
  {
    label: '2 tháng gần nhất',
    value: [startOfMonth(addMonths(new Date(), -1)), new Date()],
  },
  {
    label: '3 tháng gần nhất',
    value: [startOfMonth(addMonths(new Date(), -2)), new Date()],
  },
  {
    label: '6 tháng gần nhất',
    value: [startOfMonth(addMonths(new Date(), -5)), new Date()],
  },
  {
    label: 'Năm hiện tại',
    value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
  },
  {
    label: 'Năm trước',
    value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date(new Date().getFullYear(), 0, 0)],
  },
]

const vars = {
  '--rs-input-bg': '#212145',
}

const ListEvent = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingEvent, setIsLoadingEvent] = useState(false)
  const [optionEvent, setOptionEvent] = useState([])
  const [optionLocation, setOptionLocation] = useState([])
  const [eventName, setEventName] = useState('all')
  const [location, setLocation] = useState('')
  const [startTime, setStartTime] = useState(new Date(new Date().getFullYear(), 0, 1))
  const [endTime, setEndTime] = useState(new Date())
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [events, setEvents] = useState([])

  const userLogin = useSelector(selectUser)
  const userItem = parseInt(useSelector(selectUserItem))

  const handleChangeRange = (e) => {
    setStartTime(e[0])
    setEndTime(e[1])
    setEvents([])
    setHasMore(false)
    setPage(1)
  }

  const handleChangeSelect = (e) => {
    if (e.target.name === 'eventName') {
      setEventName(e.target.value)
    }
    if (e.target.name === 'location') {
      setLocation(e.target.value)
    }
    setEvents([])
    setHasMore(false)
    setPage(1)
  }

  const onHandleLoadMore = () => {
    setPage((prev) => parseInt(prev) + 1)
  }

  useEffect(() => {
    if (userItem) {
      setIsLoading(true)
      getEventFilter(userLogin.accessToken, userItem)
        .then((json) => {
          if (json.status) {
            setOptionEvent(json.data.eventNames)
            setOptionLocation(json.data.districts)
          }
          setIsLoading(false)
        })
        .catch((e) => {
          setIsLoading(false)
        })
    }
  }, [userLogin, userItem])

  useEffect(() => {
    if (userItem) {
      setIsLoadingEvent(true)
      getEvents(
        userLogin.accessToken,
        userItem,
        page,
        format(startTime, 'dd-MM-yyyy'),
        format(endTime, 'dd-MM-yyyy'),
        eventName,
        location,
      )
        .then((json) => {
          if (json.status) {
            setEvents((prev) => [...prev, ...json.data])
            setHasMore(json.load_more)
          } else {
            setEvents([])
            setHasMore(false)
            // setPage(1)
          }
          setIsLoadingEvent(false)
        })
        .catch((e) => {
          setIsLoadingEvent(false)
        })
    }
  }, [userLogin, userItem, page, startTime, endTime, eventName, location])

  const result = events.length
    ? events.map((item, idx) => <EventItem key={idx} item={item}></EventItem>)
    : []

  const content =
    isLoadingEvent && !result.length && page === 1 ? (
      <LoadingSpinner></LoadingSpinner>
    ) : result.length ? (
      result
    ) : (
      <EmptyData></EmptyData>
    )

  if (isLoading) {
    return (
      <div className="w-[400px]">
        <LoadingSpinner></LoadingSpinner>
      </div>
    )
  } else {
    return (
      <>
        <div className="w-[400px]">
          <div className="w-full mb-3">
            <CFormSelect value={eventName} name="eventName" onChange={(e) => handleChangeSelect(e)}>
              <option value="all">Tất cả sự kiện</option>
              {optionEvent.length &&
                optionEvent.map((item, idx) => {
                  return (
                    <option key={idx} value={item.event}>
                      {item.eventName}
                    </option>
                  )
                })}
            </CFormSelect>
          </div>
          <div className="w-full mb-3">
            <DateRangePicker
              showOneCalendar
              className="dateranger-dark w-full"
              ranges={predefinedRanges}
              placeholder="chọn ngày"
              style={vars}
              defaultValue={[startTime, endTime]}
              renderValue={(value) => {
                return format(value[0], 'dd/MM/yyyy') + ' ~ ' + format(value[1], 'dd/MM/yyyy')
              }}
              onChange={(e) => handleChangeRange(e)}
            ></DateRangePicker>
          </div>
          <div className="w-full mb-3">
            <CFormSelect value={location} name="location" onChange={(e) => handleChangeSelect(e)}>
              <option value="">Tất cả địa điểm</option>
              {optionLocation.length &&
                optionLocation.map((item, idx) => {
                  return (
                    <option key={idx} value={item.name_ascii}>
                      {item.district_full}
                    </option>
                  )
                })}
            </CFormSelect>
          </div>
          <div className="line-gray mb-3"></div>
          <p className="mb-2 text-base color-gray">Sự kiện được ghi nhận</p>
          <div className="pl-3 pr-3 pb-3 rounded dark_bg_card">
            <InfiniteScroll
              loader={<LoadingSpinner></LoadingSpinner>}
              className="overflow-auto list-overflow mt-0"
              style={{ maxHeight: 'calc(100vh - 320px)' }}
              fetchMore={onHandleLoadMore}
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
}

export default ListEvent
