import axios, { AxiosInstance } from 'axios'

const url = 'https://exe201-backend.click/api/v1/'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: url,
      timeout: 10000
    })
  }
}

const ghn = axios.create({
  baseURL: 'https://online-gateway.ghn.vn/shiip/public-api/master-data/',
  timeout: 1000,
  headers: { token: '3270f806-2693-11ef-ad6a-e6aec6d1ae72' }
})

const payment = axios.create({
  // baseURL: 'http://172.171.207.227:3000/payments/create-link/',
  baseURL: 'https://payos.exe201-backend.click/payments/create-link/',
  timeout: 10000000
})

export const http = new Http().instance
export const ghnApi = ghn
export const paymentApi = payment
