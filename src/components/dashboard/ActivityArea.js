import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { CCard, CCol, CRow, CFormSelect } from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../../store/userSlice'
import { selectUserItem } from '../../store/userItemSlice'
import { setVisibleLoading } from '../../store/modalSlice'
import { getLocations } from 'src/api/axios'

import { DateRangePicker } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'
import { startOfMonth, addMonths, format } from 'date-fns'
import { Chart, ArcElement, Tooltip } from 'chart.js'
import Map from './Map'
Chart.register(ArcElement, Tooltip)

const OptionTemplate = (props) => {
  const { option } = props

  return <option value={option.event}>{option.eventName}</option>
}

OptionTemplate.propTypes = {
  option: PropTypes.object,
}

const ActivityArea = () => {
  const dispatch = useDispatch()
  const [eventName, setEventName] = useState('all')
  const [listEvent, setListEvent] = useState([])
  const [startTime, setStartTime] = useState(new Date(new Date().getFullYear(), 0, 1))
  const [endTime, setEndTime] = useState(new Date())
  const [locations, setLocations] = useState([])
  const userLogin = useSelector(selectUser)
  const userItem = parseInt(useSelector(selectUserItem))

  const handleChangeSelect = (e) => {
    setEventName(e.target.value)
  }

  const handleChangeRange = (e) => {
    setStartTime(e[0])
    setEndTime(e[1])
  }

  useEffect(() => {
    if (userItem) {
      dispatch(setVisibleLoading(true))
      getLocations(
        userLogin.accessToken,
        userItem,
        eventName,
        format(startTime, 'dd-MM-yyyy'),
        format(endTime, 'dd-MM-yyyy'),
      )
        .then((json) => {
          if (json.status) {
            setLocations(json.data)
            setListEvent(json.eventNames)
          } else {
            setLocations([])
          }
          dispatch(setVisibleLoading(false))
        })
        .catch((e) => {
          dispatch(setVisibleLoading(false))
        })
    }
  }, [userLogin, userItem, eventName, startTime, endTime, dispatch])

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

  const optionEventName = listEvent.length
    ? listEvent.map((op, idx) => <OptionTemplate key={idx} option={op}></OptionTemplate>)
    : ''

  return (
    <>
      <div className="w-full">
        <div className="justify-content_space">
          <p className="w-1/2 block_title">Khu vực hoạt động</p>
          <div className="w-1/4">
            <CFormSelect value={eventName} name="eventName" onChange={(e) => handleChangeSelect(e)}>
              <option value="all">Tất cả sự kiện</option>
              {optionEventName}
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
              <div className=" ">
                <Map locations={locations}></Map>
              </div>
            </CCard>
          </CCol>
        </CRow>
      </div>
    </>
  )
}

export default ActivityArea
