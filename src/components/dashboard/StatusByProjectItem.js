import React from 'react'
import PropTypes from 'prop-types'

const StatusByProjectItem = (props) => {
  const { item, count } = props

  if (count % 2 === 0) {
    return (
      <>
        <div className="lg:w-1/2 md:w-1/2 sm:w-full flex items-center">
          <div className="">
            <div className="block_logo_bank" style={{ backgroundColor: '#12122b' }}>
              <img className="object-contain" src={item.iconURL} alt="avatar" />
            </div>
          </div>
          <div className="ml-3 mt-1 text-sm dark_color_text">
            <dl>
              <dt className="flex items-center text-base font-medium dark_color_text">
                <span>{item.projectName}</span>
                <span className="ml-1">({item.percent}%)</span>
              </dt>
              <dd className="">
                <div className="flex items-center">
                  <span className="text-base font-medium mr-2 color-total">{item.total}</span> |
                  <span className="text-base font-medium ml-2 mr-2 color-waitting">
                    {item.waitting}
                  </span>{' '}
                  |
                  <span className="text-base font-medium ml-2 mr-2 color-disable">{item.fail}</span>{' '}
                  |<span className="text-base font-medium ml-2 color-active">{item.success}</span>
                </div>
              </dd>
            </dl>
          </div>
        </div>
        <div className="line-gray mt-1 mb-2"></div>
      </>
    )
  } else {
    return (
      <>
        <div className="lg:w-1/2 md:w-1/2 sm:w-full flex items-center ">
          <div className="">
            <div className="block_logo_bank" style={{ backgroundColor: '#12122b' }}>
              <img className="object-contain" src={item.iconURL} alt="avatar" />
            </div>
          </div>
          <div className="ml-3 mt-1 text-sm dark_color_text">
            <dl>
              <dt className="flex items-center text-base font-medium dark_color_text">
                <span>{item.projectName}</span>
                <span className="ml-1">({item.percent}%)</span>
              </dt>
              <dd className="">
                <div className="flex items-center">
                  <span className="text-base font-medium mr-2 color-total">{item.total}</span> |
                  <span className="text-base font-medium ml-2 mr-2 color-waitting">
                    {item.waitting}
                  </span>{' '}
                  |
                  <span className="text-base font-medium ml-2 mr-2 color-disable">{item.fail}</span>{' '}
                  |<span className="text-base font-medium ml-2 color-active">{item.success}</span>
                </div>
              </dd>
            </dl>
          </div>
        </div>
        {/* <Template html={line}></Template> */}
      </>
    )
  }
}

StatusByProjectItem.propTypes = {
  item: PropTypes.object,
  count: PropTypes.number,
}

export default StatusByProjectItem
