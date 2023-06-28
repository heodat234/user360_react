import React from 'react'
import { CCard, CCol, CRow } from '@coreui/react'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setVisibleRight, setTemplateModalRight } from '../../store/modalSlice'
import { useSelector } from 'react-redux'
import { selectUser } from '../../store/userSlice'
import { selectUserItem } from '../../store/userItemSlice'
import defaultAvatarFemale from 'src/assets/images/avatars/Default-FemaleAvatar.png'
import defaultAvatarMale from 'src/assets/images/avatars/Default-MaleAvatar.png'
import iconChat from 'src/assets/images/icon_chat.png'
import iconPhone from 'src/assets/images/icon_phone.png'
import iconStar from 'src/assets/images/icon_star.png'
import iconArrowRight from 'src/assets/images/arrow_right.png'
import CreateIdentification from './CreateIdentification'
import Template from '../Template'

import stone from 'src/assets/images/Legendary/Stone.png'
import silver from 'src/assets/images/Legendary/Silver.png'
import gold from 'src/assets/images/Legendary/Gold.png'
import diamond from 'src/assets/images/Legendary/Diamond.png'
import { getURLOpenMessenger } from 'src/api/axios'

const hardFixUrlAvatar = (str) => {
  const findIndexFolder = str.indexOf('images')
  const lastIndexFolder = str.indexOf('?')
  const findSubString = str.substring(findIndexFolder, lastIndexFolder)
  const _newUrl = findSubString.split('/').join('%2F')
  const urlRight = str.replace(findSubString, _newUrl)
  return urlRight
}

const ShowGuide = ({ rsmUserName }) => {
  const dispatch = useDispatch()

  const onHandleShowGuide = () => {
    dispatch(setVisibleRight(true))
    dispatch(setTemplateModalRight('guides'))
  }

  return (
    <button className="flex btn_history" onClick={onHandleShowGuide}>
      {rsmUserName} <img src={iconArrowRight} alt="icon" width="22px"></img>
    </button>
  )
}

ShowGuide.propTypes = {
  rsmUserName: PropTypes.string,
}

