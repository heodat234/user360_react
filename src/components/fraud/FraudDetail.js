import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../../store/userSlice'
import { selectUserItem } from '../../store/userItemSlice'
import { getFraudDetail } from 'src/api/axios'
import LoadingSpinner from '../LoadingSpinner'
import { DialogContent, DialogTitle } from '../DialogModal'
import {
  getDetailID,
  getReload,
  setDetailID,
  setReload,
  setVisibleModal,
} from 'src/store/fraudSlice'

import { NumericFormat } from 'react-number-format'
import dayjs from 'dayjs'
import FraudLogs from './FraudLogs'
import ProjectInfo from './ProjectInfo'

const FraudDetail = () => {
  const [fraudInfo, setFraudInfo] = useState({})
  const [listResult, setListResult] = useState([])
  const [projectInfo, setProjectInfo] = useState({})
  const [isLoadingModal, setIsLoadingModal] = useState(false)
  const reloadFraud = useSelector(getReload)

  const dispatch = useDispatch()
  const userLogin = useSelector(selectUser)
  const userItem = parseInt(useSelector(selectUserItem))
  const detailID = useSelector(getDetailID)

  const handleClose = () => {
    dispatch(setVisibleModal(false))
    dispatch(setReload(!reloadFraud))
    dispatch(setDetailID(null))
  }

  useEffect(() => {
    if (userItem) {
      setIsLoadingModal(true)
      getFraudDetail(userLogin.accessToken, userItem, detailID)
        .then((json) => {
          if (json.status) {
            setFraudInfo(json.data.fraudInfo)
            setProjectInfo(json.data.projectInfo)
            setListResult(json.data.results)
          }
          setIsLoadingModal(false)
        })
        .catch((e) => {
          setIsLoadingModal(false)
        })
    }
  }, [userLogin, userItem, detailID, reloadFraud, dispatch])

  const onHandleLoadingModal = (status) => {
    setIsLoadingModal(status)
    dispatch(setReload(status))
  }

  return (
    <>
      <DialogTitle id="customized-dialog-title" className="dark_bg_card" onClose={handleClose}>
        Chi tiết Fraud
      </DialogTitle>
      <div
        className="absolute w-full h-screen bg-white opacity-20 items-center justify-center"
        style={{ display: isLoadingModal ? 'flex' : 'none' }}
      >
        <LoadingSpinner></LoadingSpinner>
      </div>
      <DialogContent className="dark_bg_content p-0 h-screen list-overflow">
        <div className="line-gray m-0"></div>
        <div className="p-4 mb-3 w-[800px] rounded dark_bg_card">
          <p className="mb-2 dark_color_text">{fraudInfo.content ? fraudInfo.content : ''}</p>
          <div className="flex">
            <dl className="flex text-sm w-1/2">
              <dt className="mr-2 color-gray">Case ID: </dt>
              <dd className="mb-0 dark_color_text">{fraudInfo.caseID ? fraudInfo.caseID : ''}</dd>
            </dl>
            <dl className="flex text-sm w-1/2">
              <dt className="mr-2 color-gray">Khách hàng: </dt>
              <dd className="mb-0 dark_color_text">
                {fraudInfo.customerName ? fraudInfo.customerName : ''}
              </dd>
            </dl>
          </div>
          <div className="flex">
            <dl className="flex text-sm w-1/2 mb-0">
              <dt className="mr-2 color-gray">Lỗi vi phạm: </dt>
              <dd className="mb-0 dark_color_text">
                {fraudInfo.violateError ? fraudInfo.violateError : ''}
              </dd>
            </dl>
            <dl className="flex text-sm w-1/2 mb-0">
              <dt className="mr-2 color-gray">Kết quả làm việc:</dt>
              <dd className="mb-0 flex dark_color_text">
                {fraudInfo.resultText ? fraudInfo.resultText : ''}
              </dd>
            </dl>
          </div>
        </div>
        <div className="p-3 w-[800px]">
          <div className="w-full">
            <p className="ml-2 mb-2 color-gray">Thông tin fraud</p>
            <div className="mr-2 ml-2 p-3 mb-3 rounded dark_bg_card">
              <dl className="flex text-sm">
                <dt className="mr-3 color-gray">Ngày nhận phản ánh: </dt>
                <dd className="mb-0 dark_color_text">
                  {fraudInfo.feedbackDate ? dayjs(fraudInfo.feedbackDate).format('DD/MM/YYYY') : ''}
                </dd>
              </dl>
              <dl className="flex text-sm">
                <dt className="mr-3 color-gray">Thư mời làm việc: </dt>
                <dd className="mb-0 dark_color_text">
                  {fraudInfo.invitedDate ? dayjs(fraudInfo.invitedDate).format('DD/MM/YYYY') : ''}
                </dd>
              </dl>
              <div className="flex">
                <dl className="flex text-sm w-1/2">
                  <dt className="mr-3 color-gray">Lỗi vi phạm: </dt>
                  <dd className="mb-0 dark_color_text">
                    {fraudInfo.violateError ? fraudInfo.violateError : ''}
                  </dd>
                </dl>
                <dl className="flex text-sm w-1/2">
                  <dt className="mr-3 color-gray">Loại vi phạm: </dt>
                  <dd className="mb-0 dark_color_text">
                    {fraudInfo.violateTypeText ? fraudInfo.violateTypeText : ''}
                  </dd>
                </dl>
              </div>
              <dl className="flex text-sm">
                <dt className="mr-3 color-gray">Nội dung làm việc: </dt>
                <dd className="mb-0 dark_color_text">
                  {fraudInfo.content ? fraudInfo.content : ''}
                </dd>
              </dl>
              <dl className="flex text-sm">
                <dt className="mr-3 color-gray">Kết quả làm việc: </dt>
                <dd className="mb-0 dark_color_text">
                  {fraudInfo.resultText ? fraudInfo.resultText : ''}
                </dd>
              </dl>
              <div className="flex">
                <dl className="flex text-sm w-1/2">
                  <dt className="mr-3 color-gray">Ghi chú xử lý: </dt>
                  <dd className="mb-0 dark_color_text">{fraudInfo.note ? fraudInfo.note : ''}</dd>
                </dl>
                <dl className="flex text-sm w-1/2">
                  <dt className="mr-3 color-gray">Số tiền xử lý: </dt>
                  <dd className="mb-0 dark_color_text">
                    {fraudInfo.amount ? (
                      <NumericFormat
                        value={fraudInfo.amount}
                        allowLeadingZeros
                        displayType={'text'}
                        thousandSeparator=","
                      />
                    ) : (
                      ''
                    )}
                  </dd>
                </dl>
              </div>

              <dl className="flex text-sm">
                <dt className="mr-3 color-gray">Xử lý của AF: </dt>
                <dd className="mb-0 dark_color_text">
                  {fraudInfo.AFHandle ? fraudInfo.AFHandle : ''}
                </dd>
              </dl>
            </div>
          </div>
          <ProjectInfo
            item={projectInfo}
            category={parseInt(fraudInfo.category)}
            listResult={listResult}
            onHandleLoadingModal={onHandleLoadingModal}
          ></ProjectInfo>
          <FraudLogs reload={reloadFraud}></FraudLogs>
        </div>
      </DialogContent>
    </>
  )
}

export default FraudDetail
