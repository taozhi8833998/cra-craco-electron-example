import * as React from 'react'
import { Component } from 'react'
import { Icon, Menu, Dropdown } from 'antd'
import { Mutation } from 'react-apollo'
import { StoreConsumer, ContextStore } from '../../store'
import './index.css'
import { LOGOUT } from '../../queries'
import { withRouter } from 'react-router-dom'

interface Props{}

@(withRouter as any)
class User extends Component<Props> {
  user: HTMLDivElement | null = null

  userLogout = (signOut: any) => async () => {
    (this.props as any).history.push('/login')
    await signOut()
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

  render() {
    const menu = <Menu onClick={this.menuClick}>
      <Menu.Item key='user-logout'><Icon type='logout' />
        <Mutation mutation={LOGOUT}>
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