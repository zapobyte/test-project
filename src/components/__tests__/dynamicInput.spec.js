import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import DynamicInput from "../dynamicInput/DynamicInput.vue";

describe("DynamicInput.vue", () => {
  it("with random options - renders properly", () => {
    const props = {
      type: 'text',
      modelValue: 'This is a text',
      placeholder: 'MyPlaceholder',
      validFeedback: 'Valid test',
      errorFeedback: 'Error test'
    }
    const wrapper = mount(DynamicInput, {props});
    const input = wrapper.find('input');
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted()['update:modelValue']).toHaveLength(1);
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([props.modelValue]);
    expect(input.element.value).toEqual(props.modelValue);
    expect(wrapper.html()).toContain(props.validFeedback);
    expect(wrapper.html()).toContain(props.errorFeedback);
    input.setValue('Random text');
    expect(input.element.value).toEqual('Random text');
  });
})
