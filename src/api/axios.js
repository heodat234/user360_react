import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
})

export const userLogin = async (payload) => {
  const response = await api.post('/login', {
    username: payload.username,
    password: payload.password,
  })
  return response.data
}

export const findUsers = async (accessToken, keySearch) => {
  const response = await api.post('/find_user', { keySearch: keySearch, accessToken: accessToken })
  return response.data
}

export const getUserInfo = async (accessToken, userID) => {
  const params = new URLSearchParams([
    ['userID', userID],
    ['accessToken', accessToken],
  ])

  const response = await api.get('/get_user', { params })
  return response.data
}

export const getMoneyByUser = async (
  accessToken,
  userID,
  startTime,
  endTime,
  compareStartTime,
  compareEndTime,
) => {
  const params = new URLSearchParams([
    ['userID', userID],
    ['accessToken', accessToken],
    ['startTime', startTime],
    ['endTime', endTime],
    ['compareStartTime', compareStartTime],
    ['compareEndTime', compareEndTime],
  ])

  const response = await api.get('/statistic_money', { params })
  return response.data
}

export const collaboratorChart = async (accessToken, userID, rank, level) => {
  const response = await api.post('/collaborator_chart', {
    accessToken: accessToken,
    userID: userID,
    rank: rank,
    level: level,
  })
  return response.data
}

export const pointChart = async (accessToken, userID) => {
  const response = await api.post('/point_chart', { accessToken: accessToken, userID: userID })
  return response.data
}

export const getChannels = async (accessToken, userID) => {
  const params = new URLSearchParams([
    ['userID', userID],
    ['accessToken', accessToken],
  ])

  const response = await api.get('/get_channels', { params })
  return response.data
}

export const getEventFilter = async (accessToken, userID) => {
  const params = new URLSearchParams([
    ['userID', userID],
    ['accessToken', accessToken],
  ])

  const response = await api.get('/get_event_filter', { params })
  return response.data
}

export const getEvents = async (
  accessToken,
  userID,
  page,
  startTime,
  endTime,
  eventName,
  location,
) => {
  const params = new URLSearchParams([
    ['userID', userID],
    ['accessToken', accessToken],
    ['page', page],
    ['startTime', startTime],
    ['endTime', endTime],
    ['eventName', eventName],
    ['location', location],
  ])

  const response = await api.get('/get_events', { params })
  return response.data
}

export const getLocations = async (accessToken, userID, eventName, startTime, endTime) => {
  const params = new URLSearchParams([
    ['userID', userID],
    ['accessToken', accessToken],
    ['eventName', eventName],
    ['startTime', startTime],
    ['endTime', endTime],
  ])

  const response = await api.get('/get_locations', { params })
  return response.data
}

export const statusProjectChart = async (
  accessToken,
  userID,
  project,
  startTime,
  endTime,
  compareStartTime,
  compareEndTime,
) => {
  const response = await api.post('/status_project_chart', {
    accessToken: accessToken,
    userID: userID,
    startTime: startTime,
    endTime: endTime,
    compareStartTime: compareStartTime,
    compareEndTime: compareEndTime,
    project: project,
  })
  return response.data
}

export const activityChart = async (
  accessToken,
  userID,
  startTime,
  endTime,
  compareStartTime,
  compareEndTime,
) => {
  const response = await api.post('/activity_chart', {
    accessToken: accessToken,
    userID: userID,
    startTime: startTime,
    endTime: endTime,
    compareStartTime: compareStartTime,
    compareEndTime: compareEndTime,
  })
  return response.data
}

export const getBanks = async (accessToken, userID) => {
  const params = new URLSearchParams([
    ['userID', userID],
    ['accessToken', accessToken],
  ])

  const response = await api.get('/get_banks', { params })
  return response.data
}

