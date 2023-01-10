<script setup lang="ts">
import { PropType } from 'vue';
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import { TSettingsUsers } from '@/store/setting-user/settings-user.types';

const props = defineProps({
  users: {
    type: Array as PropType<TSettingsUsers[]>,
    default: []
  },
  titles: {
    type: Array as PropType<string[]>,
    default: []
  }
})

</script>

<template>
  <table class="mt-8 w-full table-auto sm:text-xs md:text-sm lg:text-base">
    <thead class="odd:bg-slate-600 text-white">
    <tr>
      <th v-for="(title, index) in titles"
          :key="index"
          class="text-left p-2">{{ $t(`${title}`) }}</th>
    </tr>
    </thead>

    <tbody v-auto-animate>
    <tr v-for="(user, index) in users"
        class="even:bg-slate-100 odd:bg-slate-200 hover:bg-slate-400 hover:text-white dark:even:bg-zinc-800 dark:odd:bg-zinc-700 dark:hover:bg-zinc-400 "
        :key="index">

      <td class="p-2">{{index + 1}}</td>
      <td class="p-2">{{user.firstName}}</td>
      <td class="p-2">{{user.lastName}}</td>
      <td class="p-2">{{user.email}}</td>
      <td class="p-2">{{user.active ? $t('common.ACTIVE') : $t('common.INACTIVE')}}</td>
      <td class="p-2">
        <span class="hover:underline hover:cursor-pointer hover:text-primary-500"
              @click="$emit('assignUpdateUser', user)">{{ $t('link.UPDATE') }}</span>
        /
        <span class="hover:underline hover:cursor-pointer hover:text-rose-500"
              @click="$emit('assignDeleteUser', user)">{{ $t('link.DELETE') }}</span>
      </td>
    </tr>
    </tbody>
  </table>
</template>
