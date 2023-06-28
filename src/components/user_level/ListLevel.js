import React, { useState, useEffect } from 'react'
import LevelItem from './LevelItem'

import { useSelector } from 'react-redux'
import { selectUser } from '../../store/userSlice'
import { selectUserItem } from '../../store/userItemSlice'
import { getUserLevelLogs } from 'src/api/axios'
import LoadingSpinner from '../LoadingSpinner'
import EmptyData from '../EmptyData'

const ListLevel = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [levels, setLevels] = useState([])
  const userLogin = useSelector(selectUser)
  const userItem = parseInt(useSelector(selectUserItem))

  useEffect(() => {
    if (userItem) {
      setIsLoading(true)
      getUserLevelLogs(userLogin.accessToken, userItem)
        .then((json) => {
          if (json.status) {
            setLevels(json.data)
          }
          setIsLoading(false)
        })
        .catch((e) => {
          setIsLoading(false)
        })
    }
  }, [userLogin, userItem])

  return (
    <>
      <div className="w-[400px]">
        <p className="mb-2 text-base color-gray">Lịch sử thay đổi</p>
        <div className="pl-3 pr-3 pb-3 rounded dark_bg_card">
          {isLoading ? (
            <LoadingSpinner />
          ) : levels.length ? (
            levels.map((item, idx) => {
              return (
                <LevelItem
                  key={idx}
                  item={item}
                  endItem={idx === item.length - 1 ? true : false}
                ></LevelItem>
              )
            })
          ) : (
            <EmptyData></EmptyData>
          )}
        </div>
      </div>
    </>
  )
}

export default ListLevel
