/// <reference types="node" />

import { Plugin as Plugin_2 } from 'vue';

declare const _default: Plugin_2;
export default _default;

declare type NotificationItemByType = Pick<NotificationsOptions, 'id' | 'timeout' | 'showCloseButton' | 'reverseDirection'>;

export declare interface NotificationsOptions {
    id?: number;
    title?: string;
    color?: string;
    timeout?: number;
    clean?: boolean;
    clear?: boolean;
    ignoreDuplicates?: boolean;
    showCloseButton?: boolean;
    reverseDirection?: boolean;
}

export declare interface NotificationsPluginOptions {
    name?: string;
    componentName?: string;
}

/**
 * Usage
 * ex1:
 * import { useNotification } from '@/modules/notifications/useNotification'
 * const notification = useNotification()
 * useNotification({
 *     title: 'text',
 *     color: 'error',
 *   })
 * ex2:
 * import { useNotification } from '@/modules/notifications/useNotification'
 * notification.success('message')
 * ex3:
 * import { useNotification } from '@/modules/notifications/useNotification'
 * useNotification('message')
 *
 * @param args?
 */
export declare const useNotification: {
    (args?: NotificationsOptions | string): {
        success: (msg: string, opt?: NotificationItemByType) => void;
        info(msg: string, opt?: NotificationItemByType): void;
        error(msg: string, opt?: NotificationItemByType): void;
    };
    close(id: unknown): void;
};

export { }
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $notify: typeof useNotification;
  }
}
