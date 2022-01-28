<template>
  <div>
    <div>
      <img
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      />
      <h2>Sign in to your account</h2>
      <p>
        Don't have an account?
        <router-link to="/register">Create one</router-link>
      </p>
    </div>
    <form v-on:submit.prevent="onSubmit" action="#" method="POST">
      <input type="hidden" name="remember" value="true" />
      <div>
        <div>
          <label for="email-address">Username</label>
          <input
            v-model="payload.username"
            type="text"
            autocomplete="username"
            placeholder="Username"
            required="true"
          />
        </div>

        <div>
          <label for="password">Password</label>
          <input
            v-model="payload.password"
            type="password"
            placeholder="Password"
            required="true"
          />
        </div>
      </div>

      <div>
        <button>Sign in</button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
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
      //TODO add snackbar
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
