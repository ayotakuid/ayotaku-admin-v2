<script setup>
  import { reactive, ref } from 'vue';
  import ChildComponent from './ChildComponent.vue';

  const count = ref(0);
  const stateText = reactive({
    text: 'Babi'
  });

  const handlerMinus = () => {
    if (count.value === 0) {
      stateText.text = 'Tidak bisa kurang dari 0';
      console.log(stateText.text);
    }

    return count.value--
  }

  const handlerPlus = () => {
    if (count.value === 10) {
      stateText.text = 'Tidak bisa lebih dari 10';
      console.log(stateText.text);
    }

    return count.value++
  }
</script>

<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card bg-light shadow-sm">
          <div class="card-header">
            <h3 class="card-title">
              Counting
            </h3>
            <div class="card-toolbar">
              <button type="button" class="btn btn-sm btn-light-warning mx-2" @click="handlerPlus">
                Add +
              </button>
              <button type="button" class="btn btn-sm btn-light-danger" @click="handlerMinus">
                Minus -
              </button>
            </div>
          </div>

          <div class="card-body" v-if="count < 0">
            {{ stateText.text }}
          </div>
          <div class="card-body" v-else-if="count > 10">
            {{ stateText.text }}
          </div>
          <div class="card-body" v-else>
            {{ count }}
          </div>
          
          <div class="card-footer">
            <h3 class="card-title">
              Footer Counting
            </h3>
          </div>
        </div>
      </div>

      <div class="col-md-12 my-5">
        <child-component :dataInduk="stateText.text"></child-component>
      </div>
    </div>
  </div>
</template>