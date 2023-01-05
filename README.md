[![npm](https://img.shields.io/npm/dm/@kyvg/vue3-notification)](https://www.npmjs.com/package/@kyvg/vue3-notification)

# Vue 3 Vuetify snackbars

This repo base on very good plugin https://github.com/kyvg/vue3-notification. I adapted it to vuetify 3 with my own requirements

## Setup

```bash
npm install --save @websitevirtuoso/vue3-v-snackbars

yarn add @websitevirtuoso/vue3-v-snackbars
```

Add dependencies to your `main.js`:

```javascript
import { createApp } from 'vue'
import notifications from '@websitevirtuoso/vue3-v-snackbars'

const app = createApp({...})
app.use(notifications)
// Or with optional params- here default values
app.use(notifications, { componentName: 'vNotifications', name: 'notify'})
// parameter "name" using for optional API ot call plugin like this.$notify()
// I didn't test it, but think it should work
```

Add the global component to your `App.vue`:

```vue
<v-notifications location="bottom center" :timeout="5000" />
```

## Usage

Trigger notifications from your `.vue` files:

```javascript
// simple

Usage 
// way 1:
  import { useNotification } from '@websitevirtuoso/vue3-v-snackbars'
const notification = useNotification()
useNotification({
  title: 'text',
  color: 'error',
})

// way 2:
import { useNotification } from '@websitevirtuoso/vue3-v-snackbars'
notification.success('message')

// way 3:
import { useNotification } from '@websitevirtuoso/vue3-v-snackbars'
useNotification('message')
```

Or trigger notifications from other files, for example, your router:

```javascript
import { useNotification } from '@websitevirtuoso/vue3-v-snackbars'
```
### Component props

The majority of settings for the Notifications component are configured using props:

```vue
<v-notifications location="bottom center" :timeout="5000" />
```

Note that all props are optional.

| Name             | Type    | Default  | Description                                                                 |
|------------------|---------|----------|-----------------------------------------------------------------------------|
| max              | Number  | Infinity | Maximum number of notifications that can be shown in notification holder    | 
| color            | String  | success  | You can use any color from vuetify lib, like on original snackbar component | 
| timeout          | Number  | 5000     | Time (in ms) to keep the notification on screen                             |
| reverseDirection | Boolean | false    | Show notifications in reverse order                                         |
| ignoreDuplicates | Boolean | false    | Ignore repeated instances of the same notification                          |
| showCloseButton  | Boolean | true     | Display button to close notification                                        |

### Plugin Options

Configure the plugin itself using an additional options object:

```js
app.use(Notifications({ name: 'alert' }))
```

All options are optional:

| Name          | Type    | Default        | Description                                                                   |
|---------------|---------|----------------|-------------------------------------------------------------------------------|
| name          | String  | notify         | Defines the instance name. It's prefixed with the dollar sign. E.g. `$notify` |
| componentName | String  | vNotifications | The component's name                                                          |

> **Note**: setting `componentName` can cause issues when using SSR.
