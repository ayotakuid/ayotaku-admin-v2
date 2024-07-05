<script setup>
  import { ref, watchEffect } from 'vue';
  import { toast } from 'vue-sonner';
  import Fetching from '../../utils/handler-fetching';

  const props = defineProps(['tempData', 'token']);
  const emitData = defineEmits(['updateListData']);
  const data = ref();
  const tempUuid = ref(null);
  const selectedRole = ref(null);
  const tokenAyotaku = ref();
  const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

  const checkingRole = [
    { id: 1, role: 'admin' },
    { id: 2, role: 'user' },
  ];

  watchEffect(() => {
    selectedRole.value = props.tempData?.role;
    data.value = props.tempData;
    tokenAyotaku.value = props.token;
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

  const handlerConfirmEdit = async (nameMAL) => {
    const token = tokenAyotaku.value;
    const data = {
      name_mal: nameMAL,
      role: selectedRole.value,
    }
    const responseFetchingEdit = await Fetching.handlerFetchingEditRoleUser(token, data);

    if (responseFetchingEdit.status) {
      if (responseFetchingEdit.status === 'fail') {
        toast.error(responseFetchingEdit.message);
        return;
      }

      if (responseFetchingEdit.status === 'success') {
        try {
          toast.promise((promise), {
            loading: 'Loading...',
            success: () => {
              emitData('updateListData', responseFetchingEdit.data);
              tempUuid.value = null;
              selectedRole.value = responseFetchingEdit?.data?.role;
              return 'Berhasil edit role users!';
            },
            error: 'ERROR',
          });
          return;
        } catch (err) {
          console.error(err);
          throw err;
        }
      }
    }
  }
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
      @click="handlerConfirmEdit(data?.name_mal)"
    >
      <i class="fa-solid fa-check fs-4"></i>
    </button>
    <button 
      class="btn btn-secondary btn-sm btn-icon my-2 mx-2"
      @click="handleCancel"
    >
      <i class="fa-solid fa-xmark fs-4"></i>
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
