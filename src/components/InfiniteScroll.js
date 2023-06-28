import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const InfiniteScroll = ({ children, loader, fetchMore, hasMore, endMessage, className, style }) => {
  const pageEndRef = useRef(null)
  useEffect(() => {
    if (hasMore) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          // kiểm tra element có nằm trong viewport không?
          fetchMore()
        }
      })

      if (pageEndRef.current) {
        observer.observe(pageEndRef.current)
      }

      return () => {
        if (pageEndRef.current) {
          observer.unobserve(pageEndRef.current)
        }
      }
    }
  }, [hasMore])

  return (
    <div className={className} style={style}>
      {children}

      {hasMore ? <div ref={pageEndRef}>{loader}</div> : endMessage}
    </div>
  )
}

InfiniteScroll.propTypes = {
  children: PropTypes.node,
  loader: PropTypes.object,
  fetchMore: PropTypes.func,
  hasMore: PropTypes.bool,
  endMessage: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default InfiniteScroll
