import React from 'react'
import PropTypes from 'prop-types'
// import moment from 'moment';
import classNames from 'classnames'
import iconCheck from 'src/assets/images/icon_check_status.png'

const TransactionItem = (props) => {
  const { item } = props

  if (item.type !== 'tax_holding') {
    return (
      <>
        <div className="his-item">
          <p className="dark_color_text font-size-13 mb-1">
            #{item.ID}: {item.transTitle}
          </p>
          <div className="justify-content_space">
            <div>
              <label className="color-gray font-size-12">Giao dịch:</label>
              <span
                className={classNames({
                  'font-size-13': true,
                  'color-00d69c': parseFloat(item.creditAmount) > 0,
                  'color-ff6647': parseFloat(item.creditAmount) < 0,
                })}
              >
                {' '}
                {parseFloat(item.creditAmount).toLocaleString('en-US')} đ
              </span>
            </div>
            <div>
              <label className="color-gray font-size-12">Số dư Mfast:</label>
              <span className="dark_color_text font-size-13">
                {' '}
                {parseInt(item.newBalance).toLocaleString('en-US')} đ
              </span>
            </div>
            <div className="flex">
              <label className="color-gray font-size-12">{item.transDate}</label>
              <span className="rounded-md ml-2" style={{ backgroundColor: '#d6fff4' }}>
                <img src={iconCheck} alt="icon check" width={22}></img>
              </span>
            </div>
          </div>
        </div>
        <div className="line-gray mb-2"></div>
      </>
    )
  } else {
    return (
      <>
        <div className="his-item">
          <p className="dark_color_text font-size-13 mb-1">
            #{item.ID}: {item.transTitle}
          </p>
          <div className="justify-content_space">
            <div>
              <label className="color-gray font-size-12">Thuế:</label>
              <span
                className={classNames({
                  'font-size-13': true,
                  'color-00d69c': parseFloat(item.tax) > 0,
                  'color-ff6647': parseFloat(item.tax) < 0,
                })}
              >
                {' '}
                {parseFloat(item.tax).toLocaleString('en-US')} đ
              </span>
            </div>
            <div>
              <label className="color-gray font-size-12">Thu nhập:</label>
              <span className="dark_color_text font-size-13">
                {' '}
                {parseInt(item.amount).toLocaleString('en-US')} đ
              </span>
            </div>
            <div className="flex">
              <label className="color-gray font-size-12">{item.transDate}</label>
              <span className="rounded-md ml-2" style={{ backgroundColor: '#d6fff4' }}>
                <img src={iconCheck} alt="icon check" width={22}></img>
              </span>
            </div>
          </div>
        </div>
        <div className="line-gray mb-2"></div>
      </>
    )
  }
}

TransactionItem.propTypes = {
  item: PropTypes.object,
}

TransactionItem.defaultProps = {
  item: {
    ID: '12345',
    transTitle: 'Default',
    creditAmount: 0,
    newBalance: 0,
    transDate: new Date(),
  },
}

export default TransactionItem
