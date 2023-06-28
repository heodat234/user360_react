import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import iconDefault from 'src/assets/images/icon_star_green.png'
import { NumericFormat } from 'react-number-format'

const BankDefaultTemplate = () => {
  return (
    <dd className="color-gray flex">
      <img src={iconDefault} width={22} height={22} alt="icon default"></img>Ngân hàng mặc định
    </dd>
  )
}

const BankHistoryItem = (props) => {
  const { item } = props

  const bankDefault =
    item.bank_default === '1' && item.deleted === '0' ? (
      <BankDefaultTemplate></BankDefaultTemplate>
    ) : (
      ''
    )

  const amount = item.total_amount ? item.total_amount : 0

  return (
    <div className="row mt-2 pb-2">
      <div className="lg:w-1/6 md:w-1/4 sm:w-1/4">
        <div className="block_logo_bank">
          {/* <img src='d' alt="logo bank" /> */}
          <span>{item.bank_name}</span>
        </div>
      </div>
      <div className="lg:w-5/6 md:w-3/4 sm:w-3/4 font-size-14 dark_color_text">
        <dl>
          <dt className="flex justify-between">
            <span className="dark_color_text">{item.bank_name}</span>
            <span className="color-gray">
              {dayjs(item.created_date ? item.created_date : new Date()).format('DD/MM/YYYY')}
            </span>
          </dt>
          <dd className="color-gray">
            Chi nhánh <span>{item.bank_branch}</span>
          </dd>
          <dd className="color-gray">
            Số tài khoản: <span className="dark_color_text">{item.bank_accountNumber}</span>
          </dd>
          <dd className="color-gray">
            Số tiền đã rút:{' '}
            <span className="dark_color_text">
              <NumericFormat
                value={amount}
                allowLeadingZeros
                displayType={'text'}
                thousandSeparator=","
              />{' '}
              đ
            </span>
          </dd>
          {bankDefault}
        </dl>
      </div>
      <div className="line-gray"></div>
    </div>
  )
}

BankHistoryItem.propTypes = {
  item: PropTypes.object,
}

BankHistoryItem.defaultProps = {
  item: {
    bank_name: 'ACB',
    bank_accountNumber: '123456789',
    bank_default: '0',
    total_amount: '0',
    deleted: '0',
  },
}

export default BankHistoryItem
