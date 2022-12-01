<template>
  <div class="card">
    <div class="card-body">
      <form
        class="row g-3 needs-validation align-items-end"
        novalidate
        ref="birthdayRef"
        @submit="submitBirthdayForm"
      >
        <div class="col-md-4" data-cy="form-name">
          <dynamic-input
            id="name"
            label="Name"
            placeholder="Name"
            v-model="name"
            :validFeedback="VALID_FEEDBACK_INPUT"
            :errorFeedback="ERROR_FEEDBACK_INPUT"
          ></dynamic-input>
        </div>
        <div class="col-md-4" data-cy="form-dob">
          <dynamic-input
            label="Date of birth"
            v-model="dob"
            type="date"
            :validFeedback="VALID_FEEDBACK_INPUT"
            :errorFeedback="ERROR_FEEDBACK_INPUT"
          ></dynamic-input>
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
        <div class="col-12">
          <table class="table">
            <thead>
              <tr class="text-start">
                <th scope="col">#</th>
                <th scope="col"><i class="bi bi-person"></i> Name</th>
                <th scope="col"><i class="bi bi-balloon"></i>Date of birth</th>
                <th scope="col"><i class="bi bi-calendar2-check"></i>  Date of cake</th>
                <th scope="col"><i class="bi bi-gift"></i> Size of cake</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody data-cy="table-body">
              <tr
                v-for="(user, index) in users"
                :key="index"
                class="text-start"
              >
                <th scope="row">{{ index }}</th>
                <td>{{ user.name }}</td>
                <td>{{ user.dob }}</td>
                <td>{{ user.cake.date }}</td>
                <td>{{ user.cake.size }}</td>
                <td class="text-end">
                  <button class="btn btn-danger" @click="removeItem(user)">
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
    <div class="card-body" data-cy="pie-chart">
      <pie-chart :chartOptions="chartData" />
    </div>
  </div>
</template>

<script>
import DynamicInput from "./dynamicInput/DynamicInput.vue";
import { ref } from "vue";
import {
  VALID_FEEDBACK_INPUT,
  ERROR_FEEDBACK_INPUT,
} from "../assets/CONSTANTS";
import { computed } from "vue";
import { useMainStore } from "../stores";

import { birthdayCakeDecider } from "./birthday";
import PieChart from "./PieChart.vue";

export default {
  components: { DynamicInput, PieChart },
  name: "BirthdayForm",
  setup(props, {}) {

    const store = useMainStore();
    // Chart data
    const datasets =  [
      {
        label: "Cakes",
        data: [0,0],
        backgroundColor:[
          "rgb(255, 99, 132)",
          "rgb(22, 22, 22)",
        ],
        hoverOffset: 4,
      },
    ];

    const chartData = ref({
      labels: ["Small cakes", "Big cakes"],
      datasets
    });
    
    // data
    const name = ref("");
    const dob = ref("");
    const birthdayRef = ref(null);
    const wasValidated = ref(false);

    // computed
    const users = computed(() => store.getUsers);
    const needsValidation = computed(() => {
      return wasValidated.value;
    });

    // methods
    const submitBirthdayForm = (e) => {
      e.preventDefault();
      const form = birthdayRef.value;
      form.classList.add("was-validated");
      form.classList.add("align-items-center");
      if (form.checkValidity()) {
        const cake = birthdayCakeDecider(dob.value);
        const data = {
          name: name.value,
          dob: dob.value,
          cake: cake,
        };
        store.addUser(data);
        form.reset();
        form.classList.remove("was-validated", "align-items-center");
      } else {
        wasValidated.value = true;
      }
    };

    const removeItem = (item) => {
      store.removeUser(item);
    };

    return {
      chartData,
      birthdayRef,
      needsValidation,
      name,
      dob,
      users,
      ERROR_FEEDBACK_INPUT,
      VALID_FEEDBACK_INPUT,
      submitBirthdayForm,
      removeItem,
    };
  },
};
</script>

<style scoped lang="scss"></style>
