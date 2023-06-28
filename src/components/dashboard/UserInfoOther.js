import React from 'react'
import PropTypes from 'prop-types'
import { CCard, CCol, CRow } from '@coreui/react'
import iconArrowRight from 'src/assets/images/arrow_right.png'
import BankingItem from '../bank/BankingItem'
import { useDispatch } from 'react-redux'
import { setVisibleRight, setTemplateModalRight } from '../../store/modalSlice'

const UserInfoOther = (props) => {
  const { userInfoProps } = props

  const listBanking = userInfoProps.banking

  const results = listBanking.length
    ? listBanking.map((banking) => <BankingItem key={banking.ID} banking={banking}></BankingItem>)
    : []

  const content = results?.length ? results : ''

  const dispatch = useDispatch()

  const onHandleShowHistory = () => {
    dispatch(setVisibleRight(true))
    dispatch(setTemplateModalRight('listBank'))
  }

  return (
    <>
      <div className="lg:w-1/3 md:w-1/3 sm:w-full pl-2 pr-2">
        <p className="block_title">Thông tin khác</p>
        <CRow className=" mt-4 block_ocr">
          <CCol xs>
            <CCard className="dark_bg_card mb-4">
              <div className=" p-3">
                <div className="col-md-12">
                  <label className="col-lg-4 col-md-6 col-sm-6 color-gray font-size-14">
                    Nguồn tiếp thị:
                  </label>
                  <span className="col-lg-8 col-md-6 col-sm-6 font-size-14 bold dark_color_text">
                    Từ Facebook
                  </span>
                </div>
                <div className="col-md-12">
                  <label className="col-lg-4 col-md-6 col-sm-6 color-gray font-size-14">
                    Mã số thuế:
                  </label>
                  <span className="col-lg-8 col-md-6 col-sm-6 font-size-14 bold dark_color_text">
                    {userInfoProps.tax_number}
                  </span>
                </div>
                <div className="align-items_center">
                  <div className="col-md-7">
                    <label className="col-md-12 color-gray font-size-14">
                      Ngân hàng liên kết ({userInfoProps.banking.length}):
                    </label>
                  </div>
                  <div className="col-md-5">
                    <button className="btn_history flex float-right" onClick={onHandleShowHistory}>
                      Lịch sử <img src={iconArrowRight} alt="icon" width={22}></img>
                    </button>
                  </div>
                </div>
                <div className="list-bank">{content}</div>
              </div>
            </CCard>
          </CCol>
        </CRow>
      </div>
    </>
  )
}

UserInfoOther.propTypes = {
  userInfoProps: PropTypes.object,
}

UserInfoOther.defaultProps = {
  userInfoProps: {
    tax_number: '123456789',
    banking: [],
  },
}

export default UserInfoOther
