<script setup lang="ts">
import { useAuthFetch } from '~/api/axiosInstance';
const router = useRouter()
onMounted(() => {
  const user = JSON.parse(localStorage.getItem("token") as string)
  if (!user?.jwt) {
    router.push("/login")
  }
});

const fetchUrl = ref("")
  const {
    get: fetchGuests,
    data: guests,
    isFetching: fetchingGuests,
    onFetchResponse: fetchGuestRes,
  } = useAuthFetch<string>(fetchUrl, { immediate: false }).text()

  const getGuests = async(page: number) => {
    fetchUrl.value = `/guests?pagination[page]=${page}`;
    await fetchGuests().execute()
  }

getGuests(1);

definePage({
  name: 'Home',
  path: '/',
  meta: {
    requiresAuth: true
  }
})

const guestData = ref();
const guestUrl = ref("");
const guestID = ref("");
const search = ref("");

const { isFetching, onFetchFinally } = useAuthFetch<string>(guestUrl, { immediate: false, refetch: true }).put({ data: { checked_in: true } }).text()

const checkGuestIn = async (id: number) => {
  guestID.value = id.toString();
  guestUrl.value = `/guests/${id}`
}

const searchUrl = ref("")

const { get, data, onFetchResponse } = useAuthFetch<string>(searchUrl, { immediate: false })

const searchGuest = async () => {
  searchUrl.value = `/guests/?filters[full_name][$containsi]=${search.value}`;
  get().execute()
}

onFetchFinally(() => getGuests(1))
onFetchResponse(() => {
  guestData.value = JSON.parse(unref(data) as string)
})
fetchGuestRes(() => {
  guestData.value = JSON.parse(unref(guests) as string)
})
</script>

<template>
    <div class="flex flex-col gap-8 w-full h-full bg-gray-50 mb-8">
        <header class="flex items-center justify-between py-4 px-6 bg-white border-b border-b-gray-200">
            <h1 class="font-semibold text-xl">SoftQR</h1>
            <button type="button" class="px-3 py-1 rounded-md bg-red-100 text-red-600">logout</button>
        </header>
        <div v-if="fetchingGuests">Loading...</div>
        <div v-else class="h-full w-full mx-auto max-w-screen-2xl px-4">
          <div class="flex items-center gap-3 md:w-1/3 mb-5">
            <input id="search" name="search" type="search" autocomplete="search" placeholder="Search name here..." v-model="search" required />
            <button type="button" class="flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white disabled:bg-violet-400 bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500" :disabled="!search" @click="searchGuest()">Search</button>
          </div>
            <div class="flex flex-col bg-white rounded-lg overflow-hidden">
                <div class="border border-gray-300 rounded-t-lg border-x border-x-gray-300 h-full lg:w-full lg:left-auto lg:relative lg:right-auto lg:overflow-x-clip left-0 right-0 overflow-x-scroll scrollbar-hide">
                    <table className='table-auto w-full'>
                        <thead className='w-full bg-[#F9FAFB]'>
                        <tr class="text-left border-b border-b-gray-300">
                            <th class="py-3 px-6 font-medium text-xs text-secondary-30">Full name</th>
                            <th class="py-3 px-6 font-medium text-xs text-secondary-30">Tent</th>
                            <th class="py-3 px-6 font-medium text-xs text-secondary-30">Status</th>
                            <th class="py-3 px-6 font-medium text-xs text-secondary-30 text-right">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(guest, n) in guestData?.data" :key="n" class="text-left last-of-type:border-b-0 border-b border-b-gray-300">
                            <td class="py-6 px-6 text-sm text-secondary-30 whitespace-nowrap">{{ guest.attributes.full_name }}</td>
                            <td class="py-6 px-6 text-sm text-secondary-30 whitespace-nowrap">{{ guest.attributes.tent }}</td>
                            <td class="py-6 px-6 text-xs text-secondary-30 whitespace-nowrap">
                              <div v-if="!guest.attributes.checked_in" class="bg-amber-100 text-amber-600 font-semibold text-sm rounded-full px-2 py-0.5 w-fit h-fit">Pending</div>
                              <div v-if="guest.attributes.checked_in" class="bg-green-100 text-green-600 font-semibold text-sm rounded-full px-2 py-0.5 w-fit h-fit">Checked In</div>
                            </td>
                            <td class="py-6 px-6 text-sm text-secondary-30 whitespace-nowrap text-right">
                              <button v-if="!guest.attributes.checked_in" type="button" class="border rounded-lg py-2 px-3.5 font-medium text-sm hover:bg-green-600 text-[#344054] hover:text-white border-[#D0D5DD] disabled:bg-green-300 hover:border-green-600 transition-colors ease-out duration-300" :disabled="isFetching && guest.id === guestID" @click="[guestID = guest.id, checkGuestIn(guest.id)]">Check IN</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="flex items-center justify-between border-x border-b border-x-gray-300 border-b-gray-300 rounded-b-lg py-5 px-6">
                    <span class="font-medium text-sm text-[#344054]">Page {{ guestData?.meta?.pagination?.page }} of {{ guestData?.meta?.pagination?.pageCount }}</span>
                    <div class="flex items-center gap-3">
                        <button type="button" class="border rounded-lg py-2 px-3.5 font-medium text-sm text-[#344054] border-[#D0D5DD] disabled:cursor-not-allowed" @click="getGuests(guestData?.meta?.pagination?.page - 1)" :disabled="guestData?.meta?.pagination?.page === 1">Previous</button>
                        <button type="button" class="border rounded-lg py-2 px-3.5 font-medium text-sm text-[#344054] border-[#D0D5DD] disabled:cursor-not-allowed" @click="getGuests(guestData?.meta?.pagination?.page + 1)" :disabled="guestData?.meta?.pagination?.page === guestData?.meta?.pagination?.pageCount">Next</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<route lang="yaml">
meta:
  layout: dashboard
</route>