import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../../store/userSlice'
import { selectUserItem } from '../../store/userItemSlice'
import { getTransactionHistory } from 'src/api/axios'
import LoadingSpinner from '../LoadingSpinner'
import { CForm, CButton } from '@coreui/react'
import TransactionItem from './TransactionItem'
import classNames from 'classnames'
import { DateRangePicker } from 'rsuite'
import '../../css/rsuite.css'
import { startOfMonth, addMonths, format } from 'date-fns'
import EmptyData from '../EmptyData'
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

const TransactionHistory = () => {
  const [isLoader, setIsLoader] = useState(false)
  const [activeButton, setActiveButton] = useState('')
  const [startTime, setStartTime] = useState(new Date(new Date().getFullYear(), 0, 1)) //mặc định lấy thời gian năm hiện tại
  const [endTime, setEndTime] = useState(new Date()) // ngày hiện tại
  const [page, setPage] = useState(1) //lấy trang đầu tiên
  const [listTrans, setListTrans] = useState([]) //danh sách lịch sử
  const [hasMore, setHasMore] = useState(false) //danh sách lịch sử

  const dispatch = useDispatch()
  const userLogin = useSelector(selectUser)
  const userItem = parseInt(useSelector(selectUserItem))

  const onHandleFilter = (value) => {
    setListTrans([])
    setPage(1)
    setActiveButton(value)
  }

  const handleChangeRange = (e) => {
    setListTrans([])
    setPage(1)
    setStartTime(e[0])
    setEndTime(e[1])
  }

  useEffect(() => {
    if (userItem) {
      setIsLoader(true)
      getTransactionHistory(
        userLogin.accessToken,
        userItem,
        activeButton,
        format(startTime, 'dd-MM-yyyy'),
        format(endTime, 'dd-MM-yyyy'),
        page,
      )
        .then((json) => {
          if (json.status) {
            setListTrans((prev) => [...prev, ...json.data.list])
            setHasMore(json.data.load_more)
          }
          setIsLoader(false)
        })
        .catch((e) => {
          setIsLoader(false)
          //show error
        })
    }
  }, [userLogin, userItem, activeButton, startTime, endTime, page, dispatch])

  const result = listTrans.length
    ? listTrans.map((item, idx) => <TransactionItem item={item} key={idx}></TransactionItem>)
    : {}
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
      <CForm>
        <div className="flex mt-3">
          <dl className="w-1/3 flex text-sm mr-4">
            <dd className="mb-0 dark_color_text w-full">
              <DateRangePicker
                className="dateranger-dark w-full"
                ranges={predefinedRanges}
                placeholder="Chọn khoảng thơif gian"
                style={vars}
                defaultValue={[startTime, endTime]}
                renderValue={(value) => {
                  return format(value[0], 'dd/MM/yyyy') + ' ~ ' + format(value[1], 'dd/MM/yyyy')
                }}
                onChange={(e) => handleChangeRange(e)}
              ></DateRangePicker>
            </dd>
          </dl>
          <dl className="w-1/2 flex text-sm ml-4"></dl>
        </div>
        <div className="flex mt-2">
          <CButton
            className={classNames({
              'btn-filter-category': true,
              active: activeButton === '',
            })}
            onClick={() => onHandleFilter('')}
          >
            Tất cả
          </CButton>
          <CButton
            className={classNames({
              'btn-filter-category': true,
              active: activeButton === 'income',
            })}
            onClick={() => onHandleFilter('income')}
          >
            Thu nhập
          </CButton>
          <CButton
            className={classNames({
              'btn-filter-category': true,
              active: activeButton === 'bank_withdrawal',
            })}
            onClick={() => onHandleFilter('bank_withdrawal')}
          >
            Đã rút
          </CButton>
          <CButton
            className={classNames({
              'btn-filter-category': true,
              active: activeButton === 'payment',
            })}
            onClick={() => onHandleFilter('payment')}
          >
            Mua sắm
          </CButton>
          <CButton
            className={classNames({
              'btn-filter-category': true,
              active: activeButton === 'tax_deduct',
            })}
            onClick={() => onHandleFilter('tax_deduct')}
          >
            Thuế TNCN
          </CButton>
          <CButton
            className={classNames({
              'btn-filter-category': true,
              active: activeButton === 'collection',
            })}
            onClick={() => onHandleFilter('collection')}
          >
            Truy thu
          </CButton>
        </div>
      </CForm>
      <div className="mt-4">
        <p className="color-gray">Danh sách giao dịch</p>
        <InfiniteScroll
          loader={<LoadingSpinner></LoadingSpinner>}
          className="list_trans mt-2 p-3 dark_bg_card"
          fetchMore={() => setPage((prev) => parseInt(prev) + 1)}
          hasMore={hasMore}
          endMessage={' '}
        >
          {content}
        </InfiniteScroll>
      </div>
    </>
  )
}

export default TransactionHistory
