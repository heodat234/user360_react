import React from 'react'
import PropTypes from 'prop-types'
import iconArrow from 'src/assets/images/arrow_right_white.png'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { activeUserItem, setListUserSearch } from 'src/store/userItemSlice'
import { setVisibleRight } from 'src/store/modalSlice'

const BranchItem = (props) => {
  const { item, index, endItem } = props
  const dispatch = useDispatch()

  function handleOpenDetail() {
    dispatch(setVisibleRight(false))
    dispatch(activeUserItem(item.userID))

    const userItem = {
      ID: item.userID,
      avatarImage: item.avatar,
      fullName: item.fullName,
      mobilePhone: item.mobilePhone.slice(0, 3) + 'xxxx' + item.mobilePhone.slice(-3),
    }
    dispatch(setListUserSearch(userItem))
  }

  var width = '100%'
  var left = '0%'
  var leftLine = '0%'
  switch (index) {
    case 1:
      width = '100%'
      left = '0%'
      leftLine = '0%'
      break
    case 2:
      width = '94%'
      left = '6%'
      leftLine = '3%'
      break
    case 3:
      width = '88%'
      left = '12%'
      leftLine = '9%'
      break
    case 4:
      width = '82%'
      left = '18%'
      leftLine = '15%'
      break
    case 5:
      width = '76%'
      left = '24%'
      leftLine = '21%'
      break
    case 6:
      width = '70%'
      left = '30%'
      leftLine = '27%'
      break
    case 7:
      width = '64%'
      left = '36%'
      leftLine = '33%'
      break
    default:
      break
  }

  var displayLine = 'block'
  if (width === '100%') {
    displayLine = 'none'
  }
  return (
    <>
      <div
        className="line-branch"
        style={{ marginLeft: `${leftLine}`, display: `${displayLine}` }}
      ></div>
      <div
        className={classNames({ 'dark_bg_card cursor-pointer': true, 'bg-color-active': endItem })}
        style={{
          borderTopLeftRadius: '50px',
          borderBottomLeftRadius: '50px',
          width: `${width}`,
          marginLeft: `${left}`,
          marginTop: '-26px',
          height: '52px',
        }}
        onClick={handleOpenDetail}
      >
        <div className="flex justify-between items-center w-full ">
          <div className="flex">
            <div className="block_logo_bank" style={{ backgroundColor: '#fff' }}>
              <img className="object-cover" src={item.avatar} alt="avatar" />
            </div>
            <div className="ml-3 mt-1 font-size-14 dark_color_text">
              <dl className="mb-0">
                <dt className="font-size-16 font-weight-500">
                  <span>{item.fullName}</span>
                </dt>
                <dd className="mt-0.5 mb-0 font-size-14 color-gray">
                  <span className="font-semibold" style={{ color: !endItem ? '#f16464' : '#fff' }}>
                    {item.level}
                  </span>{' '}
                  - <span style={{ color: endItem && '#fff' }}>{item.rank}</span>
                </dd>
              </dl>
            </div>
          </div>
          <div className={classNames({ 'float-right': true, ' hidden': endItem })}>
            <img src={iconArrow} alt="icon" width={22}></img>
          </div>
        </div>
      </div>
    </>
  )
}

BranchItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  endItem: PropTypes.bool,
}

BranchItem.defaultProps = {
  item: {
    avatarImage: '',
    fullName: 'Test',
    mobilePhone: '',
    refLevel: '1',
  },
}

export default BranchItem
