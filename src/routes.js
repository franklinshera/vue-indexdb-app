
import Home from './pages/Home.vue'
import DexiePage from './pages/Dexie.vue'
import GetStarted from './pages/GetStarted.vue'

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/dexie',
    component: DexiePage
  },
  {
    path: '/get-started',
    component: GetStarted
  }
];