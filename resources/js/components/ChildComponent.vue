<script setup>
  import { defineProps } from 'vue';
  import InputComponent from './InputComponent.vue';

  const props = defineProps(['dataInduk']);
</script>

<template>
  <div>
    <InputComponent />
  </div>

</template>