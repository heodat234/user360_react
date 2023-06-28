import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../../store/userSlice'
import { selectUserItem } from '../../store/userItemSlice'
import { getBanks } from 'src/api/axios'
import LoadingSpinner from '../LoadingSpinner'
import ListBankHistory from './ListBankHistory'
import EmptyData from '../EmptyData'

const BankHistory = () => {
  const [isLoader, setIsLoader] = useState(false)
  const [banks, setBanks] = useState([])
  const dispatch = useDispatch()
  const userLogin = useSelector(selectUser)
  const userItem = parseInt(useSelector(selectUserItem))

  useEffect(() => {
    if (userItem) {
      setIsLoader(true)
      getBanks(userLogin.accessToken, userItem)
        .then((json) => {
          if (json.status) {
            setBanks(json.data)
          }
          setIsLoader(false)
        })
        .catch((e) => {
          setIsLoader(false)
        })
    }
  }, [userLogin, userItem, dispatch])

  const listBankActive = banks.length ? banks.filter((bank) => bank.deleted === '0') : []
  const listBankDelete = banks.length ? banks.filter((bank) => bank.deleted !== '0') : []

  const resultActive = listBankActive.length ? (
    <ListBankHistory banks={listBankActive} type="active"></ListBankHistory>
  ) : (
    ''
  )
  const resultDelete = listBankDelete.length ? (
    <ListBankHistory banks={listBankDelete} type="deleted"></ListBankHistory>
  ) : (
    ''
  )

  if (isLoader) {
    return (
      <div className="w-[417px]">
        <LoadingSpinner></LoadingSpinner>
      </div>
    )
  }
  if (!resultActive && !resultDelete) {
    return (
      <div className="w-[417px]">
        <EmptyData></EmptyData>
      </div>
    )
  } else {
    return (
      <>
        {resultActive}
        {resultDelete}
      </>
    )
  }
}

export default BankHistory
