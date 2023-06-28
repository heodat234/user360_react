import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { NumericFormat } from 'react-number-format'

const ProjectInfoPL = ({ item }) => {
  return (
    <>
      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Sản phẩm tham gia: </dt>
        <dd className="mb-0 font-bold dark_color_text">{item.productName}</dd>
      </dl>
      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Ngày giải ngân:</dt>
        <dd className="mb-0 font-bold dark_color_text">
          {item.operateDate ? dayjs(item.operateDate).format('DD/MM/YYYY') : ''}
        </dd>
      </dl>
      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Số tiền giải ngân:</dt>
        <dd className=" mb-0 dark_color_text">
          <NumericFormat
            value={item.approveAmount}
            allowLeadingZeros
            displayType={'text'}
            thousandSeparator=","
          />
          đ
        </dd>
      </dl>
      {/* <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Số ngày trễ hạn kỳ 1: </dt>
        <dd className="mb-0 dark_color_text">LOSID_2314234</dd>
      </dl>
      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Số ngày trễ hạn kỳ 2:</dt>
        <dd className="mb-0 dark_color_text">LOSID_2314234</dd>
      </dl>
      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Số ngày trễ hạn kỳ 3:</dt>
        <dd className=" mb-0 dark_color_text">6546456456</dd>
      </dl>
      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Ngày trễ hạn hiện tại: </dt>
        <dd className="mb-0 dark_color_text">LOSID_2314234</dd>
      </dl>
      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Ngày thanh toán kỳ 1:</dt>
        <dd className="mb-0 dark_color_text">LOSID_2314234</dd>
      </dl>
      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Ngày thanh toán kỳ 2:</dt>
        <dd className=" mb-0 dark_color_text">6546456456</dd>
      </dl>
      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Ngày thanh toán kỳ 3: </dt>
        <dd className="mb-0 dark_color_text">LOSID_2314234</dd>
      </dl>
      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Số tiền trả hàng tháng:</dt>
        <dd className="mb-0 dark_color_text">LOSID_2314234</dd>
      </dl>
      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Tổng số tiền quá hạn:</dt>
        <dd className=" mb-0 dark_color_text">6546456456</dd>
      </dl>
      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">POS:</dt>
        <dd className=" mb-0 dark_color_text">6546456456</dd>
      </dl> */}
    </>
  )
}

ProjectInfoPL.propTypes = {
  item: PropTypes.object,
  listResult: PropTypes.array,
  onHandleLoadingModal: PropTypes.func,
}

ProjectInfoPL.defaultProps = {
  item: {
    customerName: '',
    customerPhoneHide: '',
    customerIdNumber: '',
    logo: '',
    projectName: '',
    appUID: '',
    productName: '',
    operateDate: new Date(),
  },
}

export default ProjectInfoPL
