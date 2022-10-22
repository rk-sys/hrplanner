<script setup lang="ts">
import cWrapper from '@/components/wrapper/wrapper.component.vue'
import cAnimation from '@/components/card-animation/card-animation.component.vue'
import cInput from '@/components/form/input/input.component.vue'
import cButton from '@/components/form/button/button.component.vue'
import { useRegistrationInfo } from './hooks/useRegistrationInfo'

const { registrationForm, registrationErrors, checkRegistrationForm } = useRegistrationInfo();
</script>

<template>
  <main class="grid-main max-w-[64rem] px-12 w-full flex items-center justify-center mx-auto md:px-0 md:w-10/12">

    <c-wrapper>
      <c-animation />

      <aside class="w-full p-6 text-black flex flex-col justify-between h-auto sm:justify-around md:h-auto md:w-6/12">
        <h1 class="text-4xl text-secondary-500 text-center">{{ $t('new account') }}</h1>

        <form class="my-6 flex flex-col justify-between md:justify-center"
              @submit.prevent="checkRegistrationForm">

         <div>
           <c-input v-model="registrationForm.login"
                    :error-msg="registrationErrors.login"
                    placeholder="login"/>

           <c-input v-model="registrationForm.firstName"
                    :error-msg="registrationErrors.firstName"
                    placeholder="first name"/>

           <c-input v-model="registrationForm.lastName"
                    :error-msg="registrationErrors.lastName"
                    placeholder="last name"/>

           <c-input v-model="registrationForm.companyName"
                    :error-msg="registrationErrors.companyName"
                    placeholder="company"/>

         </div>
          <div>

            <c-input v-model="registrationForm.email"
                     :error-msg="registrationErrors.email"
                     placeholder="email"/>

            <c-input v-model="registrationForm.password"
                     :error-msg="registrationErrors.password"
                     type="password"
                     placeholder="password"/>

            <c-input v-model="registrationForm.repeatPassword"
                     :error-msg="registrationErrors.repeatPassword"
                     type="password"
                     placeholder="repeat password"/>

            <c-input v-model="registrationForm.registrationCode"
                     :error-msg="registrationErrors.registrationCode"
                     placeholder="code from email"/>
          </div>

          <div class="px-3 my-3">
            <c-button type="submit">{{ $t('registration new account') }}</c-button>
          </div>
        </form>

        <router-link class="text-center block hover:underline"
                     :to="{ name: 'Login'}">{{ $t('back to login page') }}</router-link>
      </aside>
    </c-wrapper>
  </main>
</template>
