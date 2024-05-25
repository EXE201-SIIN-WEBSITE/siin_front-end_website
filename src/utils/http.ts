import axios, { AxiosInstance } from 'axios'

const url = 'https://exe201-backend.up.railway.app/api/v1/'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: url,
      timeout: 10000
    })
  }
}

export const http = new Http().instance
