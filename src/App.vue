<template>
  <div id="app">
    <the-header></the-header>
    <div class="body">
      <router-view v-slot="{ Component }">
        <transition name="moveUp" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </div>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheFooter from "./components/layouts/TheFooter.vue";
import TheHeader from "./components/layouts/TheHeader.vue";
export default {
  components: { TheHeader, TheFooter },
};
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.body {
  min-height: calc(91vh - 125px);
}

/*transition animations*/
.moveUp-enter-active {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.moveUp-leave-active {
  animation: moveUp 0.4s ease-in;
}

@keyframes moveUp {
  0% {
    transform: translatey(0px);
  }
  100% {
    transform: translateY(80px);
  }
}
</style>
