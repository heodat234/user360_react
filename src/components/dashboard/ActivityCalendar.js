import React, { useState, useEffect } from 'react'

import { CCard, CCol, CRow } from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../../store/userSlice'
import { selectUserItem } from '../../store/userItemSlice'
import { setVisibleLoading } from '../../store/modalSlice'
import { activityChart } from 'src/api/axios'
import {
  startOfMonth,
  endOfMonth,
  addDays,
  addMonths,
  format,
  isToday,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  differenceInCalendarDays,
  differenceInCalendarMonths,
} from 'date-fns'

import iconEvent from 'src/assets/images/icon_event.png'
import iconTime from 'src/assets/images/icon_time.png'
import { DateRangePicker } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'
import ActivityCalendar from '../ActivityCalendar/ActivityCalendar'
import { NumericFormat } from 'react-number-format'
import GrowthRate from './GrowthRate'

const ActivityCalendarDashboard = () => {
  const dispatch = useDispatch()
  const [dataActivity, setDataActivity] = useState([])
  const [labels, setLabels] = useState([])
  const [total, setTotal] = useState(0)
  const [percentTotal, setPercentTotal] = useState(0)
  const [startTime, setStartTime] = useState(new Date(new Date().getFullYear(), 0, 1)) //mặc định lấy thời gian năm hiện tại
  const [endTime, setEndTime] = useState(new Date()) // ngày hiện tại
  const [compareStartTime, setCompareStartTime] = useState(
    new Date(new Date().getFullYear() - 1, 0, 1),
  ) //mặc định lấy thời gian so sánh là năm trước
  const [compareEndTime, setCompareEndTime] = useState(new Date(new Date().getFullYear(), 0, 0)) // cuối năm trước
  const userLogin = useSelector(selectUser)
  const userItem = parseInt(useSelector(selectUserItem))

  const handleChangeRange = (e) => {
    setStartTime(e[0])
    setEndTime(e[1])

    const diffMonth = differenceInCalendarMonths(e[1], e[0])
    if (diffMonth > 0 && isFirstDayOfMonth(e[0]) && (isToday(e[1]) || isLastDayOfMonth(e[1]))) {
      setCompareStartTime(startOfMonth(addMonths(new Date(e[0]), -(diffMonth + 1))))
      setCompareEndTime(endOfMonth(addMonths(new Date(e[1]), -(diffMonth + 1))))
    } else {
      const diffDay = differenceInCalendarDays(e[1], e[0])
      setCompareStartTime(addDays(e[0], -(diffDay + 1)))
      setCompareEndTime(addDays(e[1], -(diffDay + 1)))
    }
  }

  useEffect(() => {
    if (userItem) {
      dispatch(setVisibleLoading(true))
      activityChart(
        userLogin.accessToken,
        userItem,
        format(startTime, 'dd-MM-yyyy'),
        format(endTime, 'dd-MM-yyyy'),
        format(compareStartTime, 'dd-MM-yyyy'),
        format(compareEndTime, 'dd-MM-yyyy'),
      )
        .then((json) => {
          if (json.status) {
            setDataActivity(json.data)
            setLabels(json.labels)
            setTotal(json.total)
            setPercentTotal(json.percent_total)
          }
          dispatch(setVisibleLoading(false))
        })
        .catch((e) => {
          dispatch(setVisibleLoading(false))
        })
    }
  }, [userLogin, userItem, startTime, endTime, compareStartTime, compareEndTime, dispatch])

  const predefinedRanges = [
    {
      label: 'Tháng hiện tại',
      value: [startOfMonth(new Date()), new Date()],
      placement: 'left',
    },
    {
      label: '2 tháng gần nhất',
      value: [startOfMonth(addMonths(new Date(), -1)), new Date()],
      placement: 'left',
    },
    {
      label: '3 tháng gần nhất',
      value: [startOfMonth(addMonths(new Date(), -2)), new Date()],
      placement: 'left',
    },
    {
      label: '6 tháng gần nhất',
      value: [startOfMonth(addMonths(new Date(), -5)), new Date()],
      placement: 'left',
    },
    {
      label: 'Năm hiện tại',
      value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
      placement: 'left',
    },
    {
      label: 'Năm trước',
      value: [
        new Date(new Date().getFullYear() - 1, 0, 1),
        new Date(new Date().getFullYear(), 0, 0),
      ],
      placement: 'left',
    },
  ]

  const vars = {
    '--rs-input-bg': '#212145',
  }

  return (
    <>
      <div className="w-full">
        <div className="justify-content_space">
          <p className="w-3/2 block_title">Thời gian hoạt động</p>
          <div className="w-1/4">
            <DateRangePicker
              className="dateranger-dark w-full"
              ranges={predefinedRanges}
              placeholder="Placement left"
              style={vars}
              defaultValue={[startTime, endTime]}
              renderValue={(value) => {
                return format(value[0], 'dd/MM/yyyy') + ' ~ ' + format(value[1], 'dd/MM/yyyy')
              }}
              onChange={(e) => handleChangeRange(e)}
            ></DateRangePicker>
          </div>
        </div>

        <CRow className="mt-4 block_ocr">
          <CCol xs>
            <CCard className="dark_bg_card mb-4 ">
              <div className=" p-3">
                <div className="justify-content_flex">
                  <div className="w-1/2 flex">
                    <div className="mt-1">
                      <div className="block_logo_icon">
                        <img src={iconEvent} alt="icon" />
                      </div>
                    </div>
                    <div className="ml-3 text-sm dark_color_text">
                      <dl>
                        <dt className="color-gray font-size-16 font-medium">
                          Tổng số lượt truy cập
                        </dt>
                        <dd className="flex items-center text-lg">
                          <NumericFormat
                            value={total}
                            allowLeadingZeros
                            displayType={'text'}
                            thousandSeparator=","
                          />{' '}
                          <span className="ml-1">lượt</span>
                          <GrowthRate
                            rate={percentTotal}
                            status={percentTotal > 0 ? 'up' : 'down'}
                          ></GrowthRate>
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="w-1/2 flex">
                    <div className="mt-1">
                      <div className="block_logo_icon">
                        <img src={iconTime} alt="icon" />
                      </div>
                    </div>
                    <div className="ml-3 text-sm dark_color_text">
                      <dl>
                        <dt className="color-gray font-size-16 font-medium">
                          Thời gian tương tác trung bình
                        </dt>
                        <dd className="flex items-center	 text-lg">
                          -/-
                          {/* {percentOfSales}% (<NumericFormat value={walletPercentOfSales} allowLeadingZeros displayType={'text'} thousandSeparator="," />  <span className='ml-1'>người</span>)
                          <GrowthRate rate={growthPercentOfSales} status={statusGrowthPercentOfSales.toString()}></GrowthRate> */}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="line-gray"></div>
                <ActivityCalendar data={dataActivity} labels={{ ...labels }}></ActivityCalendar>
              </div>
            </CCard>
          </CCol>
        </CRow>
      </div>
    </>
  )
}

export default ActivityCalendarDashboard
