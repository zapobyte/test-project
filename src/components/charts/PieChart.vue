<template>
  <div v-show="getUsers.length > 0">
    <canvas id="canvas" />
  </div>
  <p v-if="getUsers.length === 0">
    No data to generate chart.
  </p>
</template>

<script>
import { onMounted, watch, toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import { Chart } from 'chart.js/auto';
import { useMainStore } from '../../stores';

export default {
  name: 'PieChart',
  props: {
    chartOptions: {
      type: Object,
      required: true,
    },
    chartTitle: {
      type: String,
      default: 'Chart Title',
    },
    legendPosition: {
      type: String,
      default: 'top',
      validator(value) {
        return ['top', 'bottom', 'left', 'right', 'chartArea'].includes(value);
      },
    },
  },
  setup(props) {
    let chart = null;
    const store = useMainStore();
    const { getUsers } = storeToRefs(store);
    const propRefs = toRefs(props);

    watch(propRefs.chartOptions.value, () => {
      chart.update();
    });

    onMounted(() => {
      const canvas = document.getElementById('canvas');
      chart = new Chart(canvas, {
        type: 'pie',
        data: propRefs.chartOptions.value,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: props.legendPosition,
            },
            title: {
              display: true,
              text: props.chartTitle,
            },
          },
        },
      });
    });

    return {
      propRefs,
      getUsers,
      chart,
    };
  },
};
</script>

<style lang="scss" scoped></style>
