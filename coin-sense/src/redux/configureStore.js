import { configureStore } from '@reduxjs/toolkit'

import counter from './counter'
import global from './global'
import transaction from './transaction'



export default configureStore({
  reducer: {
    counter: counter,
    global: global,
    transaction: transaction
  }
})