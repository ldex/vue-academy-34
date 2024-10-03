<script setup>

</script>

<template>
  <div id="app">
    <h1>Vue Store</h1>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/products">Products</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
    <hr />
    <footer>Copyright Vue Academy 2024</footer>
  </div>
</template>

<style scoped></style>
