import React from 'react'
import PropTypes from 'prop-types'
import 'react-tooltip/dist/react-tooltip.css'
import BlockActivity from './BlockActivity'
import classNames from 'classnames'

const ElementTemplate = (props) => {
  const { item, classValue } = props

  return <div className={classValue}>{item}</div>
}

ElementTemplate.propTypes = {
  item: PropTypes.string,
  classValue: PropTypes.string,
}

const LegendTemplate = (props) => {
  const { item, color } = props

  return (
    <div className="flex w-1/5">
      <div
        className={classNames({
          'mt-2.5 w-12	h-2.5': true,
          'opacity-25': item.opacity === 25,
          'opacity-50': item.opacity === 50,
          'opacity-75': item.opacity === 75,
        })}
        style={{ backgroundColor: `${color}` }}
      ></div>
      <span className="ml-3 font-medium text-base	color-gray">{item.text}</span>
    </div>
  )
}

LegendTemplate.propTypes = {
  item: PropTypes.object,
  color: PropTypes.string,
}

const ActivityCalendar = (props) => {
  const { data, labels } = props

  const hourLabels =
    labels.hours && labels.hours.length
      ? labels.hours.map((hour, idx) => (
          <ElementTemplate key={idx} item={hour} classValue="w-full h-7"></ElementTemplate>
        ))
      : ''
  const weekDayLabels =
    labels.weekdays && labels.weekdays.length
      ? labels.weekdays.map((weekDay, idx) => (
          <ElementTemplate key={idx} item={weekDay} classValue=""></ElementTemplate>
        ))
      : ''
  const legendLabels =
    labels.legends && labels.legends.length
      ? labels.legends.map((item, idx) => (
          <LegendTemplate key={idx} item={item} color={labels.color}></LegendTemplate>
        ))
      : ''

  const contentBlock =
    data && data.length
      ? data.map((row) =>
          row.map((item, idx) => (
            <BlockActivity key={idx} item={item} color={labels.color}></BlockActivity>
          )),
        )
      : ''

  return (
    <>
      <div className="row mt-3">
        <div className="flex">
          <div className="w-11/12">
            <div className="mt-3 grid grid-cols-12 gap-2">{contentBlock}</div>
          </div>

          <div className="w-1/12">
            <div className="mt-4 ml-3 grid grid-rows-7 gap-3 color-gray">{weekDayLabels}</div>
          </div>
        </div>
        <div className="w-full">
          <div className="w-11/12">
            <div className="mt-3 grid grid-cols-12 gap-2 text-center color-gray">{hourLabels}</div>
          </div>
        </div>
      </div>
      <div className="line-gray"></div>
      <div className="flex mt-4">{legendLabels}</div>
    </>
  )
}

ActivityCalendar.propTypes = {
  data: PropTypes.array,
  labels: PropTypes.object,
}

ActivityCalendar.defaultProps = {
  userInfoProps: {
    labels: {
      color: '#146cff',
      hours: [
        '00:00',
        '02:00',
        '04:00',
        '06:00',
        '08:00',
        '10:00',
        '12:00',
        '14:00',
        '16:00',
        '18:00',
        '20:00',
        '22:00',
      ],
      weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
  },
}

export default ActivityCalendar
