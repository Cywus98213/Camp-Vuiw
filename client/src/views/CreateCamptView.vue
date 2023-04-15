<template>
  <div class="createform">
    <h1>Create form:</h1>
    <form
      action="/campgrounds"
      method="POST"
      @submit.prevent="formsubmitHandler"
    >
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

      <button type="submit">Submit</button>
      <button @click.prevent="goback">Back</button>
    </form>
  </div>
</template>
<script>
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
  methods: {
    formsubmitHandler() {
      this.v$.$validate();
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
.createform {
  max-width: 40rem;
  padding: 1rem;
  margin: auto;
}
form {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.notvalid {
  color: var(--primary-notvalid-clr);
}
.error {
  border: 1px var(--primary-notvalid-clr) solid;
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
