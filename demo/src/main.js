import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import Notifications from '../../src/index';
import 'vuetify/styles';
const app = createApp(App);
app.use(createVuetify())
    .use(Notifications, { setGlobal: true });
app.mount('#app');
