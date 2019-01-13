import React, { Component } from 'react'
import classes from './App.module.css'
import ApolloClient from "apollo-boost"
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from './pages/Login'
import Layouts from './components/Layout'
import NotFound from './pages/NotFound'
import Loading from './pages/Loading'
import { Store, StoreProvider, ContextStore } from './store'

// Create the apollo client, with the Apollo caching.
const apolloClient = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  // fetchOptions: {
  //   credentials: 'include'
  // },
  request: async operation => {
    operation.setContext({
      fetchOptions: {
        credentials: 'include'
      }
    });
  }
})

const routers = [
  {
    path: '/login',
    key: 'login',
    exact: true,
    component: Login,
    requireAuth: false
  },
  {
    path: '/loading',
    key: 'loading',
    component: Loading,
    requireAuth: false
  },
  {
    path: '/home',
    key: 'home',
    component: Layouts,
    requireAuth: true
  }
]

interface Props {
  store: Store
}

class App extends Component<Props> {
    renderRouters = () => {
      const { store } = this.props
      const commonProps: ContextStore = {
        store
      }
      return routers.map((router: any, index) => {
        return <Route
          key={router.key || index}
          path={router.path}
          exact={router.exact}
          render={(props: any) => {
            if (!router.requireAuth || store.commonManager.getUserName()) return <StoreProvider value={commonProps}><router.component {...commonProps} {...props} /> </StoreProvider>
            return <Redirect to={{ pathname: '/loading', state: { from: props.location } }} />
          }}
        />
      })
    }

    render() {
      return <div className={classes.App}>
        <ApolloProvider client={apolloClient}>
          <BrowserRouter>
            <Switch>
              <Redirect exact={true} path="/" to="/home" />
              {this.renderRouters()}
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
        </ApolloProvider>
      </div>
    }
}

export default App;
