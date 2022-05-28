import Vue from "vue";

import { LayoutPlugin } from "bootstrap-vue/esm/components/layout";
import { ButtonPlugin } from "bootstrap-vue/esm/components/button";
import { FormInputPlugin } from "bootstrap-vue/esm/components/form-input";

import { BIconXCircle } from "bootstrap-vue/esm/icons";

Vue.use(LayoutPlugin);
Vue.use(ButtonPlugin);
Vue.use(FormInputPlugin);

Vue.component("BIconXCircle", BIconXCircle);
