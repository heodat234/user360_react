import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import 'rsuite/dist/rsuite.min.css'
import PropTypes from 'prop-types'
import { Chart, ArcElement, Tooltip } from 'chart.js'

// import { NumericFormat } from 'react-number-format';

Chart.register(ArcElement, Tooltip)

const formatNumber = (number) => {
  // Kiểm tra nếu số là tỉ
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1) + ' tỉ'
  }
  // Kiểm tra nếu số là triệu
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + ' tr'
  }
  // Kiểm tra nếu số là nghìn
  else if (number >= 1000) {
    return (number / 1000).toFixed(0) + 'k'
  }
  // Trường hợp số nhỏ hơn 1000, không cần rút gọn
  else {
    return number.toString()
  }
}

const DoughnutChart = ({ dataDoughnut, totalDoughnut }) => {
  if (dataDoughnut.data.length === 0) {
    dataDoughnut = {
      labels: ['default'],
      backgrounds: ['#6b6b81'],
      borderColor: ['#3c3c53'],
      data: [-1],
      unit: '',
    }
  }
  const initDataDoughnut = {
    labels: dataDoughnut.labels,
    datasets: [
      {
        label: 'Thu/chi',
        backgroundColor: dataDoughnut.backgrounds,
        data: dataDoughnut.data,
        borderColor: dataDoughnut.borderColor,
        total: totalDoughnut,
      },
    ],
  }

  // console.log(totalDoughnut)
  // console.log(totalChart)
  // var totalFormat = ''
  // if (totalChart.toString().length > 2) {
  //   totalFormat = totalChart / 1000000
  //   dataDoughnut.unit = 'tr'
  //   console.log(totalFormat)
  // }

  const textCenter = {
    id: 'textCenter',
    beforeDatasetsDraw(chart) {
      const { ctx, data } = chart
      if (chart.getDatasetMeta(0).data[0]) {
        // let total = data.datasets[0].data.reduce((pv, cv) => parseInt(pv) + parseInt(cv), 0)
        let total = data.datasets[0].total

        ctx.save()
        ctx.font = 'bolder 18px sans-serif'
        ctx.fillStyle = '#858598'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(
          `${formatNumber(total)}`,
          chart.getDatasetMeta(0).data[0].x,
          chart.getDatasetMeta(0).data[0].y,
        )
      }
    },
  }

  const emptyDoughnut = {
    id: 'emptyDoughnut',
    afterDraw(chart, args, options) {
      const { datasets } = chart.data
      const { color, width, radiusDecrease } = options
      let hasData = false

      for (let i = 0; i < datasets.length; i += 1) {
        const dataset = datasets[i]
        hasData |= dataset.data.length > 0
      }
      if (!hasData) {
        const {
          chartArea: { left, top, right, bottom },
          ctx,
        } = chart
        const centerX = (left + right) / 2
        const centerY = (top + bottom) / 2
        const r = Math.min(right - left, bottom - top) / 2

        ctx.beginPath()
        ctx.lineWidth = width || 2
        ctx.strokeStyle = color || 'rgba(255, 128, 0, 0.5)'
        ctx.arc(centerX, centerY, r - radiusDecrease || 0, 0, 2 * Math.PI)
        ctx.stroke()

        ctx.save()
        ctx.font = 'bolder 18px sans-serif'
        ctx.fillStyle = '#858598'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(`Không có data`, centerX, centerY)
      }
    },
  }

  const options = {
    plugins: {
      emptyDoughnut: {
        color: '#146cff',
        width: 2,
        radiusDecrease: 20,
      },
      tooltip: {
        callbacks: {
          title: (context) => {
            if (dataDoughnut.startTime) {
              return `Từ ${dataDoughnut.startTime} đến ${dataDoughnut.endTime}`
            } else {
              return ``
            }
          },
          label: (context) => {
            if (dataDoughnut.unit === '') {
              return ' Empty data'
            } else {
              return ` ${context.label}: ${context.parsed.toLocaleString('en-US')} ${
                dataDoughnut.unit
              }`
            }
          },
        },
      },
    },
  }

  return (
    <>
      <Doughnut data={initDataDoughnut} options={options} plugins={[textCenter, emptyDoughnut]} />
    </>
  )
}

DoughnutChart.propTypes = {
  dataDoughnut: PropTypes.object,
  totalDoughnut: PropTypes.number,
}

DoughnutChart.defaultProps = {
  dataDoughnut: {
    labels: ['default'],
    backgrounds: ['#6b6b81'],
    data: [0],
  },
  totalDoughnut: 0,
}

export default DoughnutChart
