import * as React from 'react'
import { message } from 'antd'
import ServiceManger from './service'
import CommonManger from './common'
import ProjectManger from './project'

export interface Store {
  serviceManager: ServiceManger,
  projectManager: ProjectManger,
  commonManager: CommonManger,
}

export interface ContextStore {
  store: Store
}

const createStore = () => {
  const store: any = {
    serviceManager: new ServiceManger(),
    projectManager: new ProjectManger(),
    commonManager: new CommonManger(),
  }

  Object.keys(store).forEach(key => {
    store[key].refs = store
    store[key].message = message
    store[key].init && store[key].init()
  })

  return store
}

const store = createStore()
const StoreContext = React.createContext<ContextStore>({ store })

export default store
export const StoreProvider = StoreContext.Provider
export const StoreConsumer = StoreContext.Consumer