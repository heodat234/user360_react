import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { NumericFormat } from 'react-number-format'

const ProjectInfoInsurance = ({ item }) => {
  return (
    <>
      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Sản phẩm tham gia: </dt>
        <dd className="mb-0 dark_color_text">{item.title}</dd>
      </dl>
      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Số tiền mua bảo hiểm: </dt>
        <dd className="mb-0 dark_color_text">
          <NumericFormat
            value={item.amount}
            allowLeadingZeros
            displayType={'text'}
            thousandSeparator=","
          />
          đ
        </dd>
      </dl>
      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Ngày bắt đầu:</dt>
        <dd className="mb-0 dark_color_text">
          {item.startDate ? dayjs(item.startDate).format('DD/MM/YYYY') : ''}
        </dd>
      </dl>
      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Ngày kết thúc:</dt>
        <dd className="mb-0 dark_color_text">
          {item.expiredDate ? dayjs(item.expiredDate).format('DD/MM/YYYY') : ''}
        </dd>
      </dl>
    </>
  )
}

ProjectInfoInsurance.propTypes = {
  item: PropTypes.object,
}

export default ProjectInfoInsurance
