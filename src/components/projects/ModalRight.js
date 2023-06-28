import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog } from '@material-ui/core'
import ProjectDetail from './ProjectDetail'
import { getDetailID, setDetailId, getVisibleModal, setVisibleModal } from 'src/store/projectSlice'
import ProjectFilter from './ProjectFilter'

const ModalRight = () => {
  const dispatch = useDispatch()

  const detailID = useSelector(getDetailID)

  const visible = useSelector(getVisibleModal)

  let size = 'lg'

  const handleClose = () => {
    dispatch(setVisibleModal(false))
    dispatch(setDetailId(null))
  }

  return (
    <div className="relative">
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={visible}
        className="modalRight "
        maxWidth={size}
      >
        <ProjectFilter></ProjectFilter>
        {detailID && (
          <div className="absolute w-full h-screen">
            <ProjectDetail></ProjectDetail>
          </div>
        )}
      </Dialog>
    </div>
  )
}

export default ModalRight
