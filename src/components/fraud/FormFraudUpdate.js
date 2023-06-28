import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../store/userSlice'
import { selectUserItem } from '../../store/userItemSlice'
import { updateFraud } from 'src/api/axios'
import { getDetailID } from 'src/store/fraudSlice'
import { CButton, CForm, CFormInput, CFormSelect, CFormTextarea } from '@coreui/react'
import swal from 'sweetalert'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

const FormFraudUpdate = ({ listResult, onHandleLoadingModal }) => {
  const [validated, setValidated] = useState(false)
  const userLogin = useSelector(selectUser)
  const userItem = parseInt(useSelector(selectUserItem))
  const detailID = useSelector(getDetailID)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm()

  const onSubmit = (data) => {
    setValidated(true)
    onHandleLoadingModal(true)
    updateFraud(data)
      .then((json) => {
        onHandleLoadingModal(false)
        if (json.status) {
          swal('Lưu Fraud', 'Thành công!', 'success').then((value) => {
            reset({ content: '', note: '', resultID: '', AFHandle: '' })
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
    <div>
      <p className="ml-2 mb-2 color-gray">Cập nhật trạng thái</p>
      <div className="mr-2 ml-2 p-3 mb-3 rounded dark_bg_card">
        <CForm noValidate validated={validated} onSubmit={handleSubmit(onSubmit)}>
          <CFormInput type="hidden" value={userLogin.accessToken} {...register('accessToken')} />
          <CFormInput type="hidden" value={detailID} {...register('fraudID')} />
          <CFormInput type="hidden" value={userItem} {...register('userID')} />
          <dl className="w-full flex text-sm">
            <dt className="mr-2 w-1/3 color-gray">
              Nội dung làm việc<span className="text-red-400 ml-1">*</span>
            </dt>
            <dd className="mb-0 w-2/3 dark_color_text">
              <CFormTextarea
                className="select-form"
                id="floatingTextarea"
                placeholder="Nhập nội dung"
                rows={4}
                feedbackInvalid="Bạn chưa nhập nội dung"
                {...register('content', {
                  required: true,
                })}
              ></CFormTextarea>
              {errors?.content?.type === 'required' && <p>Bạn chưa nhập nội dung</p>}
            </dd>
          </dl>
          <dl className="flex w-full text-sm mr-4">
            <dt className="mr-2 w-1/3 color-gray">
              Kết quả làm việc<span className="text-red-400 ml-1">*</span>
            </dt>
            <dd className="mb-0 w-2/3 dark_color_text">
              <CFormSelect
                className="select-form"
                {...register('resultID', {
                  required: true,
                })}
              >
                <option value="">- Chọn -</option>
                {listResult?.length &&
                  listResult.map((op, idx) => (
                    <option key={idx} value={op.ID}>
                      {op.name}
                    </option>
                  ))}
              </CFormSelect>
              {errors?.resultID?.type === 'required' && <p>Bạn chưa chọn kết quả làm việc</p>}
            </dd>
          </dl>
          <dl className="w-full flex text-sm mr-4">
            <dt className="mr-2 w-1/3 color-gray">
              Ghi chú xử lý<span className="text-red-400 ml-1">*</span>
            </dt>
            <dd className="mb-0 w-2/3 dark_color_text">
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
          <dl className="w-full flex text-sm">
            <dt className="mr-2 w-1/3 color-gray">
              Xử lý của AF<span className="text-red-400 ml-1">*</span>
            </dt>
            <dd className="mb-0 w-2/3 dark_color_text">
              <CFormTextarea
                className="select-form"
                placeholder="Nhập xử lý của AF"
                rows={4}
                {...register('AFHandle', {
                  required: true,
                })}
              ></CFormTextarea>
              {errors?.AFHandle?.type === 'required' && <p>Bạn chưa nhập xử lý của AF</p>}
            </dd>
          </dl>
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
              Cập nhật ngay
            </CButton>
          </div>
        </CForm>
      </div>
    </div>
  )
}

FormFraudUpdate.propTypes = {
  onHandleLoadingModal: PropTypes.func,
  listResult: PropTypes.array,
}

export default FormFraudUpdate
