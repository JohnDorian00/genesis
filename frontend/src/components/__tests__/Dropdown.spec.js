import { describe, it, expect, beforeEach, afterEach } from "vitest";

import { flushPromises, shallowMount } from "@vue/test-utils";
import Dropdown from "../DropdownComp.vue";

describe("Dropdown", () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallowMount(Dropdown, {
      props: {
        selected: 0,
        options: ["Сделка", "Контакт", "Компания"],
        isDisable: false,
        "onUpdate:selected": (e) => {
          if (!e) return;
          wrapper.vm.selectLocal = e.newSelected;
          wrapper.setProps({ selected: e.newSelected });
        },
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders properly", () => {
    expect(wrapper.findAll("a-select").length).toEqual(1);

    expect(wrapper.vm.selected).toBe(0);
    expect(wrapper.vm.options).toContain("Контакт");
    expect(wrapper.vm.isDisable).toBeFalsy();
    expect(wrapper.vm.optionsWithNoChoice).toContainEqual({
      value: 0,
      label: "Не выбрано",
    });
    expect(wrapper.vm.optionsWithNoChoice).toContainEqual({
      value: 2,
      label: "Контакт",
    });

    expect(wrapper.findAll("a-select").at(0).html()).toMatch('value="0"');
    expect(wrapper.findAll("a-select").at(0).html()).toMatch(
      'options="[object Object],[object Object],[object Object],[object Object]"'
    );
    expect(wrapper.findAll("a-select").at(0).html()).toMatch(
      'disabled="false"'
    );
  });

  it("disable", async () => {
    wrapper.setProps({ isDisable: true });
    await flushPromises();

    expect(wrapper.vm.isDisable).toBeTruthy();

    expect(wrapper.findAll("a-select").at(0).html()).toMatch('disabled="true"');
  });

  it("change options", async () => {
    wrapper.setProps({ options: ["Сделка", "Контакт", "Компания", "Заказ"] });
    await flushPromises();

    expect(wrapper.vm.options).toContain("Заказ");
    expect(wrapper.vm.options).toContain("Контакт");

    expect(wrapper.findAll("a-select").at(0).html()).toMatch(
      'options="[object Object],[object Object],[object Object],[object Object],[object Object]"'
    );
  });

  it("change selected", async () => {
    const newSelected = 1;

    wrapper.find("a-select").trigger("change", { newSelected: newSelected });
    await flushPromises();

    expect(wrapper.emitted("update:selected")[0][0].newSelected).toEqual(
      newSelected
    );

    expect(wrapper.vm.selected).toBe(newSelected);
    expect(wrapper.vm.selectLocal).toBe(newSelected);

    expect(wrapper.findAll("a-select").at(0).html()).toMatch(
      `value="${newSelected}"`
    );
  });

  it("wrong options", async () => {
    wrapper.setProps({ options: 123 });
    await flushPromises();

    expect(wrapper.vm.optionsWithNoChoice).toMatchObject([
      { value: 0, label: "Не выбрано" },
    ]);

    expect(wrapper.findAll("a-select").at(0).html()).toMatch(
      'options="[object Object]"'
    );
  });

  it("handleInput", () => {
    expect(wrapper.vm.handleInput(1)).toBeUndefined();
    expect(wrapper.emitted("update:selected")[0][0]).toEqual(1);

    expect(wrapper.vm.handleInput()).toBeUndefined();
    expect(wrapper.emitted("update:selected")[0][1]).toBeUndefined();
  });
});
