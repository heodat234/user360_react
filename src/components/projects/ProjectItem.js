import React from 'react'
import PropTypes from 'prop-types'

import iconDoc from 'src/assets/images/icon_doc.png'
// import iconArrow from 'src/assets/images/arrow_right_white.png'
import dayjs from 'dayjs'
import classNames from 'classnames'
import { NumericFormat } from 'react-number-format'
// import { useDispatch } from 'react-redux'
// import { setCategory, setDetailId } from 'src/store/projectSlice'

const ProjectItem = ({ item, category }) => {
  // const dispatch = useDispatch()

  // const onHandleOpenDetail = () => {
  //   dispatch(setDetailId(item.ID))
  //   dispatch(setCategory(category))
  // }

  return (
    <>
      <div
        className="flex items-center mr-2 p-2 mb-3 rounded dark_bg_card"
        // style={{ cursor: 'pointer' }}
        // onClick={onHandleOpenDetail}
      >
        <div className="w-11/12">
          <div className="flex items-center mb-2">
            <div className="p-2" style={{ backgroundColor: '#fff' }}>
              <img src={item.logo} alt="logo" width={50}></img>
            </div>
            <p className="ml-4 mr-1 text-sm dark_color_text">{item.customerName}</p>
            <img src={iconDoc} alt="logo" width={15} height={10}></img>
          </div>
          <div className="flex">
            <dl className="flex text-sm w-1/2">
              <dt className="mr-2 color-gray">Trạng thái: </dt>
              <dd
                className={classNames({
                  'mb-0 font-semibold': true,
                  'color-active': item.progress === '1',
                  'color-waitting': item.progress === '0',
                  'color-disable': item.progress === '2',
                })}
              >
                {item.statusText}
              </dd>
            </dl>
            <dl
              className={classNames({ 'flex text-sm w-1/2': true, hidden: item.progress !== '1' })}
            >
              <dt className="mr-2 color-gray">Hoa hồng:</dt>
              <dd className="mb-0 flex dark_color_text">
                <span className="font-semibold color-active mr-2">
                  <NumericFormat
                    value={item.commAmount}
                    allowLeadingZeros
                    displayType={'text'}
                    thousandSeparator=","
                  />{' '}
                  đ
                </span>
                <span className={classNames({ hidden: category })}>- Làm tất cả quy trình</span>
              </dd>
            </dl>
          </div>
          <div className="flex">
            <dl className="flex text-sm w-1/2">
              <dt className="mr-2 color-gray">Cập nhật lúc: </dt>
              <dd className="mb-0 dark_color_text">
                {dayjs(item.updatedDate ? item.updatedDate : new Date()).format('H:m DD/MM/YYYY')}
              </dd>
            </dl>
            <dl className="flex text-sm w-1/2">
              <dt className="mr-2 color-gray">KH của:</dt>
              <dd className="mb-0 flex dark_color_text">{item.saleName}</dd>
            </dl>
          </div>
        </div>
        <div className="w-1/12 flex justify-end">
          {/* <img src={iconArrow} alt="icon" width={22}></img> */}
        </div>
      </div>
    </>
  )
}

ProjectItem.propTypes = {
  item: PropTypes.object,
  category: PropTypes.number,
}

export default ProjectItem
