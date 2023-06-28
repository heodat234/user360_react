import React, { useState, useEffect } from 'react'

import { CCard, CCol, CRow } from '@coreui/react'
import iconMoney from 'src/assets/images/icon_money.png'
import iconMoneyCheck from 'src/assets/images/icon_money_check.png'
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
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../../store/userSlice'
import { selectUserItem } from '../../store/userItemSlice'
import { setVisibleLoading, setVisibleRight, setTemplateModalRight } from '../../store/modalSlice'
import { getMoneyByUser } from 'src/api/axios'

import { NumericFormat } from 'react-number-format'
import ItemByDoughnutChart from '../charts/ItemByDoughnutChart'
import DoughnutChart from '../charts/DoughnutChart'
import TransactionItem from '../transactions/TransactionItem'
import GrowthRate from './GrowthRate'

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

const IncomeChart = () => {
  const dispatch = useDispatch()
  const [total, setTotal] = useState(0)
  const [percentTotal, setPercentTotal] = useState(0)
  const [availableAalance, setAvailableAalance] = useState(0)
  const [startTime, setStartTime] = useState(new Date(new Date().getFullYear(), 0, 1)) //mặc định lấy thời gian năm hiện tại
  const [endTime, setEndTime] = useState(new Date()) // ngày hiện tại
  const [compareStartTime, setCompareStartTime] = useState(
    new Date(new Date().getFullYear() - 1, 0, 1),
  ) //mặc định lấy thời gian so sánh là năm trước
  const [compareEndTime, setCompareEndTime] = useState(new Date(new Date().getFullYear(), 0, 0)) // cuối năm trước
  const userLogin = useSelector(selectUser)
  const userItem = parseInt(useSelector(selectUserItem))

  const [listItem, setListItem] = useState([])
  const [listTrans, setListTrans] = useState([])

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
      getMoneyByUser(
        userLogin.accessToken,
        userItem,
        format(startTime, 'dd-MM-yyyy'),
        format(endTime, 'dd-MM-yyyy'),
        format(compareStartTime, 'dd-MM-yyyy'),
        format(compareEndTime, 'dd-MM-yyyy'),
      )
        .then((json) => {
          if (json.status) {
            const response = json.data
            setTotal(response.total)
            setPercentTotal(response.percent_total)
            setAvailableAalance(response.available_balance)

            // setDataDoughnut([response.available_balance, response.tax_holding, response.withdraw, response.payment, response.tax_holding, response.collection])
            setListItem(response.list_item)
            setListTrans(response.list_trans)
          }
          dispatch(setVisibleLoading(false))
        })
        .catch((e) => {
          dispatch(setVisibleLoading(false))
        })
    }
  }, [userLogin, userItem, startTime, endTime, compareStartTime, compareEndTime, dispatch])

  let dataDoughnut = {
    labels: [],
    backgrounds: [],
    data: [],
    startTime: startTime,
    endTime: endTime,
    unit: 'đ',
  }
  const contentListItem = listItem.map((item, idx) => {
    if (item.value !== 0) {
      dataDoughnut.labels.push(item.name)
      dataDoughnut.backgrounds.push(item.background)
      dataDoughnut.data.push(item.value)
    }

    return <ItemByDoughnutChart key={idx} item={item}></ItemByDoughnutChart>
  })

  const contentListTransaction = listTrans.length
    ? listTrans.map((item, idx) => <TransactionItem key={idx} item={item}></TransactionItem>)
    : ''

  const onHandleShowHistory = () => {
    dispatch(setVisibleRight(true))
    dispatch(setTemplateModalRight('listTrans'))
  }

  return (
    <>
      <div className="w-full">
        <div className="justify-content_space">
          <p className="w-3/4 block_title">Thu nhập/Chi tiêu</p>
          <div className="w-1/4 float-right">
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

        <CRow className="mt-3 block_ocr">
          <CCol xs>
            <CCard className="dark_bg_card mb-4 ">
              <div className=" p-3">
                <div className="justify-content_flex">
                  <div className="w-1/2 flex ">
                    <div className="mt-1">
                      <div className="block_logo_icon">
                        <img src={iconMoney} alt="icon" />
                      </div>
                    </div>
                    <div className="ml-3 text-sm dark_color_text">
                      <dl>
                        <dt className="color-gray text-base font-medium">Tổng thu nhập</dt>
                        <dd className="flex items-center text-lg">
                          <NumericFormat
                            value={total}
                            allowLeadingZeros
                            displayType={'text'}
                            thousandSeparator=","
                          />{' '}
                          đ
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
                        <img src={iconMoneyCheck} alt="icon" />
                      </div>
                    </div>
                    <div className="ml-3 text-sm dark_color_text">
                      <dl>
                        <dt className="color-gray text-base font-medium">Số dư khả dụng</dt>
                        <dd className="text-lg">
                          <NumericFormat
                            value={availableAalance}
                            allowLeadingZeros
                            displayType={'text'}
                            thousandSeparator=","
                          />{' '}
                          đ
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="line-gray"></div>
                <div className="row mt-3">
                  <p className="text-base color-gray font-medium mb-2">Thống kê thu/chi</p>
                  <div className="lg:w-1/3 md:w-1/2 sm-1/2 mt-1">
                    <DoughnutChart
                      dataDoughnut={dataDoughnut}
                      totalDoughnut={total}
                    ></DoughnutChart>
                  </div>
                  <div className="lg:w-2/3 md:w-1/2 sm-1/2">
                    <div className="row">{contentListItem}</div>
                  </div>
                  <div className="line-gray"></div>
                  <div style={{ display: `${listTrans.length ? 'block' : 'none'}` }}>
                    <div className="justify-content_space mt-3 mb-3">
                      <div className="w:1/2">
                        <p className="color-gray text-base">Giao dịch gần nhất</p>
                      </div>
                      <div className="w:1/2">
                        <button
                          className="flex btn_history float-right"
                          onClick={onHandleShowHistory}
                        >
                          Xem thêm <img src={iconArrowRight} alt="icon" width={22}></img>
                        </button>
                      </div>
                    </div>
                    <div>{contentListTransaction}</div>
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

export default IncomeChart
