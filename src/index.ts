import { AxiosPromise, AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transFormRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transFormUrl(config)
  config.headers = transFormHeaders(config) // 先处理headers
  config.data = transFormRequestData(config) // 再处理data
}

function transFormUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transFormRequestData(config: AxiosRequestConfig): any {
  return transFormRequest(config.data)
}

function transFormHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios
