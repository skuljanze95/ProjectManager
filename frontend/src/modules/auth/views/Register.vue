<template>
  <div>
    <div>
      <img
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      />
      <h2>Register your account</h2>
      <p>
        Already have an account?
        <router-link to="/login">Sign in</router-link>
      </p>
    </div>
    <form v-on:submit.prevent="onSubmit" action="#" method="POST">
      <input type="hidden" name="remember" value="true" />
      <div>
        <div>
          <label for="email-address">Email address</label>
          <input
            v-model="payload.username"
            type="email"
            autocomplete="email"
            placeholder="Email address"
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
        <div>
          <label for="password">Confirm password</label>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm password"
            required="true"
            v-validity="
              payload.password !== confirmPassword
                ? 'Passwords do not match'
                : ''
            "
          />
        </div>
      </div>

      <div>
        <button>Sign up</button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import InterfaceLogin from '../interface/InterfaceLogin';

const payload = reactive<InterfaceLogin>({
  username: '',
  password: '',
});

const confirmPassword = ref();

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