const UserInfo = (props) => {
  const { userInfoProps } = props

  const dispatch = useDispatch()
  const userLogin = useSelector(selectUser)
  const userItem = parseInt(useSelector(selectUserItem))

  const onHandleShowHistory = () => {
    dispatch(setVisibleRight(true))
    dispatch(setTemplateModalRight('levelHistory'))
  }

  const onHandleCall = () => {
    // userInfoProps ? 'tel:'+userInfoProps.mobilePhone : 'tel:0909090909'
    if (typeof __webcall !== 'undefined') {
      // __webcall.callNow(userInfoProps.mobilePhone)
    }
  }

  const btnRSM =
    userInfoProps && userInfoProps.userReferral && userInfoProps.rsmUserName ? (
      <ShowGuide rsmUserName={userInfoProps.rsmUserName}></ShowGuide>
    ) : (
      ''
    )

  let checkStar = 0
  let titleLevel = ''
  var icon = ''
  var avatar = userInfoProps.avatarImage ? hardFixUrlAvatar(userInfoProps.avatarImage) : ''

  if (userInfoProps && userInfoProps.level) {
    switch (userInfoProps.level.level) {
      case 'VAR_RSA':
      case 'VAR_RSM':
        checkStar = 1
        break
      case 'KPI_RSA':
      case 'KPI_RSM':
        checkStar = 2
        break
      case 'FIX_RSA':
      case 'FIX_RSM':
        checkStar = 3
        break
      default:
        checkStar = 0
        break
    }

    switch (userInfoProps.level.level) {
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

    if (userInfoProps.sex === 'female' || userInfoProps.sex === 'NỮ') {
      if (userInfoProps.avatarImage === null || userInfoProps.avatarImage === '') {
        avatar = defaultAvatarFemale
      }
    } else {
      if (userInfoProps.avatarImage === null || userInfoProps.avatarImage === '') {
        avatar = defaultAvatarMale
      }
    }

    titleLevel = userInfoProps.level.title
  }

  let listStar = ''
  for (let i = 0; i < checkStar; i++) {
    listStar += `<img src=` + iconStar + ` alt="icon" width='22px'></img>`
  }

  const openMessenger = () => {
    getURLOpenMessenger(userLogin.accessToken, userItem)
      .then((json) => {
        if (json.status) {
          window.open(json.url, '_blank', 'noopener,noreferrer')
        }
      })
      .catch((e) => {})
  }

  return (
    <>
      <CRow className="mt-4">
        <CCol xs>
          <CCard className="dark_bg_card mb-4">
            <div className="row p-3">
              <div className="lg:w-2/12 md:w-4/12 sm:w-6/12">
                <div className="block_avatar">
                  <img src={avatar} alt="avatar" />
                </div>
              </div>
              <div className="lg:w-4/12 md:w-6/12 sm:w-8/12 ml-n40">
                <div className="flex">
                  <p className="nickName mt-1 dark_color_text">{userInfoProps.fullName}</p>
                  <div className="mt-2.5 ml-5">
                    <CreateIdentification
                      identification={userInfoProps ? userInfoProps.ctv_agreement : false}
                    ></CreateIdentification>
                  </div>
                </div>
                <div className="flex color-gray font-size-14 mt-2">
                  <p>Tham gia ngày:</p>
                  <p className="mt-0 ml-5">
                    {dayjs(userInfoProps ? userInfoProps.createdDate : new Date()).format(
                      'DD/MM/YYYY',
                    )}
                  </p>
                </div>
                <div className="mt-2 flex" style={{ alignItems: 'unset' }}>
                  <dl>
                    <dd className="color-gray font-size-16 mb-0">Điểm tín nhiệm:</dd>
                    <dt className="font-size-18 bold dark_color_text">0</dt>
                  </dl>
                  <dl className="ml-16">
                    <dd className="color-gray font-size-16 mb-0">Số điện thoại:</dd>
                    <dt className="font-size-16 font-weight-500 dark_color_text">
                      {userInfoProps.mobilePhone}
                    </dt>
                  </dl>
                </div>
              </div>
              <div className="lg:w-3/12 md:w-6/12 sm:w-full">
                <div className="justify-content_flex">
                  <div className="dark_bg_content icon_center">
                    <img src={icon} alt="icon" width={70} />
                  </div>
                  <div className="ml-5">
                    <div>
                      <div className="align-items_center dark_color_text">
                        {titleLevel}
                        <Template className="flex" html={listStar}></Template>
                      </div>
                    </div>
                    <p>
                      <button className="btn_history" onClick={onHandleShowHistory}>
                        Lịch sử
                      </button>
                    </p>
                  </div>
                </div>
                <dl>
                  <dd className="color-gray font-size-16 mt-2 mb-0">Địa chỉ liên hệ:</dd>
                  <dt className="font-size-16 font-weight-500 dark_color_text">
                    {userInfoProps ? userInfoProps.country_id_address : ''}
                  </dt>
                </dl>
              </div>
              <div className="lg:w-3/12 md:w-6/12 sm:w-full">
                <div className="flex mt-3">
                  <div className="btn_chat" onClick={openMessenger}>
                    <img src={iconChat} alt="icon" width={22}></img> Chat
                  </div>
                  <div className="ml-5">
                    {/* <button onClick={onHandleCall} className="btn_contact">
                      <img src={iconPhone} alt="icon" width={22}></img> Liên hệ
                    </button> */}
                  </div>
                </div>
                <dl>
                  <dd className=" color-gray font-size-16 mt-4 mb-0">Người dẫn dắt:</dd>
                  {btnRSM}
                </dl>
              </div>
            </div>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

UserInfo.propTypes = {
  userInfoProps: PropTypes.object,
}

UserInfo.defaultProps = {
  userInfoProps: {
    full_name: 'TestNe',
    mobilePhone: '0903950909',
  },
}

export default UserInfo
