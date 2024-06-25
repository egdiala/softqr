<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

const auth = useAuthStore()
  const email = ref("");
  const password = ref("");

const login = async () => {
  auth.login(email.value, password.value)
  }
</script>

<template>
    <div class="grid content-center w-full h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4">
        <div class="h-fit w-full mx-auto max-w-md p-6 rounded-lg bg-white">
          <h1 class="font-semibold text-xl mb-7">Login</h1>
        <form class="mb-0 space-y-6" @submit.prevent="login()">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
          <div class="mt-1">
            <input id="email" name="email" type="email" autocomplete="email" v-model="email" required class="" />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <div class="mt-1">
            <input id="password" name="password" type="password" autocomplete="current-password" v-model="password" required class="" />
          </div>
        </div>

        <div>
          <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white disabled:bg-violet-400 bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500" :disabled="auth.isLogingIn">Login</button>
        </div>
      </form>
        </div>
    </div>
</template>

<route lang="yaml">
meta:
  layout: auth
</route>