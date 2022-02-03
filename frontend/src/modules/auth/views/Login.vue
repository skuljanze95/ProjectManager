<template>
  <v-container class="d-flex fill-height">
    <v-card max-width="400" width="400" class="ma-auto">
      <v-card-title class="justify-center">
        <img
          class="login__image"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
      </v-card-title>

      <v-card-text>
        <div class="text-center">
          <h2 class="pt-6">Sign in to your account</h2>
          <p class="pt-2 pb-6">
            Don't have an account?
            <router-link to="/register">Create one</router-link>
          </p>
        </div>

        <v-form ref="form" lazy-validation>
          <v-text-field
            v-model="payload.username"
            :rules="usernameRules"
            label="Username"
          ></v-text-field>
          <v-text-field
            v-model="payload.password"
            type="password"
            :rules="[passwordRules]"
            label="Password"
            class="input-group--focused"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn @click="onSubmit" class="mb-6"> Sign in </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
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
const usernameRules = [(v: any) => !!v || 'Name is required'];
const passwordRules = [(v: any) => !!v || 'Password is required'];

let message = ref();
const form = ref(null);

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
<style scoped>
.fill-height {
  height: 100%;
}
.login__image {
  width: 80px;
}
</style>
