<template>
  <div class="wrapper">
    <div class="goback">
      <backButton />
    </div>
    <form
      class="create-from"
      action="/campgrounds"
      method="POST"
      @submit.prevent="formsubmitHandler"
    >
      <div class="header">Create form</div>
      <div class="inputbox">
        <label for="">Name:</label>
        <input
          type="text"
          v-model="state.campName"
          :class="{ error: v$.campName.$error }"
        />
        <img
          v-if="v$.campName.$error"
          class="error-img"
          src="../assets/error-exclamation.svg"
          alt="error input"
        />
        <p v-if="v$.campName.$error" class="notvalid">
          {{ v$.campName.$errors[0].$message }}
        </p>
      </div>
      <div class="inputbox">
        <label for="">Price:</label>
        <input
          type="text"
          v-model="state.campPrice"
          placeholder="$0.00"
          :class="{ error: v$.campPrice.$error }"
        />
        <img
          v-if="v$.campPrice.$error"
          class="error-img"
          src="../assets/error-exclamation.svg"
          alt="error input"
        />
        <p v-if="v$.campPrice.$error" class="notvalid">
          {{ v$.campPrice.$errors[0].$message }}
        </p>
      </div>
      <div class="inputbox">
        <label for="">ImageURL: </label>
        <input
          type="text"
          v-model="state.campImageurl"
          :class="{ error: v$.campImageurl.$error }"
        />
        <img
          v-if="v$.campImageurl.$error"
          class="error-img"
          src="../assets/error-exclamation.svg"
          alt="error input"
        />
        <p v-if="v$.campImageurl.$error" class="notvalid">
          {{ v$.campImageurl.$errors[0].$message }}
        </p>
      </div>
      <div class="inputbox">
        <label for="">Description:</label>
        <textarea
          cols="30"
          rows="10"
          v-model="state.campDescription"
          :class="{ error: v$.campDescription.$error }"
        ></textarea>
        <img
          v-if="v$.campDescription.$error"
          class="error-img"
          src="../assets/error-exclamation.svg"
          alt="error input"
        />
        <p v-if="v$.campDescription.$error" class="notvalid">
          {{ v$.campDescription.$errors[0].$message }}
        </p>
      </div>
      <div class="inputbox">
        <label for="">Location:</label>
        <input
          type="text"
          v-model="state.campLocation"
          :class="{ error: v$.campLocation.$error }"
        />
        <img
          v-if="v$.campLocation.$error"
          class="error-img"
          src="../assets/error-exclamation.svg"
          alt="error input"
        />
        <p v-if="v$.campLocation.$error" class="notvalid">
          {{ v$.campLocation.$errors[0].$message }}
        </p>
      </div>

      <formSubmitButton :showText="'Create'" />
    </form>
  </div>
</template>
<script>
import backButton from "../components/backButton.vue";
import formSubmitButton from "../components/formSubmitButton.vue";
import { reactive, computed } from "vue";
import useValidate from "@vuelidate/core";
import {
  required,
  minLength,
  numeric,
  url,
  helpers,
} from "@vuelidate/validators";
import axios from "axios";
export default {
  setup() {
    const state = reactive({
      campName: "",
      campPrice: "",
      campImageurl: "",
      campDescription: "",
      campLocation: "",
    });

    const rules = computed(() => {
      return {
        campName: { required, minLength: minLength(6) },
        campPrice: { required, numeric },
        campImageurl: { required, url },
        campDescription: { required, minLength: minLength(6) },
        campLocation: { required, minLength: minLength(6) },
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
    backButton,
  },
  methods: {
    async formsubmitHandler() {
      await this.v$.$validate();
      if (!this.v$.$error) {
        this.createCampHandler();
      } else {
        alert("Failed to create!!");
      }
    },

    createCampHandler() {
      axios
        .post("http://localhost:3000/campgrounds/create", {
          title: this.state.campName,
          price: this.state.campPrice,
          image: this.state.campImageurl,
          description: this.state.campDescription,
          location: this.state.campLocation,
        })
        .then((res) => {
          this.$router.push("/campgrounds");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goback() {
      this.$router.go(-1);
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
.create-from {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: 500px;
  height: 600px;
  padding: 2.5rem 1rem 1rem 1rem;
  border: 1px var(--primary-btn-clr) solid;
}
.notvalid {
  color: var(--primary-notvalid-clr);
}
.error {
  border: 1px var(--primary-notvalid-clr) solid;
}
.goback {
  position: absolute;
  top: 0;
  left: 0;
  margin: 1rem;
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
  display: flex;
  flex-direction: column;
  position: relative;
}
.error-img {
  position: absolute;
  right: 0.5rem;
  top: 1.8rem;
  width: 1rem;
}
</style>
