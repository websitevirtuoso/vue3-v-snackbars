import { useNotification } from './index';

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $notify: typeof useNotification;
  }
}
