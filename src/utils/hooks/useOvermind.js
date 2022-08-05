import {
  createStateHook,
  createActionsHook,
  createEffectsHook,
  createReactionHook,
} from "overmind-vue/vue3";

/** @type {import('overmind-vue/vue3').StateHook<AppContext>} */
export const useState = createStateHook();

/** @type {import('overmind-vue/vue3').ActionsHook<AppContext>} */
export const useActions = createActionsHook();

/** @type {import('overmind-vue/vue3').EffectsHook<AppContext>} */
export const useEffects = createEffectsHook();

export const useReaction = createReactionHook();

/** @typedef {import('../../model').AppContext} AppContext */
