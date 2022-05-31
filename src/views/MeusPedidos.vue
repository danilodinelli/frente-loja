<template>
  <main>
      <h2>Meus Pedidos</h2>
      <div class="row">
          <div class="col-md-12">
              <table class="table table-striped">
                    <thead>
                        <th><strong>Pedido</strong></th>
                        <th><strong>Data</strong></th>
                        <th><strong>Nome</strong></th>
                        <th><strong>Forma de Pagamento</strong></th>
                        <th><strong>Total</strong></th>
                        <th><strong>Detalhes</strong></th>
                    </thead>
                    <tbody>
                        <tr v-for="item in pedidos" :key="item.order_id">
                            <td>{{ item.order_id }}</td>
                            <td>{{ item.date_order}}</td>
                            <td>{{ item.customer_name }}</td>
                            <td>{{ item.payment_name }}</td>
                            <td>R$ {{ item.total_order }}</td>
                            <td>                             
                            </td>
                        </tr>
                    </tbody>
              </table>
          </div>
      </div>
  </main>
</template>

<script>
  export default {
    name: 'MeusPedidos',
    data() {
        return {
            pedidos: null,
        }
    },
    methods: {
        async getPedidos() {
            const req = await fetch("http://localhost:8000/api/order/list");
            const data = await req.json();
        
            this.pedidos = data;
        }
    },
    mounted() {
        this.getPedidos();
    }
  }
</script>

<style scoped>
table tr td {
    padding: 0 10px;
}
</style>