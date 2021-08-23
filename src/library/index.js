import config from './config'
import storage from './storage'
import query from './query'
import api from './api'
import validate from './validate'

export const log = (name, data) => {
  if (process.env.NODE_ENV === 'development') {
    if (data) {
      console.log(name, data) // eslint-disable-line no-console
    } else {
      console.log(name) // eslint-disable-line no-console
    }
  }
}

export const error = (name, data) => {
  log(`%c${name}`, 'font-weight: 700; color: red;')
  log(data)
}

export const delay = ms =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve()
    }, ms)
  )



const library = {
  log,
  error,
  query,
  config,
  storage,
  api,
  validate,
  utility: {
      delay
  }
}

export default library
