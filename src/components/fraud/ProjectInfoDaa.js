import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { NumericFormat } from 'react-number-format'

const ProjectInfoDaa = ({ item }) => {
  return (
    <>
      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Sản phẩm tham gia: </dt>
        <dd className="mb-0 dark_color_text">{item.projectName}</dd>
      </dl>
      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Trạng thái: </dt>
        <dd className="mb-0 dark_color_text">{item.lastProcessText}</dd>
      </dl>
      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Tiền hoa hồng: </dt>
        <dd className="mb-0 dark_color_text">
          <NumericFormat
            value={item.commAmount}
            allowLeadingZeros
            displayType={'text'}
            thousandSeparator=","
          />
          đ
        </dd>
      </dl>
      <dl className="flex text-sm">
        <dt className="mr-2 color-gray">Ngày cập nhật:</dt>
        <dd className="mb-0 dark_color_text">
          {item.updatedDate ? dayjs(item.updatedDate).format('DD/MM/YYYY') : ''}
        </dd>
      </dl>
    </>
  )
}

ProjectInfoDaa.propTypes = {
  item: PropTypes.object,
}

export default ProjectInfoDaa
