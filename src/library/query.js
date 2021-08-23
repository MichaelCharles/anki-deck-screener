import axios from 'axios'
import config from './config'
import library from './index'

const headers = {
  'Content-Type': 'application/json',
}

const post = async (path, data, options = { headers }) => {
  library.log('query.post', {
    path,
    data,
    options,
  })
  const response = await axios.post(`${config.api}${path}`, data, options)
  library.log('query.post (response)', response)
  return response
}

const deleteRequest = async (path, data, options = { headers }) => {
  library.log('query.delete', {
    path,
    data,
    options,
  })
  const response = await axios.delete(`${config.api}${path}`, {
    headers: options.headers,
    data,
  })
  library.log('query.delete (response)', response)
  return response
}

const put = async (path, data, options = { headers }) => {
  library.log('query.put', {
    path,
    data,
    options,
  })
  const response = await axios.put(`${config.api}${path}`, data, options)
  library.log('query.put (response)', response)
  return response
}

const get = async (path, options = { headers }) => {
  library.log('query.get', {
    path,
    options,
  })
  const response = await axios.get(`${config.api}${path}`, options)
  library.log('query.get (response)', response)
  return response
}


const query = {
  post,
  get,
  put,
  delete: deleteRequest,
}

export default query