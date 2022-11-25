import { writable } from "svelte/store";
import { localStore } from "./localStore";
import { get } from "./http.js";

export const brugeren = localStore("mig");
export const skema = localStore("skema");
export const lektier = localStore("lektier");
export const opgaver = localStore("opgaver");
export const beskeder = localStore("beskeder");
