<!-- <script setup>
// import JSON from './components/JSON.vue'
// import libraryRegistrationForm from './views/homeView.vue'
import Bheader from './components/Bheader.vue'


</script> -->

<!-- <template>
  <div class="main-container">
    <header>
      <Bheader />
    </header> -->

<!-- <main class="main-box"> -->
<!-- <JSON /> -->
<!-- <libraryRegistrationForm /> -->
<!-- <router-view></router-view> -->
<!-- </main>
  </div>
</template> -->

<!-- <style scoped></style> -->

<script>
import Bheader from './components/Bheader.vue';
import countBookapi from './views/countBookapi.vue';

export default {
  name: 'App',
  components: {
    Bheader,
    countBookapi
  },
  computed: {
    showHeader() {
      return this.$route.name !== 'countBookapi';
    }
  }
}
</script>

<template>
  <div class="main-container">
    <header v-if="showHeader">
      <Bheader />
    </header>

    <main class="main-box">
      <router-view></router-view>
    </main>
  </div>
</template>