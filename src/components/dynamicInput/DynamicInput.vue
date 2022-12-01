<template>
  <label :for="id" class="form-label">{{ label }}</label>
  <div class="has-validation">
    <input
      :type="type"
      class="form-control"
      :id="id"
      :aria-describedby="id"
      :required="isRequired"
      :placeholder="placeholder"
      v-model="inputValue"
    />
    <div class="valid-feedback">{{ validFeedback }}</div>
    <div class="invalid-feedback">{{ errorFeedback }}</div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
export default {
  name: "DynamicInput",
  emits: ["update:modelValue"],
  props: {
    id: {
      type: String,
      default: "inputId",
    },
    placeholder: {
      type: String,
      default: "",
    },
    isRequired: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    validFeedback: {
      type: String,
      default: "",
    },
    errorFeedback: {
      type: String,
      default: "text",
    },
    modelValue: {
      type: [String, Boolean, Number],
      default: "",
    },
  },
  setup(props, { emit }) {
    const inputValue = ref(props.modelValue);
    watch(inputValue, async (newValue, oldValue) => {
      emit("update:modelValue", newValue);
    });
    emit("update:modelValue", inputValue.value);
    return {
      inputValue,
    };
  },
};
</script>

<style scoped lang="scss"></style>
