import React, { useState, useEffect } from 'react'

import { CCard, CCol, CRow } from '@coreui/react'
import iconArrowRight from 'src/assets/images/arrow_right.png'

import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../../store/userSlice'
import { selectUserItem } from '../../store/userItemSlice'
import { setVisibleLoading } from '../../store/modalSlice'
import { pointChart } from 'src/api/axios'
import RadarChart from '../charts/RadarChart'
import { NumericFormat } from 'react-number-format'
import { setVisibleRight, setTemplateModalRight } from '../../store/modalSlice'

const PointRating = () => {
  const [avgRatingSell, setAvgRatingSell] = useState(0)
  const [avgRatingLead, setAvgRatingLead] = useState(0)
  const [dataChart, setDataChart] = useState([0, 0, 0])

  const dispatch = useDispatch()
  const userLogin = useSelector(selectUser)
  const userItem = parseInt(useSelector(selectUserItem))

  //show chi tiết
  const onHandleShowHistory = (parent) => {
    dispatch(setVisibleRight(true))
    dispatch(setTemplateModalRight(parent))
  }

  useEffect(() => {
    if (userItem) {
      dispatch(setVisibleLoading(true))
      pointChart(userLogin.accessToken, userItem)
        .then((json) => {
          if (json.status) {
            const response = json.data
            setAvgRatingSell(response.sell)
            setAvgRatingLead(response.lead)
            setDataChart([response.lead, response.sell, 0])
          }
          dispatch(setVisibleLoading(false))
        })
        .catch((e) => {
          dispatch(setVisibleLoading(false))
        })
    }
  }, [userLogin, userItem, dispatch])

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between">
          <p className="w-full block_title">Điểm đánh giá / kỹ năng</p>
        </div>

        <CRow className="row mt-4 block_ocr">
          <CCol xs>
            <CCard className="dark_bg_card mb-4 ">
              <div className="row p-3">
                <div className="w-full mt-1">
                  <RadarChart data={dataChart}></RadarChart>
                </div>
                <div className="line-gray" style={{ marginTop: '-60px' }}></div>
                <div className="flex" style={{ marginTop: '-55px' }}>
                  <div className="w-1/2" style={{ borderRight: '1px solid #3c3c53' }}>
                    <p className="font-size-16 font-weight-500 color-gray mb-1">Kỹ năng dẫn dắt</p>
                    <div className="align-items_center">
                      <span className="font-size-18 dark_color_text mr-5">
                        <NumericFormat
                          value={avgRatingLead}
                          allowLeadingZeros
                          displayType={'text'}
                          thousandSeparator=","
                        />
                      </span>
                      <button
                        className="btn_history flex float-right"
                        onClick={() => onHandleShowHistory('lead')}
                      >
                        Chi tiết <img src={iconArrowRight} alt="icon" width={22}></img>
                      </button>
                    </div>
                  </div>
                  <div className="w-1/2 ml-3">
                    <p className="font-size-16 font-weight-500 color-gray mb-1">Kỹ năng bán hàng</p>
                    <div className="align-items_center">
                      <span className="font-size-18 dark_color_text mr-5">
                        <NumericFormat
                          value={avgRatingSell}
                          allowLeadingZeros
                          displayType={'text'}
                          thousandSeparator=","
                        />
                      </span>
                      <button
                        className="btn_history flex float-right"
                        onClick={() => onHandleShowHistory('sell')}
                      >
                        Chi tiết <img src={iconArrowRight} alt="icon" width={22}></img>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="line-gray" style={{ marginTop: '4px' }}></div>
                <div className="row" style={{ marginTop: '10px' }}>
                  <div className="w-1/2">
                    <p className="font-size-16 font-weight-500 color-gray mb-1">Điểm tín nhiệm</p>
                    <div className="align-items_center">
                      <span className="font-size-18 dark_color_text mr-5">
                        <NumericFormat
                          value="0"
                          allowLeadingZeros
                          displayType={'text'}
                          thousandSeparator=","
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CCard>
          </CCol>
        </CRow>
      </div>
    </>
  )
}

export default PointRating
