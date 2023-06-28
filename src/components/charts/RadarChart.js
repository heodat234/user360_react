import React from 'react'
import { CChartRadar } from '@coreui/react-chartjs'
import PropTypes from 'prop-types'

const RadarChart = (props) => {
  const { data } = props

  const dataRadar = {
    labels: ['Kỹ năng dẫn dắt', 'Kỹ năng bán hàng', 'Điểm tín nhiệm'],
    datasets: [
      {
        label: 'Điểm',
        backgroundColor: 'rgba(0, 95, 255, 0.2)',
        borderColor: '#005fff',
        pointBackgroundColor: '#005fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220, 220, 220, 1)',
        data: data,
      },
    ],
  }

  const options = {
    elements: {
      line: {
        borderWidth: 2,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        angleLines: {
          color: '#3c3c53',
        },
        grid: {
          color: '#3c3c53',
        },
        pointLabels: {
          color: '#858598',
        },
        ticks: {
          backdropColor: '#3c3c53',
          color: '#858598',
        },
      },
    },
  }

  return (
    <>
      <CChartRadar data={dataRadar} options={options} />
    </>
  )
}
RadarChart.propTypes = {
  data: PropTypes.array,
}

export default RadarChart
