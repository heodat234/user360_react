import React from 'react'
import PropTypes from 'prop-types'
import { NumericFormat } from 'react-number-format'
const ItemByDoughnutChart = (props) => {
  const { item } = props
  return (
    <div className="lg:w-1/2 md:w-full sm:w-full justify-start flex">
      <div className="doughnut-item" style={{ backgroundColor: `${item.background}` }}></div>
      <dl>
        <dt className="color-gray text-sm font-medium">
          {item.name} <span>({item.currentGrowth}%)</span>
        </dt>
        <dd className="dark_color_text">
          <NumericFormat
            value={item.value}
            allowLeadingZeros
            displayType={'text'}
            thousandSeparator=","
          />{' '}
          {item.unit ? 'người' : 'đ'}
        </dd>
      </dl>
    </div>
  )
}

ItemByDoughnutChart.propTypes = {
  item: PropTypes.object,
}

ItemByDoughnutChart.defaultProps = {
  item: {
    name: 'Item',
    currentGrowth: '0%',
    value: '0',
  },
}

export default ItemByDoughnutChart
