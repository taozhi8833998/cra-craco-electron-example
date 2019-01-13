import * as React from 'react'
import { Component } from 'react'
import { Layout, Divider } from 'antd'
import { Route, Switch } from 'react-router-dom'
import "./index.css"
import HeaderMenu from './HeaderMenu'
import User from '../User'
import SiderMenu from './SiderMenu'

const { Header, Content, Sider } = Layout

interface Props {
  form?: any
}

interface State {
  collapsed: boolean
}

class Layouts extends Component<Props, State> {

  state = {
    collapsed: false
  }

  onCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    return (
      <Layout className="layoutCon">
        <Header className="header">
          <Divider type="vertical" />
          <HeaderMenu />
          <User />
        </Header>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            className='sider'
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <SiderMenu onCollapse={this.onCollapse} openKeys={['app']} />
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content>
              <Switch>
                {/* <Route path="/home/app" component={App} />
                <Route path="/home/api" component={Api} />
                <Route path="/home/ds" component={DataSource} /> */}
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}


export default Layouts