import React, { useState, useEffect } from 'react'
import iconDoc from 'src/assets/images/icon_doc.png'
import dayjs from 'dayjs'
import classNames from 'classnames'
import { NumericFormat } from 'react-number-format'

import { useSelector } from 'react-redux'
import { selectUser } from '../../store/userSlice'
import { selectUserItem } from '../../store/userItemSlice'
import { getListProjectByID } from 'src/api/axios'
import LoadingSpinner from '../LoadingSpinner'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { useDispatch } from 'react-redux'
import { getDetailID, getCategory, setVisibleModal, setDetailId } from '../../store/projectSlice'
import iconBack from 'src/assets/images/icon_back.png'
import ProjectCusInfo from './ProjectCusInfo'
import ProjectDocuments from './ProjectDocuments'
import ProjectInfo from './ProjectInfo'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
})

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" className="dark_color_text">
        {children}
      </Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

const ProjectDetail = () => {
  const [item, setItem] = useState({})
  const [isLoading, setIsLoading] = useState({})
  const userLogin = useSelector(selectUser)
  const userItem = parseInt(useSelector(selectUserItem))
  const detailID = useSelector(getDetailID)
  const category = useSelector(getCategory)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(setVisibleModal(false))
    dispatch(setDetailId(null))
  }

  useEffect(() => {
    if (userItem && detailID) {
      setIsLoading(true)
      getListProjectByID(userLogin.accessToken, userItem, category, detailID)
        .then((json) => {
          if (json.status) {
            setItem(json.data)
          }
          setIsLoading(false)
        })
        .catch((e) => {
          setIsLoading(false)
        })
    }
  }, [userLogin, userItem, category, detailID])

  var cusInfo = []
  var saleInfo = []
  if (item) {
    cusInfo = [
      {
        key: 'name',
        text: 'Họ và tên',
        value: item.customerName,
      },
      {
        key: 'phone',
        text: 'Số điện thoại',
        value: item.customerPhoneHide,
      },
      {
        key: 'idNumber',
        text: 'CMND/CCCD',
        value: item.customerIdNumber,
      },
      {
        key: 'province',
        text: 'Tỉnh/TP',
        value: item.provinceName ? item.provinceName : '---',
      },
      {
        key: 'district',
        text: 'Quận/Huyện',
        value: item.districtName ? item.districtName : '---',
      },
      {
        key: 'address',
        text: 'Địa chỉ',
        value: item.customerAddress ? item.customerAddress : '---',
      },
    ]

    saleInfo = [
      {
        key: 'name',
        text: 'Họ và tên',
        value: item.lastSaleFullName ? item.lastSaleFullName : '---',
      },
      {
        key: 'phone',
        text: 'Số điện thoại',
        value: item.lastSalePhoneHide ? item.lastSalePhoneHide : '---',
      },
      {
        key: 'idNumber',
        text: 'CMND/CCCD',
        value: item.lastSaleIdNumber ? item.lastSaleIdNumber : '---',
      },
      {
        key: 'status',
        text: 'Trạng thái',
        value: item.lastProcessText ? item.lastProcessText : '---',
      },
      {
        key: 'updatedDate',
        text: 'Cập nhật lúc',
        value: item.lastProcessDate
          ? dayjs(item.lastProcessDate ? item.lastProcessDate : new Date()).format('H:m DD/MM/YYYY')
          : '---',
      },
      {
        key: 'note',
        text: 'Ghi chú',
        value: item.lastProcessNote ? item.lastProcessNote : '---',
      },
    ]
  }

  return (
    <>
      <DialogTitle id="customized-dialog-title" className=" dark_bg_card" onClose={handleClose}>
        <div className="flex justify-between w-1/2">
          <button
            onClick={() => {
              dispatch(setDetailId(null))
            }}
            className="flex items-center color-gray"
          >
            <img src={iconBack} alt="icon back" width={22}></img>Quay lại
          </button>
          <span className="ml-12">Chi tiết hồ sơ</span>
        </div>
      </DialogTitle>
      <div
        className="absolute w-full h-screen bg-white opacity-30 items-center justify-center"
        style={{ display: isLoading ? 'flex' : 'none' }}
      >
        <LoadingSpinner></LoadingSpinner>
      </div>
      <DialogContent className="dark_bg_content h-screen">
        <div className="p-2 mb-3 rounded dark_bg_card">
          <div className="flex items-center mb-2">
            <div className="p-2" style={{ backgroundColor: '#fff' }}>
              <img src={item.logo} alt="logo" width={50}></img>
            </div>
            <p className="ml-4 mr-1 text-sm dark_color_text">{item.customerName}</p>
            <img src={iconDoc} alt="logo" width={15} height={10}></img>
          </div>
          <div className="flex">
            <dl className="flex text-sm w-1/2">
              <dt className="mr-2 color-gray">Trạng thái: </dt>
              <dd
                className={classNames({
                  'mb-0 font-semibold': true,
                  'color-active': item.progress === '1',
                  'color-waitting': item.progress === '0',
                  'color-disable': item.progress === '2',
                })}
              >
                {item.statusText}
              </dd>
            </dl>
            <dl
              className={classNames({ 'flex text-sm w-1/2': true, hidden: item.progress !== '1' })}
            >
              <dt className="mr-2 color-gray">Hoa hồng:</dt>
              <dd className="mb-0 flex dark_color_text">
                <span className="font-semibold color-active mr-2">
                  <NumericFormat
                    value={item.commAmount}
                    allowLeadingZeros
                    displayType={'text'}
                    thousandSeparator=","
                  />{' '}
                  đ
                </span>
                <span className={classNames({ hidden: category })}>- Làm tất cả quy trình</span>
              </dd>
            </dl>
          </div>
          <div className="flex">
            <dl className="flex text-sm w-1/2">
              <dt className="mr-2 color-gray">Cập nhật lúc: </dt>
              <dd className="mb-0 dark_color_text">
                {dayjs(item.updatedDate ? item.updatedDate : new Date()).format('H:m DD/MM/YYYY')}
              </dd>
            </dl>
            <dl className="flex text-sm w-1/2">
              <dt className="mr-2 color-gray">KH của:</dt>
              <dd className="mb-0 flex dark_color_text">{item.saleName}</dd>
            </dl>
          </div>
        </div>
        <div className="flex">
          <ProjectCusInfo item={cusInfo} title="Thông tin khách hàng"></ProjectCusInfo>
          <ProjectCusInfo item={saleInfo} title="Thông tin người cập nhật"></ProjectCusInfo>
        </div>
        <ProjectInfo></ProjectInfo>
        <ProjectDocuments documents={item.documents ? item.documents : []}></ProjectDocuments>
      </DialogContent>
    </>
  )
}

export default ProjectDetail
