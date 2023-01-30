<script setup lang="ts">
import { reactive } from 'vue'
import cWrapper from '@/components/wrapper/wrapper.component.vue'
import cAnimation from '@/components/card-animation/card-animation.component.vue'
import cInput from '@/components/form/input/input.component.vue'
import cButton from '@/components/form/button/button.component.vue'
import { useResetPassword } from './hooks/use-reset-password'

const { form, errorMsg, isLinkOnMail, checkResetPasswordForm } = useResetPassword()
</script>

<template>
  <main class="grid-main max-w-[64rem] px-12 w-full flex items-center justify-center mx-auto md:px-0 md:w-10/12">
    <c-wrapper>
      <c-animation/>

      <aside class="w-full p-6 text-black flex flex-col justify-between h-[50vh] md:h-auto md:w-6/12 sm:justify-around">
        <h1 class="mb-4 text-4xl text-secondary-500 text-center">{{ $t('common.RESET_PASSWORD') }}</h1>

        <h1 v-if="isLinkOnMail"
            class="text-center my-6 accent-text bg-gray-300 font-semibold">
          {{ $t('common.SEND_LINK_ON_EMAIL') }}
        </h1>

        <form v-else
              class="my-6 flex flex-col justify-between"
              @submit.prevent="checkResetPasswordForm">

          <c-input v-model="form.email"
                   white-bg
                   :error-msg="errorMsg.email"
                   :placeholder="$t('placeholder.EMAIL')" />

          <c-input v-model="form.repeatEmail"
                   white-bg
                   :error-msg="errorMsg.repeatEmail"
                   :placeholder="$t('placeholder.REPEAT_EMAIL')" />

          <div class="p-3">
            <c-button type="submit">{{ $t('button.RESET_EMAIL') }}</c-button>

          </div>
        </form>

        <router-link class="text-center hover:underline"
                     :to="{ name: 'Login'}">{{ $t('common.BACK_TO_LOGIN_PAGE') }}</router-link>
      </aside>
    </c-wrapper>
  </main>
</template>
