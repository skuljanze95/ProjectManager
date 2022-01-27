<template>
  <div
    class="h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-sm w-full space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 class="mt-6 text-center text-2xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Don't have an account?
          <router-link
            to="/register"
            class="font-medium text-indigo-600 hover:text-indigo-500"
            >Create one</router-link
          >
        </p>
      </div>
      <form
        v-on:submit.prevent="onSubmit"
        class="bg-white drop-shadow-xl p-8 pt-2 m-auto rounded-lg space-y-6"
        action="#"
        method="POST"
      >
        <input type="hidden" name="remember" value="true" />
        <div class="space-y-2">
          <div class="flex flex-col text-xs font-medium">
            <label for="email-address" class="text-left py-1">Username</label>
            <input
              v-model="payload.username"
              type="text"
              autocomplete="username"
              placeholder="Username"
              required="true"
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>

          <div class="flex flex-col text-xs font-medium">
            <label for="password" class="text-left py-1">Password</label>
            <input
              v-model="payload.password"
              type="password"
              placeholder="Password"
              required="true"
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <button
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { LockClosedIcon } from '@heroicons/vue/solid';
import InterfaceLogin from '../interface/InterfaceLogin';
import store from '@/store';
import router from '@/router';

const payload = reactive<InterfaceLogin>({
  username: '',
  password: '',
});

let message = ref();
const onSubmit = () => {
  store.dispatch('login', payload).then(
    () => {
      router.push('/');
    },
    (error) => {
      message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
    }
  );
};
</script>
