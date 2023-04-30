<template>
  <div class="wrapper">
    <div class="goback">
      <backButton />
    </div>
    <form
      class="form-edit"
      action="/campgrounds"
      method="PUT"
      @submit.prevent="formsubmitHandler"
    >
      <div class="header">Edit form</div>
      <div class="inputbox">
        <label for="">Name:</label>
        <input
          type="text"
          v-model="state.editcampName"
          :class="{ error: v$.editcampName.$error }"
        />
        <img
          v-if="v$.editcampName.$error"
          class="error-img"
          src="../assets/error-exclamation.svg"
          alt="error input"
        />
        <p v-if="v$.editcampName.$error" class="notvalid">
          {{ v$.editcampName.$errors[0].$message }}
        </p>
      </div>

      <div class="inputbox">
        <label for="">Price:</label>
        <input
          type="text"
          v-model="state.editcampPrice"
          :class="{ error: v$.editcampPrice.$error }"
        />
        <img
          v-if="v$.editcampPrice.$error"
          class="error-img"
          src="../assets/error-exclamation.svg"
          alt="error input"
        />
        <p v-if="v$.editcampPrice.$error" class="notvalid">
          {{ v$.editcampPrice.$errors[0].$message }}
        </p>
      </div>

      <div class="inputbox">
        <label for="">ImageURL: </label>
        <input
          type="text"
          v-model="state.editcampImageurl"
          :class="{ error: v$.editcampImageurl.$error }"
        />
        <img
          v-if="v$.editcampImageurl.$error"
          class="error-img"
          src="../assets/error-exclamation.svg"
          alt="error input"
        />
        <p v-if="v$.editcampImageurl.$error" class="notvalid">
          {{ v$.editcampImageurl.$errors[0].$message }}
        </p>
      </div>

      <div class="inputbox">
        <label for="">Description:</label>
        <textarea
          cols="30"
          rows="10"
          v-model="state.editcampDescription"
          :class="{ error: v$.editcampDescription.$error }"
        ></textarea>
        <img
          v-if="v$.editcampDescription.$error"
          class="error-img"
          src="../assets/error-exclamation.svg"
          alt="error input"
        />
        <p v-if="v$.editcampDescription.$error" class="notvalid">
          {{ v$.editcampDescription.$errors[0].$message }}
        </p>
      </div>

      <div class="inputbox">
        <label for="">Location:</label>
        <input
          type="text"
          v-model="state.editcampLocation"
          :class="{ error: v$.editcampLocation.$error }"
        />
        <img
          v-if="v$.editcampLocation.$error"
          class="error-img"
          src="../assets/error-exclamation.svg"
          alt="error input"
        />
        <p v-if="v$.editcampLocation.$error" class="notvalid">
          {{ v$.editcampLocation.$errors[0].$message }}
        </p>
      </div>

      <formSubmitButton :showText="'Submit'" />
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
      editcampName: "",
      editcampPrice: "",
      editcampImageurl: "",
      editcampDescription: "",
      editcampLocation: "",
    });

    const rules = computed(() => {
      return {
        editcampName: { required, minLength: minLength(6) },
        editcampPrice: { required, numeric },
        editcampImageurl: { required, url },
        editcampDescription: { required, minLength: minLength(6) },
        editcampLocation: { required, minLength: minLength(6) },
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
        this.editformHandler();
      } else {
        alert("Failed to edit!!");
      }
    },
    editformHandler() {
      axios
        .put(
          `http://localhost:3000/campgrounds/${this.$route.params.id}`,
          {
            title: this.state.editcampName,
            price: this.state.editcampPrice,
            image: this.state.editcampImageurl,
            description: this.state.editcampDescription,
            location: this.state.editcampLocation,
          },
          {
            headers: {
              Authorization: localStorage.getItem("loginJWToken"),
            },
          }
        )
        .then((res) => {
          this.$router.push("/campgrounds");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    axios
      .get(`http://localhost:3000/campgrounds/${this.$route.params.id}`)
      .then((res) => {
        this.state.editcampName = res.data.title;
        this.state.editcampPrice = res.data.price;
        this.state.editcampImageurl = res.data.image;
        this.state.editcampDescription = res.data.description;
        this.state.editcampLocation = res.data.location;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  created() {
    console.log(this.$route.params.id);
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
.form-edit {
  width: 500px;
  height: 620px;
  position: relative;
  padding: 2.5rem 1rem 1rem 1rem;
  border: 1px var(--primary-btn-clr) solid;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 0.5rem;
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
.notvalid {
  color: var(--primary-notvalid-clr);
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
.error {
  border: 1px var(--primary-notvalid-clr) solid;
}
</style>
