import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Notifications from '../../../src/Notifications.vue'
import vuetify from './vuetify'

describe('Notifications', () => {
  describe('defaults', () => {
    it('has correct default props', () => {
      const wrapper = mount(Notifications)
      const props = wrapper.props()
      expect(props.reverseDirection).toEqual(true)
      expect(props.color).toEqual('success')
      expect(props.timeout).toEqual(5000)
      expect(props.location).toEqual('bottom center')
      expect(props.showCloseButton).toEqual(true)
      expect(props.ignoreDuplicates).toEqual(false)
    })

    it('list is empty', () => {
      const wrapper = mount(Notifications)
      const items = wrapper.findAll('.vue-notification-wrapper')
      expect(items.length).toBe(0)
    })
  })

  describe('methods', () => {
    describe('addItem', () => {
      it('adds item to list', () => {
        const wrapper = mount(Notifications, { global: { plugins: [vuetify] } })

        const event = {
          title: 'Title',
        }

        wrapper.vm.addItem(event)
        expect(wrapper.vm.list.length).toEqual(1)
        expect(wrapper.vm.list[0].id).toBeDefined()
        expect(wrapper.vm.list[0].title).toEqual('Title')
        expect(wrapper.vm.list[0].color).toEqual('success')
        expect(wrapper.vm.list[0].state).toEqual(0)
        expect(wrapper.vm.list[0].timeout).toEqual(5000)
        expect(wrapper.vm.list[0].timer).toBeDefined()
      })

      describe('order of inserted items', () => {
        it('by default inserts items in reverse order', () => {
          const wrapper = mount(Notifications, { global: { plugins: [vuetify] } })

          const event1 = {
            title: 'First',
          }

          const event2 = {
            title: 'Second',
          }

          wrapper.vm.addItem(event1)
          wrapper.vm.addItem(event2)

          expect(wrapper.vm.list.length).toEqual(2)
          expect(wrapper.vm.list[0].title).toEqual('Second')
          expect(wrapper.vm.list[1].title).toEqual('First')
        })

        it('when location is top and reverse is false, inserts in reverse order', () => {
          const propsData = {
            location: 'top center',
            reverseDirection: false,
          }

          const wrapper = mount(Notifications, { global: { plugins: [vuetify] } })
          wrapper.setProps(propsData)

          const event1 = {
            title: 'First',
          }

          const event2 = {
            title: 'Second',
          }

          wrapper.vm.addItem(event1)
          wrapper.vm.addItem(event2)

          expect(wrapper.vm.list.length).toEqual(2)
          expect(wrapper.vm.list[0].title).toEqual('Second')
          expect(wrapper.vm.list[1].title).toEqual('First')
        })

        it('when location is top and reverse is true, inserts in sequential order', () => {
          const props = {
            location: 'top center',
            reverseDirection: true,
          }

          const wrapper = mount(Notifications, { props, global: { plugins: [vuetify] } })

          const event1 = {
            title: 'First',
          }

          const event2 = {
            title: 'Second',
          }

          wrapper.vm.addItem(event1)
          wrapper.vm.addItem(event2)

          expect(wrapper.vm.list.length).toEqual(2)
          expect(wrapper.vm.list[0].title).toEqual('First')
          expect(wrapper.vm.list[1].title).toEqual('Second')
        })

        it('when location is bottom and reverse is false, inserts in sequential order', () => {
          const props = {
            location: 'bottom right',
            reverseDirection: false,
          }

          const wrapper = mount(Notifications, { props, global: { plugins: [vuetify] } })

          const event1 = {
            title: 'First',
          }

          const event2 = {
            title: 'Second',
          }

          wrapper.vm.addItem(event1)
          wrapper.vm.addItem(event2)

          expect(wrapper.vm.list.length).toEqual(2)
          expect(wrapper.vm.list[0].title).toEqual('First')
          expect(wrapper.vm.list[1].title).toEqual('Second')
        })

        it('when position is bottom and reverse is true, inserts in reverse order', () => {
          const props = {
            location: 'bottom right',
            reverseDirection: true,
          }

          const wrapper = mount(Notifications, { global: { plugins: [vuetify] } })
          wrapper.setProps(props)
          const event1 = {
            title: 'First',
          }

          const event2 = {
            title: 'Second',
          }

          wrapper.vm.addItem(event1)
          wrapper.vm.addItem(event2)

          expect(wrapper.vm.list.length).toEqual(2)
          expect(wrapper.vm.list[0].title).toEqual('Second')
          expect(wrapper.vm.list[1].title).toEqual('First')
        })
      })

      describe('auto-destroy of items', () => {
        it('item is destroyed after certain duration', () => {
          const timeout = 500

          const props = { timeout }
          vi.useFakeTimers()

          const wrapper = mount(Notifications, { props, global: { plugins: [vuetify] } })
          // wrapper.setProps(props)

          const event = {
            title: 'Title',
          }

          wrapper.vm.addItem(event)

          expect(wrapper.vm.list.length).toEqual(1)
          vi.advanceTimersByTime(timeout)
          expect(wrapper.vm.list.length).toEqual(0)
        })
      })

      describe('when ignoreDuplicates is on', () => {
        const wrapper = mount(Notifications, { global: { plugins: [vuetify] } })
        wrapper.setData({
          ignoreDuplicates: true,
        })

        it('adds unique item to list', () => {
          const event = {
            title: 'Title',
          }

          wrapper.vm.addItem(event)
          wrapper.vm.addItem(event)

          expect(wrapper.vm.list.length).toEqual(1)
          expect(wrapper.vm.list[0].id).toBeDefined()
          expect(wrapper.vm.list[0].title).toEqual('Title')
          expect(wrapper.vm.list[0].color).toEqual('success')
          expect(wrapper.vm.list[0].state).toEqual(0)
          expect(wrapper.vm.list[0].timeout).toEqual(5000)
          expect(wrapper.vm.list[0].timer).toBeDefined()
        })
      })

      it('does not add item with same title to list', () => {
        const wrapper = mount(Notifications, { global: { plugins: [vuetify] } })

        const event = {
          title: 'Title',
        }

        wrapper.vm.addItem(event)
        wrapper.vm.addItem(event)

        expect(wrapper.vm.list.length).toEqual(2)
        expect(wrapper.vm.list[0].id).toBeDefined()
        expect(wrapper.vm.list[0].title).toEqual('Title')
        expect(wrapper.vm.list[0].color).toEqual('success')
        expect(wrapper.vm.list[0].state).toEqual(0)
        expect(wrapper.vm.list[0].timeout).toEqual(5000)
        expect(wrapper.vm.list[0].timer).toBeDefined()
      })
    })
  })

  describe('rendering', () => {
    describe('notification wrapper', () => {
      it('adds notification item with correct title', () => {
        const wrapper = mount(Notifications, { attachTo: document.body, global: { plugins: [vuetify] } })

        const event = {
          title: 'Title',
        }

        wrapper.vm.addItem(event)

        wrapper.vm.$nextTick(() => {
          const notifications = wrapper.findAll('.vue-notification-wrapper')

          expect(notifications.length).toEqual(1)
          const title = wrapper.find('[data-test="notification"] .v-snackbar__content').text()
          expect(title).toEqual('Title')

          // check close button
          const closeBtn = wrapper.find('.v-snackbars .close')
          expect(closeBtn.exists()).toBe(true)
        })
      })

      it('adds notification without close button', () => {
        const wrapper = mount(Notifications, { attachTo: document.body, global: { plugins: [vuetify] } })

        const event = {
          title: 'Title2',
          showCloseButton: false,
        }

        wrapper.vm.addItem(event)

        wrapper.vm.$nextTick(() => {
          const notifications = wrapper.findAll('.vue-notification-wrapper')

          expect(notifications.length).toEqual(1)
          const title = wrapper.find('[data-test="notification"] .v-snackbar__content').text()
          expect(title).toEqual('Title2')
          // check close button shouldn't exist
          const closeBtn = wrapper.find('.v-snackbars.v-snackbars-0 .close')
          expect(closeBtn.exists()).toBe(false)
        })
      })
    })
  })
})
