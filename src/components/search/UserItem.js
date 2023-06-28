import React from 'react'
import PropTypes from 'prop-types'
import iconArrow from 'src/assets/images/arrow_right_white.png'
import classNames from 'classnames'
import { setListUserSearch } from '../../store/userItemSlice'
import { useDispatch } from 'react-redux'
import defaultAvatarMale from 'src/assets/images/avatars/Default-MaleAvatar.png'

const hardFixUrlAvatar = (str) => {
  const findIndexFolder = str.indexOf('images')
  const lastIndexFolder = str.indexOf('?')
  const findSubString = str.substring(findIndexFolder, lastIndexFolder)
  const _newUrl = findSubString.split('/').join('%2F')
  const urlRight = str.replace(findSubString, _newUrl)
  return urlRight
}

const UserItem = (props) => {
  const { userProp, activeItem, setActiveItem } = props
  const dispatch = useDispatch()

  function handleOpenDetail() {
    setActiveItem(userProp.ID)
    dispatch(setListUserSearch(userProp))
  }

  return (
    <div
      className={classNames({
        'search-item flex justify-between pl-3 mt-2': true,
        active: activeItem === userProp.ID,
      })}
      onClick={handleOpenDetail}
    >
      <div className="flex">
        <div className="block_logo_bank">
          <img
            className="object-cover"
            src={userProp.avatarImage ? hardFixUrlAvatar(userProp.avatarImage) : defaultAvatarMale}
            alt="avatar"
          />
        </div>
        <div className="ml-3 mt-1 font-size-14 dark_color_text">
          <dl className="mb-0">
            <dt className="font-size-16 font-weight-500">{userProp.fullName}</dt>
            <dd className="mt-1 mb-0 font-size-14">{userProp.mobilePhone}</dd>
          </dl>
        </div>
      </div>
      <div className="float-right">
        <img src={iconArrow} alt="icon" width={22}></img>
      </div>
    </div>
  )
}

UserItem.propTypes = {
  userProp: PropTypes.object,
  activeItem: PropTypes.string,
  setActiveItem: PropTypes.func,
}

UserItem.defaultProps = {
  userProp: {
    ID: '',
    avatarImage: '',
    fullName: '',
    mobilePhone: '',
  },
  activeItem: '0',
}

export default UserItem
