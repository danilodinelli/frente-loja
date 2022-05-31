<template>
    <header class="d-flex align-items-center pb-3 mb-5 border-bottom">
        <div id="nav">
          <router-link to="/">Home</router-link>
          <router-link to="/pedidos">Fazer Pedidos</router-link>
          <router-link to="/meus-pedidos">Meus Pedidos</router-link>
        </div>
    </header>
</template>

<script>
export default {
  name: "Menu",
  
}
</script>

<style scoped>
  #nav {
    padding: 15px 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  #nav #logo-url {
    margin: auto;
    margin-left: 0;
  }
  #logo {
    width: 40px;
    height: 40px;
  }
  #nav a {
    color: #293499;
    text-decoration: none;
    margin: 12px;
    transition: .5s;
  }
  #nav a:hover {
    color: rgb(100, 105, 173);
    text-decoration: underline;
  }
</style>