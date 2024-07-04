<script setup>
  import { ref, watchEffect } from 'vue';

  const props = defineProps(['propsData']);
  const dataRole = ref();

  watchEffect(() => {
    dataRole.value = props.propsData?.role;
  })
</script>

<template>
  <span
    class="badge mx-1 text-center fs-6"
    :class="{
      'badge-success': dataRole === 'admin',
      'badge-danger': dataRole === 'user'
    }"
  >
    {{ dataRole }}
  </span>
</template>