
<template>
  <div class="row">
    <Menu />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>


<script>

</script>


<script>
  import Menu from './components/Menu.vue'
  export default {
  components: {
    Menu
  }
  }
</script>

<style>
@import '@/assets/base.css';


</style>
