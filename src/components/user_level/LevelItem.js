import React from 'react'
import PropTypes from 'prop-types'

const LevelItem = (props) => {
  const { item, endItem } = props

  return (
    <>
      <div className="pt-3">
        <div className="flex justify-between items-start w-full pl-3">
          <div className="flex">
            <div className="dark_color_text">
              <dl className="mb-0">
                <dt className="font-size-16 font-weight-500">
                  <span>{item.title}</span>
                </dt>
                <dd className="mt-1 mb-0 font-size-14 color-gray">Điểm xét hạng: {item.points}</dd>
              </dl>
            </div>
          </div>
          <div className="float-right">
            <span className="color-gray">
              {item.month.substr(-2) + '/' + item.month.substr(0, 4)}
            </span>
          </div>
        </div>
      </div>
      {!endItem ? <div className="line-gray"></div> : ''}
    </>
  )
}

LevelItem.propTypes = {
  item: PropTypes.object,
  endItem: PropTypes.bool,
}

LevelItem.defaultProps = {
  item: {
    title: 'Bá chủ',
    points: 100,
    month: '04-2023',
  },
}

export default LevelItem
