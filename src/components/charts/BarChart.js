import React from 'react'
// import { Bar } from 'react-chartjs-2';
import 'rsuite/dist/rsuite.min.css'
import PropTypes from 'prop-types'
import { Chart, Tooltip } from 'chart.js'
import { CChart } from '@coreui/react-chartjs'

// import { NumericFormat } from 'react-number-format';

Chart.register(Tooltip)

const BarChart = (props) => {
  const { dataChart } = props

  const options = {
    plugins: {
      title: {
        display: false,
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  }

  return (
    <>
      <CChart
        type="bar"
        customTooltips={true}
        data={{
          labels: dataChart.label_arr,
          datasets: [
            {
              label: 'Đang xử lý',
              backgroundColor: '#ffad1f',
              data: dataChart.waitting_arr,
            },
            {
              label: 'Thất bại',
              backgroundColor: '#ff6647',
              data: dataChart.fail_arr,
            },
            {
              label: 'Thành công',
              backgroundColor: '#00d69c',
              data: dataChart.success_arr,
            },
          ],
        }}
        labels="months"
        options={options}
      />
    </>
  )
}

BarChart.propTypes = {
  dataChart: PropTypes.object,
}

export default BarChart
