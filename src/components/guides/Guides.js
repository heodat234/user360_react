import React, { useState, useEffect } from 'react'
import GuideItem from './GuideItem'
import BranchItem from './BranchItem'

import { useSelector } from 'react-redux'
import { selectUser } from '../../store/userSlice'
import { selectUserItem } from '../../store/userItemSlice'
import { getLeadAndBranchByUserID } from 'src/api/axios'
import LoadingSpinner from '../LoadingSpinner'
import EmptyData from '../EmptyData'

const Guides = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [branchs, setBranchs] = useState([])
  const [leads, setleads] = useState([])
  const userLogin = useSelector(selectUser)
  const userItem = parseInt(useSelector(selectUserItem))

  useEffect(() => {
    if (userItem) {
      setIsLoading(true)
      getLeadAndBranchByUserID(userLogin.accessToken, userItem)
        .then((json) => {
          if (json.status) {
            setBranchs(json.data.branchs)
            setleads(json.data.leads)
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
        <p className="mb-2 text-base color-gray">Người dẫn dắt</p>
        <div className="pl-3 pr-3 pb-3 rounded dark_bg_card">
          {isLoading ? (
            <LoadingSpinner />
          ) : leads.length ? (
            leads.map((lead, idx) => {
              return (
                <GuideItem
                  key={idx}
                  item={lead}
                  endItem={idx === leads.length - 1 ? true : false}
                ></GuideItem>
              )
            })
          ) : (
            <EmptyData></EmptyData>
          )}
        </div>
      </div>
      <div className="w-[400px] mt-4">
        <p className="mb-2 text-base color-gray">Nhánh tương ứng</p>
        <div className="pb-3 mt-5 ">
          {isLoading ? (
            <LoadingSpinner />
          ) : branchs.length ? (
            branchs.map((branch, idx) => {
              return (
                <BranchItem
                  key={idx}
                  item={branch}
                  index={idx + 1}
                  endItem={idx === branchs.length - 1 ? true : false}
                ></BranchItem>
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

export default Guides
