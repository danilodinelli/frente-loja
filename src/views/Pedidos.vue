
<template>
  <main>
      <h2>Área de Pedidos</h2>
      <FormPedido />
  </main>
</template>

<script>
import FormPedido from '../components/FormPedido.vue'
  export default {
    name: 'Pedidos',
    components: {FormPedido}
  }
</script>