<script setup lang="ts">
import cWrapper from '@/components/wrapper/wrapper.component.vue'
import cAnimation from '@/components/card-animation/card-animation.component.vue'
import cInput from '@/components/form/input/input.component.vue'
import cButton from '@/components/form/button/button.component.vue'
import { useRegistrationCode } from './hooks/useRegistrationCode'

const { email, errorMsg, sendCode } = useRegistrationCode();

</script>

<template>
  <main class="grid-main max-w-[64rem] px-12 w-full flex items-center justify-center mx-auto md:px-0 md:w-10/12">

    <c-wrapper>
      <c-animation />

      <aside class="w-full p-6 text-black flex flex-col justify-between h-[50vh] sm:justify-around md:h-auto md:w-6/12">
        <h1 class="mb-4 text-4xl text-secondary-500 text-center">{{ $t('registration') }}</h1>

        <form class="my-6 flex flex-col justify-between md:justify-center"
              @submit.prevent="sendCode">

          <c-input v-model="email"
                   :error-msg="errorMsg"
                   placeholder="email"/>

          <span class="text-center pt-2 px-12 pb-5 md:px-2">
            {{ $t('after you click send a code, check your e-mail. You should get message with code, this code have to input with next step') }}
          </span>

          <div class="px-3 my-3">
            <c-button type="submit">{{ $t('send a code') }}</c-button>
          </div>
        </form>

        <div>
          <router-link class="text-center block mb-2 hover:underline"
                       :to="{ name: 'Registration info'}">{{ $t('i got a code') }}</router-link>

          <router-link class="text-center block hover:underline"
                       :to="{ name: 'Login'}">{{ $t('back to login page') }}</router-link>
        </div>
      </aside>
    </c-wrapper>
  </main>
</template>
