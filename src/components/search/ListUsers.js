import React from 'react'
import PropTypes from 'prop-types'
import UserItem from './UserItem'
import { useSelector, useDispatch } from 'react-redux'
import { activeUserItem, selectUserItem } from '../../store/userItemSlice'
import LoadingSpinner from '../LoadingSpinner'

const ListUsers = (props) => {
  const { searchResults, loading, title } = props

  const dispatch = useDispatch()
  const activeItem = useSelector(selectUserItem)

  function handleActiveUserItem(activeItem) {
    dispatch(activeUserItem(activeItem))
  }

  const results = searchResults?.length
    ? searchResults.map((user, idx) => (
        <UserItem
          key={idx}
          userProp={user}
          activeItem={activeItem}
          setActiveItem={handleActiveUserItem}
        ></UserItem>
      ))
    : []

  const content = results?.length ? (
    results
  ) : (
    <article style={{ paddingBottom: '20px', textAlign: 'center' }}>Không có dữ liệu</article>
  )

  return (
    <div className="result-user mt-4">
      <p className="mb-2 font-medium color-gray">{title}</p>
      <div className="search-list lg:max-h-52 md:max-h-44">
        {loading ? <LoadingSpinner></LoadingSpinner> : content}
      </div>
    </div>
  )
}

ListUsers.propTypes = {
  searchResults: PropTypes.array,
  loading: PropTypes.bool,
  title: PropTypes.string,
}

export default ListUsers
