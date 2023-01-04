<template>
  <div class="vue-notification-group" :style="styles">
    <transition-group tag="span" name="v-fade" @after-leave="clean">
      <div v-for="item in active" :key="item.id" :data-id="item.id" class="vue-notification-wrapper">
        <v-snackbar
          v-bind="$attrs"
          :timeout="item.timeout"
          :location="location"
          :class="`v-snackbars v-snackbars-${item.id}`"
          :color="item.color"
          :model-value="true"
          data-test="notification"
          contained
        >
          <span v-html="item.title" />
          <template v-if="item.showCloseButton" #actions>
            <v-btn color="black" class="close" text @click="destroy(item)"> Close </v-btn>
          </template>
        </v-snackbar>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Id, Timer, listToDirection } from './util'
import { NotificationsOptions, NotificationSTATE, Data, NotificationItemExtended, emitter } from './types'

export default defineComponent({
  name: 'Notifications',
  inheritAttrs: false,
  props: {
    reverseDirection: {
      type: Boolean,
      default: true,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    // next prop can have next values
    // top left, top center, top right
    // bottom left, bottom center, bottom right
    location: {
      type: String,
      default: 'bottom center',
    },
    color: {
      type: String,
      default: 'success',
    },
    timeout: {
      type: Number,
      default: 5000,
    },
    showCloseButton: {
      type: Boolean,
      default: true,
    },
    ignoreDuplicates: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click', 'destroy'],
  data(): Data {
    return {
      list: [],
    }
  },
  computed: {
    active(): NotificationItemExtended[] {
      return this.list.filter((v) => v.state !== NotificationSTATE.DESTROYED)
    },
    maxWidth(): number {
      if (this.active.length === 0) {
        return 0
      }
      return this.active.reduce((a, b) => (a.width > b.width ? a : b)).width
    },
    styles(): object {
      const { x, y } = listToDirection(this.location)
      const maxWidth = this.maxWidth // need to add 100px to make it like real snackbar
      const styles: Record<string, string> = {
        width: `${maxWidth}px`,
      }

      if (y) {
        styles[y] = '0px'
      }

      if (x) {
        if (x === 'center') {
          styles['left'] = `calc(50% - ${+maxWidth / 2}px)`
        } else {
          styles[x] = '0px'
        }
      }

      return styles
    },
    botToTop(): boolean {
      // eslint-disable-next-line no-prototype-builtins
      return this.styles.hasOwnProperty('bottom')
    },
  },
  mounted() {
    emitter.on('add', this.addItem)
    emitter.on('close', this.closeItem)
  },
  methods: {
    addItem(event: NotificationsOptions = {}): void {
      if (event.clean || event.clear) {
        this.destroyAll()
        return
      }

      const timeout = event.timeout ? event.timeout : this.timeout
      const ignoreDuplicates = event.ignoreDuplicates ? event.ignoreDuplicates : this.ignoreDuplicates
      const showCloseButton = event.hasOwnProperty('showCloseButton') ? event.showCloseButton : this.showCloseButton
      const color = event.hasOwnProperty('color') ? event.color : this.color

      const { title, id } = event

      const item: NotificationItemExtended = {
        id: id || Id(),
        title,
        color,
        timeout,
        width: 0,
        showCloseButton,
        state: NotificationSTATE.IDLE,
      }

      if (timeout >= 0) {
        new Timer(() => this.destroy(item), timeout, item)
      }

      let indexToDestroy = -1
      const isDuplicate = this.active.some((i) => {
        return i.title === event.title
      })
      const canAdd = ignoreDuplicates ? !isDuplicate : true
      if (!canAdd) {
        return
      }

      const direction = this.reverseDirection ? !this.botToTop : this.botToTop
      if (direction) {
        this.list.push(item)

        if (this.active.length > this.max) {
          indexToDestroy = 0
        }
      } else {
        this.list.unshift(item)

        if (this.active.length > this.max) {
          indexToDestroy = this.active.length - 1
        }
      }

      this.$nextTick(() => {
        const snackbar = document.querySelector<HTMLElement>(`.v-snackbars-${item.id} .v-snackbar__wrapper`)
        const foundEl = this.list.find((el: NotificationItemExtended) => el.id === item.id)
        if (snackbar && snackbar.clientWidth > 0) {
          if (foundEl) {
            foundEl.width = snackbar.clientWidth
          }
        }
        // use in case problem with height
        // if(snackbar && snackbar.clientHeight > 0) {
        //   const foundEl = this.list.find((el: NotificationItemExtended) => el.id === item.id)
        //   if(foundEl) {
        //     // foundEl.height = snackbar.clientHeight
        //   }
        // }
        // console.log(renderedElement.clientWidth)
      })

      if (indexToDestroy !== -1) {
        this.destroy(this.active[indexToDestroy])
      }
    },
    closeItem(id: unknown) {
      this.destroyById(id)
    },
    destroy(item: NotificationItemExtended): void {
      clearTimeout(item.timer)
      item.state = NotificationSTATE.DESTROYED

      this.clean()

      this.$emit('destroy', item)
    },
    destroyAll(): void {
      this.active.forEach(this.destroy)
    },
    destroyById(id: unknown): void {
      const item = this.list.find((v) => v.id === id)

      if (item) {
        this.destroy(item)
      }
    },
    clean() {
      this.list = this.list.filter((v) => v.state !== NotificationSTATE.DESTROYED)
    },
  },
})
</script>

<style lang="scss">
.vue-notification-group {
  position: fixed;
  .vue-notification-wrapper {
    .v-snackbar:not(.v-snackbar--absolute) {
      position: inherit !important;
      height: inherit !important;
    }
    .v-overlay__content {
      position: relative;
    }
  }
}

/* transition*/
.v-fade-enter-active,
  //.v-fade-leave-active,
.v-fade-move {
  transition: all 0.5s;
}
.v-fade-enter-from,
.v-fade-leave-to {
  opacity: 0;
}
/* fix on mobile */
/* X-Small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  .vue-notification-group {
    left: inherit !important;
    width: 100% !important;
  }
}
</style>
