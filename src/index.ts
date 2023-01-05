import { Plugin } from 'vue'
import { install } from './plugin'
export { useNotification } from './useNotification';
export type { NotificationsOptions, NotificationsPluginOptions } from './types';

export default {
  install,
} as Plugin
