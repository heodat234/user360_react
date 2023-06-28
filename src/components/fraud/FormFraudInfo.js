import React, { useState } from 'react'
import { CForm, CFormSelect, CFormInput, CButton, CFormTextarea } from '@coreui/react'
import PropTypes from 'prop-types'
import swal from 'sweetalert'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../store/userSlice'
import { selectUserItem } from '../../store/userItemSlice'
import { saveFraud } from 'src/api/axios'
import { setVisibleModal, getReload, setReload } from 'src/store/fraudSlice'

const FormFraudInfo = ({ resources, projectInfo, category, onHandleLoadingModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm()

  const [amount, setAmount] = useState()

  const userLogin = useSelector(selectUser)
  const userItem = parseInt(useSelector(selectUserItem))
  const reloadFraud = useSelector(getReload)

  const dispatch = useDispatch()

  const onHandleInput = (e) => {
    const parsedValue = e.target.value.replace(/[^\d.]/gi, '')
    setAmount(Number(parsedValue).toLocaleString('en-US'))
  }

  const onSubmit = (data) => {
    onHandleLoadingModal(true)
    saveFraud(data)
      .then((json) => {
        onHandleLoadingModal(false)
        if (json.status) {
          swal('Lưu Fraud', 'Thành công!', 'success').then((value) => {
            dispatch(setReload(!reloadFraud))
            dispatch(setVisibleModal(false))
          })
        } else {
          swal('Lưu Fraud', 'Thất bại!', 'error')
        }
      })
      .catch((e) => {
        onHandleLoadingModal(false)
        swal('Lưu Fraud', 'Thất bại!', 'error')
      })
  }

  return (
    <>
      <div className="mt-4 mb-5 w-full">
        <p className="mb-2 color-gray">Thông tin fraud</p>
        <div className="p-2 rounded dark_bg_card">
          <CForm onSubmit={handleSubmit(onSubmit)}>
            <CFormInput type="hidden" value={userLogin.accessToken} {...register('accessToken')} />
            <CFormInput type="hidden" value={userItem} {...register('userID')} />
            <CFormInput type="hidden" value={projectInfo.ID} {...register('appID')} />
            <CFormInput type="hidden" value={projectInfo.appUID} {...register('caseID')} />
            <CFormInput
              type="hidden"
              value={projectInfo.customerName}
              {...register('customerName')}
            />
            <CFormInput type="hidden" value={category} {...register('category')} />
            <div className="flex mt-3">
              <dl className="w-1/2 flex text-sm mr-4">
                <dt className="mr-2 w-24 color-gray">
                  Ngày nhận phản ánh<span className="text-red-400 ml-1">*</span>
                </dt>
                <dd className="mb-0 dark_color_text w-full">
                  <CFormInput
                    type="date"
                    className="input-form"
                    format="dd-MM-yyyy"
                    {...register('feedbackDate', {
                      required: true,
                    })}
                  />
                  {errors?.feedbackDate?.type === 'required' && (
                    <p>Bạn chưa chọn ngày nhận phản ánh</p>
                  )}
                </dd>
              </dl>
              <dl className="w-1/2 flex text-sm ml-4">
                <dt className="mr-2 w-24 color-gray">
                  Thư mời làm việc<span className="text-red-400 ml-1">*</span>
                </dt>
                <dd className="mb-0 dark_color_text w-full">
                  <CFormInput
                    type="date"
                    className="input-form"
                    format="dd-MM-yyyy"
                    {...register('invitedDate', {
                      required: true,
                    })}
                  />
                  {errors?.invitedDate?.type === 'required' && <p>Bạn chưa chọn ngày làm việc</p>}
                </dd>
              </dl>
            </div>
            <div className="flex mt-3">
              <dl className="w-1/2 flex text-sm mr-4">
                <dt className="mr-2 w-24 color-gray">
                  Lỗi vi phạm<span className="text-red-400 ml-1">*</span>
                </dt>
                <dd className="mb-0 dark_color_text w-full">
                  <CFormInput
                    type="text"
                    className="input-form"
                    placeholder="Nhập lỗi vi phạm"
                    {...register('violateError', {
                      required: true,
                    })}
                  />
                  {errors?.violateError?.type === 'required' && <p>Bạn chưa nhập lỗi vi phạm</p>}
                </dd>
              </dl>
              <dl className="w-1/2 flex text-sm ml-4">
                <dt className="mr-2 w-24 color-gray">
                  Loại vi phạm<span className="text-red-400 ml-1">*</span>
                </dt>
                <dd className="mb-0 dark_color_text w-full">
                  <CFormSelect
                    className="select-form"
                    name="violateTypeID"
                    {...register('violateTypeID', {
                      required: true,
                    })}
                  >
                    <option selected="" value="">
                      - Chọn -
                    </option>
                    {resources.violateType?.length &&
                      resources.violateType.map((op, idx) => (
                        <option key={idx} value={op.ID}>
                          {op.name}
                        </option>
                      ))}
                  </CFormSelect>
                  {errors?.violateTypeID?.type === 'required' && <p>Bạn chưa chọn loại vi phạm</p>}
                </dd>
              </dl>
            </div>
            <div className="flex mt-3">
              <dl className="w-full flex text-sm">
                <dt className="mr-2 w-20 color-gray">
                  Nội dung làm việc<span className="text-red-400 ml-1">*</span>
                </dt>
                <dd className="mb-0 dark_color_text w-full">
                  <CFormTextarea
                    className="select-form"
                    id="floatingTextarea"
                    placeholder="Nhập nội dung"
                    {...register('content', {
                      required: true,
                    })}
                  ></CFormTextarea>
                  {errors?.content?.type === 'required' && <p>Bạn chưa nhập nội dung</p>}
                </dd>
              </dl>
            </div>
            <div className="flex mt-3">
              <dl className="w-1/2 flex text-sm mr-4">
                <dt className="mr-2 w-24 color-gray">
                  Kết quả làm việc<span className="text-red-400 ml-1">*</span>
                </dt>
                <dd className="mb-0 dark_color_text w-full">
                  <CFormSelect
                    className="select-form"
                    {...register('resultID', {
                      required: true,
                    })}
                  >
                    <option value="" selected>
                      - Chọn -
                    </option>
                    {resources.results?.length &&
                      resources.results.map((op, idx) => (
                        <option key={idx} value={op.ID}>
                          {op.name}
                        </option>
                      ))}
                  </CFormSelect>
                  {errors?.resultID?.type === 'required' && <p>Bạn chưa chọn kết quả làm việc</p>}
                </dd>
              </dl>
              <dl className="w-1/2 flex text-sm ml-4"></dl>
            </div>
            <div className="flex mt-3">
              <dl className="w-1/2 flex text-sm mr-4">
                <dt className="mr-2 w-24 color-gray">
                  Ghi chú xử lý<span className="text-red-400 ml-1">*</span>
                </dt>
                <dd className="mb-0 dark_color_text w-full">
                  <CFormInput
                    type="text"
                    className="input-form"
                    placeholder="Nhập ghi chú xử lý"
                    {...register('note', {
                      required: true,
                    })}
                  />
                  {errors?.note?.type === 'required' && <p>Bạn chưa nhập ghi chú xử lý</p>}
                </dd>
              </dl>
              <dl className="w-1/2 flex text-sm ml-4">
                <dt className="mr-2 w-24 color-gray">
                  Số tiền xử lý<span className="text-red-400 ml-1">*</span>
                </dt>
                <dd className="mb-0 dark_color_text w-full">
                  <CFormInput
                    type="text"
                    className="input-form"
                    placeholder="Nhập số tiền xử lý"
                    value={amount}
                    {...register('amount', {
                      required: true,
                      onChange: onHandleInput,
                    })}
                    feedbackInvalid="Bạn chưa nhập số tiền xử lý"
                  />
                  {errors?.amount?.type === 'required' && <p>Bạn chưa nhập số tiền xử lý</p>}
                </dd>
              </dl>
            </div>
            <div className="flex mt-3">
              <dl className="w-full flex text-sm">
                <dt className="mr-2 w-20 color-gray">
                  Xử lý của AF<span className="text-red-400 ml-1">*</span>
                </dt>
                <dd className="mb-0 dark_color_text w-full">
                  <CFormTextarea
                    className="select-form"
                    placeholder="Nhập xử lý của AF"
                    {...register('AFHandle', {
                      required: true,
                    })}
                  ></CFormTextarea>
                  {errors?.AFHandle?.type === 'required' && <p>Bạn chưa nhập xử lý của AF</p>}
                </dd>
              </dl>
            </div>
            <div className="flex justify-center mt-3">
              <CButton
                style={{
                  backgroundColor: `${!isValid ? '#b7b8bd' : '#146cff'}`,
                  color: '#fff',
                  borderRadius: '20px',
                }}
                disabled={!isValid}
                type="submit"
              >
                Thêm thông tin Fraud
              </CButton>
            </div>
          </CForm>
        </div>
      </div>
    </>
  )
}

FormFraudInfo.propTypes = {
  resources: PropTypes.object,
  projectInfo: PropTypes.object,
  category: PropTypes.number,
  onHandleLoadingModal: PropTypes.func,
}

export default FormFraudInfo
