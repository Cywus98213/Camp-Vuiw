<template>
  <div class="wrapper">
    <form
      action="/login"
      class="login-form"
      @submit.prevent="formValidateHandler"
      novalidate
    >
      <div class="header">Login From</div>
      <label for="username">Username: </label>
      <input
        class="inputbox"
        id="username"
        type="username"
        placeholder="username"
        v-model="state.username"
        :class="{ error: v$.username.$error }"
        autocomplete="username"
      />
      <p class="notValid" v-if="v$.username.$error">
        {{ v$.username.$errors[0].$message }}
      </p>
      <label for="">Password: </label>
      <input
        type="password"
        class="inputbox"
        placeholder="password"
        v-model="state.password"
        :class="{ error: v$.password.$error }"
        autocomplete="new-password"
      />
      <p class="notValid" v-if="v$.password.$error">
        {{ v$.password.$errors[0].$message }}
      </p>
      <div class="control">
        <formSubmitButton :showText="'Login'" />
      </div>
    </form>
    <div class="register">
      <h2>
        Don't have Account? click
        <RouterLink :to="{ name: 'register' }">here</RouterLink> to register
      </h2>
    </div>
  </div>
</template>
<script>
import formSubmitButton from "../components/formSubmitButton.vue";
import { reactive, computed } from "vue";
import useValidate from "@vuelidate/core";
import { required, minLength, email, sameAs } from "@vuelidate/validators";
import axios from "axios";
export default {
  setup() {
    const state = reactive({
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
    const rules = computed(() => {
      return {
        email: { required, email },
        username: { required, minLength: minLength(6) },
        password: { required },
        confirmPassword: { required, sameAs: sameAs(state.password) },
      };
    });

    const v$ = useValidate(rules, state);

    return {
      state,
      v$,
    };
  },
  components: {
    formSubmitButton,
  },
  methods: {
    registerSubmitHandler() {
      axios
        .post("http://localhost:3000/register", {
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async formValidateHandler() {
      await this.v$.$validate();
      if (!this.v$.$error) {
        alert("Create Success");
        this.registerSubmitHandler();
      } else {
        alert("Something Wrong");
      }
    },
  },
};
</script>
<style scoped>
.wrapper {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.backbutton {
  position: absolute;
  top: 0;
  left: 0;
  padding: 1rem;
}
.backbutton img {
  height: 3rem;
  cursor: pointer;
}
.login-form {
  height: 600px;
  width: 500px;
  padding: 2.5rem 1rem 1rem 1rem;
  border: 1px var(--primary-btn-clr) solid;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 0.5rem;
}
.header {
  position: absolute;
  height: 2rem;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--navbar-btn-hover);
  display: flex;
  align-items: center;
  justify-content: center;
}
.inputbox {
  padding: 0.4rem 0.8rem;
  border-radius: 0.3rem;
  border: 1px var(--primary-font-clr) solid;
}
.control {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.control button {
  width: 100%;
}
.notValid {
  color: var(--primary-notvalid-clr);
}
.error {
  border: 1px var(--primary-notvalid-clr) solid;
}
</style>
