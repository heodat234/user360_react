import React from 'react'
import PropTypes from 'prop-types'
import logoBank from 'src/assets/images/icon_bank.png'
const BankingItem = (props) => {
  const { banking } = props

  return (
    <>
      <div className="flex mt-2">
        <div className="">
          <div className="block_logo_bank">
            {/* <img src={banking.selfie_path} alt="logo bank" /> */}
            <span>{banking.bank_name}</span>
          </div>
        </div>
        <div className="ml-3 font-size-14 dark_color_text">
          <dl>
            <dt className="font-normal text-sm">{banking.bank_name}</dt>
            <dd className="mb-0 text-base font-medium">{banking.bank_accountNumber}</dd>
          </dl>
        </div>
      </div>
      <div className="mt-2  mb-2 line-gray"></div>
    </>
  )
}

BankingItem.propTypes = {
  banking: PropTypes.object,
}

BankingItem.defaultProps = {
  banking: {
    selfie_path: logoBank,
    bank_name: 'ACB',
    bank_accountNumber: '123456789',
  },
}

export default BankingItem
