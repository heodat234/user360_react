import React from 'react'
import PropTypes from 'prop-types'
import iconArrow from 'src/assets/images/arrow_right_white.png'
// import iconProfile from 'src/assets/images/icon_profile.png'
import classNames from 'classnames'
import { activeUserItem, setListUserSearch } from '../../store/userItemSlice'
import { setVisibleRight } from 'src/store/modalSlice'
import { useDispatch } from 'react-redux'
import stone from 'src/assets/images/Legendary/Stone.png'
import silver from 'src/assets/images/Legendary/Silver.png'
import gold from 'src/assets/images/Legendary/Gold.png'
import diamond from 'src/assets/images/Legendary/Diamond.png'

const CollaboratorItem = (props) => {
  const { item } = props
  const dispatch = useDispatch()

  function handleOpenDetail() {
    dispatch(setVisibleRight(false))
    dispatch(activeUserItem(item.userID))

    const userItem = {
      ID: item.userID,
      avatarImage: item.avatarImage,
      fullName: item.fullName,
      mobilePhone: item.mobilePhone.slice(0, 3) + 'xxxx' + item.mobilePhone.slice(-3),
    }
    dispatch(setListUserSearch(userItem))
  }

  var icon = ''
  switch (item.level_code) {
    case 'user':
    case 'earning_user':
      icon = stone
      break
    case 'VAR_RSA':
    case 'KPI_RSA':
    case 'FIX_RSA':
      icon = silver
      break
    case 'VAR_RSM':
    case 'KPI_RSM':
    case 'FIX_RSM':
      icon = gold
      break
    case 'head':
      icon = diamond
      break
    default:
      icon = stone
      break
  }

  return (
    <div
      className="flex items-center rounded p-3 mb-3 dark_bg_card cursor-pointer"
      onClick={handleOpenDetail}
    >
      <div className="mr-2">
        <img src={icon} alt="icon profile" width={44}></img>
      </div>
      <div className={classNames({ 'flex justify-between items-center w-full pl-3': true })}>
        <div className="flex">
          <div className="block_logo_bank">
            <img className="object-cover" src={item.avatarImage} alt="avatar" />
          </div>
          <div className="ml-3 mt-1 font-size-14 dark_color_text">
            <dl className="mb-0">
              <dt className="font-size-16 font-weight-500">
                <span>{item.fullName}</span> - <span>Tầng {item.refLevel}</span>
              </dt>
              <dd className="mt-1 mb-0 font-size-14">{item.mobilePhone}</dd>
            </dl>
          </div>
        </div>
        <div className="float-right">
          <img src={iconArrow} alt="icon" width={22}></img>
        </div>
      </div>
    </div>
  )
}

CollaboratorItem.propTypes = {
  item: PropTypes.object,
}

CollaboratorItem.defaultProps = {
  item: {
    avatarImage: '',
    fullName: '',
    mobilePhone: '',
    refLevel: '1',
    level_code: 'user',
  },
}

export default CollaboratorItem
