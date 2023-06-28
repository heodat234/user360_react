import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../../store/userSlice'
import { selectUserItem } from '../../store/userItemSlice'
import { getFraudLogs } from 'src/api/axios'
import { getDetailID } from 'src/store/fraudSlice'

import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import dayjs from 'dayjs'
import LoadingSpinner from '../LoadingSpinner'
import PropTypes from 'prop-types'

const FraudLogs = ({ reload }) => {
  const [logs, setLogs] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()
  const userLogin = useSelector(selectUser)
  const userItem = parseInt(useSelector(selectUserItem))
  const detailID = useSelector(getDetailID)

  useEffect(() => {
    if (userItem) {
      setIsLoading(true)
      getFraudLogs(userLogin.accessToken, userItem, detailID)
        .then((json) => {
          if (json.status) {
            setLogs(json.data)
          }
          setIsLoading(false)
        })
        .catch((e) => {
          setIsLoading(false)
        })
    }
  }, [userLogin, userItem, detailID, reload, dispatch])

  return (
    <div className="w-full">
      <p className="ml-2 mb-2 color-gray">Lịch sử cập nhật</p>
      <div className="dark_bg_card ml-2 mr-2 p-2 rounded">
        <CTable className="w-full mt-1  ">
          <CTableHead className="mt-0.5 p-3 h-10" style={{ backgroundColor: '#e0e0e0' }}>
            <CTableRow className="rounded ">
              <CTableHeaderCell>Nội dung làm việc</CTableHeaderCell>
              <CTableHeaderCell>Kết quả làm việc</CTableHeaderCell>
              <CTableHeaderCell>Ghi chú xử lý</CTableHeaderCell>
              <CTableHeaderCell>Xử lý của AF</CTableHeaderCell>
              <CTableHeaderCell>Ngày cập nhật</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody className="dark_color_text">
            {isLoading ? (
              <CTableRow>
                <CTableDataCell colSpan="5">
                  <LoadingSpinner></LoadingSpinner>
                </CTableDataCell>
              </CTableRow>
            ) : logs.length ? (
              logs.map((log, idx) => (
                <CTableRow key={idx}>
                  <CTableDataCell>{log.content}</CTableDataCell>
                  <CTableDataCell>{log.resultText}</CTableDataCell>
                  <CTableDataCell>{log.note}</CTableDataCell>
                  <CTableDataCell>{log.AFHandle}</CTableDataCell>
                  <CTableDataCell>{dayjs(log.logDate).format('DD/MM/YYYY')}</CTableDataCell>
                </CTableRow>
              ))
            ) : (
              ''
            )}
          </CTableBody>
        </CTable>
      </div>
    </div>
  )
}

FraudLogs.propTypes = {
  reload: PropTypes.bool,
}

export default FraudLogs
