import * as React from 'react'
import { PureComponent } from 'react'
import { withRouter, RouteComponentProps } from "react-router-dom"
import { Spin } from 'antd'
import { Query } from 'react-apollo'
import { StoreConsumer, ContextStore } from '../../store'
import { USRINFO } from '../../queries'
import './index.css'

interface Props extends RouteComponentProps<any> {
}

@(withRouter as any)
class Loading extends PureComponent<Props, {}> {

  redirect({context, loading, data, error}:{context: ContextStore, loading: boolean, data: any, error: any}) {
    if (loading) return
    const { store } = context
    const { history, location } = this.props
    if (error) {
      return history.push('/login')
    }
    const name = store.commonManager.getValueByKeys(['userInfo', 'name'], data)
    if (name) {
      store && store.commonManager.setUserName(name)
      const redirectTo = store.commonManager.getValueByKeys(['state', 'from', 'pathname'], location, '/')
      return history.push(redirectTo)
    }
    return history.push('/login')
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