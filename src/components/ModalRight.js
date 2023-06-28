import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectVisibleRight, setVisibleRight, selectTemplateModalRight } from '../store/modalSlice'
import BankHistory from './bank/BankHistory'
import TransactionHistory from './transactions/TransactionHistory'
import { Dialog } from '@material-ui/core'
import CollaboratorsFilter from './collaborator/CollaboratorsFilter'
import RatingFilter from './rating/RatingFilter'
import Guides from './guides/Guides'
import ListLevel from './user_level/ListLevel'
import ListEvent from './appEvent/ListEvent'
import { DialogContent, DialogTitle } from './DialogModal'

const ModalRight = () => {
  const dispatch = useDispatch()

  const visible = useSelector(selectVisibleRight)
  const templateModal = useSelector(selectTemplateModalRight)

  let header = ''
  let size = 'md'
  let template = ''
  if (templateModal === 'listBank') {
    header = 'Lịch sử liên kết ngân hàng'
    size = 'lg'
    template = <BankHistory></BankHistory>
  }
  if (templateModal === 'listTrans') {
    header = 'Lịch sử giao dịch'
    size = 'md'
    template = <TransactionHistory></TransactionHistory>
  }
  if (templateModal === 'collaboratorFilter') {
    header = 'Danh sách cộng tác viên'
    size = 'sm'
    template = <CollaboratorsFilter></CollaboratorsFilter>
  }
  if (templateModal === 'sell') {
    header = 'Kỹ năng bán hàng'
    size = 'md'
    template = <RatingFilter type={templateModal}></RatingFilter>
  }
  if (templateModal === 'lead') {
    header = 'Kỹ năng dẫn dắt'
    size = 'md'
    template = <RatingFilter type={templateModal}></RatingFilter>
  }
  if (templateModal === 'guides') {
    header = 'Người dẫn dắt và nhánh tương ứng'
    size = 'lg'
    template = <Guides></Guides>
  }
  if (templateModal === 'levelHistory') {
    header = 'Danh hiệu qua từng tháng'
    size = 'lg'
    template = <ListLevel></ListLevel>
  }
  if (templateModal === 'eventHistory') {
    header = 'Danh sách sự kiện'
    size = 'lg'
    template = <ListEvent></ListEvent>
  }

  const handleClose = () => {
    dispatch(setVisibleRight(false))
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
        <DialogTitle id="customized-dialog-title" className="dark_bg_card" onClose={handleClose}>
          {header}
        </DialogTitle>
        <DialogContent dividers className="list-overflow dark_bg_content">
          {template}
        </DialogContent>

        {/* <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  )
}

export default ModalRight
