import React from 'react'
import PropTypes from 'prop-types'
import { setVisibleModal, setDetailID } from '../../store/fraudSlice'
import { useDispatch } from 'react-redux'

const FraudItem = ({ item }) => {
  const dispatch = useDispatch()

  const onHandleOpenDetail = () => {
    dispatch(setVisibleModal(true))
    dispatch(setDetailID(item.ID))
  }

  return (
    <div className="cursor-pointer mb-3" onClick={onHandleOpenDetail}>
      <p className="mb-2 text-sm font-semibold dark_color_text">
        {item.content}
        <button className="ml-2" style={{ color: '#005fff' }}>
          {'Chi tiết >'}
        </button>
      </p>
      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Case ID: </dt>
        <dd className="mb-0 dark_color_text">{item.caseID}</dd>
      </dl>
      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Khách hàng:</dt>
        <dd className="mb-0 dark_color_text">{item.customerName}g</dd>
      </dl>
      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Lỗi vi phạm:</dt>
        <dd className=" mb-0 dark_color_text">{item.violateError}</dd>
      </dl>
      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Kết quả làm việc:</dt>
        <dd className="mb-0 font-bold dark_color_text" style={{ color: '#e93535' }}>
          {item.resultText}
        </dd>
      </dl>
      <div className="line-gray"></div>
    </div>
  )
}

FraudItem.propTypes = {
  item: PropTypes.object,
}

export default FraudItem
