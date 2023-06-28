import React from 'react'
import PropTypes from 'prop-types'
import BankHistoryItem from './BankHistoryItem'

const ListBankHistory = (props) => {
  const { banks, type } = props
  let title = ''
  if (type === 'active') {
    title = 'Ngân hàng liên kết'
  } else {
    title = 'Ngân hàng đã hủy liên kết'
  }

  const result = banks.length
    ? banks.map((item, idx) => <BankHistoryItem key={idx} item={item}></BankHistoryItem>)
    : ''

  return (
    <div className="mt-4 w-[400px]">
      <div className="text-base	font-medium" style={{ color: '#6b6b81' }}>
        {title}
      </div>
      <div className="p-3 w-full rounded mt-2 dark_bg_card">{result}</div>
    </div>
  )
}

ListBankHistory.propTypes = {
  banks: PropTypes.array,
  type: PropTypes.string,
}

export default ListBankHistory
