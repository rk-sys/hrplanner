<script setup lang="ts">
import { reactive } from 'vue'
import cWrapper from '@/components/wrapper/wrapper.component.vue'
import cAnimation from '@/components/card-animation/card-animation.component.vue'
import cInput from '@/components/form/input/input.component.vue'
import cButton from '@/components/form/button/button.component.vue'
import { useResetPassword } from './hooks/use-reset-password'

const { newPassword, errorMsgPassword, checkNewPasswordForm } = useResetPassword()
</script>

<template>
  <main class="grid-main max-w-[64rem] px-12 w-full flex items-center justify-center mx-auto md:px-0 md:w-10/12">
    <c-wrapper>
      <c-animation/>

      <aside class="w-full p-6 text-black flex flex-col justify-between h-[50vh] md:h-auto md:w-6/12 sm:justify-around">
        <h1 class="mb-4 text-4xl text-secondary-500 text-center">{{ $t('common.NEW_PASSWORD') }}</h1>

        <form class="my-6 flex flex-col justify-between"
              @submit.prevent="checkNewPasswordForm">

          <c-input v-model="newPassword.password"
                   type="password"
                   :error-msg="errorMsgPassword.password"
                   :placeholder="$t('placeholder.PASSWORD')" />

          <c-input v-model="newPassword.repeatPassword"
                   type="password"
                   :error-msg="errorMsgPassword.repeatPassword"
                   :placeholder="$t('placeholder.REPEAT_PASSWORD')" />

          <div class="p-3">
            <c-button type="submit">{{ $t('button.CONFIRM_PASSWORD') }}</c-button>

          </div>
        </form>

        <router-link class="text-center hover:underline"
                     :to="{ name: 'Login'}">{{ $t('common.BACK_TO_LOGIN_PAGE') }}</router-link>
      </aside>
    </c-wrapper>
  </main>
</template>
