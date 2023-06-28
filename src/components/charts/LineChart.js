import React from 'react'
// import { Bar } from 'react-chartjs-2';
import 'rsuite/dist/rsuite.min.css'
import PropTypes from 'prop-types'
import { Chart, Tooltip } from 'chart.js'
import { CChart } from '@coreui/react-chartjs'
import GrowthRate from '../dashboard/GrowthRate'

// import { NumericFormat } from 'react-number-format';

Chart.register(Tooltip)

const LineChart = (props) => {
  const { dataChart } = props

  const data = [
    dataChart.total,
    dataChart.waitting,
    dataChart.fail,
    dataChart.success,
    dataChart.dup_success,
  ]

  const options = {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (context) => {
            return ``
          },
          label: (context) => {
            return ` ${context.label}: ${context.raw}`
          },
        },
      },
    },
    responsive: true,
  }

  return (
    <>
      <div className="flex pl-20 pb-2">
        <div className="w-1/4">
          <dl>
            <dt className="text-base font-medium dark_color_text">Tất cả</dt>
            <dd className="flex items-center text-lg font-semibold color-total">
              <span>{dataChart.total}</span>
              <GrowthRate
                rate={dataChart.percent_total}
                status={dataChart.percent_total > 0 ? 'up' : 'down'}
              ></GrowthRate>
            </dd>
          </dl>
        </div>
        <div className="w-1/4">
          <dl>
            <dt className="text-base font-medium dark_color_text">Đang xử lý</dt>
            <dd className="flex items-center text-lg font-semibold color-waitting">
              <span>{dataChart.waitting}</span>
              <GrowthRate
                rate={dataChart.percent_waitting}
                status={dataChart.percent_waitting > 0 ? 'up' : 'down'}
              ></GrowthRate>
            </dd>
          </dl>
        </div>
        <div className="w-1/4">
          <dl>
            <dt className="text-base font-medium dark_color_text">Thất bại</dt>
            <dd className="flex items-center text-lg font-semibold color-disable">
              <span>{dataChart.fail}</span>
              <GrowthRate
                rate={dataChart.percent_fail}
                status={dataChart.percent_fail > 0 ? 'up' : 'down'}
              ></GrowthRate>
            </dd>
          </dl>
        </div>
        <div className="w-1/4">
          <dl>
            <dt className="text-base font-medium dark_color_text">Thành công</dt>
            <dd className="flex items-center text-lg font-semibold color-active">
              <span>{dataChart.success}</span>
              <GrowthRate
                rate={dataChart.percent_success}
                status={dataChart.percent_success > 0 ? 'up' : 'down'}
              ></GrowthRate>
            </dd>
          </dl>
        </div>
      </div>
      <CChart
        type="line"
        data={{
          labels: dataChart.labels,
          datasets: [
            {
              fill: true,
              backgroundColor: '#5292ff',
              borderColor: '#146cff',
              pointBackgroundColor: 'rgba(220, 220, 220, 1)',
              pointBorderColor: '#fff',
              data: data,
            },
          ],
        }}
        options={options}
      />
    </>
  )
}

LineChart.propTypes = {
  dataChart: PropTypes.object,
}

export default LineChart
