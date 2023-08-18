import axios from 'axios'

class Service {
  service

  constructor() {
    let service = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
    })
    service.defaults.headers.common.Accept = 'application/json'

    this.service = service
  }

  get(path, params) {
    return this.service.get(path, {
      params,
      responseType: 'json',
    })
  }

  patch(path, payload) {
    return this.service.request({
      method: 'PATCH',
      url: path,
      responseType: 'json',
      data: payload,
    })
  }

  put(path, payload) {
    return this.service.request({
      method: 'PUT',
      url: path,
      responseType: 'json',
      data: payload,
    })
  }

  post(path, payload) {
    return this.service.request({
      method: 'POST',
      url: path,
      responseType: 'json',
      data: payload,
    })
  }

  delete(path, payload) {
    return this.service.request({
      method: 'DELETE',
      url: path,
      responseType: 'json',
      data: payload,
    })
  }
}

const service = new Service()
export default service
