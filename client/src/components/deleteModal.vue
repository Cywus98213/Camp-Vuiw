<template>
  <div class="modal-wrapper">
    <div class="blocker"></div>
    <Modalform @closeModal="closeModalHandle" :campName="campName" />
  </div>
</template>
<script>
import Modalform from "./modalform.vue";

export default {
  components: { Modalform },
  methods: {
    closeModalHandle() {
      this.$emit("closeModal");
    },
  },
  props: ["campName"],
};
</script>
<style scoped>
.modal-wrapper {
  z-index: 3;
  min-height: 100%;
  min-width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  place-content: center;
}
.blocker {
  z-index: 4;
  height: 100%;
  width: 100%;
  position: fixed;
  background-color: rgb(54, 53, 53);
  opacity: 0.5;
  top: 0;
  left: 0;
}
</style>
