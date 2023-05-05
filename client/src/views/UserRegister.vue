<template>
  <div class="wrapper">
    <Transition>
      <SuccessBanner
        class="BannerMessage"
        :message="successMsg"
        v-if="isSuccess"
      />
    </Transition>
    <Transition>
      <ErrorBanner class="BannerMessage" :message="ErrMsg" v-if="isError" />
    </Transition>

    <form
      action="/register"
      method="POST"
      class="register-form"
      @submit.prevent="formValidateHandler"
      novalidate
    >
      <div class="header">Register From</div>
      <label for="email">Email: </label>
      <input
        class="inputbox"
        id="email"
        type="email"
        placeholder="email"
        v-model="state.email"
        :class="{ error: v$.email.$error }"
        autocomplete="email"
      />
      <p class="notValid" v-if="v$.email.$error">
        {{ v$.email.$errors[0].$message }}
      </p>
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
      <label for="">Confirm Password: </label>
      <input
        type="password"
        class="inputbox"
        placeholder="confirmPassword"
        v-model="state.confirmPassword"
        :class="{ error: v$.confirmPassword.$error }"
        autocomplete="new-password"
      />
      <p class="notValid" v-if="v$.confirmPassword.$error">
        {{ v$.confirmPassword.$errors[0].$message }}
      </p>
      <div class="control">
        <formSubmitButton :showText="'Register'" />
      </div>
    </form>
    <div class="login">
      <h4>
        Already have an Account? click
        <RouterLink :to="{ name: 'login' }">here</RouterLink> to sign in
      </h4>
    </div>
  </div>
</template>
<script>
import SuccessBanner from "../components/SuccessBanner.vue";
import ErrorBanner from "../components/ErrorBanner.vue";
import formSubmitButton from "../components/formSubmitButton.vue";
import { RouterLink } from "vue-router";
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
  data() {
    return {
      isError: false,
      isSuccess: false,
      successMsg: "",
      ErrMsg: "",
    };
  },
  components: {
    formSubmitButton,
    ErrorBanner,
    SuccessBanner,
  },
  methods: {
    registerSubmitHandler() {
      axios
        .post("https://camp-viuw.herokuapp.com/register", {
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
        })
        .then((res) => {
          if (res.status === 200) {
            this.isError = false;
            this.isSuccess = true;
            setTimeout(() => {
              this.isSuccess = false;
              this.$router.push("/login");
            }, 3000);
            this.successMsg = res.data.message;
          }
        })
        .catch((err) => {
          this.isError = true;
          setTimeout(() => {
            this.isError = false;
          }, 3000);
          this.ErrMsg = err.response.data.error;
        });
    },
    formValidateHandler() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.registerSubmitHandler();
      }
    },
  },
};
</script>
<style scoped>
.wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.BannerMessage {
  position: absolute;
  top: 0;
}
.register-form {
  height: 600px;
  width: 90%;
  max-width: 500px;
  padding: 2.5rem 1rem 1rem 1rem;
  border: 1px var(--primary-btn-clr) solid;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 0.5rem;
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
.login h4 {
  font-size: 0.9rem;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
