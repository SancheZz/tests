import { useStore } from 'vuex';
import type { AppStore } from '@/store';

declare module 'vuex' {
  function useStore(): AppStore
}
