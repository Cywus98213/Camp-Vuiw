<template>
  <div class="campMenu-btn" :class="{ expanded: istoggle }">
    <div class="svg-wrapper">
      <div class="toggleMenu" v-if="istoggle">
        <RouterLink :to="{ name: 'campEdit' }"><editButton /></RouterLink>
        <deleteButton @click="$emit('delete')" />
      </div>
      <svg
        v-if="!istoggle"
        @click="toggleMenu"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-list menu-icon"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
        />
      </svg>
      <svg
        v-else
        @click="toggleMenu"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x-lg menu-icon"
        viewBox="0 0 16 16"
      >
        <path
          d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
        />
      </svg>
    </div>
  </div>
</template>
<script>
import editButton from "./editButton.vue";
import deleteButton from "./deleteButton.vue";
import { RouterLink } from "vue-router";
import DeleteModal from "./deleteModal.vue";
export default {
  components: {
    deleteButton,
    editButton,
    DeleteModal,
  },
  data() {
    return {
      istoggle: false,
    };
  },
  methods: {
    toggleMenu() {
      this.istoggle = !this.istoggle;
    },
  },
};
</script>
<style scoped>
.campMenu-btn {
  position: absolute;
  top: 0;
  right: 0;
  filter: grayscale(1) opacity(0.6);
  transition: all 0.3s ease;
}
.campMenu-btn:hover {
  filter: grayscale(0) opacity(1);
}

.svg-wrapper {
  margin: 1rem;
  padding: 0.4rem;
  display: flex;
  gap: 0.5rem;
  background-color: var(--secondary-font-clr);
  transition: all 0.3s ease;
}

.menu-icon {
  width: 2rem;
  height: auto;
  cursor: pointer;
}

.toggleMenu {
  display: flex;
  gap: 0.5rem;
}
</style>
