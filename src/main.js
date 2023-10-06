import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import {
    VDataTable,
} from "vuetify/labs/VDataTable";
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const vuetify = createVuetify({
    theme: {
        defaultTheme: 'dark'
    },
    components: { ...components, VDataTable, VSkeletonLoader },
    directives,
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
