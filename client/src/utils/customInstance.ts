import axios, { AxiosInstance } from 'axios'
import { getCookie } from './Cookie'

const customInstance: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    Authorization: `Bearer ${getCookie('access')}`,
  },
})

export default customInstance
