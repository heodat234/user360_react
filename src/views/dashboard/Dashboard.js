import React, { useState, useEffect } from 'react'
import CollaboratorsChart from 'src/components/dashboard/CollaboratorsChart'
import IncomeChart from 'src/components/dashboard/IncomeChart'
import PointRating from 'src/components/dashboard/PointRating'
import DelFraudTickets from 'src/components/dashboard/DelFraudTickets'
import ProjectActived from 'src/components/dashboard/ProjectActived'
import RecentEvent from 'src/components/dashboard/RecentEvent'
import UserDocument from 'src/components/dashboard/userDocument'

import UserInfo from 'src/components/dashboard/UserInfo'
import UserInfoOCR from 'src/components/dashboard/UserInfoOCR'
import UserInfoOther from 'src/components/dashboard/UserInfoOther'
import SlideShow from 'src/components/Slider'
import ModalLoading from 'src/components/ModalLoading'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserItem, setListUserSearch } from '../../store/userItemSlice'
import { selectUser } from '../../store/userSlice'
import { setVisibleLoading } from '../../store/modalSlice'
import { getUserInfo } from 'src/api/axios'
import ModalRight from 'src/components/ModalRight'
import ModalRightProject from 'src/components/projects/ModalRight'
import ModalRightFraud from 'src/components/fraud/ModalRight'
import iconSticker from 'src/assets/images/sticker_search.png'
import defaultAvatarFemale from 'src/assets/images/avatars/Default-FemaleAvatar.png'
import defaultAvatarMale from 'src/assets/images/avatars/Default-MaleAvatar.png'
import DirectSales from 'src/components/dashboard/DirectSales'
import ActivityArea from 'src/components/dashboard/ActivityArea'
import ActivityCalendarDashboard from 'src/components/dashboard/ActivityCalendar'

const hardFixUrlAvatar = (str) => {
  const findIndexFolder = str.indexOf('images')
  const lastIndexFolder = str.indexOf('?')
  const findSubString = str.substring(findIndexFolder, lastIndexFolder)
  const _newUrl = findSubString.split('/').join('%2F')
  const urlRight = str.replace(findSubString, _newUrl)
  return urlRight
}

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState()
  const [isCheckEmpty, setIsCheckEmpty] = useState(true)

  const dispatch = useDispatch()
  const userItem = parseInt(useSelector(selectUserItem))
  const userLogin = useSelector(selectUser)

  useEffect(() => {
    if (userItem) {
      setIsCheckEmpty(false)
      dispatch(setVisibleLoading(true))
      getUserInfo(userLogin.accessToken, userItem)
        .then((json) => {
          if (json.status) {
            setUserInfo(json.data)

            var avatar = json.data.avatarImage ? hardFixUrlAvatar(json.data.avatarImage) : ''
            if (json.data.sex === 'female' || json.data.sex === 'NỮ') {
              if (json.data.avatarImage === null || json.data.avatarImage === '') {
                avatar = defaultAvatarFemale
              }
            } else {
              if (json.data.avatarImage === null || json.data.avatarImage === '') {
                avatar = defaultAvatarMale
              }
            }
            const userItem = {
              ID: json.data.ID,
              avatarImage: avatar,
              fullName: json.data.fullName,
              mobilePhone:
                json.data.mobilePhone.slice(0, 3) + 'xxxx' + json.data.mobilePhone.slice(-3),
            }
            dispatch(setListUserSearch(userItem))
          }
          dispatch(setVisibleLoading(false))
        })
        .catch((e) => {
          dispatch(setVisibleLoading(false))
        })
    }
  }, [userLogin, userItem, dispatch])

  if (isCheckEmpty) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="w-28">
          <img src={iconSticker} alt="icon sticker" width={150}></img>
        </div>
        <p className="mt-2 text-2xl font-semibold w-96 text-center">
          Để kiểm tra thông tin, vui lòng tìm kiếm người dùng trước
        </p>
      </div>
    )
  } else {
    return (
      <>
        {/* <Helmet>
          <script
            id="loadWebCall"
            src="https://my.webcall.vn/js/load.call?key=4e86eaf2685a67b743a475f86c7c0086&v=999"
          ></script>
        </Helmet> */}
        <ModalRight></ModalRight>
        <ModalRightProject></ModalRightProject>
        <ModalRightFraud></ModalRightFraud>
        <ModalLoading></ModalLoading>
        <SlideShow userInfoProps={userInfo}></SlideShow>
        <UserInfo userInfoProps={userInfo}></UserInfo>
        <div className="flex">
          <UserInfoOCR userInfoProps={userInfo}></UserInfoOCR>
          <UserInfoOther userInfoProps={userInfo}></UserInfoOther>
          <UserDocument userInfoProps={userInfo}></UserDocument>
        </div>
        <div className="flex">
          <div className="lg:w-2/3 md:w-3/5 sm:w-full pr-2">
            <IncomeChart></IncomeChart>
            <DirectSales></DirectSales>
            <CollaboratorsChart></CollaboratorsChart>
            <ActivityArea></ActivityArea>
            <ActivityCalendarDashboard></ActivityCalendarDashboard>
          </div>
          <div className="lg:w-1/3 md:w-2/5 sm:w-full pl-2">
            <DelFraudTickets></DelFraudTickets>
            <PointRating></PointRating>
            <ProjectActived></ProjectActived>
            <RecentEvent pageDefault={1}></RecentEvent>
          </div>
        </div>
      </>
    )
  }
}

export default Dashboard
