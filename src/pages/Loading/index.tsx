import * as React from 'react'
import { PureComponent } from 'react'
import { withRouter, RouteComponentProps } from "react-router-dom"
import { Spin } from 'antd'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Store, StoreConsumer, ContextStore } from '../../store'
import './index.css'

interface Props extends RouteComponentProps<any> {
}

const USRINFO = gql`
  query {
    userInfo {
      name
    }
  }
`

@(withRouter as any)
class Loading extends PureComponent<Props, {}> {

  redirect({context, loading, data, error}:{context: ContextStore, loading: Boolean, data: any, error: any}) {
    if (loading) return
    const { store } = context
    if (error) {
      return this.props.history.push('/login')
    }
    const name = data && data.userInfo && data.userInfo.name
    if (name) {
      store && store.commonManager.setUserName(name)
      return this.props.history.push('/home')
    }
    return this.props.history.push('/login')
  }

  render() {
    return <StoreConsumer>
      {
        (context: ContextStore) => {
          return <Query query={USRINFO}>
        {
          ({ loading, data, error }) => {
            const com = <div className="loading"><Spin size="large" /></div>
            process.nextTick(() => this.redirect({ context, loading, data, error }))
            return com
          }
        }
      </Query>
        }
    }
    </StoreConsumer>
  }
}

export default Loading