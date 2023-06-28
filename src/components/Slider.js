import React, { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import { CModal, CModalHeader, CModalBody } from '@coreui/react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { setVisibleSlide, selectVisible, selectImageIndex } from '../store/modalSlice'

import { Navigation } from 'swiper'

const SlideShow = (props) => {
  const { userInfoProps } = props

  const visible = useSelector(selectVisible)
  const imageIndex = useSelector(selectImageIndex)

  const dispatch = useDispatch()

  const swiperRef = useRef(null)

  const slideImages = userInfoProps && userInfoProps.documents ? userInfoProps.documents : []

  useEffect(() => {
    requestAnimationFrame(() => {
      if (slideImages.length && swiperRef.current && swiperRef.current.swiper && imageIndex >= 0) {
        swiperRef.current.swiper.slideTo(imageIndex)
      }
    })
  }, [visible, imageIndex, slideImages.length])

  return (
    <>
      <CModal
        className="modal-image"
        visible={visible}
        onClose={() => dispatch(setVisibleSlide(false))}
      >
        <CModalHeader onClose={() => dispatch(setVisibleSlide(false))}></CModalHeader>
        <CModalBody>
          <Swiper
            navigation={true}
            modules={[Navigation]}
            zoom={true}
            className="mySwiper"
            ref={swiperRef}
          >
            {slideImages.map((each, index) => (
              <SwiperSlide key={index}>
                <img src={each} alt="documnet" style={{ width: '100%' }} />
              </SwiperSlide>
            ))}
          </Swiper>
        </CModalBody>
      </CModal>
    </>
  )
}

SlideShow.propTypes = {
  userInfoProps: PropTypes.object,
}

SlideShow.defaultProps = {
  userInfoProps: {
    documents: [],
  },
}

export default SlideShow
