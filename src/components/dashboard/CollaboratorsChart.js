import React, { useState, useEffect } from 'react'

import { CCard, CCol, CRow, CFormSelect } from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../../store/userSlice'
import { selectUserItem } from '../../store/userItemSlice'
import { setVisibleLoading, setVisibleRight, setTemplateModalRight } from '../../store/modalSlice'
import { collaboratorChart } from 'src/api/axios'
import { NumericFormat } from 'react-number-format'
import ItemByDoughnutChart from '../charts/ItemByDoughnutChart'
import DoughnutChart from '../charts/DoughnutChart'

import iconUsers from 'src/assets/images/icon_users.png'
import iconMoneyCheck from 'src/assets/images/icon_money_check.png'
import iconArrowRight from 'src/assets/images/arrow_right.png'

import { Chart, ArcElement, Tooltip } from 'chart.js'
import GrowthRate from './GrowthRate'
Chart.register(ArcElement, Tooltip)

const CollaboratorsChart = () => {
  const dispatch = useDispatch()
  const [level, setLevel] = useState('all')
  const [rank, setRank] = useState('all')
  const [totalCollaborator, setTotalCollaborator] = useState(0)
  const [ratioTotalCollaborator, setRatioTotalCollaborator] = useState(0)
  const [percentOfSales, setPercentOfSales] = useState(0)
  const [walletPercentOfSales, setWalletPercentOfSales] = useState(0)
  const [growthPercentOfSales, setGrowthPercentOfSales] = useState(0)
  const [statusGrowthPercentOfSales, setStatusGrowthPercentOfSales] = useState(0)
  const [collaboratorList, setCollaboratorList] = useState([])
  const userLogin = useSelector(selectUser)
  const userItem = parseInt(useSelector(selectUserItem))

  const handleChangeSelect = (e) => {
    if (e.target.name === 'level') {
      setLevel(e.target.value)
    } else {
      setRank(e.target.value)
    }
  }

  const onHandleCollaboratorFilter = () => {
    dispatch(setVisibleRight(true))
    dispatch(setTemplateModalRight('collaboratorFilter'))
  }

  useEffect(() => {
    if (userItem) {
      dispatch(setVisibleLoading(true))
      collaboratorChart(userLogin.accessToken, userItem, rank, level)
        .then((json) => {
          if (json.status) {
            const response = json.data
            setTotalCollaborator(response.collaborator)
            setRatioTotalCollaborator(response.raito)

            const sales = response.collaborators.data
            setPercentOfSales(sales.ratio)
            setWalletPercentOfSales(sales.wallet)
            setGrowthPercentOfSales(sales.salesGrowth)
            setStatusGrowthPercentOfSales(sales.statusGrowth)
            setCollaboratorList(sales.collaboratorList)
          }
          dispatch(setVisibleLoading(false))
        })
        .catch((e) => {
          dispatch(setVisibleLoading(false))
        })
    }
  }, [userLogin, userItem, rank, level, dispatch])

  let dataDoughnut = {
    labels: [],
    backgrounds: [],
    data: [],
    unit: 'người',
  }
  const contentListItem = collaboratorList.map((item, idx) => {
    const newItem = {
      ...item,
      value: item.wallet,
      unit: 'người',
    }
    dataDoughnut.labels.push(item.name)
    dataDoughnut.backgrounds.push(item.background)
    dataDoughnut.data.push(item.wallet)
    return <ItemByDoughnutChart key={idx} item={newItem}></ItemByDoughnutChart>
  })

  if (dataDoughnut.data.length === 0) {
    dataDoughnut = {
      labels: ['default'],
      backgrounds: ['#6b6b81'],
      data: [],
    }
  }

  return (
    <>
      <div className="w-full">
        <div className="justify-content_space">
          <p className="w-1/2 block_title">Cộng tác viên</p>
          <div className="w-1/4">
            <CFormSelect value={level} name="level" onChange={(e) => handleChangeSelect(e)}>
              <option value="all">Tất cả tầng CTV</option>
              <option value="1">Tầng 1</option>
              <option value="2">Tầng 2</option>
              <option value="3">Tầng 3</option>
              <option value="4">Tầng 4</option>
              <option value="5">Tầng 5</option>
              <option value="6">Tầng 6</option>
            </CFormSelect>
          </div>
          <div className="w-1/4">
            <CFormSelect value={rank} name="rank" onChange={(e) => handleChangeSelect(e)}>
              <option value="all">Tất cả danh hiệu</option>
              <option value="user">Ẩn sĩ</option>
              <option value="earning_user">Tân Thủ</option>
              <option value="VAR_RSA">Cao Thủ 1</option>
              <option value="KPI_RSA">Cao Thủ 2</option>
              <option value="FIX_RSA">Cao Thủ 3</option>
              <option value="VAR_RSM">Bá Chủ 1</option>
              <option value="KPI_RSM">Bá Chủ 2</option>
              <option value="FIX_RSM">Bá Chủ 3</option>
              <option value="head">Huyền Thoại</option>
            </CFormSelect>
          </div>
        </div>

        <CRow className="mt-4 block_ocr">
          <CCol xs>
            <CCard className="dark_bg_card mb-4 ">
              <div className=" p-3">
                <div className="justify-content_flex">
                  <div className="w-1/2 flex">
                    <div className="mt-1">
                      <div className="block_logo_icon">
                        <img src={iconUsers} alt="icon" />
                      </div>
                    </div>
                    <div className="ml-3 text-sm dark_color_text">
                      <dl>
                        <dt className="color-gray font-size-16 font-medium">Tổng số CTV</dt>
                        <dd className="flex items-center text-lg">
                          <NumericFormat
                            value={totalCollaborator}
                            allowLeadingZeros
                            displayType={'text'}
                            thousandSeparator=","
                          />{' '}
                          <span className="ml-1">người</span>
                          <GrowthRate
                            rate={ratioTotalCollaborator}
                            status={ratioTotalCollaborator > 0 ? 'up' : 'down'}
                          ></GrowthRate>
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="w-1/2 flex">
                    <div className="mt-1">
                      <div className="block_logo_icon">
                        <img src={iconMoneyCheck} alt="icon" />
                      </div>
                    </div>
                    <div className="ml-3 text-sm dark_color_text">
                      <dl>
                        <dt className="color-gray font-size-16 font-medium">% CTV có doanh số</dt>
                        <dd className="flex items-center	 text-lg">
                          {percentOfSales}% (
                          <NumericFormat
                            value={walletPercentOfSales}
                            allowLeadingZeros
                            displayType={'text'}
                            thousandSeparator=","
                          />{' '}
                          <span className="ml-1">người</span>)
                          <GrowthRate
                            rate={growthPercentOfSales}
                            status={statusGrowthPercentOfSales.toString()}
                          ></GrowthRate>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="line-gray"></div>
                <div className="row mt-3">
                  <div className="row mb-3">
                    <span className="lg:w-2/3 md:w-1/2 sm:w-1/2 font-size-16 color-gray font-medium">
                      Tỉ trọng CTV có phát sinh doanh số theo tầng
                    </span>
                    <div className="lg:w-1/3 md:w-1/2 sm:w-1/2">
                      <button
                        className="btn_history flex float-right font-size-16 font-medium"
                        onClick={onHandleCollaboratorFilter}
                      >
                        Danh sách CTV <img src={iconArrowRight} alt="icon arrow" width={20}></img>
                      </button>
                    </div>
                  </div>

                  <div className="lg:w-1/3 md:w-1/2 sm-1/2 mt-1">
                    <DoughnutChart
                      dataDoughnut={dataDoughnut}
                      totalDoughnut={walletPercentOfSales}
                    ></DoughnutChart>
                  </div>
                  <div className="lg:w-2/3 md:w-1/2 sm-1/2">
                    <div className="row">{contentListItem}</div>
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

export default CollaboratorsChart
