<script setup lang="ts">
import { reactive } from 'vue'
import cWrapper from '@/components/wrapper/wrapper.component.vue'
import cAnimation from '@/components/card-animation/card-animation.component.vue'
import cInput from '@/components/form/input/input.component.vue'
import cButton from '@/components/form/button/button.component.vue'
import { useLogin } from './hook/useLogin'

const { form, errorMsg, loginUser, goToRegistrationPage } = useLogin();
</script>

<template>
  <main class="grid-main max-w-[64rem] px-12 w-full flex items-center justify-center mx-auto md:px-0 md:w-10/12">
    <c-wrapper>
      <c-animation/>

      <aside class="w-full p-6 text-black flex flex-col justify-between h-[50vh] md:h-auto md:w-6/12 sm:justify-around">
        <h1 class="mb-4 text-4xl text-secondary-500 text-center">{{ $t('sign in') }}</h1>

        <form class="my-6 flex flex-col justify-between"
              @submit.prevent="loginUser">

          <c-input v-model="form.login"
                   :error-msg="errorMsg.login"
                   placeholder="login"/>

          <c-input v-model="form.password"
                   :error-msg="errorMsg.password"
                   error-msg="Wrong login"
                   placeholder="password"
                   type="password"/>

          <div class="p-3">
            <c-button button-type="ghost"
                      type="submit">{{ $t('login') }}</c-button>

          </div>
        </form>

        <div class="px-3 my-3">
          <c-button @click="goToRegistrationPage">{{ $t('registration new account') }}</c-button>
        </div>

        <router-link class="text-center hover:underline"
                     :to="{ name: 'Registration'}">{{ $t('forgot password') }}</router-link>
      </aside>
    </c-wrapper>
  </main>
</template>
