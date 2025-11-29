<script setup>
import trangchu from "./components/trangchu.vue";
import navbar from "./components/narbar.vue";
import footerClient from "./components/footer.vue";
</script>

<template>
  <navbar />
  <router-view></router-view>
  <footerClient />
</template>
