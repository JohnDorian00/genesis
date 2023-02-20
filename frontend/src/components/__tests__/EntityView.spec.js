import { describe, it, expect, beforeEach, afterEach } from "vitest";

import { shallowMount } from "@vue/test-utils";
import EntityView from "../EntityView.vue";

describe("EntityView", () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallowMount(EntityView);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders properly", () => {
    expect(wrapper.findAll("div").length).toEqual(1);
    expect(wrapper.findAll("a-list").length).toEqual(1);
  });
});
