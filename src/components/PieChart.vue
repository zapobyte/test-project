<template>
  <div v-show="users.length > 0">
    <canvas id="canvas"></canvas>
  </div>
  <p v-if="users.length === 0" >No data to generate chart.</p>
</template>

<script>
import { onMounted, watch, ref } from "vue";
import { Chart } from "chart.js/auto";
import { useMainStore } from "../stores";
export default {
  name: "PieChart",
  props: {
    chartOptions:{
      type: Object,
      required: true
    },
  },
  setup(props) {
    let chart = null;
    const store = useMainStore();
    const users = ref(store.getUsers);
    watch(users.value,(n,o)=>{
      if(n[n.length - 1].cake.size === 'small') {
        chart.data.datasets[0].data[0] +=1;
      } else {
        chart.data.datasets[0].data[1] +=1;
      }
      chart.update();
    })
    onMounted(() => {
      const canvas = document.getElementById("canvas");
      chart = new Chart(canvas, {
        type: "pie",
        data: props.chartOptions,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Cake Pie Chart'
            }
          }
        },
      });
    });

    return {
      users
    };
  },
};
</script>

<style lang="scss" scoped></style>
