import React from 'react'
import PropTypes from 'prop-types'
import { CCard, CCol, CRow } from '@coreui/react'
import DocumentItem from './DocumentItem'

const UserDocument = (props) => {
  const { userInfoProps } = props

  const imageList =
    userInfoProps && userInfoProps.documents
      ? userInfoProps.documents.map((doc, idx) => (
          <DocumentItem key={idx} doc={doc} idx={idx}></DocumentItem>
        ))
      : ''
  const content = imageList.length ? imageList : ''
  const countDoc = imageList.length ? imageList.length : 0

  return (
    <>
      <div className="lg:w-1/3 md:w-1/3 sm:w-full- pl-2">
        <p className="block_title">Hồ sơ/Hình ảnh ({countDoc})</p>
        <CRow className="mt-4 block_ocr">
          <CCol xs>
            <CCard className="dark_bg_card mb-4 gallery">
              <div className="image-container p-3">{content}</div>
            </CCard>
          </CCol>
        </CRow>
      </div>
    </>
  )
}

UserDocument.propTypes = {
  userInfoProps: PropTypes.object,
}

UserDocument.defaultProps = {
  userInfoProps: {
    documents: [],
  },
}

export default UserDocument
