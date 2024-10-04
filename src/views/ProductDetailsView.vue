<template>
  <div>
    <section v-if="errorMessage">
      {{ errorMessage }}
    </section>
    <section v-else>
      <div v-if="isLoading">
        <div class="loader">Loading products...</div>
      </div>
      <div v-else>
        <h2>{{ product.name }}</h2>
        <img :src="product.imageUrl ? product.imageUrl : 'https://picsum.photos/250/150'" width="200"
          style="float:right" />
        <h3>{{ product.description }}</h3>
        <p>Price: {{ product.price }}</p>
        <p>Fixed price? {{ product.fixedPrice }}</p>
        <p>Discontinued? {{ product.discontinued }}</p>
        <p>Modified date: {{ product.modifiedDate }}</p>
        <p>
          <button onclick="document.getElementById('confirm').showModal()"
          :disabled="!userStore.isLoggedIn"
          >Delete Product</button>
          <dialog id=confirm>
            <p>Are you sure to delete this product ?</p>
            <div class="right">
              <button @click="deleteProduct(product)" autofocus>Ok</button>
              &nbsp;
              <button onclick="document.getElementById('confirm').close()">Cancel</button>
            </div>
          </dialog>
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/product';
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()
const router = useRouter()
const productStore = useProductStore()

const props = defineProps(
  {
    id: {
      type: Number,
      required: true
    }
  }
)

const product = computed(() => productStore.product);
const isLoading = computed(() => productStore.isLoading);
const errorMessage = computed(() => productStore.errorMessage);

productStore.fetchProduct(props.id)

function deleteProduct(product) {
  productStore.deleteProduct(product)
    .then(
      () => router.push({ name: 'products' })
    )
    .catch(
      () => router.push({ name: 'error' })
    )
}
</script>

<style lang="scss" scoped></style>