import React from 'react'
import PropTypes from 'prop-types'
import iconCheck from 'src/assets/images/icon_check.png'
const CreateIdentification = (props) => {
  const { identification } = props

  if (identification) {
    return (
      <>
        <p className="font-size-16 font-weight-500 align-items_center color-green">
          <img src={iconCheck} alt="icon" width={22}></img> Đã định danh
        </p>
      </>
    )
  } else {
    return (
      <>
        <p className="font-size-16 font-weight-500 align-items_center color-gray">Chưa định danh</p>
      </>
    )
  }
}

CreateIdentification.propTypes = {
  identification: PropTypes.bool,
}

CreateIdentification.defaultProps = {
  identification: false,
}

export default CreateIdentification
