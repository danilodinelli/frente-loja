<template>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
            <label class="form-label">Cliente</label>
            <select class="form-select" aria-label="Escolha o cliente" v-model="customer_id">
                <option v-for="customer in customers" :key="customer.id" :value="customer.id">{{ customer.name }}</option>
            </select>
        </div>
        <div class="form-group">
            <label class="form-label">Escolha os Produtos desejado</label>
            <select class="form-select" aria-label="Escolha o produto" @change="selectProduct($event)">
                <option v-for="product in products" :key="product.id" :value="product.id">{{ product.name }}</option>
            </select>
        </div>
      </div>
      <div class="col-md-6">
        <div class="col-md-12">
          <label class="form-label">Meus produtos</label>
          <table class="table tbOrder">
            <thead align="left">
              <th><strong>Qtd.</strong></th>
              <th><strong>Produto</strong></th>
              <th><strong>Preço</strong></th>
              <th><strong>SubTotal</strong></th>
            </thead>
            <tr v-for="(prod, index) in products_select" :key="prod.id">
                <td><input type="number" class="form-control inpQuantity"  v-model.Number="prod.quantity" /></td>
                <td><p>{{prod.name}}</p></td>
                <td><p>{{prod.price}}</p></td>
                <td><input class="form-control inpQuantity" v-model.Number="subtotalRow[index]" readonly size="10" /></td>
                <td><button class="btn btn-sm" @click="removeRow(index)">X</button></td>
            </tr>
            <tr>
                <td colspan="3"><strong>Total</strong></td>
                <td>{{ formatPrice(total) }}</td>
            </tr>
          </table>
        </div>
        <div class="form-group">
            <label class="form-label">Forma de Pagamento</label>
            <select class="form-select" aria-label="Escolha a forma de pagamento" v-model="payment_id">
                <option v-for="payment in payments" :key="payment.id" :value="payment.id">{{ payment.name }}</option>
            </select>
        </div>
        <div class="d-grid gap-2 btnFinaliza">
            <button type="button" class="btn btn-primary" @click="createdOrder">Finalizar Pedido</button>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'FormPedido',
    data() {
      return {
        customer_id: null,
        payment_id: null,
        customers: null,
        products: null,
        payments: null,
        products_select: [],
        total_price: 0,
        order_id: null,
        quantity: [],
      }
    },
    computed: {
        subtotalRow() {
          return this.products_select.map((item) => {
            return Number(item.quantity * item.price)
          });
        },
        total() {
          return this.products_select.reduce((total, item) => {
            return total + item.quantity * item.price;
          }, 0);
        }
    },
    methods: {
      async getCustomer() {
        const req = await fetch("http://localhost:8000/api/customer");
        const data = await req.json();
        this.customers = data;
      },
      async getProducts() {
        const req = await fetch("http://localhost:8000/api/product");
        const data = await req.json();
        this.products = data;
      },
      async getIdProduct(id) {
        const req = await fetch("http://localhost:8000/api/product/"+id);
        const data = await req.json();

        return data;
      },
      async getPayment() {
        const req = await fetch("http://localhost:8000/api/payment");
        const data = await req.json();
        this.payments = data;
      },
      createdOrder(event) {
          var itensSelect = null;
          itensSelect = JSON.parse(JSON.stringify(this.products_select));

          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              "customer_id": this.customer_id,
              "payment_id": this.payment_id,
              "total_order": this.total,
              "itens": itensSelect
            })
          };
          
          fetch('http://localhost:8000/api/order/add', requestOptions)
            .then(async response => {
              const data = await response.json();

              if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
              }
              this.open()
            })
            .catch(error => {
              this.errorMessage = error;
              console.error('Ocorreu na criação do pedido!', error);
            });
            
      },
      selectProduct(event){
          if(this.products_select.indexOf(event.target.value) == -1){
            this.getIdProduct(event.target.value).then(data => {

                //inicia a quantidade sempre com 1              
                data['quantity'] = 1;
                
                //Adiciona o produto no array
                this.products_select.push(data);
            });
          }
      },
      formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      open() {
        this.$toast.open({
          message: "Pedido criado com sucesso.",
          type: "success",
          duration: 5000,
          dismissible: true
        })
      },
      removeRow(index) {
            this.products_select.splice(index, 1);
        }
    },
    mounted() {
      this.getCustomer();
      this.getProducts();
      this.getPayment();
    }
}
</script>
<style scoped>
  .inpQuantity {
    width: 60px;
  }

  .tbOrder {
    background: #fbfbfb;
  }
  .btnFinaliza {
    margin: 20px 0;
  }
</style>