import React from 'react'
import PropTypes from 'prop-types'
import iconPhone from 'src/assets/images/icon_phone_blue.png'

const ProjectCusInfo = ({ item, title }) => {
  return (
    <div className="w-1/2">
      <p className="ml-2 mb-2 color-gray">{title}</p>
      <div className="mr-2 ml-2 p-3 mb-3 rounded dark_bg_card">
        {item &&
          item.map((element, idx) => {
            if (element.key === 'phone') {
              return (
                <dl key={idx} className="flex text-sm">
                  <dt className="mr-3 color-gray">{element.text}: </dt>
                  <dd className="mb-0 flex dark_color_text">
                    <span className="font-bold" style={{ color: '#005fff' }}>
                      {element.value}
                    </span>{' '}
                    <img src={iconPhone} width={22} alt="icon phone"></img>
                  </dd>
                </dl>
              )
            } else {
              return (
                <dl key={idx} className="flex text-sm">
                  <dt className="mr-3 color-gray">{element.text}: </dt>
                  <dd className="mb-0 dark_color_text">{element.value}</dd>
                </dl>
              )
            }
          })}
      </div>
    </div>
  )
}

ProjectCusInfo.propTypes = {
  item: PropTypes.array,
  title: PropTypes.string,
}

export default ProjectCusInfo
