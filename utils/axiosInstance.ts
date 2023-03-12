
import axios, {Method} from 'axios'

interface IAxiosInstance {
  method: Method,

}
export const axiosInstance = ({method}:IAxiosInstance) => axios({
  method: method,
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL_DEV!,
})