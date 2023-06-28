import React from 'react'
import PropTypes from 'prop-types'
import iconPhone from 'src/assets/images/icon_phone_blue.png'
import FormFraudUpdate from './FormFraudUpdate'
import { getDetailID } from 'src/store/fraudSlice'
import { useSelector } from 'react-redux'
import ProjectInfoMtrade from './ProjectInfoMtrade'
import ProjectInfoPL from './ProjectInfoPL'
import ProjectInfoInsurance from './ProjectInfoInsurance'
import ProjectInfoDaa from './ProjectInfoDaa'

const ProjectInfo = ({ item, category, listResult, onHandleLoadingModal }) => {
  const detailID = useSelector(getDetailID)

  const onHandleUpdate = (status) => {
    onHandleLoadingModal(status)
  }

  var content = ''
  switch (category) {
    case 0:
    case 3:
      content = <ProjectInfoPL item={item}></ProjectInfoPL>
      break
    case 1:
      content = <ProjectInfoDaa item={item}></ProjectInfoDaa>
      break
    case 2:
      content = <ProjectInfoInsurance item={item}></ProjectInfoInsurance>
      break
    case 4:
      content = <ProjectInfoMtrade item={item}></ProjectInfoMtrade>
      break
    default:
      content = ''
      break
  }

  return (
    <>
      <div className="flex">
        <div className="w-1/2">
          <div className="ml-2">
            <p className="mb-2 color-gray">Thông tin khách hàng</p>
            <div className="mr-2 p-2 rounded dark_bg_card">
              <dl className="flex text-sm">
                <dt className="mr-2 color-gray">Họ và tên: </dt>
                <dd className="mb-0 dark_color_text">{item.customerName}</dd>
              </dl>
              <dl className="flex text-sm">
                <dt className="mr-2 color-gray">Số điện thoại:</dt>
                <dd className="mb-0 flex dark_color_text">
                  <span className="font-bold" style={{ color: '#005fff' }}>
                    {item.customerPhoneHide}
                  </span>{' '}
                  <img src={iconPhone} width={22} alt="icon phone"></img>{' '}
                </dd>
              </dl>
              <dl className="flex text-sm">
                <dt className="mr-2 color-gray">CMND/CCCD:</dt>
                <dd className=" mb-0 dark_color_text">{item.customerIdNumber}</dd>
              </dl>
            </div>
          </div>
          {detailID && (
            <FormFraudUpdate
              listResult={listResult}
              onHandleLoadingModal={onHandleUpdate}
            ></FormFraudUpdate>
          )}
        </div>
        <div className="w-1/2 mr-2">
          <p className="mb-2 color-gray">Thông tin hồ sơ</p>
          <div className="ml-2 p-2 rounded dark_bg_card">
            <div className="flex">
              <div className="w-24 flex items-center justify-center ">
                <img src={item.logo} alt="icon" width={50}></img>
              </div>
              <div className="ml-2">
                <dl className="flex text-sm">
                  <dt className="mr-2 color-gray">Dự án: </dt>
                  <dd className="mb-0 dark_color_text">{item.projectName}</dd>
                </dl>
                <dl className="flex text-sm">
                  <dt className="mr-2 color-gray">CaseID: </dt>
                  <dd className="mb-0 dark_color_text">{item.appUID}</dd>
                </dl>
              </div>
            </div>
            <div className="line-gray mb-2"></div>
            <div>{content}</div>
          </div>
        </div>
      </div>
    </>
  )
}

ProjectInfo.propTypes = {
  item: PropTypes.object,
  listResult: PropTypes.array,
  onHandleLoadingModal: PropTypes.func,
  category: PropTypes.number,
}

// ProjectInfo.defaultProps = {
//   item: {
//     customerName: '',
//     customerPhoneHide: '',
//     customerIdNumber: '',
//     logo: '',
//     projectName: '',
//     appUID: '',
//     productName: '',
//     operateDate: new Date(),
//   },
// }

export default ProjectInfo
