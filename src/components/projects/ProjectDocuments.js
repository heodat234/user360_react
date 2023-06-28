import React from 'react'
import PropTypes from 'prop-types'

const ProjectDocuments = ({ documents }) => {
  if (documents && documents.length > 0) {
    return (
      <div className="mr-2 ml-2 w-[800px]">
        <p className="mb-2 color-gray">Ảnh chụp hồ sơ</p>
        <div className="grid grid-cols-2 gap-2 p-4 h-44 rounded dark_bg_card">
          {documents &&
            documents.map((doc, idx) => {
              return <img key={idx} src={doc} alt="document" height={200}></img>
            })}
        </div>
      </div>
    )
  }
}

ProjectDocuments.propTypes = {
  documents: PropTypes.array,
}

export default ProjectDocuments
