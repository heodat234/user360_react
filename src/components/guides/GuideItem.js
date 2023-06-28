import React from 'react'
import PropTypes from 'prop-types'
import iconArrow from 'src/assets/images/arrow_right_white.png'
import { useDispatch } from 'react-redux'
import { activeUserItem, setListUserSearch } from '../../store/userItemSlice'
import { setVisibleRight } from 'src/store/modalSlice'

const GuideItem = (props) => {
  const { item, endItem } = props
  const dispatch = useDispatch()

  function handleOpenDetail() {
    dispatch(setVisibleRight(false))
    dispatch(activeUserItem(item.new_userReferral))

    const userItem = {
      ID: item.new_userReferral,
      avatarImage: item.avatar,
      fullName: item.fullName,
      mobilePhone: item.mobilePhone.slice(0, 3) + 'xxxx' + item.mobilePhone.slice(-3),
    }
    dispatch(setListUserSearch(userItem))
  }

  return (
    <>
      <div className="pt-3 cursor-pointer" onClick={handleOpenDetail}>
        <div className="flex justify-between items-center w-full pl-3">
          <div className="flex">
            <div className="block_logo_bank">
              <img className="object-cover" src={item.avatar} alt="avatar" />
            </div>
            <div className="ml-3 mt-1 font-size-14 dark_color_text">
              <dl className="mb-0">
                <dt className="font-size-16 font-weight-500">
                  <span>{item.fullName}</span>
                </dt>
                <dd className="mt-1 mb-0 font-size-14 color-gray">
                  Từ {item.createdDate} đến {item.endDate}
                </dd>
              </dl>
            </div>
          </div>
          <div className="float-right">
            <img src={iconArrow} alt="icon" width={22}></img>
          </div>
        </div>
      </div>
      {!endItem ? <div className="line-gray"></div> : ''}
    </>
  )
}

GuideItem.propTypes = {
  item: PropTypes.object,
  endItem: PropTypes.bool,
}

GuideItem.defaultProps = {
  item: {
    avatarImage: '',
    fullName: 'Test',
    mobilePhone: '',
    refLevel: '1',
  },
}

export default GuideItem
