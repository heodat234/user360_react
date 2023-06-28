import React from 'react'
import { CModal, CSpinner } from '@coreui/react'
import { useSelector } from 'react-redux'
import { selectVisibleLoading } from '../store/modalSlice'

const ModalLoading = () => {
  const visible = useSelector(selectVisibleLoading)

  return (
    <>
      <CModal alignment="center" className="modal-loading" visible={visible}>
        <div className="loading-user">
          <CSpinner color="light" />
        </div>
      </CModal>
    </>
  )
}

export default ModalLoading
