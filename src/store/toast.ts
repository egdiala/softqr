import { defineStore } from 'pinia'
import { ref } from 'vue';

interface Toast {
  id: string;
  type: string;
  title: string;
  message: string;
  autoClose?: boolean;
  duration?: number;
  actions?: Record<string, any>[]
}

export const useToastsStore = defineStore('toasts', {
    state: () => ({
        toasts: ref<Toast[]>([]),
    }),
    persist: true,
})