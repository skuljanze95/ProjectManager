<template>
  <v-container class="d-flex fill-height">
    <v-card max-width="400" width="400" class="ma-auto">
      <v-card-title class="justify-center">
        <img
          class="register__image"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
      </v-card-title>

      <v-card-text>
        <div class="text-center">
          <h2 class="pt-6">Register your account</h2>
          <p class="pt-2 pb-6">
            Already have an account?
            <router-link to="/login">Sign in</router-link>
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
          <v-text-field
            v-model="confirmPassword"
            type="password"
            :rules="passwordRules"
            label="Confirm password"
            class="input-group--focused"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn @click="onSubmit" class="mb-6"> Sign up </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import InterfaceLogin from '../interface/InterfaceLogin';

const payload = reactive<InterfaceLogin>({
  username: '',
  password: '',
});

const confirmPassword = ref();

const usernameRules = [(v: any) => !!v || 'Name is required'];
const passwordRules = [(v: any) => !!v || 'Password is required'];

const onSubmit = () => {
  if (
    !payload.password ||
    !payload.username ||
    !confirmPassword.value ||
    payload.password !== confirmPassword.value
  )
    return;
  console.log(payload);
};
</script>
<style scoped>
.fill-height {
  height: 100%;
}
.register__image {
  width: 80px;
}
</style>
