import { acceptHMRUpdate, defineStore } from 'pinia'
import { useAuthFetch, useBaseFetch } from '~/api/axiosInstance'

export const useAuthStore = defineStore('users', () => {
  const router = useRouter()
  const {
    post: postLogin,
    data: token,
    isFetching: isLogingIn,
    onFetchResponse: onLoginResponse,
    onFetchError: onLoginError,
  } = useBaseFetch<string>('/auth/local', { immediate: false }).text()
  useStorage('token', token)
  const isAuthenticated = computed(() => token.value !== null)

  const login = async(email: string, password: string) => {
    await postLogin({ identifier: email, password }).execute()
  }

  const logout = async() => {
    await router.push('/login')
    token.value = null
  }

  const lastURL = ref('/')
  onLoginResponse(() => router.push(lastURL.value))

  const {
    get: fetchGuests,
    data: guests,
    isFetching,
    onFetchResponse,
    onFetchError,
  } = useAuthFetch<string>('/guests', { immediate: false }).text()

  const getGuests = async() => {
    await fetchGuests().execute()
  }

  return {
    token,
    login,
    logout,
    isLogingIn,
    onLoginError,
    isAuthenticated,
    lastURL,
    guests,
    getGuests,
    isFetching,
    onFetchResponse,
    onFetchError,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
