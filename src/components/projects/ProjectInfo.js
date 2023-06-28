import React from 'react'
import PropTypes from 'prop-types'
import iconDefault from 'src/assets/images/icon_back.png'

const ProjectInfo = ({ item }) => {
  // if (item && item.length > 0) {
  return (
    <div className="mr-2 ml-2">
      <p className="mb-2 color-gray">Thông tin hồ sơ</p>
      <div className="p-3 rounded dark_bg_card">
        <div className="flex">
          <div className="w-28">
            <img src={iconDefault} alt="icon" width={50}></img>
          </div>
          <div className="ml-2 w-full">
            <div className="flex">
              <dl className="w-1/2 flex text-sm">
                <dt className="mr-2 color-gray">Dự án: </dt>
                <dd className="mb-0 dark_color_text">Mcredit</dd>
              </dl>
              <dl className="w-1/2 flex text-sm">
                <dt className="mr-2 color-gray">CaseID: </dt>
                <dd className="mb-0 dark_color_text">LOSID_2314234</dd>
              </dl>
            </div>
            <dl className="flex text-sm">
              <dt className="mr-2 color-gray">Sản phẩm: </dt>
              <dd className="mb-0 dark_color_text">LOSID_2314234</dd>
            </dl>
          </div>
        </div>
        <div className="line-gray mb-3"></div>
        <div className="flex">
          <div className="w-1/2">
            <dl className="flex text-sm">
              <dt className="mr-2 color-gray">Khoản vay: </dt>
              <dd className="mb-0 font-bold dark_color_text">LOSID_2314234</dd>
            </dl>
            <dl className="flex text-sm">
              <dt className="mr-2 color-gray">Bảo hiểm: </dt>
              <dd className="mb-0 font-bold dark_color_text">LOSID_2314234</dd>
            </dl>
            <dl className="flex text-sm">
              <dt className="mr-2 color-gray">MST Công ty khách hàng: </dt>
              <dd className="mb-0 font-bold dark_color_text">LOSID_2314234</dd>
            </dl>
            <dl className=" text-sm">
              <dt className="mr-2 color-gray">
                Lý do từ MC (không phải lý do của trạng thái hiện tại)
              </dt>
              <div className="w-[95%] h-20 p-2 mt-2 rounded dark_bg_content">
                <dd className="mb-0 font-bold dark_color_text">LOSID_2314234</dd>
              </div>
            </dl>
          </div>
          <div className="w-1/2">
            <dl className="flex text-sm">
              <dt className="mr-2 color-gray">Số tháng vay:</dt>
              <dd className="mb-0 font-bold dark_color_text">LOSID_2314234</dd>
            </dl>
            <dl className="flex text-sm">
              <dt className="mr-2 color-gray">Đ/c sống có trùng đ/c trong SHK:</dt>
              <dd className="mb-0 font-bold dark_color_text">LOSID_2314234</dd>
            </dl>
            <dl className="flex text-sm">
              <dt className="mr-2 color-gray">CAT Type:</dt>
              <dd className="mb-0 font-bold dark_color_text">LOSID_2314234</dd>
            </dl>
            <dl className="flex text-sm">
              <dt className="mr-2 color-gray">Nhân viên Kinh doanh:</dt>
              <dd className="mb-0 font-bold dark_color_text">LOSID_2314234</dd>
            </dl>
            <dl className="flex text-sm">
              <dt className="mr-2 color-gray">Điểm giới thiệu DVKD:</dt>
              <dd className="mb-0 font-bold dark_color_text">LOSID_2314234</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
  // }
}

ProjectInfo.propTypes = {
  item: PropTypes.array,
}

export default ProjectInfo
