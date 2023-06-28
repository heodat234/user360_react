import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import classNames from 'classnames'

const ProjectItem = (props) => {
  const { item } = props
  return (
    <>
      <div className="flex justify-between items-end mt-3">
        <div className="flex items-center">
          <div className="block_logo_bank min-w-[50px]" style={{ backgroundColor: '#12122b' }}>
            <img className="object-contain" src={item.appLogoSmall} alt="avatar" />
          </div>
          <div className="ml-3 font-size-14 dark_color_text">
            <dl>
              <dt className="font-size-16 font-weight-500 dark_color_text">
                {item.projectName}{' '}
                <span className={classNames({ 'color-gray': item.status === 'DEACTIVE' })}>
                  {item.channelProjectCode ? ' - ' + item.channelProjectCode : ''}
                </span>
              </dt>
              <dd className="mb-0">
                <div className="justify-content_space">
                  <span
                    className={classNames({
                      'font-size-16 font-weight-500 capitalize': true,
                      'color-waitting': item.status === '',
                      'color-active': item.status === 'ACTIVE',
                      'color-disable': item.status === 'DEACTIVE',
                    })}
                  >
                    {item.status !== '' ? item.status : 'WAITTING'}
                  </span>
                </div>
              </dd>
            </dl>
          </div>
        </div>

        <span className="mb-1 font-size-14 color-gray">
          {dayjs(item.lastProcessDate ? item.lastProcessDate : new Date()).format('DD/MM/YYYY')}
        </span>
      </div>
      <div className="line-gray"></div>
    </>
  )
}

ProjectItem.propTypes = {
  item: PropTypes.object,
}

export default ProjectItem
