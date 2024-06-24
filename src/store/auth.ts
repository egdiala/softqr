import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAuthStore = defineStore('users', () => {

  return {
    token: "",
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
