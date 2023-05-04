<template>
  <div class="confirmbox-wrapper">
    <div class="confirmbox-header">
      <h1>Delete {{ campName }}</h1>
      <img
        src="../assets/closeMenu.svg"
        alt="close the modal"
        @click="$emit('closeModal')"
      />
    </div>
    <div class="ReadBox-body" v-if="preDelete">
      <div class="alert">
        <img src="../assets/alerticon.svg" alt="alert message" />
        <h1>Unexpected bad things will happen if you don’t read this!</h1>
      </div>
      <div class="reason">
        This will permanently delete the images, reviews that related to this
        Campground.
      </div>
    </div>
    <div class="confirmbox-body" v-if="confirmDelete">
      <label for="confirminput"
        >To confirm, type "{{ campName }}" in the box below</label
      >
      <input
        id="confirminput"
        class="confirm-Input"
        type="text"
        v-model="inputString"
      />
    </div>
    <div class="ReadBox-footer" v-if="preDelete">
      <button @click="understandHandle">
        I have read and understand these effects.
      </button>
    </div>
    <div class="confirmbox-footer" v-if="confirmDelete">
      <button
        class="deletebutton"
        :disabled="!isMatch"
        :class="{ match: isMatch, notmatch: !isMatch }"
        @click="deleteCampHandler"
      >
        Delete This Campground
      </button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      preDelete: true,
      confirmDelete: false,
      inputString: "",
      isMatch: false,
    };
  },
  props: ["campName"],
  methods: {
    deleteCampHandler() {
      axios
        .delete(`http://localhost:3000/campgrounds/${this.$route.params.id}`, {
          headers: {
            Authorization: localStorage.getItem("loginJWToken"),
          },
        })
        .then((res) => {
          this.$router.push("/campgrounds");
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.$router.push("/login");
          }
        });
    },
    understandHandle() {
      this.preDelete = false;
      this.confirmDelete = true;
    },
  },
  computed: {
    isMatch() {
      return this.inputString === this.campName ? true : false;
    },
  },
};
</script>
<style scoped>
.confirmbox-wrapper {
  z-index: 999;
  height: 100%;
  width: 90%;
  margin: auto;
  max-width: 1000px;
  border-radius: 1rem;

  background-color: var(--secondary-font-clr);
}
.confirmbox-header {
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: space-between;
  border-bottom: 1px var(--primary-font-clr) solid;
}
.confirmbox-header img {
  cursor: pointer;
}
.alert {
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin: 1rem auto;
  border-radius: 0.3rem;
  padding: 1rem 0.7rem;
  border: 2px var(--alert-border) solid;
  background-color: var(--alert-bg);
}
.alert h1 {
  color: var(--secondary-font-clr);
}
.reason {
  width: 90%;
  margin: 1rem auto;
  font-weight: bold;
}
.ReadBox-footer {
  width: 100%;
  margin: auto;
  padding: 1rem;
  border-top: 1px var(--primary-font-clr) solid;
}
.ReadBox-footer button {
  margin: auto;
  width: 100%;
  cursor: pointer;
  color: var(--secondary-font-clr);
  background-color: var(--primary-btn-clr);
  border-radius: 0.3rem;
  border: none;
  padding: 0.5rem;
  filter: grayscale(1) opacity(0.7);
  transition: all 0.3s ease;
}
.ReadBox-footer button:hover {
  filter: grayscale(0) opacity(1);
}

.confirmbox-body {
  padding: 1rem;
  width: 100%;
  margin: auto;
}
.confirm-Input {
  width: 100%;
  border: var(--primary-notvalid-clr) solid;
  border-radius: 0.3rem;
}
.confirm-Input:focus {
  border: var(--primary-lightblue) solid;
}
.confirmbox-footer {
  width: 100%;
  padding: 1rem;
}
.deletebutton {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 0.3rem;
}
.notmatch {
  background-color: var(--primary-notvalid-clr);
  color: var(--secondary-font-clr);
  filter: grayscale(1) opacity(0.6);
}
.notmatch:hover {
  cursor: not-allowed;
}

.match {
  background-color: var(--secondary-font-clr);
  color: var(--primary-notvalid-clr);
  border: 1px var(--primary-notvalid-clr) solid;
  transition: all 0.3s ease;
}
.match:hover {
  cursor: pointer;
  background-color: var(--primary-notvalid-clr);
  color: var(--secondary-font-clr);
}
</style>
