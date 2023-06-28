import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog } from '@material-ui/core'
// import ProjectDetail from './ProjectDetail'
import FraudFilter from './FraudFilter'
import { getVisibleModal, getDetailID, setDetailID, setVisibleModal } from 'src/store/fraudSlice'
import FraudDetail from './FraudDetail'

const ModalRight = () => {
  const dispatch = useDispatch()

  const detailID = useSelector(getDetailID)

  const visible = useSelector(getVisibleModal)

  const handleClose = () => {
    dispatch(setVisibleModal(false))
    dispatch(setDetailID(null))
  }

  return (
    <div className="relative">
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={visible}
        className="modalRight "
        maxWidth="lg"
      >
        {detailID ? <FraudDetail></FraudDetail> : <FraudFilter></FraudFilter>}
      </Dialog>
    </div>
  )
}

export default ModalRight
