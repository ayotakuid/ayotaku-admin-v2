<script setup>
import { onMounted, ref } from 'vue';
import Fetching from '../../utils/handler-fetching';
import FormatDate from '../../utils/handler-date';

const dataSchedule = ref(null);
const weeklySchedule = ref({});
const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

onMounted(async () => {
  const responseSchedule = await Fetching.handlerFethcingScheduleWeek();
  dataSchedule.value = responseSchedule
  days.forEach((day) => {
    weeklySchedule.value[day] = dataSchedule.value[day];
  })
})
</script>

<template>
  <div class="container">
    <div class="row">

      <div 
        class="col-md-6"
        v-for="day in days"
        :key="day"
      >
        <div class="separator separator-content border-dark my-15">
          <span class="fw-bold fs-4">
            {{ day }}
          </span>
        </div>

        <div 
          class="row my-1"
          v-for="anime in weeklySchedule[day]"
          :key="anime.title"
        >
          <div class="col-md-12">
            <div class="bg-dark text-light rounded p-3 position-relative fs-5">
              {{ anime.title }}
              <div>
                <span class="badge badge-light my-1 text-dark">
                  Last update: {{ FormatDate.formatDateSchedule(anime?.episodeDate) }}
                </span>
                <span class="badge badge-warning mx-1 text-dark">
                  Status: {{ anime?.status }}
                </span>
                <span class="badge badge-success text-dark">
                  Episode: {{ anime?.episodeNumber }} / {{ anime?.episodes ?? 'unknown' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>