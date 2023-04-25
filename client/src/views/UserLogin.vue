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
      action="/login"
      method="POST"
      class="login-form"
      @submit.prevent="loginSubmitHandler"
      novalidate
    >
      <div class="header">Login From</div>
      <label for="username">Username: </label>
      <input
        class="inputbox"
        id="username"
        type="username"
        placeholder="username"
        v-model="loginUsername"
        autocomplete="username"
      />
      <label for="">Password: </label>
      <input
        type="password"
        class="inputbox"
        placeholder="password"
        v-model="loginPassword"
        autocomplete="new-password"
      />
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
import SuccessBanner from "../components/SuccessBanner.vue";
import ErrorBanner from "../components/ErrorBanner.vue";
import formSubmitButton from "../components/formSubmitButton.vue";
import axios from "axios";
export default {
  components: {
    formSubmitButton,
    SuccessBanner,
    ErrorBanner,
  },
  data() {
    return {
      isError: false,
      isSuccess: false,
      successMsg: "",
      ErrMsg: "",
      loginUsername: "",
      loginPassword: "",
    };
  },
  methods: {
    loginSubmitHandler() {
      axios
        .post("http://localhost:3000/login", {
          username: this.loginUsername,
          password: this.loginPassword,
        })
        .then((res) => {
          if (res.status === 200) {
            this.isSuccess = true;
            localStorage.setItem("loginJWToken", res.data.token);
            localStorage.setItem("userId", res.data.userId);
            this.$store.dispatch("login");
            this.successMsg = "Login Successfully.";
            setTimeout(() => {
              this.isSuccess = false;
              this.$router.push("/campgrounds");
            }, 1000);
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.isError = true;
            setTimeout(() => {
              this.isError = false;
            }, 3000);
            this.ErrMsg = err.response.data.error;
          } else if (err.response.status === 500) {
            this.isError = true;
            setTimeout(() => {
              this.isError = false;
            }, 3000);
            this.ErrMsg = err.response.data.error;
          }
        });
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
  width: 90%;
  max-width: 500px;
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
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
