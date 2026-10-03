import { useDark, useMediaQuery, useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { type Ref, watch } from 'vue';

export const useStyleStore = defineStore('style', {
  state: () => {
    // Always dark: not stored and not following the system, useDark sets the dark class on <html>
    const isDarkTheme = useDark({ initialValue: 'dark', storageKey: null });
    const isSmallScreen = useMediaQuery('(max-width: 700px)');
    const isMenuCollapsed = useStorage('isMenuCollapsed', isSmallScreen.value) as Ref<boolean>;

    watch(isSmallScreen, v => (isMenuCollapsed.value = v));

    return {
      isDarkTheme,
      isMenuCollapsed,
      isSmallScreen,
    };
  },
});
