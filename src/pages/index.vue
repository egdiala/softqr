<script setup lang="ts">
definePage({
  name: 'Home',
  path: '/',
  meta: {
    requiresAuth: true
  }
})

const staffs = [
  {
    type: 'Added a new staff',
    time: '09:30pm',
    date: 'October 30, 2017'
  },
  {
    type: 'Added a new staff',
    time: '09:30pm',
    date: 'October 30, 2017'
  },
  {
    type: 'Added a new staff',
    time: '09:30pm',
    date: 'October 30, 2017'
  },
]
</script>

<template>
    <div class="flex flex-col gap-8 w-full h-full bg-gray-50">
        <header class="flex items-center justify-between py-4 px-6 bg-white border-b border-b-gray-200">
            <h1 class="font-semibold text-xl">SoftQR</h1>
            <button type="button" class="px-3 py-1 rounded-md bg-red-100 text-red-600">logout</button>
        </header>
        <div class="h-full w-full mx-auto max-w-screen-2xl">
            <div class="flex flex-col bg-white rounded-lg overflow-hidden">
                <div class="border border-gray-300 rounded-t-lg border-x border-x-gray-300 h-full lg:w-full lg:left-auto lg:relative lg:right-auto lg:overflow-x-clip left-0 right-0 overflow-x-scroll scrollbar-hide">
                    <table className='table-auto w-full'>
                        <thead className='w-full bg-[#F9FAFB]'>
                        <tr class="text-left border-b border-b-gray-300">
                            <th class="py-3 px-6 font-medium text-xs text-secondary-30">Activity Type</th>
                            <th class="py-3 px-6 font-medium text-xs text-secondary-30">Time</th>
                            <th class="py-3 px-6 font-medium text-xs text-secondary-30">Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(staff, n) in staffs" :key="n" class="text-left last-of-type:border-b-0 border-b border-b-gray-300">
                            <td class="py-6 px-6 text-sm text-secondary-30">{{ staff.type }}</td>
                            <td class="py-6 px-6 text-sm text-secondary-30">{{ staff.time }}</td>
                            <td class="py-6 px-6 text-xs text-secondary-30">{{ staff.date }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="flex items-center justify-between border-x border-b border-x-gray-300 border-b-gray-300 rounded-b-lg py-5 px-6">
                    <span class="font-medium text-sm text-[#344054]">Page 1 of 10</span>
                    <div class="flex items-center gap-3">
                        <button type="button" class="border rounded-lg py-2 px-3.5 font-medium text-sm text-[#344054] border-[#D0D5DD]">Previous</button>
                        <button type="button" class="border rounded-lg py-2 px-3.5 font-medium text-sm text-[#344054] border-[#D0D5DD]">Next</button>
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