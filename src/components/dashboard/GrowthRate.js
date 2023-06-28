import React from 'react'
import PropTypes from 'prop-types'
import iconArrowUp from 'src/assets/images/arrow_up.png'
import iconArrowDown from 'src/assets/images/arrow_down.png'
import classNames from 'classnames'

const GrowthRate = (props) => {
  const { rate, status } = props
  if (rate === 0) {
    return <></>
  } else {
    return (
      <div className="flex items-center text-sm	ml-4">
        <img
          src={status === 'up' ? iconArrowUp : iconArrowDown}
          alt="icon up"
          width="17px"
          height={'17px'}
        ></img>
        <span
          className={classNames({
            'color-00d69c': status.toString() === 'up',
            'color-ff6647': status === 'down',
          })}
        >
          {rate}%
        </span>
      </div>
    )
  }
}

GrowthRate.propTypes = {
  rate: PropTypes.number,
  status: PropTypes.string,
}

export default GrowthRate
