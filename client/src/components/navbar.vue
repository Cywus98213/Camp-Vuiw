<template>
  <div class="nav-wrapper">
    <div class="Logo">
      <p @click="goHome" class="bold">
        CampVuiw <span class="regular">Vue.js verison</span>
      </p>
    </div>
    <div class="mobile-nav-menu" v-show="isMobile">
      <img
        v-if="!menuOpen"
        @click="toggleMobileNav"
        class="menu-icon"
        src="../assets/MobileMenu.svg"
        alt="Menu"
      />
      <img
        v-else
        class="menu-icon"
        @click="toggleMobileNav"
        src="../assets/closeMenu.svg"
        alt="Close the mobile menu"
      />
    </div>
    <ul class="nav-links" v-show="!isMobile">
      <RouterLink class="link" :to="{ name: 'home' }">Home</RouterLink>
      <RouterLink class="link" :to="{ name: 'campgrounds' }"
        >Campgrounds</RouterLink
      >
      <RouterLink class="link" v-if="!IsLoggedIn" :to="{ name: 'register' }"
        >Register</RouterLink
      >
      <RouterLink class="link" v-if="!IsLoggedIn" :to="{ name: 'login' }"
        >Login</RouterLink
      >
      <RouterLink
        class="link"
        v-if="IsLoggedIn"
        @click="logout"
        :to="{ name: 'home' }"
        >Logout</RouterLink
      >
    </ul>
  </div>
  <transition name="fade">
    <div class="mobile-nav" v-show="mobileNav">
      <div class="mobile-nav-links">
        <RouterLink class="mobile-link" :to="{ name: 'home' }">Home</RouterLink>
        <RouterLink class="mobile-link" :to="{ name: 'campgrounds' }"
          >Campgrounds</RouterLink
        >
        <RouterLink
          class="mobile-link"
          v-if="!IsLoggedIn"
          :to="{ name: 'register' }"
          >Register</RouterLink
        >
        <RouterLink
          class="mobile-link"
          v-if="!IsLoggedIn"
          :to="{ name: 'login' }"
          >Login</RouterLink
        >
        <RouterLink
          class="mobile-link"
          v-if="IsLoggedIn"
          @click="logout"
          :to="{ name: 'home' }"
          >Logout</RouterLink
        >
      </div>
    </div>
  </transition>
</template>
<script>
import { RouterLink } from "vue-router";
export default {
  data() {
    return {
      isMobile: false,
      windowSize: null,
      mobileNav: false,
      menuOpen: false,
    };
  },
  methods: {
    checkWindowSize() {
      this.windowSize = window.innerWidth;
      if (this.windowSize < 767) {
        return (this.isMobile = true);
      }
      (this.menuOpen = false), (this.isMobile = false);
      this.mobileNav = false;
    },
    toggleMobileNav() {
      this.menuOpen = !this.menuOpen;
      this.mobileNav = !this.mobileNav;
    },
    goHome() {
      this.$router.push("/");
    },
    logout() {
      localStorage.removeItem("loginJWToken");
      localStorage.removeItem("userId");
      this.$store.dispatch("logout");
    },
  },
  computed: {
    IsLoggedIn() {
      return this.$store.getters.IsLoggedIn;
    },
  },

  created() {
    window.addEventListener("resize", this.checkWindowSize);
    this.checkWindowSize();
  },
};
</script>
<style scoped>
.nav-wrapper {
  display: flex;
  align-items: center;
  min-height: 3rem;
  width: 100%;
  background-color: var(--primary-bg-clr);
}
.Logo {
  margin: 1rem;
  cursor: pointer;
}
.Logo p {
  color: var(--primary-font-clr);
  font-size: 1.1rem;
}

.Logo span {
  font-size: 10px;
}

.nav-links {
  margin-left: auto;
}

.link {
  padding: 0.2rem 0;
  margin: 1rem;
  text-decoration: none;
  color: var(--primary-font-clr);
  position: relative;
}
.link::before {
  content: "";
  height: 2px;
  width: 0%;
  background-color: var(--primary-font-clr);
  position: absolute;
  bottom: 0;
  left: 0;
  transform-origin: left;
  transition: all 0.3s ease-in-out;
}

.link:hover::before {
  width: 100%;
}
.mobile-nav-menu {
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.menu-icon {
  margin: 0 1rem;
  min-width: 2.6rem;
  min-height: auto;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.menu-icon:hover {
  background-color: var(--menu-hover-bg);
}

.mobile-nav {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  min-height: 100vh;
  background-color: var(--primary-mobile-nav-clr);
}
.mobile-nav-links {
  margin: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.mobile-link {
  padding: 0.2rem 0;
  text-decoration: none;
  color: var(--secondary-font-clr);
  position: relative;
}
.mobile-link::before {
  content: "";
  height: 2px;
  width: 0%;
  background-color: var(--secondary-font-clr);
  position: absolute;
  bottom: 0;
  left: 0;
  transform-origin: left;
  transition: all 0.3s ease-in-out;
}

.mobile-link:hover::before {
  width: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
