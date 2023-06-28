import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { setVisibleSlide, selectVisible, setImageIndex } from '../../store/modalSlice'

const DocumentItem = (props) => {
  const { doc, idx } = props

  const visible = useSelector(selectVisible)

  const dispatch = useDispatch()

  const showImage = () => {
    dispatch(setVisibleSlide(!visible))
    dispatch(setImageIndex(idx))
  }

  return (
    <div className="image">
      <img className="gallery__img" src={doc} alt="document" onClick={showImage}></img>
    </div>
  )
}

DocumentItem.propTypes = {
  doc: PropTypes.string,
  idx: PropTypes.number,
}

export default DocumentItem
