import axios from 'axios'
import { axiosConfigHeader } from '../helpers/axiosConfig'
// import Storage from 'utils/storage'
// export const getLang = Storage.get('SET_LANG') || 'en'
// const setLang = '?language=' + getLang
// export const baseURL = process.env.REACT_APP_API_URL

// TODO: Add dotenv to use enviroment variables
export const baseURL = ""

// auth

const login = (data) => {
  const url = baseURL + '/login.json'
  const config = axiosConfigHeader({})
  return axios.post(url, data, config)
}

// register

const register = (data) => {
	const url = baseURL + '/register'
  const config = axiosConfigHeader({})
  return axios.post(url, data, config)
}

const logout = () => {
  const url = baseURL + '/logout'
  const config = axiosConfigHeader({})
  return axios.delete(url, null, config)
}

const test = (data) => {
	const url = baseURL + '/keywords'
  const config = axiosConfigHeader({})
  return axios.get(url, data, config)
}

const keywordLookup = (data) => {
  const url = baseURL + '/keyword-lookup/' + data.keyword
  const config = axiosConfigHeader({})
  return axios.get(url, data, config)
}

const shortLink = (data) => {
  const url = baseURL + '/keywords'
  const config = axiosConfigHeader({})
  return axios.post(url, data, config)
}

const getKeywords = () => {
  const url = baseURL + '/keywords'
  const config = axiosConfigHeader({})
  return axios.get(url, null, config)
}

const removeKeyword = (id) => {
  const url = baseURL + '/keywords/' + id
  const config = axiosConfigHeader({})
  return axios.delete(url, null, config)
}

const updateKeyword = ({id, data}) => {
  const url = baseURL + '/keywords/' + id
  const config = axiosConfigHeader({})
  return axios.put(url, data, config)
}

const removeSelectedKeywords = (data) => {
  const url = baseURL + '/keywords-delete'
  const config = axiosConfigHeader({})
  return axios.delete(url, {...{params: data}, ...config})
}

const getSubscriptions = () => {
  const url = baseURL + '/subscriptions'
  const config = axiosConfigHeader({})
  return axios.get(url, null, config)
}

export default {
	login,
	register,
  logout,
  keywordLookup,
  shortLink,
  getKeywords,
  removeKeyword,
  updateKeyword,
  removeSelectedKeywords,
  getSubscriptions,
	test
}