import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import iconStar from 'src/assets/images/icon_star_green.png'

const RatingItem = (props) => {
  const { item } = props

  var listStar = []
  for (let index = 0; index < parseInt(item.rating); index++) {
    listStar.push(<img src={iconStar} alt="icon star" width={22}></img>)
  }

  return (
    <div className="rounded p-3 mb-3 w-[500px] dark_bg_card ">
      <div className="">
        <p className="font-semibold mb-2 dark_color_text">{item.title}</p>
        <div className="flex justify-between items-center mb-3">
          <div className="flex">{listStar}</div>
          <div className="mt-1 mb-0 font-size-14 color-gray">
            {item.fullName} -{' '}
            <span>
              {dayjs(item.createdDate ? item.createdDate : new Date()).format('DD/MM/YYYY')}
            </span>
          </div>
        </div>
        <p className="font-size-13 color-gray">{item.comment}</p>
      </div>
    </div>
  )
}

RatingItem.propTypes = {
  item: PropTypes.object,
}

RatingItem.defaultProps = {
  item: {
    title: 'test',
    comment: '',
    createdDate: '',
    fullName: '',
    rating: 5,
  },
}

export default RatingItem
