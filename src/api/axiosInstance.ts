import { createFetch } from '@vueuse/core'

export const API_URL = 'https://softqr-api-1.onrender.com/api'

export const useBaseFetch = createFetch({
  baseUrl: API_URL,
  fetchOptions: {
    headers: {
      Accept: 'application/json',
    },
  },
})

export const useAuthFetch = createFetch({
  baseUrl: API_URL,
  options: {
    async beforeFetch({ options, cancel }) {
      const user = JSON.parse(localStorage.getItem("token") as string)
      if (!user.jwt)
        cancel()

      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${user.jwt}`,
        Accept: 'application/json',
      }

      return { options }
    },
  },
})
