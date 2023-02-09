<script setup lang="ts">
import { PropType } from 'vue';
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import { TSettingsUsers } from '@/store/settings/setting-user/settings-user.types';

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
    <thead>
    <tr>
      <th v-for="(title, index) in titles"
          :key="index"
          class="text-left font-semibold p-3 text-sm bg-gray-100 text-slate-500 dark:text-gray-300 dark:bg-neutral-700"
          :class="{'text-center' : ['title.ACTIONS'].includes(title)}">{{ $t(`${title}`) }}</th>
    </tr>
    </thead>

    <tbody v-auto-animate>
    <tr v-for="(user, index) in users"
        class="text-sm font-medium border-b-gray-100 border-b text-slate-800 dark:text-neutral-200 dark:border-b-neutral-700 hover:bg-gray-200 hover:dark:bg-neutral-600"
        :key="index">

      <td class="p-3">{{index + 1}}</td>
      <td class="p-3">{{user.firstName}}</td>
      <td class="p-3">{{user.lastName}}</td>
      <td class="p-3">{{user.email}}</td>
      <td class="p-3">{{user.active ? $t('common.ACTIVE') : $t('common.INACTIVE')}}</td>
      <td class="p-3 text-center">
        <span class="p-1 no-underline font-semibold rounded-sm text-neutral-600 hover:cursor-pointer hover:bg-primary-500 hover:text-white dark:text-neutral-200"
              @click="$emit('assignUpdateUser', user)">{{ $t('link.UPDATE') }}</span>

        <span class="p-1 no-underline font-semibold rounded-sm text-rose-500 hover:cursor-pointer hover:bg-rose-500 hover:text-white"
              @click="$emit('assignDeleteUser', user)">{{ $t('link.DELETE') }}</span>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
thead{
  th {
    &:first-child {
      border-bottom-left-radius: 0.125rem;
      border-top-left-radius: 0.125rem;
    }
    &:last-child {
      border-bottom-right-radius: 0.125rem;
      border-top-right-radius: 0.125rem;
    }
  }
}
</style>
