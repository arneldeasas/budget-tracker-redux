import { configureStore } from '@reduxjs/toolkit'
import counter from './counter'
import global from './global'
export default configureStore({
  reducer: {
    counter: counter,
    global: global
  }
})