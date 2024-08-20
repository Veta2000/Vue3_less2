<template>
  <div id="app">
      <ReactiveExample />
  </div>
</template>

<script>
import ReactiveExample from './ReactiveExample.vue';


export default {
  name: 'App',
  components: {
    ReactiveExample,
  }
};
</script>

<style>
#app {
  font-family:  Arial, sans-serif;
  text-align: center;
  color: blue;
  margin-top: 60px;
}
</style>
