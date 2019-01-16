import * as React from 'react'
import { Component } from 'react'
import { Icon, Menu, Dropdown } from 'antd'
import { Mutation } from 'react-apollo'
import { Store, StoreConsumer, ContextStore } from '../../store'
import './index.css'
import { LOGOUT, USRINFO } from '../../queries'
import { withRouter } from 'react-router-dom'

interface Props{}

@(withRouter as any)
class User extends Component<Props> {
  user: HTMLDivElement | null = null
  store: Store | null = null

  userLogout = (signOut: any) => async () => {
    if (this.store) this.store.commonManager.setUserName('');
    (this.props as any).history.push('/login')
    try {
      await signOut()
    } catch(err) {
      console.error('logout error = ', err)
    }
  }

  menuClick = (item: any) => {
    switch (item.key) {
      case 'user-logout':
        // return this.userLogout()
      case 'user-setting':
        break
        // return this.userSetting()
      default:
        console.warn(`there is no matching handle for ${item.key}, check your code`)
    }
  }

  refetchQueries = () => {
    return [
      { query: USRINFO }
    ]
  }

  render() {
    const menu = <Menu onClick={this.menuClick}>
      <Menu.Item key='user-logout'><Icon type='logout' />
        <Mutation mutation={LOGOUT} refetchQueries={this.refetchQueries}>
        {
            (signOut, { loading }) => <span onClick={this.userLogout(signOut)}>Logout</span>
        }
        </Mutation>
      </Menu.Item>
    </Menu>
    return <StoreConsumer>
      {
        (context: ContextStore) => {
          const userName = context.store.commonManager.getUserName()
          this.store = context.store
          return <div className={userName && "user" || "userHide"} ref={user => this.user = user}>
            <Dropdown
              overlay={menu}
              trigger={['click']}
              getPopupContainer={(): any => this.user}
            >
              <span><Icon type="user" /><span style={{ marginRight: '10px', marginLeft: '3px' }}>{userName}</span><Icon type="down" /></span>
            </Dropdown>
          </div>
        }
      }
      </StoreConsumer>
  }
}

export default User