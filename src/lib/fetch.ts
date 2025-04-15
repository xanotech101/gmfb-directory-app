/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = process.env.API_BASE_URL as string

const baseHeaders: HeadersInit = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

const mergeOptions = (options: RequestInit = {}): RequestInit => ({
  ...options,
  headers: {
    ...baseHeaders,
    ...options.headers,
  },
})

interface RequestParams {
  body?: unknown
  options?: RequestInit
  isClient?: boolean
}

const createHttpRequestFunction = (method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE') =>
  async function <T>(endpoint: string, params?: RequestParams): Promise<T> {
    const { body, options, isClient } = params ?? {}
    const url = isClient ? endpoint : `${BASE_URL}${endpoint}`
    let formattedBody = body as string | FormData | undefined

    if (body !== undefined && !(body instanceof FormData)) {
      formattedBody = JSON.stringify(body)
    }

    const mergedOptions = mergeOptions({
      ...options,
      method,
      ...(body !== undefined && { body: formattedBody }),
    })

    if (method === 'DELETE') {
      if (!body) {
        delete (mergedOptions.headers as any)['Content-Type']
      }
    }

    if ((method === 'POST' || method === 'PUT') && body instanceof FormData) {
      mergedOptions.headers = {
        ...mergedOptions.headers,
        'Content-Type': 'multipart/form-data',
      }
    }

    try {
      const response = await fetch(url, mergedOptions)

      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      return (await response.json()) as T
    } catch (error) {
      throw error
    }
  }

const get = createHttpRequestFunction('GET')
const post = createHttpRequestFunction('POST')
const put = createHttpRequestFunction('PUT')
const patch = createHttpRequestFunction('PATCH')
const del = createHttpRequestFunction('DELETE')

export { get, post, put, patch, del }
