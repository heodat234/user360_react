import React from 'react'

import { CRow } from '@coreui/react'
import iconSticker from 'src/assets/images/icon_sticker.png'
const EmptyData = () => {
  return (
    <>
      <div className="w-full">
        <CRow className="row mt-3 block_ocr">
          <div className="dark_bg_card mb-4 ">
            <div className="row p-3">
              <div className="w-full mt-1">
                <div className="flex flex-col justify-center items-center empty-data">
                  <img src={iconSticker} alt="icon sticker" width={100}></img>
                  <p className="text-lg mt-3 color-gray">Không có dữ liệu</p>
                </div>
              </div>
            </div>
          </div>
        </CRow>
      </div>
    </>
  )
}

export default EmptyData
