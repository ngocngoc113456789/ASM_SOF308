import { createApp } from 'vue'
import './style.css'
import router from './router/router.js'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'
import App from './App.vue'
import store from './store/index.js'

const app = createApp(App)
app.use(router)
app.use(store)

// DÒNG NÀY LÀ "CHÌA KHÓA VÀNG" – THÊM VÀO ĐÂY!
store.dispatch('initAuth')   // ← Khôi phục login khi reload trang

app.mount('#app')