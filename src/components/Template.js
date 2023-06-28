import React from 'react'
import PropTypes from 'prop-types'
const Template = (props) => {
  const { html, className } = props

  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
}

Template.propTypes = {
  html: PropTypes.string,
  className: PropTypes.string,
}

export default Template
