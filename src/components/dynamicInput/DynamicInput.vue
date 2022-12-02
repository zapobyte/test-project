<template>
  <label
    :for="id"
    class="form-label"
  >{{ label }}</label>
  <div class="has-validation">
    <input
      :id="id"
      v-model="inputValue"
      :type="type"
      class="form-control"
      :aria-describedby="id"
      :required="isRequired"
      :placeholder="placeholder"
    >
    <div class="valid-feedback">
      {{ validFeedback }}
    </div>
    <div class="invalid-feedback">
      {{ errorFeedback }}
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'DynamicInput',
  props: {
    id: {
      type: String,
      default: 'inputId',
    },
    placeholder: {
      type: String,
      default: '',
    },
    isRequired: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
      validator(value) {
        return ['date', 'email', 'number', 'password', 'text', 'url'].includes(value);
      },
    },
    validFeedback: {
      type: String,
      default: '',
    },
    errorFeedback: {
      type: String,
      default: 'text',
    },
    modelValue: {
      type: [String, Boolean, Number],
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputValue = ref(props.modelValue);
    watch(inputValue, async (newValue) => {
      emit('update:modelValue', newValue);
    });
    emit('update:modelValue', inputValue.value);
    return {
      inputValue,
    };
  },
};
</script>

<style scoped lang="scss"></style>
