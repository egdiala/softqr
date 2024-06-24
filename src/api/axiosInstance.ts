import { createFetch } from '@vueuse/core'
import { useAuthStore } from '~/store/auth'

export const API_URL = 'https://softqr-api.onrender.com'

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
      const auth = useAuthStore()
      if (!auth.token)
        cancel()

      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${auth.token}`,
        Accept: 'application/json',
      }

      return { options }
    },
  },
})