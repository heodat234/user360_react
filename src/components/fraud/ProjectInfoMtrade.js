import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { NumericFormat } from 'react-number-format'

const ProjectInfoMtrade = ({ item }) => {
  const orderItems = item.items ? item.items : []

  return (
    <>
      <label className="mr-2 mb-2 color-gray">Sản phẩm đã mua: </label>
      {orderItems.length &&
        orderItems.map((oit, idx) => (
          <div key={idx}>
            <div className="flex">
              <div className="w-24 flex items-center justify-center">
                <img
                  src={oit.medium && JSON.parse(oit.medium).length ? JSON.parse(oit.medium)[0] : ''}
                  alt="icon"
                  width={50}
                ></img>
              </div>
              <div className="ml-2 w-full">
                <dl className="flex text-sm">
                  <dd className="mb-0 dark_color_text">{oit.productName}</dd>
                </dl>
                <dl className="flex justify-between text-sm mb-0">
                  <dt className="mr-2 color-gray">
                    <NumericFormat
                      value={oit.amount}
                      allowLeadingZeros
                      displayType={'text'}
                      thousandSeparator=","
                    />
                    đ
                  </dt>
                  <div className="flex">
                    <dt className="mr-2 color-gray">Số lượng: </dt>
                    <dd className="mb-0 dark_color_text">{oit.quantity}</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="mb-2 line-dashed-gray"></div>
          </div>
        ))}

      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Tổng sản phẩm: </dt>
        <dd className="mb-0 dark_color_text">{item.quantity}</dd>
      </dl>
      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Thành tiền:</dt>
        <dd className="mb-0 dark_color_text">
          <NumericFormat
            value={item.amountBeforeTax}
            allowLeadingZeros
            displayType={'text'}
            thousandSeparator=","
          />
        </dd>
      </dl>
      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Thanh toán:</dt>
        <dd className=" mb-0 dark_color_text">{item.mplToken ? 'TRẢ CHẬM' : 'TRẢ NGAY'}</dd>
      </dl>
      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Ngày tạo: </dt>
        <dd className="mb-0 dark_color_text">
          {item.createdDate ? dayjs(item.createdDate).format('DD/MM/YYYY') : ''}
        </dd>
      </dl>
      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Trạng thái:</dt>
        <dd className="mb-0 dark_color_text">{item.lastProcessText}</dd>
      </dl>
      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Địa chỉ nhận hàng:</dt>
        <dd className="mb-0 dark_color_text">{item.addressOrder}</dd>
      </dl>
    </>
  )
}

ProjectInfoMtrade.propTypes = {
  item: PropTypes.object,
}

export default ProjectInfoMtrade
