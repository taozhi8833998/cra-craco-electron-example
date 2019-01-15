import React, { Component } from 'react'
import classes from './App.module.css'
import { ApolloProvider } from 'react-apollo'
import { HashRouter as BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from './pages/Login'
import Layouts from './components/Layout'
import NotFound from './pages/NotFound'
import Loading from './pages/Loading'
import { message as Message } from 'antd'
import { Store, StoreProvider, ContextStore } from './store'
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) graphQLErrors.map(({ message, locations, path }) => {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          )
          Message.error(message, 5)
        })
      if (networkError) {
        console.log(`[Network error]: ${networkError}`)
        Message.error(`[Network error]: ${ networkError }`, 5)
      }
    }),
    new HttpLink({
      uri: '/graphql',
      credentials: 'include'
    })
  ]),
  cache: new InMemoryCache()
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
    path: '/',
    key: 'home',
    component: Layouts,
    requireAuth: true
  },
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
