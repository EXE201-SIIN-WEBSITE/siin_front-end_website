import axios, { AxiosInstance } from 'axios'

const url = 'http://172.171.207.227:8080/api/v1'

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

export const http = new Http().instance
export const ghnApi = ghn
