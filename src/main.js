import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import tr from 'element-plus/es/locale/lang/tr'

import App from './App.vue'
import './assets/style.css'
import store from '../store';

let app = createApp(App)
app.use(store)
app.use(ElementPlus, {
    locale: tr
})
app.mount('#app')