<script setup>
  import { ref, watchEffect } from 'vue';
  import { toast } from 'vue-sonner';

  const props = defineProps(['tempData']);
  const data = ref();
  const tempUuid = ref(null);
  const selectedRole = ref(null);

  const checkingRole = [
    { id: 1, role: 'admin' },
    { id: 2, role: 'user' },
  ];

  watchEffect(() => {
    selectedRole.value = props.tempData?.role;
    data.value = props.tempData;
  });

  const handlerOnChange = (event, uuid, role) => {
    if (role !== event.target.value) {
      tempUuid.value = uuid;
      selectedRole.value = event.target.value;
    }

    if (role === event.target.value) {
      tempUuid.value = null;
      selectedRole.value = props.tempData?.role;
    }
  };

  const handleCancel = () => {
    selectedRole.value = props.tempData?.role;
    tempUuid.value = null;
  };
</script>

<template>
  <select 
    v-model="selectedRole" 
    class="form-select" 
    @change="(event) => handlerOnChange(event, data?.uuid, data?.role)"
  >
    <option 
      v-for="role in checkingRole" 
      :key="role.id" 
      :value="role.role"
    >
      {{ role.role }}
    </option>
  </select>
  <div v-if="tempUuid === props.tempData?.uuid" class="text-center button-group">
    <button 
      class="btn btn-success btn-sm btn-icon my-2 mx-2"
    >
      <i class="fa-solid fa-check"></i>
    </button>
    <button 
      class="btn btn-secondary btn-sm btn-icon my-2 mx-2"
      @click="handleCancel"
    >
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>
</template>

<style scoped>
  .form-select {
    width: 100%;
    margin-left: -7px;
    margin-top: 15px;
  }

  .button-group {
    margin-right: 15px;
  }
</style>