export const getTransactionHistory = async (
  accessToken,
  userID,
  filter,
  startDate,
  endDate,
  page,
) => {
  const params = new URLSearchParams([
    ['userID', userID],
    ['accessToken', accessToken],
    ['filter', filter],
    ['startDate', startDate],
    ['endDate', endDate],
    ['page', page],
  ])

  const response = await api.get('/withdrawal_history', { params })
  return response.data
}

export const getCollaboratorFilter = async (accessToken, userID, level, rank, keyword, page) => {
  const params = new URLSearchParams([
    ['userID', userID],
    ['accessToken', accessToken],
    ['level', level],
    ['tabs', rank],
    ['keyword', keyword],
    ['page', page],
  ])

  const response = await api.get('/collaborator_filter', { params })
  return response.data
}

export const getRatingUser = async (accessToken, userID, tab, skill, page) => {
  const params = new URLSearchParams([
    ['userID', userID],
    ['accessToken', accessToken],
    ['tab', tab],
    ['skill', skill],
    ['page', page],
  ])

  const response = await api.get('/load_page_rating_user', { params })
  return response.data
}

export const getProjectsByCategory = async (accessToken, userID, category) => {
  const params = new URLSearchParams([
    ['userID', userID],
    ['accessToken', accessToken],
    ['category', category],
  ])

  const response = await api.get('/project_by_category', { params })
  return response.data
}

export const getListProjectInfo = async (
  accessToken,
  userID,
  category,
  projectID,
  keyword,
  page,
) => {
  const params = new URLSearchParams([
    ['userID', userID],
    ['accessToken', accessToken],
    ['category', category],
    ['projectID', projectID],
    ['keyword', keyword],
    ['page', page],
  ])

  const response = await api.get('/get_project_by_keyword', { params })
  return response.data
}

export const getListProjectByID = async (accessToken, userID, category, keyword) => {
  const params = new URLSearchParams([
    ['userID', userID],
    ['accessToken', accessToken],
    ['category', category],
    ['keyword', keyword],
  ])

  const response = await api.get('/get_project_by_ID', { params })
  return response.data
}

export const getLeadAndBranchByUserID = async (accessToken, userID) => {
  const params = new URLSearchParams([
    ['userID', userID],
    ['accessToken', accessToken],
  ])

  const response = await api.get('/lead_and_branch', { params })
  return response.data
}

export const getUserLevelLogs = async (accessToken, userID) => {
  const params = new URLSearchParams([
    ['userID', userID],
    ['accessToken', accessToken],
  ])

  const response = await api.get('/hier_user_level_logs', { params })
  return response.data
}

export const getInfoProjectFraud = async (data) => {
  const params = new URLSearchParams(data)

  const response = await api.get('/get_info_project_fraud', { params })
  return response.data
}

export const getFrauds = async (accessToken, userID, page) => {
  const params = new URLSearchParams([
    ['userID', userID],
    ['accessToken', accessToken],
    ['page', page],
  ])

  const response = await api.get('/get_frauds', { params })
  return response.data
}

export const saveFraud = async (data) => {
  const response = await api.post('/save_fraud', data)
  return response.data
}

export const getFraudDetail = async (accessToken, userID, fraudID) => {
  const params = new URLSearchParams([
    ['userID', userID],
    ['accessToken', accessToken],
    ['fraudID', fraudID],
  ])

  const response = await api.get('/get_fraud_detail', { params })
  return response.data
}

export const getFraudLogs = async (accessToken, userID, fraudID) => {
  const params = new URLSearchParams([
    ['accessToken', accessToken],
    ['userID', userID],
    ['fraudID', fraudID],
  ])

  const response = await api.get('/get_fraud_logs', { params })
  return response.data
}

export const updateFraud = async (data) => {
  const response = await api.post('/update_fraud', data)
  return response.data
}

export const getURLOpenMessenger = async (accessToken, userID) => {
  const params = new URLSearchParams([
    ['userID', userID],
    ['accessToken', accessToken],
  ])

  const response = await api.get('/open_messenger', { params })
  return response.data
}
