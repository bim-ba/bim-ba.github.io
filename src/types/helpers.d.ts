import type { Component } from "vue";

export type Nullable<T> = T | null;

// FIXME: unused
export type TemplateRef<T extends Element | Component | Array<Element | Component>> =
  T extends Component
    ? Nullable<InstanceType<T>>
    : T extends Array<Component>
    ? Nullable<Array<InstanceType<T>>>
    : Nullable<T>;
