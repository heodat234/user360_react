import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import classNames from 'classnames'

const BlockActivity = (props) => {
  const { item, color } = props

  // eslint-disable-next-line no-useless-concat
  const tooltipText = item.weekday
    ? 'Mỗi thứ ' +
      item.weekday +
      ', thời điểm ' +
      item.label +
      '<br>' +
      'Truy cập vào Mfast: ' +
      item.count +
      ' lượt'
    : ''
  const tooltipID = 'my-tooltip-activity-' + item.weekday + item.label
  return (
    <>
      <div
        data-tooltip-id={tooltipID}
        data-tooltip-html={tooltipText}
        className={classNames({
          'w-full h-7': true,
          'opacity-25': item.opacity === 25,
          'opacity-50': item.opacity === 50,
          'opacity-75': item.opacity === 75,
        })}
        style={{ backgroundColor: `${color}` }}
      ></div>
      <Tooltip id={tooltipID} />
    </>
  )
}

BlockActivity.propTypes = {
  item: PropTypes.object,
  color: PropTypes.string,
}

export default BlockActivity
