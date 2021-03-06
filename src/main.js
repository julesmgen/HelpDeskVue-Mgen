import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/main.css'
import router from "./router.js"

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'



createApp(App).use(router).mount('#app')
