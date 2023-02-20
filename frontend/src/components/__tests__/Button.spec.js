import { describe, it, expect, beforeEach, afterEach } from "vitest";

import { flushPromises, shallowMount } from "@vue/test-utils";
import Button from "../ButtonComp.vue";

describe("Button", () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallowMount(Button, {
      props: { isLoading: false, isDisable: false },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders properly", () => {
    expect(wrapper.findAll("a-button").length).toEqual(1);
    expect(wrapper.findAll("a-button").at(0).text()).toMatch("Создать");
    expect(wrapper.findAll("a-button").at(0).html()).toMatch('class="button"');
    expect(wrapper.vm.isLoading).toBeFalsy();
    expect(wrapper.vm.isDisable).toBeFalsy();
  });

  it("disable", async () => {
    wrapper.setProps({ isDisable: true });
    await flushPromises();

    expect(wrapper.vm.isDisable).toBeTruthy();

    expect(wrapper.findAll("a-button").at(0).html()).toMatch('disabled="true"');
  });

  it("loading", async () => {
    wrapper.setProps({ isLoading: true });
    await flushPromises();

    expect(wrapper.vm.isLoading).toBeTruthy();

    expect(wrapper.findAll("a-button").at(0).html()).toMatch('loading="true"');
  });
});
