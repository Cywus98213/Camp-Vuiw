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
      enctype="multipart/form-data"
    >
      <div class="header">Create form</div>
      <div class="inputbox">
        <label for="">Name:</label>
        <input
          type="text"
          v-model="state.campName"
          :class="{ error: v$.campName.$error }"
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

        <p v-if="v$.campPrice.$error" class="notvalid">
          {{ v$.campPrice.$errors[0].$message }}
        </p>
      </div>
      <div class="inputbox">
        <label for="">Image file: </label>
        <input type="file" v-on:change="onFileChange" multiple />
        <!-- <input
          type="text"
          v-model="state.campImageurl"
          :class="{ error: v$.campImageurl.$error }"
        /> -->

        <p v-if="!haveimagefile" class="notvalid">
          {{ "Please at least choose 1 image." }}
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
import { required, minLength, numeric, url } from "@vuelidate/validators";
import axios from "axios";
export default {
  data() {
    return {
      campImagefile: null,
      haveimagefile: false,
    };
  },
  setup() {
    const state = reactive({
      campName: "",
      campPrice: "",
      campDescription: "",
      campLocation: "",
    });

    const rules = computed(() => {
      return {
        campName: { required, minLength: minLength(6) },
        campPrice: { required, numeric },
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
    formsubmitHandler() {
      this.v$.$validate();
      if (this.campImagefile) {
        if (!this.v$.$error) {
          this.createCampHandler();
        }
      }
    },

    createCampHandler() {
      const formData = new FormData();
      formData.append("title", this.state.campName);
      formData.append("price", this.state.campPrice);
      formData.append("creator", localStorage.getItem("userId"));
      formData.append("description", this.state.campDescription);
      formData.append("location", this.state.campLocation);

      for (let i = 0; i < this.campImagefile.length; i++) {
        formData.append("images", this.campImagefile[i]);
      }

      axios
        .post("http://localhost:3000/campgrounds/create", formData, {
          headers: {
            Authorization: localStorage.getItem("loginJWToken"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.$router.push("/campgrounds");
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 401) {
            localStorage.removeItem("loginJWToken");
            localStorage.removeItem("userId");
            this.$store.dispatch("logout");
            this.$router.push("/login");
          }
        });
    },
    onFileChange(e) {
      this.campImagefile = e.target.files;
      this.haveimagefile = true;
      console.log(this.campImagefile);
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
  max-height: 720px;
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
