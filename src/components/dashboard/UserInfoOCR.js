import React from 'react'
import PropTypes from 'prop-types'
import { CCard, CCol, CRow } from '@coreui/react'

const UserInfoOCR = (props) => {
  const { userInfoProps } = props

  return (
    <>
      <div className="lg:w-1/3 md:w-1/3 sm:w-full pr-2">
        <p className="block_title">Thông tin định danh</p>
        <CRow className="mt-4 block_ocr">
          <CCol xs>
            <CCard className="dark_bg_card mb-4">
              <div className=" p-3">
                <div className="col-md-12">
                  <label className="col-lg-3 col-md-4 col-sm-12 color-gray font-size-14">
                    Họ tên:
                  </label>
                  <span className="col-lg-9 col-md-8 col-sm-12 font-size-18 bold dark_color_text">
                    {userInfoProps.country_id_name}
                  </span>
                </div>
                <div className="align-items_center">
                  <div className="col-md-7 col-sm-12">
                    <label className="col-lg-6 col-md-6 col-sm-6 color-gray font-size-14">
                      Ngày sinh:
                    </label>
                    <span className="col-lg-6 col-md-6 col-sm-6 font-size-14 bold dark_color_text">
                      {userInfoProps.country_id_date_of_birth}
                    </span>
                  </div>
                  <div className="col-md-5 col-sm-12 ml-15">
                    <label className="col-md-7 col-sm-7 color-gray font-size-14">Giới tính:</label>
                    <span className="col-md-5 col-sm-5 font-size-14 bold dark_color_text">
                      {userInfoProps.sex}
                    </span>
                  </div>
                </div>
                <div className="col-md-12">
                  <label className="col-lg-2 col-md-4 col-sm-12 color-gray font-size-14">
                    Email:
                  </label>
                  <span className="col-lg-10 col-md-8 col-sm-12 font-size-14 bold dark_color_text">
                    {userInfoProps.email}
                  </span>
                </div>
                <div className="col-md-12">
                  <label className="col-lg-6 col-md-6 col-sm-12 color-gray font-size-14">
                    Số CMND/CCCD:{' '}
                  </label>
                  <span className="col-lg-6 col-md-6 col-sm-12 font-size-14 bold dark_color_text">
                    {userInfoProps.country_id_number}
                  </span>
                </div>
                <div className="col-md-12">
                  <label className="col-lg-12 col-md-6 col-sm-12 color-gray font-size-14">
                    Địa chỉ thường trú:
                  </label>
                  <span className="col-lg-12 col-md-12 col-sm-12 font-size-14 bold dark_color_text">
                    {userInfoProps.country_id_address}
                  </span>
                </div>
              </div>
            </CCard>
          </CCol>
        </CRow>
      </div>
    </>
  )
}

UserInfoOCR.propTypes = {
  userInfoProps: PropTypes.object,
}

UserInfoOCR.defaultProps = {
  userInfoProps: {
    country_id_name: 'TestNe',
    country_id_date_of_birth: '23-04-1995',
    sex: 'NAM',
    email: 'abc@gmail.com',
    country_id_number: '094857563564',
    country_id_address: 'cộng Hòa, TP.HCM',
  },
}

export default UserInfoOCR
