<template>
  <div class="card">
    <div class="card-body">
      <form
        ref="birthdayRef"
        class="row g-3 needs-validation align-items-end"
        novalidate
        @submit="submitBirthdayForm"
      >
        <div
          class="col-md-4"
          data-cy="form-name"
        >
          <dynamic-input
            id="name"
            v-model="name"
            label="Name"
            placeholder="Name"
            :valid-feedback="VALID_FEEDBACK_INPUT"
            :error-feedback="ERROR_FEEDBACK_INPUT"
          />
        </div>
        <div
          class="col-md-4"
          data-cy="form-dob"
        >
          <dynamic-input
            v-model="dob"
            label="Date of birth"
            type="date"
            :valid-feedback="VALID_FEEDBACK_INPUT"
            :error-feedback="ERROR_FEEDBACK_INPUT"
          />
        </div>
        <div class="col-4 h-100 text-end">
          <button
            class="btn btn-primary btn-lg add-btn"
            type="submit"
            :class="{ 'mt-2': needsValidation }"
            data-cy="form-btn"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  </div>

  <div class="card my-2">
    <div class="card-body">
      <div class="row">
        <div class="col-12 table-responsive">
          <table class="table  table-hover">
            <thead>
              <tr class="text-start">
                <th scope="col">
                  #
                </th>
                <th scope="col">
                  <i class="bi bi-person" /> Name
                </th>
                <th scope="col">
                  <i class="bi bi-balloon" />Date of birth
                </th>
                <th
                  scope="col"
                  class="th-cake-date"
                  @click="changeOrder"
                >
                  <i class="bi bi-calendar2-check" />  
                  Date of cake 
                  <i class="bi bi-arrow-down-up" />
                </th>
                <th scope="col">
                  <i class="bi bi-gift" /> Size of cake
                </th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody data-cy="table-body">
              <tr
                v-for="user in usersList"
                :key="index"
                class="text-start"
              >
                <th scope="row">
                  {{ user.id }}
                </th>
                <td>{{ user.name }}</td>
                <td>{{ user.dob }}</td>
                <td>{{ user.cake.date }}</td>
                <td>
                  <p class="my-0">
                    {{ user.cake.size }}
                  </p>
                  <p
                    v-if="user.cake.shared"
                    class="my-0 text-muted"
                  >
                    <small>shared with {{ user.cake.shared.name }}</small>
                  </p>
                </td>
                <td class="text-end">
                  <button
                    class="btn btn-danger"
                    @click="removeItem(user)"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <div class="card my-2">
    <div
      class="card-body"
      data-cy="pie-chart"
    >
      <pie-chart
        :chart-options="chartData"
        chart-title="Cakes distribution chart"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import DynamicInput from './dynamicInput/DynamicInput.vue';
import {
  VALID_FEEDBACK_INPUT,
  ERROR_FEEDBACK_INPUT,
} from '../assets/CONSTANTS';
import { useMainStore } from '../stores';

import { birthdayCakeDecider } from './birthday';
import PieChart from './charts/PieChart.vue';
import { pieData } from './charts/data';

export default {
  name: 'BirthdayForm',
  components: { DynamicInput, PieChart },
  setup() {
    // store
    const store = useMainStore();
    const { getUsers } = storeToRefs(store);

    // data
    const name = ref('');
    const dob = ref('');
    const birthdayRef = ref(null);
    const wasValidated = ref(false);
    const orderType = ref(false);
    const chartData = ref(pieData);

    // computed
    const usersList = computed(() => getUsers.value);
    const needsValidation = computed(() => wasValidated.value);

    // methods
    const submitBirthdayForm = (e) => {
      e.preventDefault();
      const form = birthdayRef.value;
      form.classList.add('was-validated');
      form.classList.add('align-items-center');
      if (form.checkValidity()) {
        const cake = birthdayCakeDecider(dob.value);
        const newEntry = {
          id: getUsers.value.length,
          name: name.value,
          dob: dob.value,
          cake,
        };
        store.addUser(newEntry);
        if (newEntry.cake.size.trim() === 'Small') {
          chartData.value.datasets[0].data[0] = chartData.value.datasets[0].data[0] + 1;
        } else {
          chartData.value.datasets[0].data[1] = chartData.value.datasets[0].data[1] + 1;
        }
        form.reset();
        form.classList.remove('was-validated', 'align-items-center');
        getUsers.value.sort((a, b) => {
          const aTime = new Date(a.cake.date);
          const bTime = new Date(b.cake.date);
          return bTime.getTime() - aTime.getTime();
        });
      } else {
        wasValidated.value = true;
      }
    };

    const removeItem = (item) => {
      store.removeUser(item);
      if (item.cake.size.trim() === 'Small') {
        chartData.value.datasets[0].data[0] = chartData.value.datasets[0].data[0] - 1;
      } else {
        chartData.value.datasets[0].data[1] = chartData.value.datasets[0].data[1] - 1;
      }
    };

    const changeOrder = () => {
      getUsers.value.sort((a, b) => {
        const aTime = new Date(a.cake.date);
        const bTime = new Date(b.cake.date);
        if (!orderType.value) {
          return aTime.getTime() - bTime.getTime();
        }
        return bTime.getTime() - aTime.getTime();
      });
      orderType.value = !orderType.value;
    };

    return {
      store,
      chartData,
      birthdayRef,
      needsValidation,
      name,
      dob,
      usersList,
      ERROR_FEEDBACK_INPUT,
      VALID_FEEDBACK_INPUT,
      submitBirthdayForm,
      removeItem,
      changeOrder,
    };
  },
};
</script>

<style scoped lang="scss">
.th-cake-date{
  cursor: pointer;
}
</style>
