<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <ConvertCurrency msg="Welcome to ConvertCurrency App" />
  </div>
</template>

<script>
import ConvertCurrency from "./components/ConvertCurrency";

export default {
  name: "App",
  components: {
    ConvertCurrency,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
