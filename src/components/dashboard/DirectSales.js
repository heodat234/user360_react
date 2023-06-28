import React, { useState, useEffect } from 'react'

import { CCard, CCol, CRow, CFormSelect } from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../../store/userSlice'
import { selectUserItem } from '../../store/userItemSlice'
import { setVisibleLoading } from '../../store/modalSlice'
import { setVisibleModal } from 'src/store/projectSlice'
import { statusProjectChart } from 'src/api/axios'
// import ItemByDoughnutChart from '../charts/ItemByDoughnutChart';

import { Chart, ArcElement, Tooltip } from 'chart.js'
import BarChart from '../charts/BarChart'
import iconArrowRight from 'src/assets/images/arrow_right.png'
import { DateRangePicker } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'
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
import classNames from 'classnames'
import LineChart from '../charts/LineChart'
import StatusByProjectItem from './StatusByProjectItem'

Chart.register(ArcElement, Tooltip)

const DirectSales = () => {
  const dispatch = useDispatch()
  const [project, setProjecct] = useState('all')
  const [dataChart, setDataChart] = useState([])
  const [startTime, setStartTime] = useState(new Date(new Date().getFullYear(), 0, 1)) //mặc định lấy thời gian năm hiện tại
  const [endTime, setEndTime] = useState(new Date()) // ngày hiện tại
  const [compareStartTime, setCompareStartTime] = useState(
    new Date(new Date().getFullYear() - 1, 0, 1),
  ) //mặc định lấy thời gian so sánh là năm trước
  const [compareEndTime, setCompareEndTime] = useState(new Date(new Date().getFullYear(), 0, 0)) // cuối năm trước
  const [typeChart, setTypeChart] = useState('bar')

  const userLogin = useSelector(selectUser)
  const userItem = parseInt(useSelector(selectUserItem))

  const handleChangeSelect = (e) => {
    setProjecct(e.target.value)
  }

  const handleChangeChart = (type) => {
    setTypeChart(type)
  }

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

  const onHandleHistory = () => {
    dispatch(setVisibleModal(true))
  }

  useEffect(() => {
    if (userItem) {
      dispatch(setVisibleLoading(true))
      statusProjectChart(
        userLogin.accessToken,
        userItem,
        project,
        format(startTime, 'dd-MM-yyyy'),
        format(endTime, 'dd-MM-yyyy'),
        format(compareStartTime, 'dd-MM-yyyy'),
        format(compareEndTime, 'dd-MM-yyyy'),
      )
        .then((json) => {
          if (json.status) {
            setDataChart(json.data)
          }
          dispatch(setVisibleLoading(false))
        })
        .catch((e) => {
          dispatch(setVisibleLoading(false))
        })
    }
  }, [userLogin, userItem, project, startTime, endTime, compareStartTime, compareEndTime, dispatch])

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

  let contentChart = ''
  if (typeChart === 'bar') {
    contentChart = <BarChart dataChart={{ ...dataChart.bar }}></BarChart>
  } else {
    contentChart = <LineChart dataChart={{ ...dataChart.line }}></LineChart>
  }

  let contentListItem =
    dataChart?.dataByProject && dataChart.dataByProject.length > 0
      ? dataChart.dataByProject.map((item, idx) => (
          <StatusByProjectItem key={idx} item={item} count={idx + 1}></StatusByProjectItem>
        ))
      : ''

  return (
    <>
      <div className="w-full">
        <div className="justify-content_space">
          <div className="flex justify-between items-center w-1/2 block_title mr-2 mb-0">
            <span className="w-7/9">Bán hàng trực tiếp</span>
            <div className="w-2/9 p-1 flex items-center rounded dark_bg_card ">
              <button
                className={classNames({
                  'ml-1 line-chart': true,
                  active: typeChart === 'line',
                })}
                onClick={() => handleChangeChart('line')}
              ></button>
              <button
                className={classNames({
                  'ml-1 bar-chart': true,
                  active: typeChart === 'bar',
                })}
                onClick={() => handleChangeChart('bar')}
              ></button>
            </div>
          </div>
          <div className="w-1/4">
            <CFormSelect value={project} name="project" onChange={(e) => handleChangeSelect(e)}>
              <option value="all">Tất cả dự án</option>
              <option value="0">Tài chính</option>
              <option value="4">Bán hàng trả chậm</option>
              <option value="1">Tài khoản ngân hàng, ví điện tử</option>
              <option value="2">Bảo hiểm</option>
              <option value="3">Dự án khác</option>
            </CFormSelect>
          </div>
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
                <div className="row ">
                  <div className="w-full mt-1">{contentChart}</div>
                  <div className="w-full">
                    <div className="line-gray"></div>
                    <div className="row mb-2 mt-3">
                      <span className="lg:w-2/3 md:w-1/2 sm:w-1/2 text-base color-gray font-medium">
                        Tỉ lệ tham gia theo loại sản phẩm
                      </span>
                      <div className="lg:w-1/3 md:w-1/2 sm:w-1/2">
                        <button
                          className="btn_history flex float-right text-base font-medium"
                          onClick={onHandleHistory}
                        >
                          Danh sách hồ sơ{' '}
                          <img src={iconArrowRight} alt="icon arrow" width={20}></img>
                        </button>
                      </div>
                    </div>
                    <div className="h-44 overflow-auto list-overflow row w-full ml-0">
                      {contentListItem}
                    </div>
                  </div>
                </div>
              </div>
            </CCard>
          </CCol>
        </CRow>
      </div>
    </>
  )
}

export default DirectSales
